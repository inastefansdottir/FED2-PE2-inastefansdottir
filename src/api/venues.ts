import { apiRequest } from "./client";
import type { ApiResponse } from "../types/api";
import type { Venue, CreateVenueData, VenueWithBookings } from "../types/venue";

export function getVenues(
  page = 1,
  limit = 10
): Promise<ApiResponse<VenueWithBookings[]>> {
  return apiRequest<ApiResponse<VenueWithBookings[]>>(
    `/holidaze/venues?page=${page}&limit=${limit}&sort=created&sortOrder=desc&_bookings=true&_owner=true`
  );
}

export function getVenueById(
  id: string
): Promise<ApiResponse<VenueWithBookings>> {
  return apiRequest<ApiResponse<VenueWithBookings>>(
    `/holidaze/venues/${id}?_owner=true&_bookings=true`
  );
}

export function searchVenues(query: string): Promise<Venue[]> {
  return apiRequest<Venue[]>(
    `/holidaze/venues/search?q=${encodeURIComponent(query)}`
  );
}

export function createVenue(
  data: CreateVenueData
): Promise<ApiResponse<Venue>> {
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
