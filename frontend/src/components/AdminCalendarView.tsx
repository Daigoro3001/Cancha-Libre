// 'use client';

// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import { Reservation } from '@/types';

// interface Props {
//   fieldId: number;
//   grassId: number;
//   fieldName: string;
//   selectedDate: string;
//   reservations: Reservation[];
// }

// const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// function formatHourRange(hour: number): string {
//   const pad = (n: number) => String(n).padStart(2, '0');
//   return `${pad(hour)}:00 – ${pad(hour + 1)}:00`;
// }

// function getReservationForHour(reservations: Reservation[], hour: number): Reservation | null {
//   return reservations.find((r) => {
//     const start = parseInt(r.startTime.split(':')[0]);
//     return start === hour;
//   }) || null;
// }

// function formatDateDisplay(dateStr: string): string {
//   const [year, month, day] = dateStr.split('-').map(Number);
//   const date = new Date(year, month - 1, day);
//   return date.toLocaleDateString('es-PE', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   });
// }

// function getAdjacentDates(dateStr: string) {
//   const [year, month, day] = dateStr.split('-').map(Number);
//   const current = new Date(year, month - 1, day);
//   const prev = new Date(current); prev.setDate(current.getDate() - 1);
//   const next = new Date(current); next.setDate(current.getDate() + 1);
//   const fmt = (d: Date) => d.toISOString().split('T')[0];
//   return { prev: fmt(prev), next: fmt(next) };
// }

// export default function AdminCalendarView({
//   fieldId, grassId, fieldName, selectedDate, reservations,
// }: Props) {
//   const router = useRouter();
//   const params = useParams();
//   const { prev, next } = getAdjacentDates(selectedDate);
//   const [loading, setLoading] = useState<number | null>(null);
//   const [blockingHour, setBlockingHour] = useState<number | null>(null);
//   const [clientName, setClientName] = useState('');
//   const [clientPhone, setClientPhone] = useState('');

//   const handleDateChange = (date: string) => {
//     router.push(`/admin/grass/${params.id}/field/${fieldId}?date=${date}`);
//   };

//   const handleOpenForm = (hour: number) => {
//     setBlockingHour(hour);
//     setClientName('');
//     setClientPhone('');
//   };

//   const handleBlock = async () => {
//     if (!clientName.trim() || !clientPhone.trim() || blockingHour === null) return;
//     setLoading(blockingHour);
//     try {
//       await fetch(`${API_URL}/reservations`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           date: selectedDate,
//           startTime: `${String(blockingHour).padStart(2, '0')}:00`,
//           endTime: `${String(blockingHour + 1).padStart(2, '0')}:00`,
//           clientName: clientName.trim(),
//           clientPhone: clientPhone.trim(),
//           status: 'reserved',
//           fieldId,
//         }),
//       });
//       setBlockingHour(null);
//       router.refresh();
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(null);
//     }
//   };

//   const handleDelete = async (reservationId: number) => {
//     setLoading(reservationId);
//     try {
//       await fetch(`${API_URL}/reservations/${reservationId}`, {
//         method: 'DELETE',
//       });
//       router.refresh();
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(null);
//     }
//   };

//   return (
//     <div>
//       {/* Modal formulario */}
//       {blockingHour !== null && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50 px-4"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//         >
//           <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
//             <h3 className="text-base font-semibold mb-1" style={{ color: '#0F172A' }}>
//               Registrar reserva
//             </h3>
//             <p className="text-sm mb-4" style={{ color: '#64748B' }}>
//               {formatHourRange(blockingHour)} · {selectedDate}
//             </p>

//             <div className="flex flex-col gap-3 mb-4">
//               <div>
//                 <label className="text-xs font-medium mb-1 block" style={{ color: '#64748B' }}>
//                   Nombre del cliente
//                 </label>
//                 <input
//                   type="text"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   placeholder="Ej: Juan Pérez"
//                   className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
//                   style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-medium mb-1 block" style={{ color: '#64748B' }}>
//                   Teléfono
//                 </label>
//                 <input
//                   type="text"
//                   value={clientPhone}
//                   onChange={(e) => setClientPhone(e.target.value)}
//                   placeholder="Ej: 987654321"
//                   className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
//                   style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setBlockingHour(null)}
//                 className="flex-1 py-2 rounded-xl text-sm font-medium"
//                 style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
//               >
//                 Cancelar
//               </button>
//               <button
//                 onClick={handleBlock}
//                 disabled={!clientName.trim() || !clientPhone.trim() || loading !== null}
//                 className="flex-1 py-2 rounded-xl text-sm font-medium text-white"
//                 style={{ backgroundColor: '#378ADD', opacity: (!clientName.trim() || !clientPhone.trim()) ? 0.5 : 1 }}
//               >
//                 {loading !== null ? 'Guardando...' : 'Confirmar'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Selector de fecha */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => handleDateChange(prev)}
//           className="px-4 py-2 rounded-xl text-sm font-medium"
//           style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
//         >
//           ← Anterior
//         </button>
//         <p className="text-sm font-medium text-center flex-1 mx-2" style={{ color: '#0F172A' }}>
//           {formatDateDisplay(selectedDate)}
//         </p>
//         <button
//           onClick={() => handleDateChange(next)}
//           className="px-4 py-2 rounded-xl text-sm font-medium"
//           style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
//         >
//           Siguiente →
//         </button>
//       </div>

//       {/* Leyenda */}
//       <div className="flex gap-4 mb-4">
//         {[
//           { color: '#22C55E', label: 'Libre' },
//           { color: '#EF4444', label: 'Ocupado' },
//         ].map(({ color, label }) => (
//           <div key={label} className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
//             <span className="text-xs" style={{ color: '#64748B' }}>{label}</span>
//           </div>
//         ))}
//       </div>

//       {/* Slots */}
//       <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#E2E8F0' }}>
//         {HOURS.map((hour, index) => {
//           const reservation = getReservationForHour(reservations, hour);
//           const isFree = !reservation;
//           const isLast = index === HOURS.length - 1;

//           return (
//             <div
//               key={hour}
//               className="flex items-stretch"
//               style={{
//                 borderBottom: isLast ? 'none' : '0.5px solid #E2E8F0',
//                 minHeight: '64px',
//               }}
//             >
//               {/* Etiqueta hora */}
//               <div
//                 className="flex items-center justify-end px-3 text-xs font-medium shrink-0"
//                 style={{
//                   width: '120px',
//                   color: '#64748B',
//                   borderRight: '0.5px solid #E2E8F0',
//                   backgroundColor: '#FFFFFF',
//                 }}
//               >
//                 {formatHourRange(hour)}
//               </div>

//               {/* Bloque */}
//               <div className="flex items-center flex-1 px-3 py-2 gap-3" style={{ backgroundColor: '#FFFFFF' }}>
//                 <div
//                   className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl text-white text-sm font-medium"
//                   style={{ backgroundColor: isFree ? '#22C55E' : '#EF4444' }}
//                 >
//                   {isFree ? (
//                     <><span>✓</span><span>Libre</span></>
//                   ) : (
//                     <>
//                       <span>👤</span>
//                       <span>{reservation!.clientName}</span>
//                       {reservation!.clientPhone && (
//                         <span className="ml-auto text-xs" style={{ opacity: 0.85 }}>
//                           📞 {reservation!.clientPhone}
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </div>

//                 {isFree && (
//                   <button
//                     onClick={() => handleOpenForm(hour)}
//                     className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium"
//                     style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
//                   >
//                     Bloquear
//                   </button>
//                 )}
//                 {!isFree && (
//                   <button
//                     onClick={() => handleDelete(reservation!.id)}
//                     disabled={loading === reservation!.id}
//                     className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium"
//                     style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
//                   >
//                     {loading === reservation!.id ? '...' : 'Liberar'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import { Reservation } from '@/types';

// interface Props {
//   fieldId: number;
//   grassId: number;
//   fieldName: string;
//   selectedDate: string;
//   reservations: Reservation[];
// }

// const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// function formatHourRange(hour: number): string {
//   const pad = (n: number) => String(n).padStart(2, '0');
//   return `${pad(hour)}:00 – ${pad(hour + 1)}:00`;
// }

// function getReservationForHour(reservations: Reservation[], hour: number): Reservation | null {
//   return reservations.find((r) => {
//     const start = parseInt(r.startTime.split(':')[0]);
//     return start === hour;
//   }) || null;
// }

// function formatDateDisplay(dateStr: string): string {
//   const [year, month, day] = dateStr.split('-').map(Number);
//   const date = new Date(year, month - 1, day);
//   return date.toLocaleDateString('es-PE', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   });
// }

// function getAdjacentDates(dateStr: string) {
//   const [year, month, day] = dateStr.split('-').map(Number);
//   const current = new Date(year, month - 1, day);
//   const prev = new Date(current); prev.setDate(current.getDate() - 1);
//   const next = new Date(current); next.setDate(current.getDate() + 1);
//   const fmt = (d: Date) => d.toISOString().split('T')[0];
//   return { prev: fmt(prev), next: fmt(next) };
// }

// export default function AdminCalendarView({
//   fieldId, grassId, fieldName, selectedDate, reservations,
// }: Props) {
//   const router = useRouter();
//   const params = useParams();
//   const { prev, next } = getAdjacentDates(selectedDate);
//   const [loading, setLoading] = useState<number | null>(null);
//   const [blockingHour, setBlockingHour] = useState<number | null>(null);
//   const [clientName, setClientName] = useState('');
//   const [clientPhone, setClientPhone] = useState('');

//   const handleDateChange = (date: string) => {
//     router.push(`/admin/grass/${params.id}/field/${fieldId}?date=${date}`);
//   };

//   const handleOpenForm = (hour: number) => {
//     setBlockingHour(hour);
//     setClientName('');
//     setClientPhone('');
//   };

//   const handleBlock = async () => {
//     if (!clientName.trim() || !clientPhone.trim() || blockingHour === null) return;
//     setLoading(blockingHour);
//     try {
//       await fetch(`${API_URL}/reservations`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           date: selectedDate,
//           startTime: `${String(blockingHour).padStart(2, '0')}:00`,
//           endTime: `${String(blockingHour + 1).padStart(2, '0')}:00`,
//           clientName: clientName.trim(),
//           clientPhone: clientPhone.trim(),
//           status: 'reserved',
//           fieldId,
//         }),
//       });
//       setBlockingHour(null);
//       router.refresh();
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(null);
//     }
//   };

//   const handleDelete = async (reservationId: number) => {
//     setLoading(reservationId);
//     try {
//       await fetch(`${API_URL}/reservations/${reservationId}`, { method: 'DELETE' });
//       router.refresh();
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(null);
//     }
//   };

//   const isFormValid = clientName.trim() && clientPhone.trim();

//   return (
//     <>
//       <style>{`
//         /* ── Modal overlay ── */
//         .acv-overlay {
//           position: fixed;
//           inset: 0;
//           z-index: 50;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 24px;
//           background: rgba(0,0,0,0.7);
//           backdrop-filter: blur(4px);
//         }

//         .acv-modal {
//           background: #111a14;
//           border: 1px solid rgba(251,191,36,0.18);
//           border-radius: 20px;
//           padding: 24px;
//           width: 100%;
//           max-width: 360px;
//           box-shadow: 0 24px 48px rgba(0,0,0,0.5);
//         }

//         .acv-modal-accent {
//           height: 3px;
//           background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 60%, transparent 100%);
//           border-radius: 2px;
//           margin-bottom: 20px;
//         }

//         .acv-modal-title {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           font-size: 22px;
//           color: #f0fdf4;
//           text-transform: uppercase;
//           letter-spacing: 0.02em;
//           margin: 0 0 4px;
//         }

//         .acv-modal-sub {
//           font-size: 12px;
//           color: rgba(240,253,244,0.4);
//           margin: 0 0 20px;
//           letter-spacing: 0.03em;
//         }

//         .acv-modal-sub span {
//           color: #fbbf24;
//           font-weight: 500;
//         }

//         .acv-field-group {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .acv-label {
//           font-size: 11px;
//           font-weight: 500;
//           color: rgba(240,253,244,0.4);
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           display: block;
//           margin-bottom: 6px;
//         }

//         .acv-input {
//           width: 100%;
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 10px;
//           padding: 11px 14px;
//           font-size: 14px;
//           color: #f0fdf4;
//           font-family: 'DM Sans', sans-serif;
//           box-sizing: border-box;
//           outline: none;
//           transition: border-color 0.15s;
//         }

//         .acv-input::placeholder {
//           color: rgba(240,253,244,0.2);
//         }

//         .acv-input:focus {
//           border-color: rgba(251,191,36,0.35);
//         }

//         .acv-modal-actions {
//           display: flex;
//           gap: 10px;
//         }

//         .acv-btn-cancel {
//           flex: 1;
//           padding: 11px;
//           border-radius: 10px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13px;
//           font-weight: 500;
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.08);
//           color: rgba(240,253,244,0.45);
//           cursor: pointer;
//           transition: background 0.15s, color 0.15s;
//         }
//         .acv-btn-cancel:hover {
//           background: rgba(255,255,255,0.08);
//           color: rgba(240,253,244,0.7);
//         }

//         .acv-btn-confirm {
//           flex: 1;
//           padding: 11px;
//           border-radius: 10px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13px;
//           font-weight: 500;
//           background: rgba(251,191,36,0.15);
//           border: 1px solid rgba(251,191,36,0.25);
//           color: #fbbf24;
//           cursor: pointer;
//           transition: background 0.15s, border-color 0.15s, opacity 0.15s;
//         }
//         .acv-btn-confirm:hover:not(:disabled) {
//           background: rgba(251,191,36,0.22);
//           border-color: rgba(251,191,36,0.4);
//         }
//         .acv-btn-confirm:disabled {
//           opacity: 0.35;
//           cursor: not-allowed;
//         }

//         /* ── Nav ── */
//         .acv-nav {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 12px;
//           margin-bottom: 16px;
//         }

//         .acv-nav-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           padding: 8px 14px;
//           border-radius: 10px;
//           font-size: 12px;
//           font-weight: 500;
//           font-family: 'DM Sans', sans-serif;
//           border: 1px solid rgba(251,191,36,0.18);
//           background: rgba(251,191,36,0.07);
//           color: rgba(251,191,36,0.7);
//           cursor: pointer;
//           transition: background 0.15s, border-color 0.15s, color 0.15s;
//           white-space: nowrap;
//           letter-spacing: 0.03em;
//         }
//         .acv-nav-btn:hover {
//           background: rgba(251,191,36,0.13);
//           border-color: rgba(251,191,36,0.3);
//           color: #fbbf24;
//         }

//         .acv-date-label {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12px;
//           font-weight: 500;
//           color: rgba(240,253,244,0.4);
//           text-align: center;
//           flex: 1;
//           text-transform: capitalize;
//           letter-spacing: 0.01em;
//           line-height: 1.4;
//         }

//         /* ── Legend ── */
//         .acv-legend {
//           display: flex;
//           gap: 16px;
//           margin-bottom: 14px;
//         }

//         .acv-legend-item {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12px;
//           color: rgba(240,253,244,0.45);
//         }

//         .acv-legend-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           flex-shrink: 0;
//         }

//         .acv-dot-free    { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
//         .acv-dot-busy    { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.4); }

//         /* ── Slots ── */
//         .acv-slots {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }

//         .acv-slot {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           min-height: 52px;
//         }

//         .acv-slot-hour {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12px;
//           font-weight: 500;
//           color: rgba(240,253,244,0.3);
//           width: 88px;
//           flex-shrink: 0;
//           text-align: right;
//           letter-spacing: 0.02em;
//         }

//         .acv-slot-divider {
//           width: 1px;
//           height: 20px;
//           background: rgba(255,255,255,0.06);
//           flex-shrink: 0;
//         }

//         .acv-slot-content {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           min-width: 0;
//         }

//         /* Estado libre */
//         .acv-slot-free {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           padding: 9px 12px;
//           border-radius: 10px;
//           background: rgba(74,222,128,0.08);
//           border: 1px solid rgba(74,222,128,0.14);
//           color: rgba(74,222,128,0.7);
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13px;
//           font-weight: 500;
//           min-width: 0;
//         }

//         /* Estado ocupado */
//         .acv-slot-busy {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           padding: 9px 12px;
//           border-radius: 10px;
//           background: rgba(248,113,113,0.08);
//           border: 1px solid rgba(248,113,113,0.15);
//           min-width: 0;
//         }

//         .acv-busy-name {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(240,253,244,0.75);
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .acv-busy-phone {
//           font-size: 12px;
//           color: rgba(240,253,244,0.35);
//           margin-left: auto;
//           white-space: nowrap;
//           flex-shrink: 0;
//         }

//         .acv-busy-icon {
//           font-size: 13px;
//           flex-shrink: 0;
//           color: rgba(248,113,113,0.6);
//         }

//         /* Botón bloquear */
//         .acv-btn-block {
//           flex-shrink: 0;
//           padding: 8px 12px;
//           border-radius: 10px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12px;
//           font-weight: 500;
//           background: rgba(251,191,36,0.08);
//           border: 1px solid rgba(251,191,36,0.15);
//           color: rgba(251,191,36,0.7);
//           cursor: pointer;
//           white-space: nowrap;
//           transition: background 0.15s, border-color 0.15s, color 0.15s;
//         }
//         .acv-btn-block:hover {
//           background: rgba(251,191,36,0.14);
//           border-color: rgba(251,191,36,0.28);
//           color: #fbbf24;
//         }

//         /* Botón liberar */
//         .acv-btn-release {
//           flex-shrink: 0;
//           padding: 8px 12px;
//           border-radius: 10px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12px;
//           font-weight: 500;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           color: rgba(240,253,244,0.35);
//           cursor: pointer;
//           white-space: nowrap;
//           transition: background 0.15s, color 0.15s;
//         }
//         .acv-btn-release:hover:not(:disabled) {
//           background: rgba(255,255,255,0.07);
//           color: rgba(240,253,244,0.6);
//         }
//         .acv-btn-release:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//         }
//       `}</style>

//       {/* ── Modal ── */}
//       {blockingHour !== null && (
//         <div className="acv-overlay" onClick={() => setBlockingHour(null)}>
//           <div className="acv-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="acv-modal-accent" />
//             <h3 className="acv-modal-title">Registrar reserva</h3>
//             <p className="acv-modal-sub">
//               <span>{formatHourRange(blockingHour)}</span> · {selectedDate}
//             </p>

//             <div className="acv-field-group">
//               <div>
//                 <label className="acv-label">Nombre del cliente</label>
//                 <input
//                   className="acv-input"
//                   type="text"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   placeholder="Ej: Juan Pérez"
//                   autoFocus
//                 />
//               </div>
//               <div>
//                 <label className="acv-label">Teléfono</label>
//                 <input
//                   className="acv-input"
//                   type="text"
//                   value={clientPhone}
//                   onChange={(e) => setClientPhone(e.target.value)}
//                   placeholder="Ej: 987654321"
//                 />
//               </div>
//             </div>

//             <div className="acv-modal-actions">
//               <button className="acv-btn-cancel" onClick={() => setBlockingHour(null)}>
//                 Cancelar
//               </button>
//               <button
//                 className="acv-btn-confirm"
//                 onClick={handleBlock}
//                 disabled={!isFormValid || loading !== null}
//               >
//                 {loading !== null ? 'Guardando...' : 'Confirmar'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Nav de fechas ── */}
//       <div className="acv-nav">
//         <button className="acv-nav-btn" onClick={() => handleDateChange(prev)}>← Anterior</button>
//         <span className="acv-date-label">{formatDateDisplay(selectedDate)}</span>
//         <button className="acv-nav-btn" onClick={() => handleDateChange(next)}>Siguiente →</button>
//       </div>

//       {/* ── Leyenda ── */}
//       <div className="acv-legend">
//         <div className="acv-legend-item">
//           <div className="acv-legend-dot acv-dot-free" />
//           Libre
//         </div>
//         <div className="acv-legend-item">
//           <div className="acv-legend-dot acv-dot-busy" />
//           Ocupado
//         </div>
//       </div>

//       {/* ── Slots ── */}
//       <div className="acv-slots">
//         {HOURS.map((hour) => {
//           const reservation = getReservationForHour(reservations, hour);
//           const isFree = !reservation;

//           return (
//             <div key={hour} className="acv-slot">
//               <span className="acv-slot-hour">{formatHourRange(hour)}</span>
//               <div className="acv-slot-divider" />
//               <div className="acv-slot-content">
//                 {isFree ? (
//                   <>
//                     <div className="acv-slot-free">
//                       <span style={{ fontSize: 13 }}>✓</span>
//                       <span>Libre</span>
//                     </div>
//                     <button
//                       className="acv-btn-block"
//                       onClick={() => handleOpenForm(hour)}
//                     >
//                       Bloquear
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="acv-slot-busy">
//                       <span className="acv-busy-icon">👤</span>
//                       <span className="acv-busy-name">{reservation!.clientName}</span>
//                       {reservation!.clientPhone && (
//                         <span className="acv-busy-phone">📞 {reservation!.clientPhone}</span>
//                       )}
//                     </div>
//                     <button
//                       className="acv-btn-release"
//                       onClick={() => handleDelete(reservation!.id)}
//                       disabled={loading === reservation!.id}
//                     >
//                       {loading === reservation!.id ? '...' : 'Liberar'}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
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
      await fetch(`${API_URL}/reservations/${reservationId}`, { method: 'DELETE' });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const isFormValid = clientName.trim() && clientPhone.trim();

  return (
    <>
      <style>{`
        /* ── Modal overlay ── */
        .acv-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
        }

        .acv-modal {
          background: #111a14;
          border: 1px solid rgba(251,191,36,0.18);
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
        }

        .acv-modal-accent {
          height: 3px;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 60%, transparent 100%);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .acv-modal-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #f0fdf4;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0 0 4px;
        }

        .acv-modal-sub {
          font-size: 12px;
          color: rgba(240,253,244,0.4);
          margin: 0 0 20px;
          letter-spacing: 0.03em;
        }

        .acv-modal-sub span {
          color: #fbbf24;
          font-weight: 500;
        }

        .acv-field-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .acv-label {
          font-size: 11px;
          font-weight: 500;
          color: rgba(240,253,244,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 6px;
        }

        .acv-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 14px;
          color: #f0fdf4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s;
        }

        .acv-input::placeholder {
          color: rgba(240,253,244,0.2);
        }

        .acv-input:focus {
          border-color: rgba(251,191,36,0.35);
        }

        .acv-modal-actions {
          display: flex;
          gap: 10px;
        }

        .acv-btn-cancel {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(240,253,244,0.45);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .acv-btn-cancel:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(240,253,244,0.7);
        }

        .acv-btn-confirm {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          background: rgba(251,191,36,0.15);
          border: 1px solid rgba(251,191,36,0.25);
          color: #fbbf24;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, opacity 0.15s;
        }
        .acv-btn-confirm:hover:not(:disabled) {
          background: rgba(251,191,36,0.22);
          border-color: rgba(251,191,36,0.4);
        }
        .acv-btn-confirm:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* ── Nav ── */
        .acv-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .acv-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid rgba(251,191,36,0.18);
          background: rgba(251,191,36,0.07);
          color: rgba(251,191,36,0.7);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          white-space: nowrap;
          letter-spacing: 0.03em;
        }
        .acv-nav-btn:hover {
          background: rgba(251,191,36,0.13);
          border-color: rgba(251,191,36,0.3);
          color: #fbbf24;
        }

        .acv-date-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(240,253,244,0.4);
          text-align: center;
          flex: 1;
          text-transform: capitalize;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }

        /* ── Legend ── */
        .acv-legend {
          display: flex;
          gap: 16px;
          margin-bottom: 14px;
        }

        .acv-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(240,253,244,0.45);
        }

        .acv-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .acv-dot-free    { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
        .acv-dot-busy    { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.4); }

        /* ── Slots ── */
        .acv-slots {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .acv-slot {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
        }

        .acv-slot-hour {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(240,253,244,0.3);
          width: 88px;
          flex-shrink: 0;
          text-align: right;
          letter-spacing: 0.02em;
        }

        .acv-slot-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.06);
          flex-shrink: 0;
        }

        .acv-slot-content {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        /* Estado libre */
        .acv-slot-free {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border-radius: 10px;
          background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.14);
          color: rgba(74,222,128,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          min-width: 0;
        }

        /* Estado ocupado */
        .acv-slot-busy {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.15);
          min-width: 0;
        }

        .acv-busy-icon {
          font-size: 14px;
          flex-shrink: 0;
          color: rgba(248,113,113,0.55);
          line-height: 1;
        }

        .acv-busy-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }

        .acv-busy-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(240,253,244,0.8);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }

        .acv-busy-phone {
          font-size: 11px;
          color: rgba(240,253,244,0.35);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
          letter-spacing: 0.02em;
        }

        /* Botón bloquear */
        .acv-btn-block {
          flex-shrink: 0;
          padding: 8px 12px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.15);
          color: rgba(251,191,36,0.7);
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .acv-btn-block:hover {
          background: rgba(251,191,36,0.14);
          border-color: rgba(251,191,36,0.28);
          color: #fbbf24;
        }

        /* Botón liberar */
        .acv-btn-release {
          flex-shrink: 0;
          padding: 8px 12px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(240,253,244,0.35);
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .acv-btn-release:hover:not(:disabled) {
          background: rgba(255,255,255,0.07);
          color: rgba(240,253,244,0.6);
        }
        .acv-btn-release:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>

      {/* ── Modal ── */}
      {blockingHour !== null && (
        <div className="acv-overlay" onClick={() => setBlockingHour(null)}>
          <div className="acv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="acv-modal-accent" />
            <h3 className="acv-modal-title">Registrar reserva</h3>
            <p className="acv-modal-sub">
              <span>{formatHourRange(blockingHour)}</span> · {selectedDate}
            </p>

            <div className="acv-field-group">
              <div>
                <label className="acv-label">Nombre del cliente</label>
                <input
                  className="acv-input"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  autoFocus
                />
              </div>
              <div>
                <label className="acv-label">Teléfono</label>
                <input
                  className="acv-input"
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej: 987654321"
                />
              </div>
            </div>

            <div className="acv-modal-actions">
              <button className="acv-btn-cancel" onClick={() => setBlockingHour(null)}>
                Cancelar
              </button>
              <button
                className="acv-btn-confirm"
                onClick={handleBlock}
                disabled={!isFormValid || loading !== null}
              >
                {loading !== null ? 'Guardando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Nav de fechas ── */}
      <div className="acv-nav">
        <button className="acv-nav-btn" onClick={() => handleDateChange(prev)}>← Anterior</button>
        <span className="acv-date-label">{formatDateDisplay(selectedDate)}</span>
        <button className="acv-nav-btn" onClick={() => handleDateChange(next)}>Siguiente →</button>
      </div>

      {/* ── Leyenda ── */}
      <div className="acv-legend">
        <div className="acv-legend-item">
          <div className="acv-legend-dot acv-dot-free" />
          Libre
        </div>
        <div className="acv-legend-item">
          <div className="acv-legend-dot acv-dot-busy" />
          Ocupado
        </div>
      </div>

      {/* ── Slots ── */}
      <div className="acv-slots">
        {HOURS.map((hour) => {
          const reservation = getReservationForHour(reservations, hour);
          const isFree = !reservation;

          return (
            <div key={hour} className="acv-slot">
              <span className="acv-slot-hour">{formatHourRange(hour)}</span>
              <div className="acv-slot-divider" />
              <div className="acv-slot-content">
                {isFree ? (
                  <>
                    <div className="acv-slot-free">
                      <span style={{ fontSize: 13 }}>✓</span>
                      <span>Libre</span>
                    </div>
                    <button
                      className="acv-btn-block"
                      onClick={() => handleOpenForm(hour)}
                    >
                      Bloquear
                    </button>
                  </>
                ) : (
                  <>
                    <div className="acv-slot-busy">
                      <span className="acv-busy-icon">👤</span>
                      <div className="acv-busy-info">
                        <span className="acv-busy-name">{reservation!.clientName}</span>
                        {reservation!.clientPhone && (
                          <span className="acv-busy-phone">{reservation!.clientPhone}</span>
                        )}
                      </div>
                    </div>
                    <button
                      className="acv-btn-release"
                      onClick={() => handleDelete(reservation!.id)}
                      disabled={loading === reservation!.id}
                    >
                      {loading === reservation!.id ? '...' : 'Liberar'}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}