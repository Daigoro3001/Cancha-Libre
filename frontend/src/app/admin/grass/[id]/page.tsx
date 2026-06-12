// import { fetchGrassById, fetchFieldsByGrass } from '@/lib/api';
// import { Field } from '@/types';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function AdminGrassPage({ params }: Props) {
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
//       <header style={{ backgroundColor: '#185FA5' }} className="px-4 py-5">
//         <div className="max-w-2xl mx-auto">
//           <Link href="/admin" className="text-white text-sm flex items-center gap-1 mb-3" style={{ opacity: 0.85 }}>
//             ← Volver
//           </Link>
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
//               Panel Admin
//             </span>
//           </div>
//           <h1 className="text-white text-2xl font-semibold">{grass.name}</h1>
//           <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
//             📍 {grass.address}
//           </p>
//         </div>
//       </header>

//       <div className="max-w-2xl mx-auto px-4 py-6">
//         <h2 className="text-lg font-medium mb-4" style={{ color: '#0F172A' }}>
//           Canchas
//         </h2>

//         {fields.length === 0 ? (
//           <div className="text-center py-12">
//             <p style={{ color: '#64748B' }}>No hay canchas registradas.</p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {fields.map((field) => (
//               <Link key={field.id} href={`/admin/grass/${id}/field/${field.id}`}>
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
//                       style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
//                     >
//                       Ver calendario →
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
// import { fetchGrassById, fetchFieldsByGrass } from '@/lib/api';
// import { Field } from '@/types';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function AdminGrassPage({ params }: Props) {
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
//           padding-bottom: 28px;
//           background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
//         }

//         .cl-hero-glow {
//           position: absolute;
//           top: -60px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 480px;
//           height: 240px;
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
//           max-width: 560px;
//           margin: 0 auto;
//           padding: 28px 24px 0;
//         }

//         .cl-back {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(251,191,36,0.65);
//           text-decoration: none;
//           margin-bottom: 18px;
//           transition: color 0.15s;
//           letter-spacing: 0.03em;
//         }
//         .cl-back:hover { color: #fbbf24; }

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
//           margin-bottom: 12px;
//         }

//         .cl-grass-name {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 900;
//           font-size: 34px;
//           color: #f0fdf4;
//           letter-spacing: 0.02em;
//           text-transform: uppercase;
//           line-height: 1;
//           margin: 0 0 8px;
//         }

//         .cl-address-row {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 13px;
//           color: rgba(240,253,244,0.45);
//         }

//         .cl-section-label {
//           max-width: 560px;
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
//           max-width: 560px;
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

//         .cl-card-main {
//           display: flex;
//           align-items: flex-start;
//           justify-content: space-between;
//           gap: 16px;
//           margin-bottom: 14px;
//         }

//         .cl-field-name {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           font-size: 22px;
//           color: #f0fdf4;
//           text-transform: uppercase;
//           letter-spacing: 0.01em;
//           line-height: 1.1;
//           margin: 0 0 4px;
//         }

//         .cl-field-desc {
//           font-size: 13px;
//           color: rgba(240,253,244,0.4);
//           margin: 0;
//           line-height: 1.5;
//         }

//         .cl-price-block {
//           text-align: right;
//           flex-shrink: 0;
//         }

//         .cl-price {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           font-size: 26px;
//           color: #fbbf24;
//           line-height: 1;
//           display: block;
//         }

//         .cl-price-label {
//           font-size: 11px;
//           color: rgba(240,253,244,0.3);
//           letter-spacing: 0.05em;
//           display: block;
//           margin-top: 2px;
//         }

//         .cl-card-footer {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding-top: 12px;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }

//         .cl-status-active {
//           background: rgba(74,222,128,0.1);
//           border: 1px solid rgba(74,222,128,0.18);
//           color: #4ade80;
//           font-size: 11px;
//           font-weight: 500;
//           padding: 5px 12px;
//           border-radius: 20px;
//           letter-spacing: 0.04em;
//         }

//         .cl-status-inactive {
//           background: rgba(248,113,113,0.08);
//           border: 1px solid rgba(248,113,113,0.15);
//           color: #f87171;
//           font-size: 11px;
//           font-weight: 500;
//           padding: 5px 12px;
//           border-radius: 20px;
//           letter-spacing: 0.04em;
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

//           <svg className="cl-field-lines" viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//             <rect x="30" y="20" width="500" height="180" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
//             <line x1="280" y1="20" x2="280" y2="200" stroke="#fff" strokeWidth="1.5" />
//             <circle cx="280" cy="110" r="40" fill="none" stroke="#fff" strokeWidth="1.5" />
//             <circle cx="280" cy="110" r="3" fill="#fff" />
//             <rect x="30" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
//             <rect x="470" y="70" width="60" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />
//           </svg>

//           <div className="cl-header-inner">
//             <Link href="/admin" className="cl-back">← Volver</Link>
//             <div className="cl-admin-badge">⚙ Panel Admin</div>
//             <h1 className="cl-grass-name">{grass.name}</h1>
//             <div className="cl-address-row">
//               <span>📍</span>
//               <span>{grass.address}</span>
//             </div>
//           </div>
//         </div>

//         {/* Lista de canchas */}
//         <div className="cl-section-label">
//           <span className="cl-section-label-text">Canchas</span>
//           <div className="cl-section-label-line" />
//         </div>

//         {fields.length === 0 ? (
//           <div className="cl-empty">
//             <span className="cl-empty-icon">🏟️</span>
//             No hay canchas registradas.
//           </div>
//         ) : (
//           <div className="cl-cards">
//             {fields.map((field) => (
//               <Link key={field.id} href={`/admin/grass/${id}/field/${field.id}`} className="cl-card">
//                 <div className="cl-card-accent" />
//                 <div className="cl-card-body">
//                   <div className="cl-card-main">
//                     <div>
//                       <h3 className="cl-field-name">{field.name}</h3>
//                       {field.description && (
//                         <p className="cl-field-desc">{field.description}</p>
//                       )}
//                     </div>
//                     <div className="cl-price-block">
//                       <span className="cl-price">S/ {field.pricePerHour}</span>
//                       <span className="cl-price-label">por hora</span>
//                     </div>
//                   </div>

//                   <div className="cl-card-footer">
//                     <span className={field.isActive ? 'cl-status-active' : 'cl-status-inactive'}>
//                       {field.isActive ? '● Activa' : '● Inactiva'}
//                     </span>
//                   </div>

//                   <div className="cl-cta-row">
//                     <span>Ver calendario</span>
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
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getToken } from '@/lib/auth';
import { Field } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function AdminGrassPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [grass, setGrass] = useState<any>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldDescription, setFieldDescription] = useState('');
  const [fieldPrice, setFieldPrice] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    const token = getToken();
    if (!token) { router.replace('/admin/login'); return; }
    try {
      const [grassRes, fieldsRes] = await Promise.all([
        fetch(`${API_URL}/grass/${id}`),
        fetch(`${API_URL}/fields?grassId=${id}`),
      ]);
      setGrass(await grassRes.json());
      setFields(await fieldsRes.json());
    } catch {
      router.replace('/admin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleAddField = async () => {
    if (!fieldName.trim() || !fieldPrice.trim()) return;
    setFormLoading(true);
    setFormError('');
    const token = getToken();
    if (!token) { router.replace('/admin/login'); return; }
    try {
      const res = await fetch(`${API_URL}/fields`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: fieldName.trim(),
          description: fieldDescription.trim(),
          pricePerHour: Number(fieldPrice),
          grassId: Number(id),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setFormError(data.message || 'Error al crear la cancha');
        return;
      }
      setFieldName(''); setFieldDescription(''); setFieldPrice('');
      setShowForm(false);
      fetchData();
    } catch {
      setFormError('Error de conexión.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteField = async (fieldId: number) => {
    const token = getToken();
    if (!token) { router.replace('/admin/login'); return; }
    try {
      await fetch(`${API_URL}/fields/${fieldId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch { console.error('Error al eliminar cancha'); }
  };

  const isFormValid = fieldName.trim() && fieldPrice.trim();

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');
          .cl-loading { font-family:'DM Sans',sans-serif; background:#0A0F0D; min-height:100vh; display:flex; align-items:center; justify-content:center; }
          .cl-loading-dot { display:flex; gap:6px; }
          .cl-loading-dot span { width:7px; height:7px; border-radius:50%; background:rgba(251,191,36,0.4); animation:cl-pulse 1.2s ease-in-out infinite; }
          .cl-loading-dot span:nth-child(2){animation-delay:0.2s}
          .cl-loading-dot span:nth-child(3){animation-delay:0.4s}
          @keyframes cl-pulse { 0%,80%,100%{opacity:0.3;transform:scale(0.85)} 40%{opacity:1;transform:scale(1)} }
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
          max-width: 360px;
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
          padding-bottom: 28px;
          background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
        }

        .cl-hero-glow {
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 480px; height: 240px;
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
          padding: 28px 24px 0;
        }

        .cl-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(251,191,36,0.65);
          text-decoration: none;
          margin-bottom: 18px;
          transition: color 0.15s;
          letter-spacing: 0.03em;
        }
        .cl-back:hover { color: #fbbf24; }

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
          margin-bottom: 12px;
        }

        .cl-grass-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 34px;
          color: #f0fdf4;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 8px;
        }

        .cl-address-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: rgba(240,253,244,0.45);
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

        .cl-section-label-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

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
          cursor: pointer;
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
          color: rgba(240,253,244,0.38);
          margin: 0;
          line-height: 1.5;
        }

        .cl-price {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: #fbbf24;
          line-height: 1;
          display: block;
          text-align: right;
          flex-shrink: 0;
        }

        .cl-price-label {
          font-size: 11px;
          color: rgba(240,253,244,0.3);
          display: block;
          text-align: right;
          margin-top: 2px;
          letter-spacing: 0.04em;
        }

        .cl-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .cl-btn-calendar {
          display: inline-flex;
          align-items: center;
          gap: 5px;
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
        .cl-btn-calendar:hover { background: rgba(251,191,36,0.14); color: #fbbf24; }

        .cl-btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 5px;
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

        .cl-empty-sub {
          font-size: 13px;
          color: rgba(240,253,244,0.28);
          margin: 0 0 20px;
        }

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
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .cl-empty-btn:hover { background: rgba(251,191,36,0.16); border-color: rgba(251,191,36,0.35); }
      `}</style>

      {/* ── Modal agregar cancha ── */}
      {showForm && (
        <div className="cl-overlay" onClick={() => { setShowForm(false); setFormError(''); }}>
          <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cl-modal-accent" />
            <h3 className="cl-modal-title">Nueva cancha</h3>
            <p className="cl-modal-sub">
              Agregar a <span>{grass?.name}</span>
            </p>

            <div className="cl-modal-fields">
              <div>
                <label className="cl-label">Nombre<span className="cl-label-required">*</span></label>
                <input
                  className="cl-input"
                  type="text"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="Ej: Cancha 1"
                  autoFocus
                />
              </div>
              <div>
                <label className="cl-label">
                  Descripción <span style={{ color: 'rgba(240,253,244,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— opcional</span>
                </label>
                <input
                  className="cl-input"
                  type="text"
                  value={fieldDescription}
                  onChange={(e) => setFieldDescription(e.target.value)}
                  placeholder="Ej: Con iluminación LED"
                />
              </div>
              <div>
                <label className="cl-label">Precio por hora (S/)<span className="cl-label-required">*</span></label>
                <input
                  className="cl-input"
                  type="number"
                  value={fieldPrice}
                  onChange={(e) => setFieldPrice(e.target.value)}
                  placeholder="Ej: 50"
                />
              </div>
            </div>

            {formError && (
              <div className="cl-modal-error">
                <span>⚠</span><span>{formError}</span>
              </div>
            )}

            <div className="cl-modal-actions">
              <button className="cl-btn-cancel" onClick={() => { setShowForm(false); setFormError(''); }}>
                Cancelar
              </button>
              <button
                className="cl-btn-confirm"
                onClick={handleAddField}
                disabled={!isFormValid || formLoading}
              >
                {formLoading ? 'Guardando...' : 'Agregar'}
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
            <Link href="/admin" className="cl-back">← Volver</Link>
            <div className="cl-admin-badge">⚙ Panel Admin</div>
            <h1 className="cl-grass-name">{grass?.name}</h1>
            <div className="cl-address-row">
              <span>📍</span>
              <span>{grass?.address}</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="cl-toolbar">
          <span className="cl-section-label-text">Canchas</span>
          <div className="cl-section-label-line" />
          <button className="cl-add-btn" onClick={() => setShowForm(true)}>
            + Agregar cancha
          </button>
        </div>

        {/* Lista o empty */}
        {fields.length === 0 ? (
          <div className="cl-empty">
            <div className="cl-empty-card">
              <span className="cl-empty-icon">⚽</span>
              <p className="cl-empty-title">Sin canchas aún</p>
              <p className="cl-empty-sub">Agrega tu primera cancha para empezar</p>
              <button className="cl-empty-btn" onClick={() => setShowForm(true)}>
                + Agregar cancha
              </button>
            </div>
          </div>
        ) : (
          <div className="cl-cards">
            {fields.map((field) => (
              <div key={field.id} className="cl-card">
                <div className="cl-card-accent" />
                <div className="cl-card-body">
                  <div className="cl-card-top">
                    <div>
                      <h3 className="cl-field-name">{field.name}</h3>
                      {field.description && (
                        <p className="cl-field-desc">{field.description}</p>
                      )}
                    </div>
                    <div>
                      <span className="cl-price">S/ {field.pricePerHour}</span>
                      <span className="cl-price-label">por hora</span>
                    </div>
                  </div>

                  <div className="cl-card-footer">
                    <Link href={`/admin/grass/${id}/field/${field.id}`} className="cl-btn-calendar">
                      Ver calendario →
                    </Link>
                    <button className="cl-btn-delete" onClick={() => handleDeleteField(field.id)}>
                      Eliminar
                    </button>
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