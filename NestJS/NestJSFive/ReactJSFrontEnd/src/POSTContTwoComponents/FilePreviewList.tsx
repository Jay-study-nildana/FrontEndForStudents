import React from "react";

interface FilePreviewListProps {
  files: any[];
  fileUrls: { [id: string]: string };
  selectedFileId: string;
  setSelectedFileId: (id: string) => void;
}

const FilePreviewList: React.FC<FilePreviewListProps> = ({
  files,
  fileUrls,
  selectedFileId,
  setSelectedFileId,
}) => (
  <ul
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6"
    style={{ listStyle: "none", padding: 0 }}
  >
    {files.map((file) => (
      <li
        key={file.id}
        className={`bg-gray-50 border border-gray-200 rounded p-3 flex flex-col items-center ${selectedFileId === file.id ? "ring-2 ring-purple-500" : ""}`}
      >
        <div className="font-semibold text-blue-700 text-center">
          {file.originalName}
        </div>
        {file.mimeType.startsWith("image/") && fileUrls[file.id] && (
          <div className="my-2">
            <img
              src={fileUrls[file.id]}
              alt={file.originalName}
              className="max-h-24 max-w-full rounded border cursor-pointer"
              style={{ objectFit: "cover" }}
              onClick={() => setSelectedFileId(file.id)}
              title={
                selectedFileId === file.id
                  ? "Selected"
                  : "Click to select this image"
              }
            />
            {selectedFileId === file.id && (
              <div className="text-xs text-purple-700 font-semibold mt-1 text-center">
                Selected for linking
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-500 text-center">
          {file.mimeType} | {file.size} bytes
        </div>
        <div className="text-xs text-gray-400 text-center">
          Created: {new Date(file.createdAt).toLocaleString()}
        </div>
        <div className="text-xs text-gray-400 text-center">ID: {file.id}</div>
      </li>
    ))}
  </ul>
);

export default FilePreviewList;
