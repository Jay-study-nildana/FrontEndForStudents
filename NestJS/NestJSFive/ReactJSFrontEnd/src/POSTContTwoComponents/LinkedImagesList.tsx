import React from "react";

interface LinkedImage {
  id: number;
  postId: string;
  fileId: string;
  createdAt: string;
}

interface LinkedImagesListProps {
  linkedImages: LinkedImage[];
  linkedImageUrls: { [fileId: string]: string };
}

const LinkedImagesList: React.FC<LinkedImagesListProps> = ({
  linkedImages,
  linkedImageUrls,
}) => {
  if (linkedImages.length === 0) {
    return <div className="text-gray-500">No images linked to this post.</div>;
  }
  return (
    <ul
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6"
      style={{ listStyle: "none", padding: 0 }}
    >
      {linkedImages.map((img) => (
        <li key={img.id} className="flex flex-col items-center">
          {linkedImageUrls[img.fileId] ? (
            <img
              src={linkedImageUrls[img.fileId]}
              alt={img.fileId}
              className="max-h-24 max-w-full rounded border"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded border text-xs text-gray-500">
              No preview
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            File ID: {img.fileId}
          </div>
          <div className="text-xs text-gray-400">
            Linked: {new Date(img.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LinkedImagesList;
