export interface Grass {
  id: number;
  name: string;
  address: string;
  phone: string;
  description?: string;
  fields?: Field[];
}

export interface Field {
  id: number;
  name: string;
  description?: string;
  pricePerHour: number;
  isActive: boolean;
  grass?: Grass;
}

export interface Reservation {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  clientName: string;
  clientPhone?: string;
  field?: Field;
}