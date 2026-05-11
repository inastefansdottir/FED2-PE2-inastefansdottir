import type { Venue } from "./venue";

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
}

export interface CreateBooking {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
