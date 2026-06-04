// import { fetchGrass } from '@/lib/api';
// import { Grass } from '@/types';
// import Link from 'next/link';

// export default async function AdminPage() {
//   let grassList: Grass[] = [];

//   try {
//     grassList = await fetchGrass();
//   } catch (error) {
//     console.error(error);
//   }

//   return (
//     <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

//       {/* Header */}
//       <header style={{ backgroundColor: '#185FA5' }} className="px-4 py-5">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
//               Panel Admin
//             </span>
//           </div>
//           <h1 className="text-white text-2xl font-semibold">Cancha Libre</h1>
//           <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
//             Gestiona tus canchas y reservas
//           </p>
//         </div>
//       </header>

//       <div className="max-w-2xl mx-auto px-4 py-6">
//         <h2 className="text-lg font-medium mb-4" style={{ color: '#0F172A' }}>
//           Tus grass
//         </h2>

//         {grassList.length === 0 ? (
//           <div className="text-center py-12">
//             <p style={{ color: '#64748B' }}>No hay grass registrados.</p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {grassList.map((grass) => (
//               <Link key={grass.id} href={`/admin/grass/${grass.id}`}>
//                 <div
//                   className="bg-white rounded-2xl p-4 border cursor-pointer"
//                   style={{ borderColor: '#E2E8F0' }}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <h3 className="font-medium text-base" style={{ color: '#0F172A' }}>
//                         {grass.name}
//                       </h3>
//                       <p className="text-sm mt-1" style={{ color: '#64748B' }}>
//                         📍 {grass.address}
//                       </p>
//                       {grass.description && (
//                         <p className="text-sm mt-2" style={{ color: '#94A3B8' }}>
//                           {grass.description}
//                         </p>
//                       )}
//                     </div>
//                     <div
//                       className="ml-3 px-3 py-1 rounded-full text-xs font-medium"
//                       style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
//                     >
//                       Administrar
//                     </div>
//                   </div>
//                   <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '0.5px solid #E2E8F0' }}>
//                     <span className="text-xs" style={{ color: '#94A3B8' }}>📞</span>
//                     <span className="text-xs" style={{ color: '#64748B' }}>{grass.phone}</span>
//                     {grass.fields && grass.fields.length > 0 && (
//                       <span className="ml-auto text-xs font-medium" style={{ color: '#639922' }}>
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

export default async function AdminPage() {
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
          background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
        }

        .cl-hero-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 260px;
          background: radial-gradient(ellipse, rgba(99,130,220,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .cl-field-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.035;
          pointer-events: none;
        }

        .cl-header-inner {
          position: relative;
          max-width: 520px;
          margin: 0 auto;
          padding: 36px 24px 0;
        }

        .cl-admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(251,191,36,0.12);
          border: 1px solid rgba(251,191,36,0.22);
          color: #fbbf24;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .cl-brand {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 32px;
          color: #f0fdf4;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 0 0 6px;
        }

        .cl-tagline {
          font-size: 13px;
          color: rgba(240,253,244,0.4);
          letter-spacing: 0.03em;
        }

        .cl-stats-row {
          display: flex;
          gap: 12px;
          max-width: 520px;
          margin: 24px auto 0;
          padding: 0 24px;
        }

        .cl-stat {
          flex: 1;
          background: rgba(251,191,36,0.06);
          border: 1px solid rgba(251,191,36,0.1);
          border-radius: 12px;
          padding: 12px 14px;
          text-align: center;
        }

        .cl-stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fbbf24;
          line-height: 1;
          display: block;
        }

        .cl-stat-label {
          font-size: 11px;
          color: rgba(240,253,244,0.35);
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
          color: rgba(240,253,244,0.3);
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
          border-color: rgba(251,191,36,0.22);
          background: rgba(255,255,255,0.06);
        }

        .cl-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, transparent 100%);
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
          margin-bottom: 10px;
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

        .cl-admin-chip {
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.18);
          color: #fbbf24;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 20px;
          white-space: nowrap;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .cl-card-address {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: rgba(240,253,244,0.45);
          margin-bottom: 6px;
        }

        .cl-card-desc {
          font-size: 13px;
          color: rgba(240,253,244,0.3);
          line-height: 1.5;
          margin: 0 0 12px;
        }

        .cl-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .cl-phone {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: rgba(240,253,244,0.35);
        }

        .cl-fields-chip {
          background: rgba(74,222,128,0.08);
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 500;
          color: #4ade80;
        }

        .cl-cta-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(251,191,36,0.5);
          margin-top: 12px;
          transition: color 0.15s;
        }
        .cl-card:hover .cl-cta-row { color: #fbbf24; }

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
        {/* Hero */}
        <div className="cl-hero">
          <div className="cl-hero-glow" />

          <svg className="cl-field-lines" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="30" y="20" width="460" height="180" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="260" y1="20" x2="260" y2="200" stroke="#fff" strokeWidth="1.5" />
            <circle cx="260" cy="110" r="40" fill="none" stroke="#fff" strokeWidth="1.5" />
            <circle cx="260" cy="110" r="3" fill="#fff" />
            <rect x="30" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
            <rect x="430" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>

          <div className="cl-header-inner">
            <div className="cl-admin-badge">⚙ Panel Admin</div>
            <h1 className="cl-brand">Cancha Libre</h1>
            <p className="cl-tagline">Gestiona tus canchas y reservas</p>
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
                <span className="cl-stat-label">Gestión</span>
              </div>
            </div>
          )}
        </div>

        <div className="cl-section-label">
          <span className="cl-section-label-text">Tus complejos</span>
          <div className="cl-section-label-line" />
        </div>

        {grassList.length === 0 ? (
          <div className="cl-empty">
            <span className="cl-empty-icon">🏟️</span>
            No hay grass registrados.
          </div>
        ) : (
          <div className="cl-cards">
            {grassList.map((grass) => (
              <Link key={grass.id} href={`/admin/grass/${grass.id}`} className="cl-card">
                <div className="cl-card-accent" />
                <div className="cl-card-body">
                  <div className="cl-card-top">
                    <h3 className="cl-card-name">{grass.name}</h3>
                    <span className="cl-admin-chip">⚙ Admin</span>
                  </div>

                  <div className="cl-card-address">
                    <span>📍</span>
                    <span>{grass.address}</span>
                  </div>

                  {grass.description && (
                    <p className="cl-card-desc">{grass.description}</p>
                  )}

                  <div className="cl-card-footer">
                    <div className="cl-phone">
                      <span>📞</span>
                      <span>{grass.phone}</span>
                    </div>
                    {grass.fields && grass.fields.length > 0 && (
                      <span className="cl-fields-chip">
                        {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  <div className="cl-cta-row">
                    <span>Administrar complejo</span>
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