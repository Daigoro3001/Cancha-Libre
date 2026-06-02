// import { fetchGrass } from '@/lib/api';
// import { Grass } from '@/types';
// import Link from 'next/link';

// export default async function HomePage() {
//   let grassList: Grass[] = [];

//   try {
//     grassList = await fetchGrass();
//   } catch (error) {
//     console.error(error);
//   }

//   return (
//     <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

//       {/* Header */}
//       <header style={{ backgroundColor: '#378ADD' }}>
//         <div className="max-w-lg mx-auto px-5 py-6">
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-2xl">⚽</span>
//             <h1 className="text-white text-2xl font-semibold tracking-tight">
//               Cancha Libre
//             </h1>
//           </div>
//           <p className="text-white text-sm mt-1 pl-9" style={{ opacity: 0.85 }}>
//             Encuentra y reserva tu cancha favorita
//           </p>
//         </div>
//       </header>

//       {/* Contenido */}
//       <div className="max-w-lg mx-auto px-5 py-6">

//         <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
//           Canchas disponibles
//         </p>

//         {grassList.length === 0 ? (
//           <div className="text-center py-16">
//             <p className="text-4xl mb-3">🏟️</p>
//             <p className="text-sm" style={{ color: '#94A3B8' }}>No hay canchas registradas aún.</p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {grassList.map((grass) => (
//               <Link key={grass.id} href={`/grass/${grass.id}`}>
//                 <div
//                   className="bg-white rounded-2xl p-5 cursor-pointer transition-all"
//                   style={{
//                     boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
//                   }}
//                 >
//                   {/* Nombre y badge */}
//                   <div className="flex items-start justify-between gap-3 mb-3">
//                     <h3 className="font-semibold text-base leading-tight" style={{ color: '#0F172A' }}>
//                       {grass.name}
//                     </h3>
//                     <span
//                       className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full"
//                       style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
//                     >
//                       Ver canchas →
//                     </span>
//                   </div>

//                   {/* Dirección */}
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="text-sm">📍</span>
//                     <p className="text-sm" style={{ color: '#64748B' }}>{grass.address}</p>
//                   </div>

//                   {/* Descripción */}
//                   {grass.description && (
//                     <p className="text-sm mb-3 leading-relaxed" style={{ color: '#94A3B8' }}>
//                       {grass.description}
//                     </p>
//                   )}

//                   {/* Footer */}
//                   <div
//                     className="flex items-center justify-between pt-3"
//                     style={{ borderTop: '1px solid #F1F5F9' }}
//                   >
//                     <div className="flex items-center gap-1.5">
//                       <span className="text-sm">📞</span>
//                       <span className="text-sm" style={{ color: '#64748B' }}>{grass.phone}</span>
//                     </div>
//                     {grass.fields && grass.fields.length > 0 && (
//                       <span className="text-xs font-semibold" style={{ color: '#22C55E' }}>
//                         {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
//                       </span>
//                     )}
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

import { fetchGrass } from '@/lib/api';
import { Grass } from '@/types';
import Link from 'next/link';

export default async function HomePage() {
  let grassList: Grass[] = [];

  try {
    grassList = await fetchGrass();
  } catch (error) {
    console.error(error);
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
          max-width: 520px;
          margin: 0 auto;
          padding: 36px 24px 0;
        }

        .cl-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }

        .cl-logo-icon {
          width: 38px;
          height: 38px;
          background: #4ade80;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 1;
        }

        .cl-brand {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 28px;
          color: #f0fdf4;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .cl-tagline {
          font-size: 13px;
          color: #4ade80;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 6px;
          padding-left: 48px;
          opacity: 0.8;
        }

        .cl-search-wrap {
          position: relative;
          max-width: 520px;
          margin: 28px auto 0;
          padding: 0 24px;
        }

        .cl-search-icon {
          position: absolute;
          left: 38px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: rgba(74,222,128,0.5);
          pointer-events: none;
        }

        .cl-search {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(74,222,128,0.15);
          border-radius: 14px;
          padding: 13px 16px 13px 44px;
          font-size: 14px;
          color: #f0fdf4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s;
        }

        .cl-search::placeholder { color: rgba(240,253,244,0.35); }
        .cl-search:focus { border-color: rgba(74,222,128,0.4); }

        .cl-stats-row {
          display: flex;
          gap: 12px;
          max-width: 520px;
          margin: 20px auto 0;
          padding: 0 24px;
        }

        .cl-stat {
          flex: 1;
          background: rgba(74,222,128,0.07);
          border: 1px solid rgba(74,222,128,0.12);
          border-radius: 12px;
          padding: 12px 14px;
          text-align: center;
        }

        .cl-stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #4ade80;
          line-height: 1;
          display: block;
        }

        .cl-stat-label {
          font-size: 11px;
          color: rgba(240,253,244,0.45);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 500;
          display: block;
          margin-top: 3px;
        }

        .cl-section-label {
          max-width: 520px;
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
          max-width: 520px;
          margin: 0 auto;
          padding: 0 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cl-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          text-decoration: none;
          display: block;
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

        .cl-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .cl-card-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #f0fdf4;
          letter-spacing: 0.01em;
          line-height: 1.1;
          text-transform: uppercase;
          margin: 0;
        }

        .cl-badge {
          background: rgba(74,222,128,0.12);
          border: 1px solid rgba(74,222,128,0.2);
          color: #4ade80;
          font-size: 11px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 20px;
          white-space: nowrap;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .cl-card-desc {
          font-size: 13px;
          color: rgba(240,253,244,0.45);
          line-height: 1.55;
          margin-bottom: 14px;
          margin-top: 0;
        }

        .cl-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .cl-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(240,253,244,0.5);
        }

        .cl-meta-icon { font-size: 15px; }

        .cl-fields-chip {
          background: rgba(74,222,128,0.08);
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 500;
          color: #4ade80;
        }

        .cl-cta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(74,222,128,0.6);
          margin-top: 14px;
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

          {/* Campo de fútbol decorativo */}
          <svg className="cl-field-lines" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="30" y="20" width="460" height="180" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="260" y1="20" x2="260" y2="200" stroke="#fff" strokeWidth="1.5" />
            <circle cx="260" cy="110" r="40" fill="none" stroke="#fff" strokeWidth="1.5" />
            <circle cx="260" cy="110" r="3" fill="#fff" />
            <rect x="30" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
            <rect x="430" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>

          <div className="cl-header-inner">
            <div className="cl-logo-row">
              <div className="cl-logo-icon">⚽</div>
              <span className="cl-brand">Cancha Libre</span>
            </div>
            <p className="cl-tagline">Encuentra y reserva tu cancha favorita</p>
          </div>

          <div className="cl-search-wrap">
            <span className="cl-search-icon">🔍</span>
            <input
              className="cl-search"
              type="text"
              placeholder="Buscar por nombre o dirección..."
            />
          </div>

          {grassList.length > 0 && (
            <div className="cl-stats-row">
              <div className="cl-stat">
                <span className="cl-stat-num">{grassList.length}</span>
                <span className="cl-stat-label">Complejos</span>
              </div>
              <div className="cl-stat">
                <span className="cl-stat-num">
                  {grassList.reduce((acc, g) => acc + (g.fields?.length ?? 0), 0)}
                </span>
                <span className="cl-stat-label">Canchas</span>
              </div>
              <div className="cl-stat">
                <span className="cl-stat-num">24h</span>
                <span className="cl-stat-label">Reservas</span>
              </div>
            </div>
          )}
        </div>

        {/* Lista */}
        <div className="cl-section-label">
          <span className="cl-section-label-text">Canchas disponibles</span>
          <div className="cl-section-label-line" />
        </div>

        {grassList.length === 0 ? (
          <div className="cl-empty">
            <span className="cl-empty-icon">🏟️</span>
            No hay canchas registradas aún.
          </div>
        ) : (
          <div className="cl-cards">
            {grassList.map((grass) => (
              <Link key={grass.id} href={`/grass/${grass.id}`} className="cl-card">
                <div className="cl-card-accent" />
                <div className="cl-card-body">
                  <div className="cl-card-top">
                    <h3 className="cl-card-name">{grass.name}</h3>
                    <span className="cl-badge">Ver canchas →</span>
                  </div>

                  {grass.description && (
                    <p className="cl-card-desc">{grass.description}</p>
                  )}

                  <div className="cl-card-footer">
                    <div className="cl-meta">
                      <span className="cl-meta-icon">📍</span>
                      {grass.address}
                    </div>
                    {grass.fields && grass.fields.length > 0 && (
                      <span className="cl-fields-chip">
                        {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  <div className="cl-cta-row">
                    <span>Ver disponibilidad</span>
                    <span>→</span>
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