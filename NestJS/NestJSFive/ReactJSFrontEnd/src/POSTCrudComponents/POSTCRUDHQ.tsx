import React, { useEffect, useState } from "react";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";
import DeleteConfirmModal from "../POSTContTwoComponents/DeleteConfirmModal";

import {
  type ContonePostDTO,
  type ContoneResponseDTO,
} from "./DTOS/ContoneDTO";
import { type ContoneUpdateDTO } from "./DTOS/ContoneUpdateDTO";
import {
  fetchPosts as fetchPostsApi,
  handleAddPost as addPostApi,
  handleUpdatePost as updatePostApi,
  handleDeletePost as deletePostApi,
} from "../Utils/postCrudApi";

const POSTCRUDHQ: React.FC = () => {
  const [posts, setPosts] = useState<ContoneResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    await fetchPostsApi(setPosts, setLoading, setError);
  };

  // Add post
  const handleAddPost = async (post: ContonePostDTO) => {
    await addPostApi(post, setAdding, setError, fetchPosts);
  };

  // Update post
  const handleUpdatePost = async (id: string, update: ContoneUpdateDTO) => {
    await updatePostApi(id, update, setError, fetchPosts);
  };

  // Show delete modal
  const handleRequestDelete = async (id: string) => {
    setDeleteId(id);
    setDeleteError(null);
    return Promise.resolve();
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await deletePostApi(deleteId, setDeleteError, fetchPosts);
      setDeleteId(null);
    } catch (e: any) {
      setDeleteError(e.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setDeleteId(null);
    setDeleteError(null);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 tracking-wide text-center">
          POSTCRUDHQ
        </h2>
        <button
          className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          onClick={() => setShowAdd((prev) => !prev)}
        >
          {showAdd ? "Hide Add Post" : "Add New Post"}
        </button>
        {showAdd && <AddPostForm onAdd={handleAddPost} loading={adding} />}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <PostList
          posts={posts}
          loading={loading}
          onUpdate={handleUpdatePost}
          onDelete={handleRequestDelete}
        />
        <DeleteConfirmModal
          open={!!deleteId}
          loading={deleteLoading}
          error={deleteError}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    </div>
  );
};

export default POSTCRUDHQ;
