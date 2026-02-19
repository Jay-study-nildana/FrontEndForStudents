/**
 * FilesHQ Upload and Refresh Sequence (Educational Explanation)
 *
 * 1. The FilesHQ component acts as the main container for file management.
 * 2. It manages a state variable called `refreshKey`.
 *    - This variable is used as a signal to tell the FilesList component when to re-fetch the list of files from the server.
 *
 * 3. The FileUploadCollapsible component (which contains the file upload form) is rendered at the top.
 *    - It receives a prop called `onUploadSuccess`, which is a callback function defined in FilesHQ.
 *    - This callback is triggered after a file is successfully uploaded.
 *
 * 4. When a user uploads a file:
 *    - The FileUpload component (inside FileUploadCollapsible) sends the file to the server.
 *    - If the upload is successful, it calls the `onUploadSuccess` callback.
 *    - This callback increments the `refreshKey` state in FilesHQ.
 *
 * 5. The FilesList component receives `refreshKey` as a prop.
 *    - FilesList uses a React effect hook (`useEffect`) that depends on `refreshKey`.
 *    - When `refreshKey` changes, FilesList re-fetches the list of files from the server, ensuring the new file appears in the list.
 *
 * 6. This pattern ("lifting state up") allows the upload and list components to remain decoupled, but still communicate via the parent FilesHQ.
 *    - It ensures the UI is always up to date after uploads, without requiring a full page reload.
 *
 * 7. This is a common React pattern for coordinating actions between sibling components via their shared parent.
 */
import React, { useCallback, useState } from "react";
import FilesList from "./FilesList";
import FileUploadCollapsible from "./FileUploadCollapsible";

const FilesHQ: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be passed to FileUploadCollapsible and called after upload
  const handleUploadSuccess = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Files HQ</h2>
      <p className="text-gray-600 mb-8">
        File management central! Upload new files and see them appear in the list below without refreshing the page. The upload component signals the list to refresh after each successful upload, ensuring you always see the latest files. 
      </p>
      <div className="max-w-2xl mx-auto text-left">
        <FileUploadCollapsible onUploadSuccess={handleUploadSuccess} />
        <FilesList refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default FilesHQ;
