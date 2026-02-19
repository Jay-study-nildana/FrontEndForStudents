import {
  type ContonePostDTO,
  type ContoneResponseDTO,
} from "../POSTCrudComponents/DTOS/ContoneDTO";
import { type ContoneUpdateDTO } from "../POSTCrudComponents/DTOS/ContoneUpdateDTO";

// const API_URL = "http://localhost:3000/contone";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchPosts = async (
  setPosts: (posts: ContoneResponseDTO[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (err: string | null) => void,
) => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`${API_URL}/contone`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: ContoneResponseDTO[] = await res.json();
    setPosts(data);
  } catch (err: any) {
    setError(err.message || "Unknown error");
  } finally {
    setLoading(false);
  }
};

export const handleAddPost = async (
  post: ContonePostDTO,
  setAdding: (adding: boolean) => void,
  setError: (err: string | null) => void,
  fetchPosts: () => Promise<void>,
) => {
  setAdding(true);
  setError(null);
  try {
    const res = await fetch(`${API_URL}/contone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Failed to add post");
    await fetchPosts();
  } catch (err: any) {
    setError(err.message || "Unknown error");
  } finally {
    setAdding(false);
  }
};

export const handleUpdatePost = async (
  id: string,
  update: ContoneUpdateDTO,
  setError: (err: string | null) => void,
  fetchPosts: () => Promise<void>,
) => {
  setError(null);
  try {
    const res = await fetch(`${API_URL}/contone/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(update),
    });
    if (!res.ok) throw new Error("Failed to update post");
    await fetchPosts();
  } catch (err: any) {
    setError(err.message || "Unknown error");
  }
};

export const handleDeletePost = async (
  id: string,
  setError: (err: string | null) => void,
  fetchPosts: () => Promise<void>,
) => {
  setError(null);
  try {
    const res = await fetch(`${API_URL}/contone/${id}`, {
      method: "DELETE",
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to delete post");
    await fetchPosts();
  } catch (err: any) {
    setError(err.message || "Unknown error");
  }
};
