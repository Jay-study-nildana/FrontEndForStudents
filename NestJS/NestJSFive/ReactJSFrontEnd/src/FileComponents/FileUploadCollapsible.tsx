import React, { useState } from "react";
import FileUpload from "./FileUpload";

interface FileUploadCollapsibleProps {
  onUploadSuccess?: () => void;
}

const FileUploadCollapsible: React.FC<FileUploadCollapsibleProps> = ({
  onUploadSuccess,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="file-upload-panel"
      >
        <span>{open ? "▼" : "►"}</span>
        <span>Upload a File</span>
      </button>
      {open && (
        <div id="file-upload-panel" className="mt-2">
          <FileUpload onUploadSuccess={onUploadSuccess} />
        </div>
      )}
    </div>
  );
};

export default FileUploadCollapsible;
