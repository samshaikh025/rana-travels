export interface Cab {
  id: number
  name: string
  type: string
  imageUrl: string
  description: string
  seats: number
  pricePerKm: number
}

export interface Service {
  id: number
  name: string
  imageUrl: string
  description: string
}

export interface FormState {
  name: string
  phone: string
  tripType: string
  cabId: string
  pickup: string
  drop: string
  date: string
  notes: string
}

export type FormErrors = Partial<Record<keyof FormState, string>>
