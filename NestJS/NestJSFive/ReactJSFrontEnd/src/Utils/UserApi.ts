// src/AdminComponents/UserApi.ts
import { type UserDetailsDTO } from "../AdminComponents/DTOS/UserDetailsDTO";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUserDetails(
  id: string,
  token: string,
): Promise<UserDetailsDTO> {
  const res = await fetch(`${API_URL}/adminpanel/users/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user details");
  return await res.json();
}

export async function fetchAvailableRoles(token: string): Promise<string[]> {
  const res = await fetch(`${API_URL}/adminpanel/roles`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch roles");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addUserRole(
  id: string,
  role: string,
  token: string,
): Promise<UserDetailsDTO> {
  const res = await fetch(`${API_URL}/adminpanel/users/${id}/roles`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error("Failed to add role");
  return await res.json();
}
