'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Reservation } from '@/types';

interface Props {
  fieldId: number;
  grassId: number;
  fieldName: string;
  selectedDate: string;
  reservations: Reservation[];
}

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function formatHourRange(hour: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hour)}:00 – ${pad(hour + 1)}:00`;
}

function getReservationForHour(reservations: Reservation[], hour: number): Reservation | null {
  return reservations.find((r) => {
    const start = parseInt(r.startTime.split(':')[0]);
    return start === hour;
  }) || null;
}

function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function getAdjacentDates(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const current = new Date(year, month - 1, day);
  const prev = new Date(current); prev.setDate(current.getDate() - 1);
  const next = new Date(current); next.setDate(current.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return { prev: fmt(prev), next: fmt(next) };
}

export default function AdminCalendarView({
  fieldId, grassId, fieldName, selectedDate, reservations,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const { prev, next } = getAdjacentDates(selectedDate);
  const [loading, setLoading] = useState<number | null>(null);
  const [blockingHour, setBlockingHour] = useState<number | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const handleDateChange = (date: string) => {
    router.push(`/admin/grass/${params.id}/field/${fieldId}?date=${date}`);
  };

  const handleOpenForm = (hour: number) => {
    setBlockingHour(hour);
    setClientName('');
    setClientPhone('');
  };

  const handleBlock = async () => {
    if (!clientName.trim() || !clientPhone.trim() || blockingHour === null) return;
    setLoading(blockingHour);
    try {
      await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          startTime: `${String(blockingHour).padStart(2, '0')}:00`,
          endTime: `${String(blockingHour + 1).padStart(2, '0')}:00`,
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          status: 'reserved',
          fieldId,
        }),
      });
      setBlockingHour(null);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (reservationId: number) => {
    setLoading(reservationId);
    try {
      await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      {/* Modal formulario */}
      {blockingHour !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold mb-1" style={{ color: '#0F172A' }}>
              Registrar reserva
            </h3>
            <p className="text-sm mb-4" style={{ color: '#64748B' }}>
              {formatHourRange(blockingHour)} · {selectedDate}
            </p>

            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: '#64748B' }}>
                  Nombre del cliente
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: '#64748B' }}>
                  Teléfono
                </label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej: 987654321"
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                  style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setBlockingHour(null)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleBlock}
                disabled={!clientName.trim() || !clientPhone.trim() || loading !== null}
                className="flex-1 py-2 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: '#378ADD', opacity: (!clientName.trim() || !clientPhone.trim()) ? 0.5 : 1 }}
              >
                {loading !== null ? 'Guardando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selector de fecha */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleDateChange(prev)}
          className="px-4 py-2 rounded-xl text-sm font-medium"
          style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
        >
          ← Anterior
        </button>
        <p className="text-sm font-medium text-center flex-1 mx-2" style={{ color: '#0F172A' }}>
          {formatDateDisplay(selectedDate)}
        </p>
        <button
          onClick={() => handleDateChange(next)}
          className="px-4 py-2 rounded-xl text-sm font-medium"
          style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
        >
          Siguiente →
        </button>
      </div>

      {/* Leyenda */}
      <div className="flex gap-4 mb-4">
        {[
          { color: '#22C55E', label: 'Libre' },
          { color: '#EF4444', label: 'Ocupado' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
            <span className="text-xs" style={{ color: '#64748B' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Slots */}
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#E2E8F0' }}>
        {HOURS.map((hour, index) => {
          const reservation = getReservationForHour(reservations, hour);
          const isFree = !reservation;
          const isLast = index === HOURS.length - 1;

          return (
            <div
              key={hour}
              className="flex items-stretch"
              style={{
                borderBottom: isLast ? 'none' : '0.5px solid #E2E8F0',
                minHeight: '64px',
              }}
            >
              {/* Etiqueta hora */}
              <div
                className="flex items-center justify-end px-3 text-xs font-medium shrink-0"
                style={{
                  width: '120px',
                  color: '#64748B',
                  borderRight: '0.5px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {formatHourRange(hour)}
              </div>

              {/* Bloque */}
              <div className="flex items-center flex-1 px-3 py-2 gap-3" style={{ backgroundColor: '#FFFFFF' }}>
                <div
                  className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl text-white text-sm font-medium"
                  style={{ backgroundColor: isFree ? '#22C55E' : '#EF4444' }}
                >
                  {isFree ? (
                    <><span>✓</span><span>Libre</span></>
                  ) : (
                    <>
                      <span>👤</span>
                      <span>{reservation!.clientName}</span>
                      {reservation!.clientPhone && (
                        <span className="ml-auto text-xs" style={{ opacity: 0.85 }}>
                          📞 {reservation!.clientPhone}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {isFree && (
                  <button
                    onClick={() => handleOpenForm(hour)}
                    className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium"
                    style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
                  >
                    Bloquear
                  </button>
                )}
                {!isFree && (
                  <button
                    onClick={() => handleDelete(reservation!.id)}
                    disabled={loading === reservation!.id}
                    className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium"
                    style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
                  >
                    {loading === reservation!.id ? '...' : 'Liberar'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}