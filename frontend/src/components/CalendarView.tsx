'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Reservation } from '@/types';

interface Props {
  fieldId: number;
  grassPhone: string;
  fieldName: string;
  grassName: string;
  selectedDate: string;
  reservations: Reservation[];
}

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);

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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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

export default function CalendarView({
  fieldId,
  grassPhone,
  fieldName,
  grassName,
  selectedDate,
  reservations,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const { prev, next } = getAdjacentDates(selectedDate);

  const handleDateChange = (date: string) => {
    router.push(`/grass/${params.id}/field/${fieldId}?date=${date}`);
  };

  const handleWhatsApp = (hour: number) => {
    const range = formatHourRange(hour);
    const message = `Hola! Quiero reservar la ${fieldName} en ${grassName} el ${selectedDate} de ${range}`;
    window.open(`https://wa.me/${grassPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div>

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
      <div className="flex gap-4 mb-4 flex-wrap">
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
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: '#E2E8F0' }}
      >
        {HOURS.map((hour, index) => {
          const reservation = getReservationForHour(reservations, hour);
          const isFree = !reservation;
          const isBlocked = reservation?.status === 'blocked';
          const isBusy = reservation?.status === 'reserved';

          const bgColor = isFree ? '#22C55E' : '#EF4444';
          const isLast = index === HOURS.length - 1;

          return (
            <div
              key={hour}
              className="flex items-stretch"
              style={{
                borderBottom: isLast ? 'none' : '0.5px solid #E2E8F0',
                minHeight: '56px',
              }}
            >
              {/* Etiqueta de hora */}
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

              {/* Bloque de estado */}
              <div className="flex items-center flex-1 px-3 py-2" style={{ backgroundColor: '#FFFFFF' }}>
                <button
                  onClick={() => isFree && handleWhatsApp(hour)}
                  disabled={!isFree}
                  className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-white text-sm font-medium text-left"
                  style={{
                    backgroundColor: bgColor,
                    cursor: isFree ? 'pointer' : 'default',
                    opacity: 1,
                  }}
                >
                  {isFree && (
                    <>
                      <span>✓</span>
                      <span>Disponible — toca para reservar</span>
                    </>
                  )}
                  {isBusy && (
  <>
                      <span>✕</span>
                      <span>Ocupado</span>
                  </>
                  )}
                  {isBlocked && (
                    <>
                      <span>🔒</span>
                      <span>Bloqueado</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}