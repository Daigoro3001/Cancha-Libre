// import { fetchGrassById, fetchReservationsByFieldAndDate } from '@/lib/api';
// import { Reservation } from '@/types';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import CalendarView from '@/components/CalendarView';

// interface Props {
//   params: Promise<{ id: string; fieldId: string }>;
//   searchParams: Promise<{ date?: string }>;
// }

// function getTodayDate(): string {
//   return new Date().toISOString().split('T')[0];
// }

// export default async function FieldPage({ params, searchParams }: Props) {
//   const { id, fieldId } = await params;
//   const { date } = await searchParams;
//   const selectedDate = date || getTodayDate();

//   let grass;
//   let field;
//   let reservations: Reservation[] = [];

//   try {
//     grass = await fetchGrassById(Number(id));
//     field = grass.fields?.find((f: { id: number }) => f.id === Number(fieldId));
//     if (!field) notFound();
//     reservations = await fetchReservationsByFieldAndDate(Number(fieldId), selectedDate);
//   } catch {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

//       {/* Header */}
//       <header style={{ backgroundColor: '#378ADD' }} className="px-4 py-5">
//         <div className="max-w-2xl mx-auto">
//           <Link href={`/grass/${id}`} className="text-white text-sm flex items-center gap-1 mb-3" style={{ opacity: 0.85 }}>
//             ← Volver
//           </Link>
//           <h1 className="text-white text-2xl font-semibold">{field.name}</h1>
//           <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
//             {grass.name} · S/ {field.pricePerHour} por hora
//           </p>
//         </div>
//       </header>

//       <div className="max-w-2xl mx-auto px-4 py-6">

//         {/* Botón WhatsApp */}
//         <a
//           href={`https://wa.me/${grass.phone}?text=${encodeURIComponent(`Hola! Quiero reservar la ${field.name} en ${grass.name} para el ${selectedDate}`)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-medium mb-6"
//           style={{ backgroundColor: '#25D366' }}
//         >
//           Contactar por WhatsApp
//         </a>

//         {/* Calendario */}
//         <CalendarView
//           fieldId={Number(fieldId)}
//           grassPhone={grass.phone}
//           fieldName={field.name}
//           grassName={grass.name}
//           selectedDate={selectedDate}
//           reservations={reservations}
//         />

//       </div>
//     </main>
//   );
// }

import { fetchGrassById, fetchReservationsByFieldAndDate } from '@/lib/api';
import { Reservation } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalendarView from '@/components/CalendarView';

interface Props {
  params: Promise<{ id: string; fieldId: string }>;
  searchParams: Promise<{ date?: string }>;
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export default async function FieldPage({ params, searchParams }: Props) {
  const { id, fieldId } = await params;
  const { date } = await searchParams;
  const selectedDate = date || getTodayDate();

  let grass;
  let field;
  let reservations: Reservation[] = [];

  try {
    grass = await fetchGrassById(Number(id));
    field = grass.fields?.find((f: { id: number }) => f.id === Number(fieldId));
    if (!field) notFound();
    reservations = await fetchReservationsByFieldAndDate(Number(fieldId), selectedDate);
  } catch {
    notFound();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');

        .cl-root {
          font-family: 'DM Sans', sans-serif;
          background: #0A0F0D;
          min-height: 100vh;
          width: 100%;
        }

        /* ── Hero ── */
        .cl-hero {
          position: relative;
          overflow: hidden;
          padding-bottom: 28px;
          background: linear-gradient(170deg, #0d1f14 0%, #0A0F0D 60%);
        }

        .cl-hero-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 240px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.11) 0%, transparent 70%);
          pointer-events: none;
        }

        .cl-field-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.04;
          pointer-events: none;
        }

        .cl-header-inner {
          position: relative;
          max-width: 560px;
          margin: 0 auto;
          padding: 28px 24px 0;
        }

        .cl-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(74,222,128,0.7);
          text-decoration: none;
          margin-bottom: 18px;
          transition: color 0.15s;
          letter-spacing: 0.03em;
        }
        .cl-back:hover { color: #4ade80; }

        .cl-field-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 34px;
          color: #f0fdf4;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 8px;
        }

        .cl-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cl-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: rgba(240,253,244,0.5);
        }

        .cl-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(240,253,244,0.2);
        }

        .cl-price-inline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #4ade80;
          letter-spacing: 0.02em;
        }

        /* ── WhatsApp button ── */
        .cl-wa-wrap {
          max-width: 560px;
          margin: 20px auto 0;
          padding: 0 24px;
        }

        .cl-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 20px;
          border-radius: 14px;
          background: rgba(37,211,102,0.12);
          border: 1px solid rgba(37,211,102,0.25);
          color: #4ade80;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.02em;
          box-sizing: border-box;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }

        .cl-wa-btn:hover {
          background: rgba(37,211,102,0.2);
          border-color: rgba(37,211,102,0.4);
          color: #86efac;
        }

        .cl-wa-icon {
          font-size: 16px;
          line-height: 1;
        }

        /* ── Section divider ── */
        .cl-section-label {
          max-width: 560px;
          margin: 32px auto 0;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cl-section-label-text {
          font-size: 11px;
          font-weight: 500;
          color: rgba(240,253,244,0.35);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .cl-section-label-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        /* ── Calendar wrapper ── */
        .cl-calendar-wrap {
          max-width: 560px;
          margin: 16px auto 48px;
          padding: 0 24px;
        }

        .cl-calendar-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
        }

        .cl-calendar-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 50%, transparent 100%);
        }

        .cl-calendar-inner {
          padding: 20px;
        }

        /* ── Date badge ── */
        .cl-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.14);
          border-radius: 10px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(240,253,244,0.55);
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }

        .cl-date-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          opacity: 0.7;
        }
      `}</style>

      <div className="cl-root">
        {/* Hero */}
        <div className="cl-hero">
          <div className="cl-hero-glow" />

          <svg className="cl-field-lines" viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="30" y="15" width="500" height="170" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="280" y1="15" x2="280" y2="185" stroke="#fff" strokeWidth="1.5" />
            <circle cx="280" cy="100" r="38" fill="none" stroke="#fff" strokeWidth="1.5" />
            <circle cx="280" cy="100" r="3" fill="#fff" />
            <rect x="30" y="62" width="56" height="76" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
            <rect x="474" y="62" width="56" height="76" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>

          <div className="cl-header-inner">
            <Link href={`/grass/${id}`} className="cl-back">
              ← Volver
            </Link>
            <h1 className="cl-field-name">{field.name}</h1>
            <div className="cl-meta-row">
              <div className="cl-meta-item">
                <span>⚽</span>
                <span>{grass.name}</span>
              </div>
              <div className="cl-meta-dot" />
              <span className="cl-price-inline">S/ {field.pricePerHour}</span>
              <div className="cl-meta-item">
                <span style={{ fontSize: '11px' }}>por hora</span>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="cl-wa-wrap">
            <a
              href={`https://wa.me/${grass.phone}?text=${encodeURIComponent(`Hola! Quiero reservar la ${field.name} en ${grass.name} para el ${selectedDate}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cl-wa-btn"
            >
              <span className="cl-wa-icon">💬</span>
              Contactar por WhatsApp
            </a>
          </div>
        </div>

        {/* Calendario */}
        <div className="cl-section-label">
          <span className="cl-section-label-text">Disponibilidad</span>
          <div className="cl-section-label-line" />
        </div>

        <div className="cl-calendar-wrap">
          <div className="cl-calendar-card">
            <div className="cl-calendar-card-accent" />
            <div className="cl-calendar-inner">
              <div className="cl-date-badge">
                <div className="cl-date-dot" />
                {selectedDate}
              </div>
              <CalendarView
                fieldId={Number(fieldId)}
                grassPhone={grass.phone}
                fieldName={field.name}
                grassName={grass.name}
                selectedDate={selectedDate}
                reservations={reservations}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}