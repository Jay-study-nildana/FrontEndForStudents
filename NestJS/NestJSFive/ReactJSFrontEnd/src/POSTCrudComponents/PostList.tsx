import React, { useState } from "react";
import { Link } from "react-router-dom";
import { type ContoneResponseDTO } from "./DTOS/ContoneDTO";
import { type ContoneUpdateDTO } from "./DTOS/ContoneUpdateDTO";
import EditPostForm from "./EditPostForm";

interface PostListProps {
  posts: ContoneResponseDTO[];
  loading: boolean;
  onUpdate?: (id: string, update: ContoneUpdateDTO) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></span>
        <span className="ml-3 text-purple-600 font-medium">
          Loading posts...
        </span>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center text-gray-500 py-8">No posts found.</div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white rounded-lg shadow p-5 border-l-4 border-purple-400"
          >
            {editingId === post.id && onUpdate ? (
              <EditPostForm
                post={post}
                loading={editLoading}
                onCancel={() => setEditingId(null)}
                onUpdate={async (id, update) => {
                  setEditLoading(true);
                  await onUpdate(id, update);
                  setEditLoading(false);
                  setEditingId(null);
                }}
              />
            ) : (
              <>
                <h4 className="text-lg font-bold text-purple-700 mb-1">
                  {post.title}
                </h4>
                {post.description && (
                  <p className="text-gray-700 mb-2">{post.description}</p>
                )}
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>
                    Created: {new Date(post.createdAt).toLocaleString()}
                  </span>
                  <span>
                    Updated: {new Date(post.updatedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/posts/${post.id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Post Details
                  </Link>
                  {onUpdate && (
                    <button
                      className="text-xs text-purple-600 hover:underline"
                      onClick={() => setEditingId(post.id)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => onDelete(post.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
