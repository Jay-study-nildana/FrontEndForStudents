import React, { useState, useEffect } from "react";
import PostsList from "./PostsList";
import AddPostForm from "./AddPostForm";
import { fetchPosts, addPost, updatePost, deletePost } from "../Utils/postApiContTwo";
import EditPostModal from "./EditPostModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const POSTCRUDContTwoHQ: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // Edit state
  const [editPost, setEditPost] = useState<any>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Delete confirmation modal state
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Fetch all posts (must be after 'result' is declared)
  useEffect(() => {
    const loadPosts = async () => {
      setPostsLoading(true);
      setPostsError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const data = await fetchPosts(apiUrl);
        setPosts(data);
      } catch (err: any) {
        setPostsError(err?.message || "Failed to fetch posts.");
      } finally {
        setPostsLoading(false);
      }
    };
    loadPosts();
  }, [result]);

  // Add post handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const data = await addPost(apiUrl, { title, content, published });
      setResult(data);
      setTitle("");
      setContent("");
      setPublished(true);
    } catch (err: any) {
      setError(err?.message || "Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  // Edit handler
  const handleEdit = (post: any) => {
    setEditPost(post);
    setEditError(null);
  };

  // Update handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPost) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const updated = await updatePost(apiUrl, editPost.id, {
        title: editPost.title,
        content: editPost.content,
        published: editPost.published,
      });
      setResult(updated); // triggers posts reload
      setEditPost(null);
    } catch (err: any) {
      setEditError(err?.message || "Failed to update post.");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete handler (opens modal)
  const handleDelete = (id: string) => {
    setDeletePostId(id);
    setDeleteError(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deletePostId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await deletePost(apiUrl, deletePostId);
      setResult({ deleted: deletePostId }); // triggers posts reload
      setDeletePostId(null);
    } catch (err: any) {
      setDeleteError(err?.message || "Failed to delete post.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
        <span className="inline-block w-2 h-8 bg-blue-500 rounded-full mr-2"></span>
        POSTCRUDContTwoHQ
      </h2>
      <button
        className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-semibold transition"
        onClick={() => setShowAdd((prev) => !prev)}
        type="button"
      >
        {showAdd ? "Hide Add Post" : "Show Add Post"}
      </button>
      {showAdd && (
        <AddPostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          published={published}
          setPublished={setPublished}
          loading={loading}
          error={error}
          result={result}
          onSubmit={handleSubmit}
        />
      )}
      {/* Edit Modal */}
      <EditPostModal
        editPost={editPost}
        editLoading={editLoading}
        editError={editError}
        onChange={(field, value) =>
          setEditPost((prev: any) => ({ ...prev, [field]: value }))
        }
        onCancel={() => setEditPost(null)}
        onSubmit={handleUpdate}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={!!deletePostId}
        loading={deleteLoading}
        error={deleteError}
        onConfirm={confirmDelete}
        onCancel={() => setDeletePostId(null)}
      />
      <PostsList
        posts={posts}
        loading={postsLoading}
        error={postsError}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default POSTCRUDContTwoHQ;
