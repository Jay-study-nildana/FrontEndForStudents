import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { type FileItemDTO } from "./DTO/FileItemDTO";
import { fetchFilesWithUrls, fetchCurrentUserId } from "../Utils/fileFetchers";
import FileListDisplay from "./FileListDisplay";
import UserFilesList from "./UserFilesList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface FilesListProps {
  refreshKey?: number;
}

const FilesList: React.FC<FilesListProps> = ({ refreshKey }) => {
  const { tokens } = useAuth();
  const [files, setFiles] = useState<FileItemDTO[]>([]);
  const [fileUrls, setFileUrls] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "user">("all");
  // User files state
  const [userFiles, setUserFiles] = useState<FileItemDTO[]>([]);
  const [userFileUrls, setUserFileUrls] = useState<{ [id: string]: string }>(
    {},
  );
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!tokens?.access_token) return;
        const { files, fileUrls } = await fetchFilesWithUrls({
          apiUrl: API_URL,
          accessToken: tokens.access_token,
          allFiles: true,
        });
        setFiles(files);
        setFileUrls(fileUrls);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, refreshKey]);

  // Fetch user files when User Files tab is active
  useEffect(() => {
    const fetchUserFiles = async () => {
      if (activeTab !== "user" || !tokens?.access_token) return;
      setUserLoading(true);
      setUserError(null);
      try {
        const userId = await fetchCurrentUserId({
          apiUrl: API_URL,
          accessToken: tokens.access_token,
        });
        const { files, fileUrls } = await fetchFilesWithUrls({
          apiUrl: API_URL,
          accessToken: tokens.access_token,
          userId,
        });
        setUserFiles(files);
        setUserFileUrls(fileUrls);
      } catch (err: any) {
        setUserError(err.message || "Unknown error");
      } finally {
        setUserLoading(false);
      }
    };
    fetchUserFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tokens, refreshKey]);

  // Tab navigation UI
  const tabButtonClass = (tab: "all" | "user") =>
    `px-4 py-2 rounded-t font-semibold focus:outline-none ${
      activeTab === tab
        ? "bg-white border-x border-t border-b-0 border-gray-300"
        : "bg-gray-200 hover:bg-gray-300 border-b border-gray-300"
    }`;

  return (
    <div>
      <div className="flex space-x-2 mb-4 border-b border-gray-300">
        <button
          className={tabButtonClass("all")}
          onClick={() => setActiveTab("all")}
          aria-selected={activeTab === "all"}
        >
          All Files
        </button>
        <button
          className={tabButtonClass("user")}
          onClick={() => setActiveTab("user")}
          aria-selected={activeTab === "user"}
        >
          User Files
        </button>
      </div>

      {activeTab === "all" && (
        <FileListDisplay
          files={files}
          fileUrls={fileUrls}
          loading={loading}
          error={error}
        />
      )}

      {activeTab === "user" && (
        <UserFilesList
          files={userFiles}
          fileUrls={userFileUrls}
          loading={userLoading}
          error={userError}
        />
      )}
    </div>
  );
};

export default FilesList;
