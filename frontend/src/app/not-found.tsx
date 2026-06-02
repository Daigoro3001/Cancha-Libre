import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="text-center">
        <p className="text-6xl font-semibold mb-4" style={{ color: '#378ADD' }}>404</p>
        <h1 className="text-xl font-medium mb-2" style={{ color: '#0F172A' }}>
          Página no encontrada
        </h1>
        <p className="text-sm mb-8" style={{ color: '#64748B' }}>
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl text-white text-sm font-medium"
          style={{ backgroundColor: '#378ADD' }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}