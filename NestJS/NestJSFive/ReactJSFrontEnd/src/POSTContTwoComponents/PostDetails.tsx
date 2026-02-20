import PostContent from "./PostContent";
import React, { useEffect, useState } from "react";
import {
  fetchPost,
  fetchFiles,
  fetchLinkedImages,
  fetchFilePublicUrl,
} from "../Utils/postDetailsApi";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import FilePreviewList from "./FilePreviewList";
import LinkFileForm from "./LinkFileForm";
import LinkedImagesList from "./LinkedImagesList";
import PostMetaInfo from "./PostMetaInfo";

interface PostDetailsData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string | null;
}

interface LinkedImage {
  id: number;
  postId: string;
  fileId: string;
  createdAt: string;
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAccessToken } = useAuth();
  const [post, setPost] = useState<PostDetailsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [fileUrls, setFileUrls] = useState<{ [id: string]: string }>({});
  const [selectedFileId, setSelectedFileId] = useState<string>("");
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [linkResult, setLinkResult] = useState<any>(null);
  const [linkedImages, setLinkedImages] = useState<LinkedImage[]>([]);
  const [linkedImageUrls, setLinkedImageUrls] = useState<{
    [fileId: string]: string;
  }>({});

  useEffect(() => {
    if (!id) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    setLoading(true);
    setError(null);
    fetchPost(id, apiUrl)
      .then((data) => setPost(data))
      .catch((err) => setError(err?.message || "Error fetching post details"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = getAccessToken();
    setFilesLoading(true);
    setFilesError(null);
    fetchFiles(apiUrl, token)
      .then((data) => {
        setFiles(data);
        // Fetch public URLs for image files
        return Promise.all(
          data
            .filter((file: any) => file.mimeType.startsWith("image/"))
            .map(async (file: any) => ({
              id: file.id,
              url: await fetchFilePublicUrl(file.id, apiUrl, token),
            })),
        );
      })
      .then((urlResults) => {
        const urlMap: { [id: string]: string } = {};
        urlResults.forEach(({ id, url }) => {
          if (url) urlMap[id] = url;
        });
        setFileUrls(urlMap);
      })
      .catch((err) => setFilesError(err?.message || "Error fetching files"))
      .finally(() => setFilesLoading(false));
  }, [getAccessToken]);

  // Fetch linked images for this post and their public URLs
  useEffect(() => {
    if (!id) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = getAccessToken();
    fetchLinkedImages(id, apiUrl)
      .then((data) => {
        setLinkedImages(data.images || []);
        return Promise.all(
          (data.images || []).map(async (img: LinkedImage) => ({
            fileId: img.fileId,
            url: await fetchFilePublicUrl(img.fileId, apiUrl, token),
          })),
        );
      })
      .then((urlResults) => {
        const urlMap: { [fileId: string]: string } = {};
        urlResults.forEach(({ fileId, url }) => {
          if (url) urlMap[fileId] = url;
        });
        setLinkedImageUrls(urlMap);
      })
      .catch(() => {
        setLinkedImages([]);
        setLinkedImageUrls({});
      });
  }, [id, linkResult]);

  const handleLinkFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileId || !post?.id) return;
    setLinkLoading(true);
    setLinkError(null);
    setLinkResult(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = getAccessToken();
      const res = await fetch(`${apiUrl}/posts/add-image-uuid`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ postId: post.id, fileId: selectedFileId }),
      });
      if (!res.ok) throw new Error("Failed to link file to post");
      const data = await res.json();
      setLinkResult(data);
    } catch (err: any) {
      setLinkError(err?.message || "Error linking file");
    } finally {
      setLinkLoading(false);
    }
  };

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error)
    return <div className="py-8 text-center text-red-600">{error}</div>;
  if (!post) return <div className="py-8 text-center">No post found.</div>;

  const selectedFile = files.find((file) => file.id === selectedFileId);

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Post Details</h2>
      <PostMetaInfo
        title={post.title}
        published={post.published}
        authorId={post.authorId}
        postId={post.id}
      />
      <PostContent content={post.content} />
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2 text-purple-700">
          Linked Images
        </h3>
        <LinkedImagesList
          linkedImages={linkedImages}
          linkedImageUrls={linkedImageUrls}
        />
        <h3 className="text-lg font-bold mb-2 text-purple-700">All Files</h3>
        {filesLoading ? (
          <div className="text-gray-500">Loading files...</div>
        ) : filesError ? (
          <div className="text-red-600">{filesError}</div>
        ) : files.length === 0 ? (
          <div className="text-gray-500">No files found.</div>
        ) : (
          <>
            <FilePreviewList
              files={files}
              fileUrls={fileUrls}
              selectedFileId={selectedFileId}
              setSelectedFileId={setSelectedFileId}
            />
            <LinkFileForm
              selectedFile={selectedFile}
              linkLoading={linkLoading}
              linkError={linkError}
              linkResult={linkResult}
              onSubmit={handleLinkFile}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
