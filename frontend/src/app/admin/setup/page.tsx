// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getToken } from '@/lib/auth';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// export default function SetupPage() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSetup = async () => {
//     if (!name.trim() || !address.trim() || !phone.trim()) return;
//     setLoading(true);
//     setError('');

//     const token = getToken();
//     if (!token) {
//       router.replace('/admin/login');
//       return;
//     }

//     try {
//       const res = await fetch(`${API_URL}/grass`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name, address, phone, description }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Error al crear el grass');
//         return;
//       }

//       router.push('/admin');
//     } catch {
//       setError('Error de conexión. Intenta de nuevo.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>

//       {/* Header */}
//       <header style={{ backgroundColor: '#185FA5' }}>
//         <div className="max-w-lg mx-auto px-5 py-6">
//           <h1 className="text-white text-2xl font-semibold">⚽ Cancha Libre</h1>
//           <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
//             Configura tu primer grass
//           </p>
//         </div>
//       </header>

//       <div className="max-w-lg mx-auto w-full px-5 py-8">

//         <div
//           className="bg-white rounded-2xl p-6 mb-4"
//           style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
//         >
//           <div className="flex items-center gap-3 mb-5">
//             <div
//               className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
//               style={{ backgroundColor: '#E6F1FB' }}
//             >
//               🏟️
//             </div>
//             <div>
//               <h2 className="text-base font-semibold" style={{ color: '#0F172A' }}>
//                 Datos de tu grass
//               </h2>
//               <p className="text-xs" style={{ color: '#94A3B8' }}>
//                 Esta información verán tus clientes
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-4">
//             <div>
//               <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
//                 Nombre del grass *
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Ej: Grass El Porvenir"
//                 className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
//                 style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
//               />
//             </div>

//             <div>
//               <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
//                 Dirección *
//               </label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Ej: Av. Los Libertadores 123, Ayacucho"
//                 className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
//                 style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
//               />
//             </div>

//             <div>
//               <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
//                 Número de WhatsApp *
//               </label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Ej: 966123456"
//                 className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
//                 style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
//               />
//               <p className="text-xs mt-1.5" style={{ color: '#94A3B8' }}>
//                 Los clientes te contactarán por este número
//               </p>
//             </div>

//             <div>
//               <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
//                 Descripción (opcional)
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Ej: Canchas techadas con iluminación LED"
//                 rows={3}
//                 className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none"
//                 style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
//               />
//             </div>

//             {error && (
//               <p className="text-sm px-4 py-3 rounded-xl" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
//                 {error}
//               </p>
//             )}

//             <button
//               onClick={handleSetup}
//               disabled={loading || !name.trim() || !address.trim() || !phone.trim()}
//               className="w-full py-3 rounded-xl text-white text-sm font-medium"
//               style={{
//                 backgroundColor: '#378ADD',
//                 opacity: loading || !name.trim() || !address.trim() || !phone.trim() ? 0.6 : 1,
//               }}
//             >
//               {loading ? 'Creando...' : 'Crear mi grass →'}
//             </button>
//           </div>
//         </div>

//         <p className="text-center text-xs" style={{ color: '#94A3B8' }}>
//           Podrás agregar canchas desde tu panel después de crear el grass
//         </p>
//       </div>
//     </main>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function SetupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    if (!name.trim() || !address.trim() || !phone.trim()) return;
    setLoading(true);
    setError('');

    const token = getToken();
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/grass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address, phone, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al crear el grass');
        return;
      }

      router.push('/admin');
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isValid = name.trim() && address.trim() && phone.trim();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');

        .cl-root {
          font-family: 'DM Sans', sans-serif;
          background: #0A0F0D;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        /* ── Hero ── */
        .cl-hero {
          position: relative;
          overflow: hidden;
          padding-bottom: 48px;
          background: linear-gradient(170deg, #0f1a2e 0%, #0A0F0D 60%);
          flex-shrink: 0;
        }

        .cl-hero-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 260px;
          background: radial-gradient(ellipse, rgba(99,130,220,0.12) 0%, transparent 70%);
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
          max-width: 480px;
          margin: 0 auto;
          padding: 44px 24px 0;
          text-align: center;
        }

        .cl-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .cl-logo-icon {
          width: 40px;
          height: 40px;
          background: #fbbf24;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 1;
          flex-shrink: 0;
        }

        .cl-brand {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 28px;
          color: #f0fdf4;
          letter-spacing: 0.04em;
          text-transform: uppercase;
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
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Form wrap ── */
        .cl-form-wrap {
          max-width: 480px;
          margin: -24px auto 0;
          padding: 0 24px 48px;
          position: relative;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Card ── */
        .cl-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .cl-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 60%, transparent 100%);
        }

        .cl-card-body {
          padding: 24px 24px 28px;
        }

        /* ── Card header ── */
        .cl-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .cl-card-icon {
          width: 42px;
          height: 42px;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.18);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .cl-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #f0fdf4;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0 0 2px;
        }

        .cl-card-sub {
          font-size: 12px;
          color: rgba(240,253,244,0.35);
          margin: 0;
        }

        /* ── Fields ── */
        .cl-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cl-field {
          display: flex;
          flex-direction: column;
        }

        .cl-label {
          font-size: 11px;
          font-weight: 500;
          color: rgba(240,253,244,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 7px;
        }

        .cl-label-required {
          color: rgba(251,191,36,0.6);
          margin-left: 3px;
        }

        .cl-input,
        .cl-textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 12px 15px;
          font-size: 14px;
          color: #f0fdf4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          outline: none;
          width: 100%;
          transition: border-color 0.15s, background 0.15s;
        }

        .cl-input::placeholder,
        .cl-textarea::placeholder {
          color: rgba(240,253,244,0.2);
        }

        .cl-input:focus,
        .cl-textarea:focus {
          border-color: rgba(251,191,36,0.35);
          background: rgba(255,255,255,0.07);
        }

        .cl-textarea {
          resize: none;
          line-height: 1.55;
        }

        .cl-hint {
          font-size: 11px;
          color: rgba(240,253,244,0.25);
          margin-top: 6px;
          letter-spacing: 0.02em;
        }

        /* ── Divider ── */
        .cl-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 20px 0;
        }

        /* ── Error ── */
        .cl-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.18);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          color: #f87171;
          margin-bottom: 16px;
        }

        /* ── Submit ── */
        .cl-submit {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          background: rgba(251,191,36,0.14);
          border: 1px solid rgba(251,191,36,0.25);
          color: #fbbf24;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.15s, border-color 0.15s, opacity 0.15s;
        }

        .cl-submit:hover:not(:disabled) {
          background: rgba(251,191,36,0.22);
          border-color: rgba(251,191,36,0.4);
        }

        .cl-submit:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* ── Footer note ── */
        .cl-footer-note {
          text-align: center;
          font-size: 12px;
          color: rgba(240,253,244,0.25);
          line-height: 1.5;
          letter-spacing: 0.01em;
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
            <div className="cl-logo-row">
              <div className="cl-logo-icon">⚽</div>
              <span className="cl-brand">Cancha Libre</span>
            </div>
            <div className="cl-admin-badge">🏟️ Configura tu grass</div>
          </div>
        </div>

        {/* Form */}
        <div className="cl-form-wrap">
          <div className="cl-card">
            <div className="cl-card-accent" />
            <div className="cl-card-body">

              <div className="cl-card-header">
                <div className="cl-card-icon">🏟️</div>
                <div>
                  <h2 className="cl-card-title">Datos de tu grass</h2>
                  <p className="cl-card-sub">Esta información verán tus clientes</p>
                </div>
              </div>

              <div className="cl-fields">
                <div className="cl-field">
                  <label className="cl-label">
                    Nombre del grass<span className="cl-label-required">*</span>
                  </label>
                  <input
                    className="cl-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Grass El Porvenir"
                  />
                </div>

                <div className="cl-field">
                  <label className="cl-label">
                    Dirección<span className="cl-label-required">*</span>
                  </label>
                  <input
                    className="cl-input"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Av. Los Libertadores 123, Ayacucho"
                  />
                </div>

                <div className="cl-field">
                  <label className="cl-label">
                    Número de WhatsApp<span className="cl-label-required">*</span>
                  </label>
                  <input
                    className="cl-input"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 966123456"
                  />
                  <span className="cl-hint">Los clientes te contactarán por este número</span>
                </div>

                <div className="cl-field">
                  <label className="cl-label">Descripción <span style={{ color: 'rgba(240,253,244,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— opcional</span></label>
                  <textarea
                    className="cl-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ej: Canchas techadas con iluminación LED, estacionamiento disponible..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="cl-divider" />

              {error && (
                <div className="cl-error">
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                className="cl-submit"
                onClick={handleSetup}
                disabled={loading || !isValid}
              >
                {loading ? 'Creando grass...' : 'Crear mi grass →'}
              </button>
            </div>
          </div>

          <p className="cl-footer-note">
            Podrás agregar canchas desde tu panel<br />después de crear el grass
          </p>
        </div>
      </div>
    </>
  );
}