import { type ContoneDetailsResponseDTO } from "../POSTCrudComponents/DTOS/ContoneDetailsDTO";

const API_URL = "http://localhost:3000/contone";

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
