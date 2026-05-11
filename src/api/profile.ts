import { apiRequest } from "./client";
import type { ApiResponse } from "../types/api";
import type { UpdateProfileData } from "../types/profile";
import type { Venue } from "../types/venue";
import type { Booking } from "../types/booking";

export function getProfile(username: string) {
  return apiRequest(`/holidaze/profiles/${username}`);
}

export function updateProfile(username: string, data: UpdateProfileData) {
  return apiRequest(`/holidaze/profiles/${username}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function getProfileBookings(
  username: string
): Promise<ApiResponse<Booking[]>> {
  return apiRequest(`/holidaze/profiles/${username}/bookings?_venues=true`);
}

export function getMyVenues(username: string): Promise<ApiResponse<Venue[]>> {
  return apiRequest(`/holidaze/profiles/${username}/venues`);
}
