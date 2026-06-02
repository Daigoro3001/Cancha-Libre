import { fetchGrassById, fetchFieldsByGrass } from '@/lib/api';
import { Field } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminGrassPage({ params }: Props) {
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
    <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#185FA5' }} className="px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/admin" className="text-white text-sm flex items-center gap-1 mb-3" style={{ opacity: 0.85 }}>
            ← Volver
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              Panel Admin
            </span>
          </div>
          <h1 className="text-white text-2xl font-semibold">{grass.name}</h1>
          <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
            📍 {grass.address}
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-medium mb-4" style={{ color: '#0F172A' }}>
          Canchas
        </h2>

        {fields.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: '#64748B' }}>No hay canchas registradas.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <Link key={field.id} href={`/admin/grass/${id}/field/${field.id}`}>
                <div
                  className="bg-white rounded-2xl p-4 border cursor-pointer"
                  style={{ borderColor: '#E2E8F0' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-base" style={{ color: '#0F172A' }}>
                        {field.name}
                      </h3>
                      {field.description && (
                        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                          {field.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-base" style={{ color: '#378ADD' }}>
                        S/ {field.pricePerHour}
                      </p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>por hora</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '0.5px solid #E2E8F0' }}>
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: field.isActive ? '#DCFCE7' : '#FEE2E2',
                        color: field.isActive ? '#15803D' : '#DC2626',
                      }}
                    >
                      {field.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                    >
                      Ver calendario →
                    </span>
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