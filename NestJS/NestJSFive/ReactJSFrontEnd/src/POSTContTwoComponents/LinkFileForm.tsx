import React from "react";

interface LinkFileFormProps {
  selectedFile: any;
  linkLoading: boolean;
  linkError: string | null;
  linkResult: any;
  onSubmit: (e: React.FormEvent) => void;
}

const LinkFileForm: React.FC<LinkFileFormProps> = ({
  selectedFile,
  linkLoading,
  linkError,
  linkResult,
  onSubmit,
}) => (
  <form
    className="mt-6 p-4 bg-purple-50 rounded border border-purple-200"
    onSubmit={onSubmit}
  >
    <h4 className="font-semibold mb-2 text-purple-700">
      Link a file to this post
    </h4>
    <div className="flex items-center gap-2 mb-4">
      {selectedFile ? (
        <span className="text-sm text-purple-700 font-semibold">
          Selected: {selectedFile.originalName} ({selectedFile.mimeType})
        </span>
      ) : (
        <span className="text-sm text-gray-500">
          Select an image above to link
        </span>
      )}
      <button
        type="submit"
        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 font-semibold text-sm disabled:opacity-60"
        disabled={linkLoading || !selectedFile}
      >
        {linkLoading ? "Linking..." : "Link File"}
      </button>
    </div>
    {linkError && <div className="text-red-600 mb-2">{linkError}</div>}
    {linkResult && (
      <div className="text-green-700 font-semibold mb-2">
        File linked! (ID: {linkResult.id})
      </div>
    )}
  </form>
);

export default LinkFileForm;
