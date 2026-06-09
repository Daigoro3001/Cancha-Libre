const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchGrass() {
  const res = await fetch(`${API_URL}/grass`);
  if (!res.ok) throw new Error('Error al obtener los grass');
  return res.json();
}

export async function fetchGrassById(id: number) {
  const res = await fetch(`${API_URL}/grass/${id}`);
  if (!res.ok) throw new Error('Error al obtener el grass');
  return res.json();
}

export async function fetchFieldsByGrass(grassId: number) {
  const res = await fetch(`${API_URL}/fields?grassId=${grassId}`);
  if (!res.ok) throw new Error('Error al obtener las canchas');
  return res.json();
}

export async function fetchReservationsByFieldAndDate(fieldId: number, date: string) {
  const res = await fetch(`${API_URL}/reservations?fieldId=${fieldId}&date=${date}`);
  if (!res.ok) throw new Error('Error al obtener las reservas');
  return res.json();
}

export async function fetchMyGrass(token: string) {
  const res = await fetch(`${API_URL}/grass/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener tus grass');
  return res.json();
}