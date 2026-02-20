import React from "react";

interface PostMetaInfoProps {
  title: string;
  published: boolean;
  authorId: string | null;
  postId: string;
}

const PostMetaInfo: React.FC<PostMetaInfoProps> = ({
  title,
  published,
  authorId,
  postId,
}) => (
  <>
    <div className="mb-4">
      <span className="font-semibold text-gray-700">Title:</span> {title}
    </div>
    <div className="mb-4">
      <span className="font-semibold text-gray-700">Published:</span>{" "}
      {published ? "Yes" : "No"}
    </div>
    <div className="mb-4">
      <span className="font-semibold text-gray-700">Author ID:</span>{" "}
      {authorId || "N/A"}
    </div>
    <div className="mb-4">
      <span className="font-semibold text-gray-700">Post ID:</span> {postId}
    </div>
  </>
);

export default PostMetaInfo;
