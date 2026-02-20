import React from "react";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => (
  <div className="mb-4">
    <span className="font-semibold text-gray-700">Content:</span>
    <div className="mt-2 text-gray-800 whitespace-pre-line">{content}</div>
  </div>
);

export default PostContent;
