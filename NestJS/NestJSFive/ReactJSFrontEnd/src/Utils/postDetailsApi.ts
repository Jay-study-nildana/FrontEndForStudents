// API helpers for PostDetails page (modularized)

export async function fetchPost(postId: string, apiUrl: string) {
  const res = await fetch(`${apiUrl}/posts/${postId}`, {
    method: "GET",
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch post details");
  return await res.json();
}

export async function fetchFiles(apiUrl: string, token: string | null) {
  const res = await fetch(`${apiUrl}/files/allthefiles`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch files");
  return await res.json();
}

export async function fetchLinkedImages(postId: string, apiUrl: string) {
  const res = await fetch(`${apiUrl}/posts/${postId}/images-uuid`, {
    method: "GET",
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch linked images");
  return await res.json();
}

export async function fetchFilePublicUrl(
  fileId: string,
  apiUrl: string,
  token?: string | null,
) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (token !== undefined) {
    headers["Authorization"] = token ? `Bearer ${token}` : "";
  }
  const res = await fetch(`${apiUrl}/files/url/${fileId}`, {
    method: "GET",
    headers,
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.url;
}
import { type ContoneDetailsResponseDTO } from "../POSTCrudComponents/DTOS/ContoneDetailsDTO";

const API_URL = `${import.meta.env.VITE_API_URL}/contone`;

export const fetchPostDetails = async (
  id: string,
  setPost: (post: ContoneDetailsResponseDTO | null) => void,
  setLoading: (loading: boolean) => void,
  setError: (err: string | null) => void,
) => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post details");
    const data: ContoneDetailsResponseDTO = await res.json();
    setPost(data);
  } catch (err: any) {
    setError(err.message || "Unknown error");
  } finally {
    setLoading(false);
  }
};
