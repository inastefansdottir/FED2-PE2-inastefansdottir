const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...(user?.accessToken && {
      Authorization: `Bearer ${user.accessToken}`,
    }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "API error");
  }

  const result = await response.json();

  return result;
}
