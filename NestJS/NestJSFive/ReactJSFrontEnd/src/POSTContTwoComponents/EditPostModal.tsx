import React from "react";

interface EditPostModalProps {
  editPost: any;
  editLoading: boolean;
  editError: string | null;
  onChange: (field: string, value: any) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  editPost,
  editLoading,
  editError,
  onChange,
  onCancel,
  onSubmit,
}) => {
  if (!editPost) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <h3 className="text-lg font-bold mb-4">Edit Post</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={editPost.title}
              onChange={(e) => onChange("title", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Content
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={editPost.content}
              onChange={(e) => onChange("content", e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="edit-published"
              checked={editPost.published}
              onChange={(e) => onChange("published", e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="edit-published" className="text-gray-700">
              Published
            </label>
          </div>
          {editError && (
            <div className="text-red-600 font-semibold">{editError}</div>
          )}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold shadow disabled:opacity-60"
              disabled={editLoading}
            >
              {editLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 font-semibold"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
