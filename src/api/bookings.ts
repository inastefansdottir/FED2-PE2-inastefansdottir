import { apiRequest } from "./client";
import type { CreateBooking } from "../types/booking";

export function createBooking(data: CreateBooking) {
  return apiRequest("/holidaze/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteBooking(id: string) {
  return apiRequest(`/holidaze/bookings/${id}`, {
    method: "DELETE",
  });
}
