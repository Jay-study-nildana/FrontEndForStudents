import React, { useState } from "react";
import { type ContonePostDTO } from "./DTOS/ContoneDTO";

interface AddPostFormProps {
  onAdd: (post: ContonePostDTO) => void;
  loading: boolean;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAdd, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description: description.trim() || undefined });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4 text-purple-700">
        Add New Post
      </h3>
      <div className="mb-4">
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
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Post"}
      </button>
    </form>
  );
};

export default AddPostForm;
