import { apiRequest } from "./client";
import type { UpdateProfileData } from "../types/profile";

export function getProfile(username: string) {
  return apiRequest(`/holidaze/profiles/${username}`);
}

export function updateProfile(username: string, data: UpdateProfileData) {
  return apiRequest(`/holidaze/profiles/${username}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function getProfileBookings(username: string) {
  return apiRequest(`/holidaze/profiles/${username}/bookings`);
}

export function getMyVenues(username: string) {
  return apiRequest(`/holidaze/profiles/${username}/venues`);
}
