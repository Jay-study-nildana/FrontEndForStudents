import React from "react";
import FileListDisplay from "./FileListDisplay";
import { type FileItemDTO } from "./DTO/FileItemDTO";

interface UserFilesListProps {
  files: FileItemDTO[];
  fileUrls: { [id: string]: string };
  loading: boolean;
  error: string | null;
}

const UserFilesList: React.FC<UserFilesListProps> = ({ files, fileUrls, loading, error }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">User Files</h3>
      <FileListDisplay files={files} fileUrls={fileUrls} loading={loading} error={error} />
    </div>
  );
};

export default UserFilesList;
