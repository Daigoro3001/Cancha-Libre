// 'use client';

// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
// import { Reservation } from '@/types';

// interface Props {
//   fieldId: number;
//   grassPhone: string;
//   fieldName: string;
//   grassName: string;
//   selectedDate: string;
//   reservations: Reservation[];
// }

// const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);

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
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
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

// export default function CalendarView({
//   fieldId,
//   grassPhone,
//   fieldName,
//   grassName,
//   selectedDate,
//   reservations,
// }: Props) {
//   const router = useRouter();
//   const params = useParams();
//   const { prev, next } = getAdjacentDates(selectedDate);

//   const handleDateChange = (date: string) => {
//     router.push(`/grass/${params.id}/field/${fieldId}?date=${date}`);
//   };

//   const handleWhatsApp = (hour: number) => {
//     const range = formatHourRange(hour);
//     const message = `Hola! Quiero reservar la ${fieldName} en ${grassName} el ${selectedDate} de ${range}`;
//     window.open(`https://wa.me/${grassPhone}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   return (
//     <div>

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
//       <div className="flex gap-4 mb-4 flex-wrap">
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
//       <div
//         className="rounded-2xl overflow-hidden border"
//         style={{ borderColor: '#E2E8F0' }}
//       >
//         {HOURS.map((hour, index) => {
//           const reservation = getReservationForHour(reservations, hour);
//           const isFree = !reservation;
//           const isBlocked = reservation?.status === 'blocked';
//           const isBusy = reservation?.status === 'reserved';

//           const bgColor = isFree ? '#22C55E' : '#EF4444';
//           const isLast = index === HOURS.length - 1;

//           return (
//             <div
//               key={hour}
//               className="flex items-stretch"
//               style={{
//                 borderBottom: isLast ? 'none' : '0.5px solid #E2E8F0',
//                 minHeight: '56px',
//               }}
//             >
//               {/* Etiqueta de hora */}
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

//               {/* Bloque de estado */}
//               <div className="flex items-center flex-1 px-3 py-2" style={{ backgroundColor: '#FFFFFF' }}>
//                 <button
//                   onClick={() => isFree && handleWhatsApp(hour)}
//                   disabled={!isFree}
//                   className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-white text-sm font-medium text-left"
//                   style={{
//                     backgroundColor: bgColor,
//                     cursor: isFree ? 'pointer' : 'default',
//                     opacity: 1,
//                   }}
//                 >
//                   {isFree && (
//                     <>
//                       <span>✓</span>
//                       <span>Disponible — toca para reservar</span>
//                     </>
//                   )}
//                   {isBusy && (
//   <>
//                       <span>✕</span>
//                       <span>Ocupado</span>
//                   </>
//                   )}
//                   {isBlocked && (
//                     <>
//                       <span>🔒</span>
//                       <span>Bloqueado</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//     </div>
//   );
// }

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
    <>
      <style>{`
        .cv-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .cv-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid rgba(74,222,128,0.18);
          background: rgba(74,222,128,0.07);
          color: rgba(74,222,128,0.75);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          white-space: nowrap;
          letter-spacing: 0.03em;
        }

        .cv-nav-btn:hover {
          background: rgba(74,222,128,0.13);
          border-color: rgba(74,222,128,0.3);
          color: #4ade80;
        }

        .cv-date-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(240,253,244,0.45);
          text-align: center;
          flex: 1;
          text-transform: capitalize;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }

        /* ── Legend ── */
        .cv-legend {
          display: flex;
          gap: 16px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .cv-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(240,253,244,0.5);
          letter-spacing: 0.02em;
        }

        .cv-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cv-legend-dot-free    { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
        .cv-legend-dot-busy    { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.4); }

        /* ── Slots ── */
        .cv-slots {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cv-slot {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 48px;
        }

        .cv-slot-hour {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(240,253,244,0.35);
          width: 88px;
          flex-shrink: 0;
          text-align: right;
          letter-spacing: 0.02em;
        }

        .cv-slot-btn {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: opacity 0.15s, transform 0.12s;
          letter-spacing: 0.01em;
          min-width: 0;
        }

        .cv-slot-btn-free {
          background: rgba(74,222,128,0.13);
          border: 1px solid rgba(74,222,128,0.22);
          color: #86efac;
        }

        .cv-slot-btn-free:hover {
          background: rgba(74,222,128,0.2);
          border-color: rgba(74,222,128,0.35);
          transform: translateX(2px);
        }

        .cv-slot-btn-busy {
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.15);
          color: rgba(248,113,113,0.6);
          cursor: default;
        }

        .cv-slot-btn-blocked {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(240,253,244,0.25);
          cursor: default;
        }

        .cv-slot-icon {
          font-size: 13px;
          flex-shrink: 0;
          line-height: 1;
        }

        .cv-slot-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cv-slot-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.06);
          flex-shrink: 0;
          margin: 0 2px;
        }
      `}</style>

      {/* Nav de fechas */}
      <div className="cv-nav">
        <button className="cv-nav-btn" onClick={() => handleDateChange(prev)}>
          ← Anterior
        </button>
        <span className="cv-date-label">{formatDateDisplay(selectedDate)}</span>
        <button className="cv-nav-btn" onClick={() => handleDateChange(next)}>
          Siguiente →
        </button>
      </div>

      {/* Leyenda */}
      <div className="cv-legend">
        <div className="cv-legend-item">
          <div className="cv-legend-dot cv-legend-dot-free" />
          Libre
        </div>
        <div className="cv-legend-item">
          <div className="cv-legend-dot cv-legend-dot-busy" />
          Ocupado
        </div>
      </div>

      {/* Slots */}
      <div className="cv-slots">
        {HOURS.map((hour) => {
          const reservation = getReservationForHour(reservations, hour);
          const isFree = !reservation;
          const isBlocked = reservation?.status === 'blocked';
          const isBusy = reservation?.status === 'reserved';

          let btnClass = 'cv-slot-btn ';
          if (isFree)      btnClass += 'cv-slot-btn-free';
          else if (isBusy) btnClass += 'cv-slot-btn-busy';
          else             btnClass += 'cv-slot-btn-blocked';

          return (
            <div key={hour} className="cv-slot">
              <span className="cv-slot-hour">{formatHourRange(hour)}</span>
              <div className="cv-slot-divider" />
              <button
                className={btnClass}
                onClick={() => isFree && handleWhatsApp(hour)}
                disabled={!isFree}
              >
                {isFree && (
                  <>
                    <span className="cv-slot-icon">✓</span>
                    <span className="cv-slot-text">Disponible — toca para reservar</span>
                  </>
                )}
                {isBusy && (
                  <>
                    <span className="cv-slot-icon">✕</span>
                    <span className="cv-slot-text">Ocupado</span>
                  </>
                )}
                {isBlocked && (
                  <>
                    <span className="cv-slot-icon">🔒</span>
                    <span className="cv-slot-text">Bloqueado</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}