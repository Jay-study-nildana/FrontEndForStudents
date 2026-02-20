import React from "react";
import LinkedImagesGrid from "./LinkedImagesGrid";

interface BlogPostCardProps {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  content,
  published,
}) => (
  <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border border-gray-100 magazine-post">
    <LinkedImagesGrid postId={id} />
    <div className="p-6">
      <h3 className="text-3xl font-extrabold text-purple-900 mb-3 leading-tight magazine-title">
        {title}
      </h3>
      <div className="text-gray-700 text-lg mb-4 whitespace-pre-line leading-relaxed magazine-content">
        {content}
      </div>
      {/* Optionally, you can add a subtle published badge or date here if desired */}
    </div>
  </article>
);

export default BlogPostCard;
