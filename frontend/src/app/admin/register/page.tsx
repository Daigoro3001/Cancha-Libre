'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveAuth } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al registrarse');
        return;
      }

      saveAuth(data.token, data.user);
      router.push('/admin/setup');
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#185FA5' }}>
        <div className="max-w-lg mx-auto px-5 py-6">
          <h1 className="text-white text-2xl font-semibold">⚽ Cancha Libre</h1>
          <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>Panel de administración</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto w-full px-5 py-8">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: '#0F172A' }}>Crear cuenta</h2>
          <p className="text-sm mb-6" style={{ color: '#64748B' }}>Registra tu negocio en Cancha Libre</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
                Tu nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carlos Quispe"
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: '#64748B' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
              />
            </div>

            {error && (
              <p className="text-sm px-4 py-3 rounded-xl" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleRegister}
              disabled={loading || !name.trim() || !email.trim() || !password.trim()}
              className="w-full py-3 rounded-xl text-white text-sm font-medium"
              style={{
                backgroundColor: '#378ADD',
                opacity: loading || !name.trim() || !email.trim() || !password.trim() ? 0.6 : 1,
              }}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: '#64748B' }}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/admin/login" className="font-medium" style={{ color: '#378ADD' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}