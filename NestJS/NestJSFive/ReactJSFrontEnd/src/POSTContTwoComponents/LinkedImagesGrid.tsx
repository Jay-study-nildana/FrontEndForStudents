import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export interface LinkedImage {
  id: number;
  postId: string;
  fileId: string;
  createdAt: string;
}

interface LinkedImagesGridProps {
  postId: string;
}

const LinkedImagesGrid: React.FC<LinkedImagesGridProps> = ({ postId }) => {
  const { getAccessToken } = useAuth();
  const [images, setImages] = useState<LinkedImage[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [fileId: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/posts/${postId}/images-uuid`, {
          method: "GET",
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch linked images");
        const data = await res.json();
        setImages(data.images || []);
        const token = getAccessToken();
        const urlResults = await Promise.all(
          (data.images || []).map(async (img: LinkedImage) => {
            const urlRes = await fetch(`${apiUrl}/files/url/${img.fileId}`, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
            });
            if (!urlRes.ok) return { fileId: img.fileId, url: null };
            const urlData = await urlRes.json();
            return { fileId: img.fileId, url: urlData.url };
          }),
        );
        const urlMap: { [fileId: string]: string } = {};
        urlResults.forEach(({ fileId, url }) => {
          if (url) urlMap[fileId] = url;
        });
        setImageUrls(urlMap);
      } catch (err: any) {
        setError(err?.message || "Error fetching linked images");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [postId, getAccessToken]);

  if (loading) return <div className="text-center py-4">Loading images…</div>;
  if (error)
    return <div className="text-center text-red-600 py-4">{error}</div>;
  if (!images.length) return null;
  // Only show the first image as a post header
  const img = images[0];
  const url = imageUrls[img.fileId];
  if (!url) return null;
  return (
    <div className="w-full mb-4">
      <img
        src={url}
        alt="Post header"
        className="w-full max-h-64 object-cover object-top rounded-t-lg shadow"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};

export default LinkedImagesGrid;
