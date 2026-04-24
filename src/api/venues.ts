import { apiRequest } from "./client";
import type { Venue, CreateVenueData } from "../types/venue";

export function getVenues(page = 1, limit = 10): Promise<Venue[]> {
  return apiRequest<Venue[]>(`/holidaze/venues?page=${page}&limit=${limit}`);
}

export function getVenueById(id: string): Promise<Venue> {
  return apiRequest<Venue>(`(holidaze/venues/${id})`);
}

export function searchVenues(query: string): Promise<Venue[]> {
  return apiRequest<Venue[]>(`/holidaze/venues/search?q=${query}`);
}

export function createVenue(data: CreateVenueData) {
  return apiRequest(`/holidaze/venues`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateVenue(id: string, data: any) {
  return apiRequest(`/holidaze/venues/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteVenue(id: string) {
  return apiRequest(`/holidaze/venues/${id}`, {
    method: "DELETE",
  });
}

export function getVenueBookings(id: string) {
  return apiRequest(`/holidaze/venues/${id}?_bookings=true`);
}
