import React, { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string | null;
}

const PostsContoneTwoPublic: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/posts?page=1&limit=10`, {
          method: "GET",
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err?.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        Posts
      </h2>
      {loading && <div className="text-center py-8">Loading posts…</div>}
      {error && <div className="text-center text-red-600 py-8">{error}</div>}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center text-gray-500 py-8">No posts found.</div>
      )}
      <div className="space-y-10">
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            published={post.published}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsContoneTwoPublic;
