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
    <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#185FA5' }} className="px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              Panel Admin
            </span>
          </div>
          <h1 className="text-white text-2xl font-semibold">Cancha Libre</h1>
          <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
            Gestiona tus canchas y reservas
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-medium mb-4" style={{ color: '#0F172A' }}>
          Tus grass
        </h2>

        {grassList.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: '#64748B' }}>No hay grass registrados.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {grassList.map((grass) => (
              <Link key={grass.id} href={`/admin/grass/${grass.id}`}>
                <div
                  className="bg-white rounded-2xl p-4 border cursor-pointer"
                  style={{ borderColor: '#E2E8F0' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-base" style={{ color: '#0F172A' }}>
                        {grass.name}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                        📍 {grass.address}
                      </p>
                      {grass.description && (
                        <p className="text-sm mt-2" style={{ color: '#94A3B8' }}>
                          {grass.description}
                        </p>
                      )}
                    </div>
                    <div
                      className="ml-3 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                    >
                      Administrar
                    </div>
                  </div>
                  <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '0.5px solid #E2E8F0' }}>
                    <span className="text-xs" style={{ color: '#94A3B8' }}>📞</span>
                    <span className="text-xs" style={{ color: '#64748B' }}>{grass.phone}</span>
                    {grass.fields && grass.fields.length > 0 && (
                      <span className="ml-auto text-xs font-medium" style={{ color: '#639922' }}>
                        {grass.fields.length} cancha{grass.fields.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}