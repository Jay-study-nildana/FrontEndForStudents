import React from "react";
import FileImage from "./FileImage";
import FieldLoader from "../Utils/FieldLoader";
import { type FileItemDTO } from "./DTO/FileItemDTO";

interface FileListDisplayProps {
  files: FileItemDTO[];
  fileUrls: { [id: string]: string };
  loading: boolean;
  error: string | null;
}

const FileListDisplay: React.FC<FileListDisplayProps> = ({ files, fileUrls, loading, error }) => {
  if (loading) {
    return (
      <div>
        <ul className="space-y-4">
          <li className="border p-4 rounded bg-gray-50">
            <div><span className="font-semibold">Name:</span> <FieldLoader /></div>
            <div><span className="font-semibold">Type:</span> <FieldLoader /></div>
            <div><span className="font-semibold">Size:</span> <FieldLoader /></div>
            <div><span className="font-semibold">Public:</span> <FieldLoader /></div>
            <div><span className="font-semibold">Created:</span> <FieldLoader /></div>
            <div className="mt-2 space-y-2"><FieldLoader /></div>
          </li>
        </ul>
      </div>
    );
  }
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (files.length === 0) return <div>No files found.</div>;
  return (
    <ul className="space-y-4">
      {files.map((file) => (
        <li key={file.id} className="border p-4 rounded bg-gray-50">
          <div>
            <span className="font-semibold">Name:</span> <span>{file.originalName}</span>
          </div>
          <div>
            <span className="font-semibold">Type:</span> <span>{file.mimeType}</span>
          </div>
          <div>
            <span className="font-semibold">Size:</span> <span>{file.size} bytes</span>
          </div>
          <div>
            <span className="font-semibold">Public:</span> <span>{file.isPublic ? "Yes" : "No"}</span>
          </div>
          <div>
            <span className="font-semibold">Created:</span> <span>{new Date(file.createdAt).toLocaleString()}</span>
          </div>
          <div className="mt-2 space-y-2">
            {fileUrls[file.id] ? (
              <>
                <a
                  href={fileUrls[file.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View File
                </a>
                {file.mimeType === "image/jpeg" && (
                  <FileImage url={fileUrls[file.id]} alt={file.originalName} />
                )}
              </>
            ) : (
              <FieldLoader />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileListDisplay;
