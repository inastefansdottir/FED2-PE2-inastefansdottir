import { apiRequest } from "./client";
import type { User } from "../types/user";

export async function login(email: string, password: string) {
  const res = await apiRequest<{ data: User }>("/auth/login?_holidaze=true", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const user = res.data;

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
}) {
  return apiRequest<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
