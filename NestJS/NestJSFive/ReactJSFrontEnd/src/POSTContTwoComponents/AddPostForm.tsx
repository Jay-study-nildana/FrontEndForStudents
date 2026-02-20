import React from "react";
import FieldLoader from "../Utils/FieldLoader";

interface AddPostFormProps {
  title: string;
  setTitle: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  published: boolean;
  setPublished: (v: boolean) => void;
  loading: boolean;
  error: string | null;
  result: any;
  onSubmit: (e: React.FormEvent) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  published,
  setPublished,
  loading,
  error,
  result,
  onSubmit,
}) => {
  return (
    <>
      {loading && (
        <div className="mb-4">
          <FieldLoader />
        </div>
      )}
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Content
          </label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            rows={4}
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="published" className="text-gray-700">
            Published
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold shadow disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Post"}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <div className="font-semibold text-green-700 mb-2">
            Post Added Successfully!
          </div>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};

export default AddPostForm;
