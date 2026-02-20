import React from "react";
import FieldLoader from "../Utils/FieldLoader";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

interface PostsListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostsList: React.FC<PostsListProps> = ({
  posts,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">All Posts</h3>
      {loading ? (
        <div className="mb-6">
          <FieldLoader />
        </div>
      ) : error ? (
        <div className="mb-6 text-red-600">{error}</div>
      ) : posts.length === 0 ? (
        <div className="mb-6 text-gray-500">No posts found.</div>
      ) : (
        <ul className="mb-8 space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-gray-50 border border-gray-200 rounded"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-700">{post.title}</span>
                <span
                  className={
                    post.published ? "text-green-600" : "text-yellow-600"
                  }
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="text-gray-700 text-sm mb-1">{post.content}</div>
              <div className="text-xs text-gray-400 mb-2">ID: {post.id}</div>
              <div className="flex gap-2">
                <Link
                  to={`/posts-cont-two/${post.id}`}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold"
                >
                  Post Details
                </Link>
                <button
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 text-xs font-semibold"
                  onClick={() => onEdit(post)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold"
                  onClick={() => onDelete(post.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
