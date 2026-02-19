import React, { useState } from "react";
import { type ContonePostDTO, type ContoneResponseDTO } from "./DTOS/ContoneDTO";
// import type { ContoneUpdateDTO } from "./DTOS/ContoneUpdateDTO";

interface EditPostFormProps {
  post: ContoneResponseDTO;
  onUpdate: (id: string, update: ContonePostDTO) => void;
  onCancel: () => void;
  loading: boolean;
}

const EditPostForm: React.FC<EditPostFormProps> = ({
  post,
  onUpdate,
  onCancel,
  loading,
}) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onUpdate(post.id, { title, description: description.trim() || undefined });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 mb-2"
    >
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">
          Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          disabled={loading}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
