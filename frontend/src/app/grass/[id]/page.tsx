// import { fetchGrassById, fetchFieldsByGrass } from '@/lib/api';
// import { Field } from '@/types';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function GrassPage({ params }: Props) {
//   const { id } = await params;

//   let grass;
//   let fields: Field[] = [];

//   try {
//     grass = await fetchGrassById(Number(id));
//     fields = await fetchFieldsByGrass(Number(id));
//   } catch {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

//       {/* Header */}
//       <header style={{ backgroundColor: '#378ADD' }} className="px-4 py-5">
//         <div className="max-w-2xl mx-auto">
//           <Link href="/" className="text-white text-sm flex items-center gap-1 mb-3" style={{ opacity: 0.85 }}>
//             ← Volver
//           </Link>
//           <h1 className="text-white text-2xl font-semibold">{grass.name}</h1>
//           <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
//             📍 {grass.address}
//           </p>
//         </div>
//       </header>

//       <div className="max-w-2xl mx-auto px-4 py-6">

//         {/* Info del grass */}
//         {grass.description && (
//           <div
//             className="bg-white rounded-2xl p-4 mb-6 border"
//             style={{ borderColor: '#E2E8F0' }}
//           >
//             <p className="text-sm" style={{ color: '#64748B' }}>{grass.description}</p>
//             <p className="text-sm mt-2" style={{ color: '#64748B' }}>📞 {grass.phone}</p>
//           </div>
//         )}

//         {/* Lista de canchas */}
//         <h2 className="text-lg font-medium mb-4" style={{ color: '#0F172A' }}>
//           Canchas disponibles
//         </h2>

//         {fields.length === 0 ? (
//           <div className="text-center py-12">
//             <p style={{ color: '#64748B' }}>No hay canchas registradas.</p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {fields.map((field) => (
//               <Link key={field.id} href={`/grass/${id}/field/${field.id}`}>
//                 <div
//                   className="bg-white rounded-2xl p-4 border cursor-pointer"
//                   style={{ borderColor: '#E2E8F0' }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-base" style={{ color: '#0F172A' }}>
//                         {field.name}
//                       </h3>
//                       {field.description && (
//                         <p className="text-sm mt-1" style={{ color: '#64748B' }}>
//                           {field.description}
//                         </p>
//                       )}
//                     </div>
//                     <div className="text-right ml-4">
//                       <p className="font-semibold text-base" style={{ color: '#378ADD' }}>
//                         S/ {field.pricePerHour}
//                       </p>
//                       <p className="text-xs" style={{ color: '#94A3B8' }}>por hora</p>
//                     </div>
//                   </div>

//                   <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '0.5px solid #E2E8F0' }}>
//                     <span
//                       className="text-xs font-medium px-3 py-1 rounded-full"
//                       style={{
//                         backgroundColor: field.isActive ? '#DCFCE7' : '#FEE2E2',
//                         color: field.isActive ? '#15803D' : '#DC2626',
//                       }}
//                     >
//                       {field.isActive ? 'Activa' : 'Inactiva'}
//                     </span>
//                     <span
//                       className="text-xs font-medium px-3 py-1 rounded-full"
//                       style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
//                     >
//                       Ver disponibilidad →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import { fetchGrassById, fetchFieldsByGrass } from '@/lib/api';
import { Field } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GrassPage({ params }: Props) {
  const { id } = await params;

  let grass;
  let fields: Field[] = [];

  try {
    grass = await fetchGrassById(Number(id));
    fields = await fetchFieldsByGrass(Number(id));
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

        .cl-hero {
          position: relative;
          overflow: hidden;
          padding-bottom: 32px;
          background: linear-gradient(170deg, #0d1f14 0%, #0A0F0D 60%);
        }

        .cl-hero-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 260px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.12) 0%, transparent 70%);
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
          margin-bottom: 20px;
          transition: color 0.15s;
          letter-spacing: 0.03em;
        }
        .cl-back:hover { color: #4ade80; }

        .cl-grass-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 36px;
          color: #f0fdf4;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 10px;
        }

        .cl-address-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(240,253,244,0.5);
        }

        .cl-info-card {
          position: relative;
          max-width: 560px;
          margin: 24px auto 0;
          padding: 0 24px;
        }

        .cl-info-card-inner {
          background: rgba(74,222,128,0.06);
          border: 1px solid rgba(74,222,128,0.14);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cl-info-desc {
          font-size: 13px;
          color: rgba(240,253,244,0.55);
          line-height: 1.6;
          margin: 0;
        }

        .cl-info-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(240,253,244,0.45);
          font-weight: 500;
        }

        .cl-section-label {
          max-width: 560px;
          margin: 32px auto 16px;
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

        .cl-cards {
          max-width: 560px;
          margin: 0 auto;
          padding: 0 24px 48px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cl-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          display: block;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .cl-card:hover {
          transform: translateY(-2px);
          border-color: rgba(74,222,128,0.25);
          background: rgba(255,255,255,0.06);
        }

        .cl-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cl-card:hover .cl-card-accent { opacity: 1; }

        .cl-card-body {
          padding: 18px 20px 16px;
        }

        .cl-card-main {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .cl-field-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #f0fdf4;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          line-height: 1.1;
          margin: 0 0 4px;
        }

        .cl-field-desc {
          font-size: 13px;
          color: rgba(240,253,244,0.4);
          margin: 0;
          line-height: 1.5;
        }

        .cl-price-block {
          text-align: right;
          flex-shrink: 0;
        }

        .cl-price {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: #4ade80;
          line-height: 1;
          display: block;
        }

        .cl-price-label {
          font-size: 11px;
          color: rgba(240,253,244,0.35);
          letter-spacing: 0.05em;
          display: block;
          margin-top: 2px;
        }

        .cl-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .cl-status-active {
          background: rgba(74,222,128,0.12);
          border: 1px solid rgba(74,222,128,0.2);
          color: #4ade80;
          font-size: 11px;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .cl-status-inactive {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #f87171;
          font-size: 11px;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .cl-cta-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(74,222,128,0.55);
          transition: color 0.15s;
        }
        .cl-card:hover .cl-cta-row { color: #4ade80; }

        .cl-empty {
          text-align: center;
          padding: 80px 24px;
          color: rgba(240,253,244,0.3);
          font-size: 14px;
        }

        .cl-empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="cl-root">
        {/* Hero / Header */}
        <div className="cl-hero">
          <div className="cl-hero-glow" />

          <svg className="cl-field-lines" viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="30" y="20" width="500" height="180" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="280" y1="20" x2="280" y2="200" stroke="#fff" strokeWidth="1.5" />
            <circle cx="280" cy="110" r="40" fill="none" stroke="#fff" strokeWidth="1.5" />
            <circle cx="280" cy="110" r="3" fill="#fff" />
            <rect x="30" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
            <rect x="470" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>

          <div className="cl-header-inner">
            <Link href="/" className="cl-back">
              ← Volver
            </Link>
            <h1 className="cl-grass-name">{grass.name}</h1>
            <div className="cl-address-row">
              <span>📍</span>
              <span>{grass.address}</span>
            </div>
          </div>

          {(grass.description || grass.phone) && (
            <div className="cl-info-card">
              <div className="cl-info-card-inner">
                {grass.description && (
                  <p className="cl-info-desc">{grass.description}</p>
                )}
                {grass.phone && (
                  <div className="cl-info-phone">
                    <span>📞</span>
                    <span>{grass.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lista de canchas */}
        <div className="cl-section-label">
          <span className="cl-section-label-text">Canchas disponibles</span>
          <div className="cl-section-label-line" />
        </div>

        {fields.length === 0 ? (
          <div className="cl-empty">
            <span className="cl-empty-icon">🏟️</span>
            No hay canchas registradas.
          </div>
        ) : (
          <div className="cl-cards">
            {fields.map((field) => (
              <Link key={field.id} href={`/grass/${id}/field/${field.id}`} className="cl-card">
                <div className="cl-card-accent" />
                <div className="cl-card-body">
                  <div className="cl-card-main">
                    <div>
                      <h3 className="cl-field-name">{field.name}</h3>
                      {field.description && (
                        <p className="cl-field-desc">{field.description}</p>
                      )}
                    </div>
                    <div className="cl-price-block">
                      <span className="cl-price">S/ {field.pricePerHour}</span>
                      <span className="cl-price-label">por hora</span>
                    </div>
                  </div>

                  <div className="cl-card-footer">
                    <span className={field.isActive ? 'cl-status-active' : 'cl-status-inactive'}>
                      {field.isActive ? '● Activa' : '● Inactiva'}
                    </span>
                    <div className="cl-cta-row">
                      <span>Ver disponibilidad</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}