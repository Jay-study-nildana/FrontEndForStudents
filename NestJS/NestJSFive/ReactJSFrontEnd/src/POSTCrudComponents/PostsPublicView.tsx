import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type PostImage = {
  id: number;
  postId: string;
  fileId: string;
  createdAt: string;
};

const API_BASE = import.meta.env.VITE_API_URL;

const PostsPublicView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [images, setImages] = useState<Record<string, PostImage | null>>({});
  const [imageUrls, setImageUrls] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/contone`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        setPosts(data);

        // Fetch images for each post
        const imagesMap: Record<string, PostImage | null> = {};
        await Promise.all(
          data.map(async (post) => {
            try {
              const imgRes = await fetch(
                `${API_BASE}/posts/${post.id}/images-uuid`,
              );
              if (!imgRes.ok) throw new Error();
              const imgData = await imgRes.json();
              imagesMap[post.id] =
                imgData.images && imgData.images.length > 0
                  ? imgData.images[0]
                  : null;
            } catch {
              imagesMap[post.id] = null;
            }
          }),
        );
        setImages(imagesMap);

        // Fetch image URLs for each post (if image exists)
        const urlsMap: Record<string, string | null> = {};
        await Promise.all(
          Object.entries(imagesMap).map(async ([postId, image]) => {
            if (image && image.fileId) {
              try {
                const token = getAccessToken();
                const urlRes = await fetch(
                  `${API_BASE}/files/url/${image.fileId}`,
                  {
                    headers: {
                      accept: "application/json",
                      ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                  },
                );
                if (!urlRes.ok) throw new Error();
                const urlData = await urlRes.json();
                urlsMap[postId] = urlData.url || null;
              } catch {
                urlsMap[postId] = null;
              }
            } else {
              urlsMap[postId] = null;
            }
          }),
        );
        setImageUrls(urlsMap);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto mt-12 p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-8 drop-shadow text-center">
        Public Blog Posts
      </h2>
      {loading ? (
        <div className="text-center text-lg text-gray-600 py-12">
          Loading posts...
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-12">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No posts found.</div>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow duration-200"
            >
              {imageUrls[post.id] ? (
                <img
                  src={imageUrls[post.id]!}
                  alt={post.title}
                  className="w-full md:w-48 h-48 object-cover rounded-lg border border-purple-200 shadow"
                  loading="lazy"
                />
              ) : (
                <div className="w-full md:w-48 h-48 flex items-center justify-center bg-purple-50 text-purple-300 rounded-lg border border-purple-100">
                  <span className="text-5xl">🖼️</span>
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Posted: {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPublicView;
