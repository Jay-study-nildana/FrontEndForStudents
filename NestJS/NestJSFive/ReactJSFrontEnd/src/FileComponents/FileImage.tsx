import React from "react";

interface FileImageProps {
  url: string;
  alt?: string;
  className?: string;
}

const FileImage: React.FC<FileImageProps> = ({
  url,
  alt = "Image",
  className,
}) => {
  return (
    <img
      src={url}
      alt={alt}
      className={className || "max-w-xs max-h-60 rounded shadow border mt-2"}
      loading="lazy"
    />
  );
};

export default FileImage;
