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
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');

//         .cl-root {
//           font-family: 'DM Sans', sans-serif;
//           background: #0A0F0D;
//           min-height: 100vh;
//           width: 100%;
//         }

//         .cl-hero {
//           position: relative;
//           overflow: hidden;
//           padding-bottom: 32px;
//           background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
//         }

//         .cl-hero-glow {
//           position: absolute;
//           top: -60px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 480px;
//           height: 260px;
//           background: radial-gradient(ellipse, rgba(99,130,220,0.1) 0%, transparent 70%);
//           pointer-events: none;
//         }

//         .cl-field-lines {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           opacity: 0.035;
//           pointer-events: none;
//         }

//         .cl-header-inner {
//           position: relative;
//           max-width: 520px;
//           margin: 0 auto;
//           padding: 36px 24px 0;
//         }

//         .cl-admin-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           background: rgba(251,191,36,0.12);
//           border: 1px solid rgba(251,191,36,0.22);
//           color: #fbbf24;
//           font-size: 11px;
//           font-weight: 500;
//           padding: 4px 10px;
//           border-radius: 20px;
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//           margin-bottom: 12px;
//         }

//         .cl-brand {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 900;
//           font-size: 32px;
//           color: #f0fdf4;
//           letter-spacing: 0.04em;
//           text-transform: uppercase;
//           margin: 0 0 6px;
//         }

//         .cl-tagline {
//           font-size: 13px;
//           color: rgba(240,253,244,0.4);
//           letter-spacing: 0.03em;
//         }

//         .cl-stats-row {
//           display: flex;
//           gap: 12px;
//           max-width: 520px;
//           margin: 24px auto 0;
//           padding: 0 24px;
//         }

//         .cl-stat {
//           flex: 1;
//           background: rgba(251,191,36,0.06);
//           border: 1px solid rgba(251,191,36,0.1);
//           border-radius: 12px;
//           padding: 12px 14px;
//           text-align: center;
//         }

//         .cl-stat-num {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 26px;
//           font-weight: 800;
//           color: #fbbf24;
//           line-height: 1;
//           display: block;
//         }

//         .cl-stat-label {
//           font-size: 11px;
//           color: rgba(240,253,244,0.35);
//           text-transform: uppercase;
//           letter-spacing: 0.07em;
//           font-weight: 500;
//           display: block;
//           margin-top: 3px;
//         }

//         .cl-section-label {
//           max-width: 520px;
//           margin: 32px auto 16px;
//           padding: 0 24px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .cl-section-label-text {
//           font-size: 11px;
//           font-weight: 500;
//           color: rgba(240,253,244,0.3);
//           text-transform: uppercase;
//           letter-spacing: 0.12em;
//           white-space: nowrap;
//         }

//         .cl-section-label-line {
//           flex: 1;
//           height: 1px;
//           background: rgba(255,255,255,0.06);
//         }

//         .cl-cards {
//           max-width: 520px;
//           margin: 0 auto;
//           padding: 0 24px 48px;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//         }

//         .cl-card {
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 18px;
//           overflow: hidden;
//           text-decoration: none;
//           display: block;
//           transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
//         }

//         .cl-card:hover {
//           transform: translateY(-2px);
//           border-color: rgba(251,191,36,0.22);
//           background: rgba(255,255,255,0.06);
//         }

//         .cl-card-accent {
//           height: 3px;
//           background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, transparent 100%);
//           opacity: 0;
//           transition: opacity 0.2s;
//         }
//         .cl-card:hover .cl-card-accent { opacity: 1; }

//         .cl-card-body {
//           padding: 18px 20px 16px;
//         }

//         .cl-card-top {
//           display: flex;
//           align-items: flex-start;
//           justify-content: space-between;
//           gap: 12px;
//           margin-bottom: 10px;
//         }

//         .cl-card-name {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           font-size: 22px;
//           color: #f0fdf4;
//           letter-spacing: 0.01em;
//           line-height: 1.1;
//           text-transform: uppercase;
//           margin: 0;
//         }

//         .cl-admin-chip {
//           background: rgba(251,191,36,0.1);
//           border: 1px solid rgba(251,191,36,0.18);
//           color: #fbbf24;
//           font-size: 11px;
//           font-weight: 500;
//           padding: 4px 10px;
//           border-radius: 20px;
//           white-space: nowrap;
//           letter-spacing: 0.04em;
//           flex-shrink: 0;
//         }

//         .cl-card-address {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 13px;
//           color: rgba(240,253,244,0.45);
//           margin-bottom: 6px;
//         }

//         .cl-card-desc {
//           font-size: 13px;
//           color: rgba(240,253,244,0.3);
//           line-height: 1.5;
//           margin: 0 0 12px;
//         }

//         .cl-card-footer {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding-top: 12px;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }

//         .cl-phone {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 12px;
//           color: rgba(240,253,244,0.35);
//         }

//         .cl-fields-chip {
//           background: rgba(74,222,128,0.08);
//           border-radius: 8px;
//           padding: 4px 10px;
//           font-size: 12px;
//           font-weight: 500;
//           color: #4ade80;
//         }

//         .cl-cta-row {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(251,191,36,0.5);
//           margin-top: 12px;
//           transition: color 0.15s;
//         }
//         .cl-card:hover .cl-cta-row { color: #fbbf24; }

//         .cl-empty {
//           text-align: center;
//           padding: 80px 24px;
//           color: rgba(240,253,244,0.3);
//           font-size: 14px;
//         }

//         .cl-empty-icon {
//           font-size: 48px;
//           display: block;
//           margin-bottom: 12px;
//         }
//       `}</style>

//       <div className="cl-root">
//         {/* Hero */}
//         <div className="cl-hero">
//           <div className="cl-hero-glow" />

//           <svg className="cl-field-lines" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//             <rect x="30" y="20" width="460" height="180" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
//             <line x1="260" y1="20" x2="260" y2="200" stroke="#fff" strokeWidth="1.5" />
//             <circle cx="260" cy="110" r="40" fill="none" stroke="#fff" strokeWidth="1.5" />
//             <circle cx="260" cy="110" r="3" fill="#fff" />
//             <rect x="30" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
//             <rect x="430" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
//           </svg>

//           <div className="cl-header-inner">
//             <div className="cl-admin-badge">⚙ Panel Admin</div>
//             <h1 className="cl-brand">Cancha Libre</h1>
//             <p className="cl-tagline">Gestiona tus canchas y reservas</p>
//           </div>

//           {grassList.length > 0 && (
//             <div className="cl-stats-row">
//               <div className="cl-stat">
//                 <span className="cl-stat-num">{grassList.length}</span>
//                 <span className="cl-stat-label">Complejos</span>
//               </div>
//               <div className="cl-stat">
//                 <span className="cl-stat-num">
//                   {grassList.reduce((acc, g) => acc + (g.fields?.length ?? 0), 0)}
//                 </span>
//                 <span className="cl-stat-label">Canchas</span>
//               </div>
//               <div className="cl-stat">
//                 <span className="cl-stat-num">24h</span>
//                 <span className="cl-stat-label">Gestión</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="cl-section-label">
//           <span className="cl-section-label-text">Tus complejos</span>
//           <div className="cl-section-label-line" />
//         </div>

//         {grassList.length === 0 ? (
//           <div className="cl-empty">
//             <span className="cl-empty-icon">🏟️</span>
//             No hay grass registrados.
//           </div>
//         ) : (
//           <div className="cl-cards">
//             {grassList.map((grass) => (
//               <Link key={grass.id} href={`/admin/grass/${grass.id}`} className="cl-card">
//                 <div className="cl-card-accent" />
//                 <div className="cl-card-body">
//                   <div className="cl-card-top">
//                     <h3 className="cl-card-name">{grass.name}</h3>
//                     <span className="cl-admin-chip">⚙ Admin</span>
//                   </div>

//                   <div className="cl-card-address">
//                     <span>📍</span>
//                     <span>{grass.address}</span>
//                   </div>

//                   {grass.description && (
//                     <p className="cl-card-desc">{grass.description}</p>
//                   )}

//                   <div className="cl-card-footer">
//                     <div className="cl-phone">
//                       <span>📞</span>
//                       <span>{grass.phone}</span>
//                     </div>
//                     {grass.fields && grass.fields.length > 0 && (
//                       <span className="cl-fields-chip">
//                         {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
//                       </span>
//                     )}
//                   </div>

//                   <div className="cl-cta-row">
//                     <span>Administrar complejo</span>
//                     <span>→</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { getToken, getUser, clearAuth } from '@/lib/auth';
// import { fetchMyGrass } from '@/lib/api';
// import { Grass } from '@/types';

// export default function AdminPage() {
//   const router = useRouter();
//   const [grassList, setGrassList] = useState<Grass[]>([]);
//   const [userName, setUserName] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = getToken();
//     const user = getUser();

//     if (!token || !user) {
//       router.replace('/admin/login');
//       return;
//     }

//     setUserName(user.name);

//     fetchMyGrass(token)
//       .then(setGrassList)
//       .catch(() => router.replace('/admin/login'))
//       .finally(() => setLoading(false));
//   }, [router]);

//   const handleLogout = () => {
//     clearAuth();
//     router.replace('/admin/login');
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');
//           .cl-loading {
//             font-family: 'DM Sans', sans-serif;
//             background: #0A0F0D;
//             min-height: 100vh;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
//           .cl-loading-dot {
//             display: flex;
//             gap: 6px;
//           }
//           .cl-loading-dot span {
//             width: 7px;
//             height: 7px;
//             border-radius: 50%;
//             background: rgba(251,191,36,0.4);
//             animation: cl-pulse 1.2s ease-in-out infinite;
//           }
//           .cl-loading-dot span:nth-child(2) { animation-delay: 0.2s; }
//           .cl-loading-dot span:nth-child(3) { animation-delay: 0.4s; }
//           @keyframes cl-pulse {
//             0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
//             40% { opacity: 1; transform: scale(1); }
//           }
//         `}</style>
//         <div className="cl-loading">
//           <div className="cl-loading-dot">
//             <span /><span /><span />
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');

//         .cl-root {
//           font-family: 'DM Sans', sans-serif;
//           background: #0A0F0D;
//           min-height: 100vh;
//           width: 100%;
//         }

//         .cl-hero {
//           position: relative;
//           overflow: hidden;
//           padding-bottom: 32px;
//           background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
//         }

//         .cl-hero-glow {
//           position: absolute;
//           top: -60px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 480px;
//           height: 260px;
//           background: radial-gradient(ellipse, rgba(99,130,220,0.1) 0%, transparent 70%);
//           pointer-events: none;
//         }

//         .cl-field-lines {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           opacity: 0.035;
//           pointer-events: none;
//         }

//         .cl-header-inner {
//           position: relative;
//           max-width: 520px;
//           margin: 0 auto;
//           padding: 32px 24px 0;
//         }

//         .cl-header-top {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 16px;
//         }

//         .cl-admin-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           background: rgba(251,191,36,0.1);
//           border: 1px solid rgba(251,191,36,0.2);
//           color: #fbbf24;
//           font-size: 11px;
//           font-weight: 500;
//           padding: 4px 10px;
//           border-radius: 20px;
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//         }

//         .cl-logout-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.08);
//           color: rgba(240,253,244,0.4);
//           font-size: 12px;
//           font-weight: 500;
//           font-family: 'DM Sans', sans-serif;
//           padding: 6px 12px;
//           border-radius: 20px;
//           cursor: pointer;
//           transition: background 0.15s, color 0.15s, border-color 0.15s;
//           letter-spacing: 0.02em;
//         }
//         .cl-logout-btn:hover {
//           background: rgba(255,255,255,0.08);
//           color: rgba(240,253,244,0.65);
//           border-color: rgba(255,255,255,0.13);
//         }

//         .cl-greeting {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 900;
//           font-size: 32px;
//           color: #f0fdf4;
//           letter-spacing: 0.02em;
//           text-transform: uppercase;
//           line-height: 1;
//           margin: 0 0 6px;
//         }

//         .cl-greeting em {
//           color: #fbbf24;
//           font-style: normal;
//         }

//         .cl-tagline {
//           font-size: 13px;
//           color: rgba(240,253,244,0.4);
//           letter-spacing: 0.03em;
//         }

//         .cl-stats-row {
//           display: flex;
//           gap: 12px;
//           max-width: 520px;
//           margin: 24px auto 0;
//           padding: 0 24px;
//         }

//         .cl-stat {
//           flex: 1;
//           background: rgba(251,191,36,0.06);
//           border: 1px solid rgba(251,191,36,0.1);
//           border-radius: 12px;
//           padding: 12px 14px;
//           text-align: center;
//         }

//         .cl-stat-num {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 26px;
//           font-weight: 800;
//           color: #fbbf24;
//           line-height: 1;
//           display: block;
//         }

//         .cl-stat-label {
//           font-size: 11px;
//           color: rgba(240,253,244,0.35);
//           text-transform: uppercase;
//           letter-spacing: 0.07em;
//           font-weight: 500;
//           display: block;
//           margin-top: 3px;
//         }

//         .cl-toolbar {
//           max-width: 520px;
//           margin: 32px auto 16px;
//           padding: 0 24px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .cl-section-label-text {
//           font-size: 11px;
//           font-weight: 500;
//           color: rgba(240,253,244,0.3);
//           text-transform: uppercase;
//           letter-spacing: 0.12em;
//           white-space: nowrap;
//           flex: 1;
//         }

//         .cl-section-label-line {
//           flex: 1;
//           height: 1px;
//           background: rgba(255,255,255,0.06);
//         }

//         .cl-add-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           background: rgba(251,191,36,0.1);
//           border: 1px solid rgba(251,191,36,0.2);
//           color: #fbbf24;
//           font-size: 12px;
//           font-weight: 500;
//           font-family: 'DM Sans', sans-serif;
//           padding: 7px 13px;
//           border-radius: 20px;
//           text-decoration: none;
//           transition: background 0.15s, border-color 0.15s;
//           white-space: nowrap;
//           letter-spacing: 0.03em;
//         }
//         .cl-add-btn:hover {
//           background: rgba(251,191,36,0.16);
//           border-color: rgba(251,191,36,0.32);
//         }

//         .cl-cards {
//           max-width: 520px;
//           margin: 0 auto;
//           padding: 0 24px 48px;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//         }

//         .cl-card {
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 18px;
//           overflow: hidden;
//           text-decoration: none;
//           display: block;
//           transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
//         }
//         .cl-card:hover {
//           transform: translateY(-2px);
//           border-color: rgba(251,191,36,0.22);
//           background: rgba(255,255,255,0.06);
//         }

//         .cl-card-accent {
//           height: 3px;
//           background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, transparent 100%);
//           opacity: 0;
//           transition: opacity 0.2s;
//         }
//         .cl-card:hover .cl-card-accent { opacity: 1; }

//         .cl-card-body { padding: 18px 20px 16px; }

//         .cl-card-top {
//           display: flex;
//           align-items: flex-start;
//           justify-content: space-between;
//           gap: 12px;
//           margin-bottom: 10px;
//         }

//         .cl-card-name {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           font-size: 22px;
//           color: #f0fdf4;
//           letter-spacing: 0.01em;
//           line-height: 1.1;
//           text-transform: uppercase;
//           margin: 0;
//         }

//         .cl-admin-chip {
//           background: rgba(251,191,36,0.1);
//           border: 1px solid rgba(251,191,36,0.18);
//           color: #fbbf24;
//           font-size: 11px;
//           font-weight: 500;
//           padding: 4px 10px;
//           border-radius: 20px;
//           white-space: nowrap;
//           letter-spacing: 0.04em;
//           flex-shrink: 0;
//         }

//         .cl-card-address {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 13px;
//           color: rgba(240,253,244,0.45);
//           margin-bottom: 6px;
//         }

//         .cl-card-desc {
//           font-size: 13px;
//           color: rgba(240,253,244,0.3);
//           line-height: 1.5;
//           margin: 0 0 12px;
//         }

//         .cl-card-footer {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding-top: 12px;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }

//         .cl-phone {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 12px;
//           color: rgba(240,253,244,0.35);
//         }

//         .cl-fields-chip {
//           background: rgba(74,222,128,0.08);
//           border-radius: 8px;
//           padding: 4px 10px;
//           font-size: 12px;
//           font-weight: 500;
//           color: #4ade80;
//         }

//         .cl-cta-row {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(251,191,36,0.5);
//           margin-top: 12px;
//           transition: color 0.15s;
//         }
//         .cl-card:hover .cl-cta-row { color: #fbbf24; }

//         /* Empty state */
//         .cl-empty {
//           max-width: 520px;
//           margin: 0 auto;
//           padding: 0 24px 48px;
//         }

//         .cl-empty-card {
//           background: rgba(255,255,255,0.03);
//           border: 1px dashed rgba(255,255,255,0.1);
//           border-radius: 20px;
//           padding: 48px 24px;
//           text-align: center;
//         }

//         .cl-empty-icon {
//           font-size: 44px;
//           display: block;
//           margin-bottom: 14px;
//         }

//         .cl-empty-title {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           font-size: 20px;
//           color: rgba(240,253,244,0.6);
//           text-transform: uppercase;
//           letter-spacing: 0.04em;
//           margin: 0 0 6px;
//         }

//         .cl-empty-sub {
//           font-size: 13px;
//           color: rgba(240,253,244,0.3);
//           margin: 0 0 20px;
//         }

//         .cl-empty-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(251,191,36,0.1);
//           border: 1px solid rgba(251,191,36,0.22);
//           color: #fbbf24;
//           font-size: 13px;
//           font-weight: 500;
//           font-family: 'DM Sans', sans-serif;
//           padding: 10px 20px;
//           border-radius: 12px;
//           text-decoration: none;
//           transition: background 0.15s, border-color 0.15s;
//         }
//         .cl-empty-btn:hover {
//           background: rgba(251,191,36,0.16);
//           border-color: rgba(251,191,36,0.35);
//         }
//       `}</style>

//       <div className="cl-root">
//         {/* Hero */}
//         <div className="cl-hero">
//           <div className="cl-hero-glow" />

//           <svg className="cl-field-lines" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//             <rect x="30" y="20" width="460" height="180" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
//             <line x1="260" y1="20" x2="260" y2="200" stroke="#fff" strokeWidth="1.5" />
//             <circle cx="260" cy="110" r="40" fill="none" stroke="#fff" strokeWidth="1.5" />
//             <circle cx="260" cy="110" r="3" fill="#fff" />
//             <rect x="30" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
//             <rect x="430" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
//           </svg>

//           <div className="cl-header-inner">
//             <div className="cl-header-top">
//               <div className="cl-admin-badge">⚙ Panel Admin</div>
//               <button className="cl-logout-btn" onClick={handleLogout}>
//                 Cerrar sesión →
//               </button>
//             </div>
//             <h1 className="cl-greeting">
//               Hola, <em>{userName}</em> 👋
//             </h1>
//             <p className="cl-tagline">Gestiona tus canchas y reservas</p>
//           </div>

//           {grassList.length > 0 && (
//             <div className="cl-stats-row">
//               <div className="cl-stat">
//                 <span className="cl-stat-num">{grassList.length}</span>
//                 <span className="cl-stat-label">Complejos</span>
//               </div>
//               <div className="cl-stat">
//                 <span className="cl-stat-num">
//                   {grassList.reduce((acc, g) => acc + (g.fields?.length ?? 0), 0)}
//                 </span>
//                 <span className="cl-stat-label">Canchas</span>
//               </div>
//               <div className="cl-stat">
//                 <span className="cl-stat-num">24h</span>
//                 <span className="cl-stat-label">Gestión</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Toolbar */}
//         <div className="cl-toolbar">
//           <span className="cl-section-label-text">Tus complejos</span>
//           <div className="cl-section-label-line" />
//           <Link href="/admin/setup" className="cl-add-btn">
//             + Agregar grass
//           </Link>
//         </div>

//         {/* Lista o empty state */}
//         {grassList.length === 0 ? (
//           <div className="cl-empty">
//             <div className="cl-empty-card">
//               <span className="cl-empty-icon">🏟️</span>
//               <p className="cl-empty-title">Sin complejos aún</p>
//               <p className="cl-empty-sub">Crea tu primer grass para empezar a gestionar reservas</p>
//               <Link href="/admin/setup" className="cl-empty-btn">
//                 + Crear mi primer grass
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="cl-cards">
//             {grassList.map((grass) => (
//               <Link key={grass.id} href={`/admin/grass/${grass.id}`} className="cl-card">
//                 <div className="cl-card-accent" />
//                 <div className="cl-card-body">
//                   <div className="cl-card-top">
//                     <h3 className="cl-card-name">{grass.name}</h3>
//                     <span className="cl-admin-chip">⚙ Admin</span>
//                   </div>

//                   <div className="cl-card-address">
//                     <span>📍</span>
//                     <span>{grass.address}</span>
//                   </div>

//                   {grass.description && (
//                     <p className="cl-card-desc">{grass.description}</p>
//                   )}

//                   <div className="cl-card-footer">
//                     <div className="cl-phone">
//                       <span>📞</span>
//                       <span>{grass.phone}</span>
//                     </div>
//                     {grass.fields && grass.fields.length > 0 && (
//                       <span className="cl-fields-chip">
//                         {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
//                       </span>
//                     )}
//                   </div>

//                   <div className="cl-cta-row">
//                     <span>Administrar complejo</span>
//                     <span>→</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, getUser, clearAuth } from '@/lib/auth';
import { fetchMyGrass } from '@/lib/api';
import { Grass } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function AdminPage() {
  const router = useRouter();
  const [grassList, setGrassList] = useState<Grass[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingGrass, setEditingGrass] = useState<Grass | null>(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const loadData = async (token: string) => {
    const data = await fetchMyGrass(token);
    setGrassList(data);
  };

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user) { router.replace('/admin/login'); return; }
    setUserName(user.name);
    loadData(token).catch(() => router.replace('/admin/login')).finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => { clearAuth(); router.replace('/admin/login'); };

  const handleOpenEdit = (grass: Grass) => {
    setEditingGrass(grass);
    setEditName(grass.name);
    setEditAddress(grass.address);
    setEditPhone(grass.phone);
    setEditDescription(grass.description || '');
    setEditError('');
  };

  const handleSaveEdit = async () => {
    if (!editingGrass || !editName.trim() || !editAddress.trim() || !editPhone.trim()) return;
    setEditLoading(true);
    setEditError('');
    const token = getToken();
    if (!token) { router.replace('/admin/login'); return; }
    try {
      const res = await fetch(`${API_URL}/grass/${editingGrass.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: editName.trim(),
          address: editAddress.trim(),
          phone: editPhone.trim(),
          description: editDescription.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setEditError(data.message || 'Error al guardar');
        return;
      }
      setEditingGrass(null);
      await loadData(token);
    } catch {
      setEditError('Error de conexión.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteGrass = async (grassId: number) => {
    const token = getToken();
    if (!token) { router.replace('/admin/login'); return; }
    try {
      await fetch(`${API_URL}/grass/${grassId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await loadData(token);
    } catch { console.error('Error al eliminar grass'); }
  };

  const isEditValid = editName.trim() && editAddress.trim() && editPhone.trim();

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');
          .cl-loading{font-family:'DM Sans',sans-serif;background:#0A0F0D;min-height:100vh;display:flex;align-items:center;justify-content:center;}
          .cl-loading-dot{display:flex;gap:6px;}
          .cl-loading-dot span{width:7px;height:7px;border-radius:50%;background:rgba(251,191,36,0.4);animation:cl-pulse 1.2s ease-in-out infinite;}
          .cl-loading-dot span:nth-child(2){animation-delay:0.2s}
          .cl-loading-dot span:nth-child(3){animation-delay:0.4s}
          @keyframes cl-pulse{0%,80%,100%{opacity:0.3;transform:scale(0.85)}40%{opacity:1;transform:scale(1)}}
        `}</style>
        <div className="cl-loading"><div className="cl-loading-dot"><span /><span /><span /></div></div>
      </>
    );
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

        /* ── Modal ── */
        .cl-overlay {
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

        .cl-modal {
          background: #111a14;
          border: 1px solid rgba(251,191,36,0.18);
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
        }

        .cl-modal-accent {
          height: 3px;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 60%, transparent 100%);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .cl-modal-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #f0fdf4;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0 0 4px;
        }

        .cl-modal-sub {
          font-size: 12px;
          color: rgba(240,253,244,0.35);
          margin: 0 0 20px;
        }

        .cl-modal-sub span { color: #fbbf24; font-weight: 500; }

        .cl-modal-fields {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-bottom: 20px;
        }

        .cl-label {
          font-size: 11px;
          font-weight: 500;
          color: rgba(240,253,244,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 7px;
        }

        .cl-label-required { color: rgba(251,191,36,0.6); margin-left: 3px; }

        .cl-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 11px 14px;
          font-size: 14px;
          color: #f0fdf4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
        }

        .cl-input::placeholder { color: rgba(240,253,244,0.2); }
        .cl-input:focus { border-color: rgba(251,191,36,0.35); background: rgba(255,255,255,0.07); }

        .cl-textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 11px 14px;
          font-size: 14px;
          color: #f0fdf4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          outline: none;
          resize: none;
          line-height: 1.55;
          transition: border-color 0.15s, background 0.15s;
        }

        .cl-textarea::placeholder { color: rgba(240,253,244,0.2); }
        .cl-textarea:focus { border-color: rgba(251,191,36,0.35); background: rgba(255,255,255,0.07); }

        .cl-modal-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.18);
          border-radius: 10px;
          padding: 10px 13px;
          font-size: 13px;
          color: #f87171;
          margin-bottom: 16px;
        }

        .cl-modal-actions { display: flex; gap: 10px; }

        .cl-btn-cancel {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(240,253,244,0.4);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .cl-btn-cancel:hover { background: rgba(255,255,255,0.08); color: rgba(240,253,244,0.65); }

        .cl-btn-confirm {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          background: rgba(251,191,36,0.13);
          border: 1px solid rgba(251,191,36,0.22);
          color: #fbbf24;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, opacity 0.15s;
        }
        .cl-btn-confirm:hover:not(:disabled) { background: rgba(251,191,36,0.2); border-color: rgba(251,191,36,0.38); }
        .cl-btn-confirm:disabled { opacity: 0.35; cursor: not-allowed; }

        /* ── Hero ── */
        .cl-hero {
          position: relative;
          overflow: hidden;
          padding-bottom: 32px;
          background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
        }

        .cl-hero-glow {
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 480px; height: 260px;
          background: radial-gradient(ellipse, rgba(99,130,220,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .cl-field-lines {
          position: absolute;
          inset: 0; width: 100%; height: 100%;
          opacity: 0.035; pointer-events: none;
        }

        .cl-header-inner {
          position: relative;
          max-width: 520px;
          margin: 0 auto;
          padding: 32px 24px 0;
        }

        .cl-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .cl-admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.2);
          color: #fbbf24;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .cl-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(240,253,244,0.4);
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .cl-logout-btn:hover { background: rgba(255,255,255,0.08); color: rgba(240,253,244,0.65); border-color: rgba(255,255,255,0.13); }

        .cl-greeting {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 32px;
          color: #f0fdf4;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 6px;
        }

        .cl-greeting em { color: #fbbf24; font-style: normal; }
        .cl-tagline { font-size: 13px; color: rgba(240,253,244,0.4); letter-spacing: 0.03em; }

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

        /* ── Toolbar ── */
        .cl-toolbar {
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

        .cl-section-label-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }

        .cl-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.2);
          color: #fbbf24;
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 7px 13px;
          border-radius: 20px;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 0.03em;
          transition: background 0.15s, border-color 0.15s;
        }
        .cl-add-btn:hover { background: rgba(251,191,36,0.16); border-color: rgba(251,191,36,0.32); }

        /* ── Cards ── */
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
          transition: border-color 0.18s;
        }
        .cl-card:hover { border-color: rgba(251,191,36,0.18); }

        .cl-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cl-card:hover .cl-card-accent { opacity: 1; }

        .cl-card-body { padding: 18px 20px 16px; }

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

        .cl-edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(240,253,244,0.45);
          font-size: 11px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 5px 10px;
          border-radius: 20px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .cl-edit-btn:hover { background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.15); color: #fbbf24; }

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
          flex-wrap: wrap;
          gap: 8px;
        }

        .cl-footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
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
          padding: 3px 9px;
          font-size: 12px;
          font-weight: 500;
          color: #4ade80;
        }

        .cl-footer-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cl-btn-manage {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.15);
          color: rgba(251,191,36,0.75);
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 6px 12px;
          border-radius: 20px;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .cl-btn-manage:hover { background: rgba(251,191,36,0.14); color: #fbbf24; }

        .cl-btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(248,113,113,0.07);
          border: 1px solid rgba(248,113,113,0.13);
          color: rgba(248,113,113,0.55);
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .cl-btn-delete:hover { background: rgba(248,113,113,0.13); color: #f87171; }

        /* ── Empty ── */
        .cl-empty {
          max-width: 520px;
          margin: 0 auto;
          padding: 0 24px 48px;
        }

        .cl-empty-card {
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 48px 24px;
          text-align: center;
        }

        .cl-empty-icon { font-size: 44px; display: block; margin-bottom: 14px; }

        .cl-empty-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: rgba(240,253,244,0.55);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0 0 6px;
        }

        .cl-empty-sub { font-size: 13px; color: rgba(240,253,244,0.28); margin: 0 0 20px; }

        .cl-empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.22);
          color: #fbbf24;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 10px 20px;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
        }
        .cl-empty-btn:hover { background: rgba(251,191,36,0.16); border-color: rgba(251,191,36,0.35); }
      `}</style>

      {/* ── Modal editar grass ── */}
      {editingGrass && (
        <div className="cl-overlay" onClick={() => setEditingGrass(null)}>
          <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cl-modal-accent" />
            <h3 className="cl-modal-title">Editar grass</h3>
            <p className="cl-modal-sub">
              Actualizando <span>{editingGrass.name}</span>
            </p>

            <div className="cl-modal-fields">
              <div>
                <label className="cl-label">Nombre<span className="cl-label-required">*</span></label>
                <input className="cl-input" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
              </div>
              <div>
                <label className="cl-label">Dirección<span className="cl-label-required">*</span></label>
                <input className="cl-input" type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
              </div>
              <div>
                <label className="cl-label">WhatsApp<span className="cl-label-required">*</span></label>
                <input className="cl-input" type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
              </div>
              <div>
                <label className="cl-label">
                  Descripción <span style={{ color: 'rgba(240,253,244,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— opcional</span>
                </label>
                <textarea className="cl-textarea" rows={2} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
              </div>
            </div>

            {editError && (
              <div className="cl-modal-error"><span>⚠</span><span>{editError}</span></div>
            )}

            <div className="cl-modal-actions">
              <button className="cl-btn-cancel" onClick={() => setEditingGrass(null)}>Cancelar</button>
              <button className="cl-btn-confirm" onClick={handleSaveEdit} disabled={!isEditValid || editLoading}>
                {editLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div className="cl-header-top">
              <div className="cl-admin-badge">⚙ Panel Admin</div>
              <button className="cl-logout-btn" onClick={handleLogout}>Cerrar sesión →</button>
            </div>
            <h1 className="cl-greeting">Hola, <em>{userName}</em> 👋</h1>
            <p className="cl-tagline">Gestiona tus canchas y reservas</p>
          </div>

          {grassList.length > 0 && (
            <div className="cl-stats-row">
              <div className="cl-stat">
                <span className="cl-stat-num">{grassList.length}</span>
                <span className="cl-stat-label">Complejos</span>
              </div>
              <div className="cl-stat">
                <span className="cl-stat-num">{grassList.reduce((acc, g) => acc + (g.fields?.length ?? 0), 0)}</span>
                <span className="cl-stat-label">Canchas</span>
              </div>
              <div className="cl-stat">
                <span className="cl-stat-num">24h</span>
                <span className="cl-stat-label">Gestión</span>
              </div>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="cl-toolbar">
          <span className="cl-section-label-text">Tus complejos</span>
          <div className="cl-section-label-line" />
          <Link href="/admin/setup" className="cl-add-btn">+ Agregar grass</Link>
        </div>

        {/* Lista o empty */}
        {grassList.length === 0 ? (
          <div className="cl-empty">
            <div className="cl-empty-card">
              <span className="cl-empty-icon">🏟️</span>
              <p className="cl-empty-title">Sin complejos aún</p>
              <p className="cl-empty-sub">Crea tu primer grass para empezar a gestionar reservas</p>
              <Link href="/admin/setup" className="cl-empty-btn">+ Crear mi primer grass</Link>
            </div>
          </div>
        ) : (
          <div className="cl-cards">
            {grassList.map((grass) => (
              <div key={grass.id} className="cl-card">
                <div className="cl-card-accent" />
                <div className="cl-card-body">
                  <div className="cl-card-top">
                    <h3 className="cl-card-name">{grass.name}</h3>
                    <button className="cl-edit-btn" onClick={() => handleOpenEdit(grass)}>
                      ✎ Editar
                    </button>
                  </div>

                  <div className="cl-card-address">
                    <span>📍</span><span>{grass.address}</span>
                  </div>

                  {grass.description && (
                    <p className="cl-card-desc">{grass.description}</p>
                  )}

                  <div className="cl-card-footer">
                    <div className="cl-footer-left">
                      <div className="cl-phone">
                        <span>📞</span><span>{grass.phone}</span>
                      </div>
                      {grass.fields && grass.fields.length > 0 && (
                        <span className="cl-fields-chip">
                          {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <div className="cl-footer-right">
                      <Link href={`/admin/grass/${grass.id}`} className="cl-btn-manage">
                        Gestionar →
                      </Link>
                      <button className="cl-btn-delete" onClick={() => handleDeleteGrass(grass.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}