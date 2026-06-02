import { fetchGrassById, fetchReservationsByFieldAndDate } from '@/lib/api';
import { Reservation } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminCalendarView from '@/components/AdminCalendarView';

interface Props {
  params: Promise<{ id: string; fieldId: string }>;
  searchParams: Promise<{ date?: string }>;
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export default async function AdminFieldPage({ params, searchParams }: Props) {
  const { id, fieldId } = await params;
  const { date } = await searchParams;
  const selectedDate = date || getTodayDate();

  let grass;
  let field;
  let reservations: Reservation[] = [];

  try {
    grass = await fetchGrassById(Number(id));
    field = grass.fields?.find((f: { id: number }) => f.id === Number(fieldId));
    if (!field) notFound();
    reservations = await fetchReservationsByFieldAndDate(Number(fieldId), selectedDate);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#185FA5' }} className="px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href={`/admin/grass/${id}`} className="text-white text-sm flex items-center gap-1 mb-3" style={{ opacity: 0.85 }}>
            ← Volver
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              Panel Admin
            </span>
          </div>
          <h1 className="text-white text-2xl font-semibold">{field.name}</h1>
          <p className="text-white text-sm mt-1" style={{ opacity: 0.85 }}>
            {grass.name} · S/ {field.pricePerHour} por hora
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <AdminCalendarView
          fieldId={Number(fieldId)}
          grassId={Number(id)}
          fieldName={field.name}
          selectedDate={selectedDate}
          reservations={reservations}
        />
      </div>
    </main>
  );
}