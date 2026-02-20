import React from "react";

interface DeleteConfirmModalProps {
  open: boolean;
  loading: boolean;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  loading,
  error,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <h3 className="text-lg font-bold mb-4 text-red-700">Confirm Delete</h3>
        <p className="mb-4">Are you sure you want to delete this post?</p>
        {error && (
          <div className="text-red-600 font-semibold mb-2">{error}</div>
        )}
        <div className="flex gap-2 mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold shadow disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 font-semibold"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
