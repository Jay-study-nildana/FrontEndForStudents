import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import FieldLoader from "../Utils/FieldLoader";
import { type FileUploadResponseDTO } from "./FileUploadResponseDTO";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialResponse: FileUploadResponseDTO | null = null;

interface FileUploadProps {
  onUploadSuccess?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const { tokens } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<FileUploadResponseDTO | null>(
    initialResponse,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setResponse(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("isPublic", String(isPublic));
      const res = await fetch(`${API_URL}/files`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tokens?.access_token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setResponse(data);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded bg-white">
      <h3 className="text-xl font-bold mb-4">Upload a File</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full border rounded p-2"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading || !file}
        >
          Upload
        </button>
      </form>
      {loading && (
        <div className="mt-4">
          <FieldLoader />
          <div className="space-y-2 mt-2">
            <div>
              <span className="font-semibold">Name:</span> <FieldLoader />
            </div>
            <div>
              <span className="font-semibold">Storage Name:</span>{" "}
              <FieldLoader />
            </div>
            <div>
              <span className="font-semibold">Type:</span> <FieldLoader />
            </div>
            <div>
              <span className="font-semibold">Size:</span> <FieldLoader />
            </div>
            <div>
              <span className="font-semibold">Public:</span> <FieldLoader />
            </div>
            <div>
              <span className="font-semibold">Created:</span> <FieldLoader />
            </div>
          </div>
        </div>
      )}
      {error && <div className="text-red-600 mt-4">Error: {error}</div>}
      {response && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold mb-2">Upload Result</h4>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Name:</span>{" "}
              <span>{response.originalName}</span>
            </div>
            <div>
              <span className="font-semibold">Storage Name:</span>{" "}
              <span>{response.storageName}</span>
            </div>
            <div>
              <span className="font-semibold">Type:</span>{" "}
              <span>{response.mimeType}</span>
            </div>
            <div>
              <span className="font-semibold">Size:</span>{" "}
              <span>{response.size} bytes</span>
            </div>
            <div>
              <span className="font-semibold">Public:</span>{" "}
              <span>{response.isPublic ? "Yes" : "No"}</span>
            </div>
            <div>
              <span className="font-semibold">Created:</span>{" "}
              <span>{new Date(response.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
