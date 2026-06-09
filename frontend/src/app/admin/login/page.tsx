'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveAuth } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Credenciales incorrectas');
        return;
      }

      saveAuth(data.token, data.user);
      router.push('/admin');
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isValid = email.trim() && password.trim();

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
          max-width: 420px;
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

        /* ── Form card ── */
        .cl-card-wrap {
          max-width: 420px;
          margin: -24px auto 0;
          padding: 0 24px 48px;
          position: relative;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .cl-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          overflow: hidden;
        }

        .cl-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 60%, transparent 100%);
        }

        .cl-card-body {
          padding: 24px 24px 28px;
        }

        .cl-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: #f0fdf4;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0 0 4px;
        }

        .cl-card-sub {
          font-size: 13px;
          color: rgba(240,253,244,0.4);
          margin: 0 0 24px;
        }

        /* ── Fields ── */
        .cl-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
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

        .cl-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px;
          padding: 12px 15px;
          font-size: 14px;
          color: #f0fdf4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
        }

        .cl-input::placeholder {
          color: rgba(240,253,244,0.2);
        }

        .cl-input:focus {
          border-color: rgba(251,191,36,0.35);
          background: rgba(255,255,255,0.07);
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
          padding: 13px;
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

        /* ── Footer link ── */
        .cl-footer-link {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: rgba(240,253,244,0.35);
        }

        .cl-footer-link a {
          color: #fbbf24;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.15s;
        }

        .cl-footer-link a:hover {
          opacity: 0.75;
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
            <div className="cl-admin-badge">⚙ Panel de administración</div>
          </div>
        </div>

        {/* Form card */}
        <div className="cl-card-wrap">
          <div className="cl-card">
            <div className="cl-card-accent" />
            <div className="cl-card-body">
              <h2 className="cl-card-title">Iniciar sesión</h2>
              <p className="cl-card-sub">Ingresa a tu panel para gestionar reservas</p>

              <div className="cl-fields">
                <div>
                  <label className="cl-label">Email</label>
                  <input
                    className="cl-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="cl-label">Contraseña</label>
                  <input
                    className="cl-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              {error && (
                <div className="cl-error">
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                className="cl-submit"
                onClick={handleLogin}
                disabled={loading || !isValid}
              >
                {loading ? 'Ingresando...' : 'Ingresar →'}
              </button>
            </div>
          </div>

          <p className="cl-footer-link">
            ¿No tienes cuenta?{' '}
            <Link href="/admin/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </>
  );
}