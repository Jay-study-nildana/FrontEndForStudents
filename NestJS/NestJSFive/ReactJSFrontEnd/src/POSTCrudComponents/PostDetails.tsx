import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { type ContoneDetailsResponseDTO } from "./DTOS/ContoneDetailsDTO";
import { type ContoneUpdateDTO } from "./DTOS/ContoneUpdateDTO";
import { fetchPostDetails } from "../Utils/postDetailsApi";
import { handleUpdatePost, handleDeletePost } from "../Utils/postCrudApi";
import EditPostForm from "./EditPostForm";
import { useAuth } from "../auth/AuthProvider";

// Fetch all files from the backend
export async function fetchAllFiles(token: string) {
  const apiBase = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiBase}/files/allthefiles`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }
  const files = await response.json();
  // For each file, fetch its URL
  const filesWithUrls = await Promise.all(
    files.map(async (file: any) => {
      const urlRes = await fetch(`${apiBase}/files/url/${file.id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!urlRes.ok) {
        throw new Error(`Failed to fetch URL for file ${file.id}`);
      }
      const { url } = await urlRes.json();
      return { ...file, url };
    }),
  );
  return filesWithUrls;
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ContoneDetailsResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imagesError, setImagesError] = useState<string | null>(null);
  const [linkedImages, setLinkedImages] = useState<any[]>([]);
  const [linkedImagesLoading, setLinkedImagesLoading] = useState(false);
  const [linkedImagesError, setLinkedImagesError] = useState<string | null>(
    null,
  );
  const [refreshLinkedImages, setRefreshLinkedImages] = useState(0);
  // Fetch images already linked to this post
  useEffect(() => {
    async function loadLinkedImages() {
      if (!id) return;
      setLinkedImagesLoading(true);
      setLinkedImagesError(null);
      try {
        const apiBase = import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${apiBase}/posts/${id}/images-uuid`,
          {
            method: "GET",
            headers: { accept: "application/json" },
          },
        );
        if (!res.ok) throw new Error("Failed to fetch linked images");
        const data = await res.json();
        // data.images is an array of { id, postId, fileId, createdAt }
        // For each, find the file info from images (if available) to get the URL
        const withUrls = (data.images || []).map((img: any) => {
          const file = images.find((f) => f.id === img.fileId);
          return file
            ? { ...img, url: file.url, originalName: file.originalName }
            : img;
        });
        setLinkedImages(withUrls);
      } catch (err: any) {
        setLinkedImagesError(err.message || "Failed to load linked images");
      }
      setLinkedImagesLoading(false);
    }
    loadLinkedImages();
  }, [id, images, refreshLinkedImages]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [linking, setLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [linkSuccess, setLinkSuccess] = useState<string | null>(null);
  // Function to link image to post
  const handleLinkImage = async () => {
    if (!id || !selectedImageId) return;
    setLinking(true);
    setLinkError(null);
    setLinkSuccess(null);
    try {
      const apiBase = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiBase}/posts/add-image-uuid`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: id, fileId: selectedImageId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to link image");
      }
      setLinkSuccess("Image linked successfully!");
      setSelectedImageId(null);
      setRefreshLinkedImages((c) => c + 1); // trigger reload of linked images
    } catch (err: any) {
      setLinkError(err.message || "Failed to link image");
    }
    setLinking(false);
  };
  const navigate = useNavigate();

  const { getAccessToken } = useAuth();
  const token = getAccessToken();

  useEffect(() => {
    if (id) fetchPostDetails(id, setPost, setLoading, setError);
  }, [id]);

  useEffect(() => {
    async function loadImages() {
      setImagesLoading(true);
      setImagesError(null);
      try {
        if (!token) throw new Error("No access token available");
        const files = await fetchAllFiles(token);
        setImages(files);
      } catch (err: any) {
        setImagesError(err.message || "Failed to load images");
      }
      setImagesLoading(false);
    }
    if (token) {
      loadImages();
    }
  }, [token]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!post) return <div className="text-center py-8">No details found.</div>;

  const handleUpdate = async (id: string, update: ContoneUpdateDTO) => {
    setEditLoading(true);
    await handleUpdatePost(id, update, setError, async () => {
      if (id) await fetchPostDetails(id, setPost, setLoading, setError);
    });
    setEditLoading(false);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!post) return;
    setDeleteLoading(true);
    await handleDeletePost(post.id, setError, async () => navigate("/posts"));
    setDeleteLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Post Details</h2>
      {/* Linked Images UI */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Linked Images</h3>
        {linkedImagesLoading && <div>Loading linked images...</div>}
        {linkedImagesError && (
          <div className="text-red-500">{linkedImagesError}</div>
        )}
        {!linkedImagesLoading &&
          !linkedImagesError &&
          linkedImages.length > 0 && (
            <div className="flex flex-wrap gap-4 max-h-40 overflow-y-auto border p-2 rounded bg-gray-50">
              {linkedImages.map((img) => (
                <div key={img.id} className="flex flex-col items-center w-20">
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.originalName || img.fileId}
                      className="w-12 h-12 object-cover rounded border mb-1"
                      style={{ background: "#eee" }}
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded border mb-1 text-xs text-gray-500">
                      No preview
                    </div>
                  )}
                  <span className="text-xs break-all text-center">
                    {img.originalName || img.fileId}
                  </span>
                </div>
              ))}
            </div>
          )}
        {!linkedImagesLoading &&
          !linkedImagesError &&
          linkedImages.length === 0 && (
            <div className="text-gray-400">No images linked to this post.</div>
          )}
      </div>
      {/* Link Image UI */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Link Image</h3>
        {imagesLoading && <div>Loading images...</div>}
        {imagesError && <div className="text-red-500">{imagesError}</div>}
        {linkError && <div className="text-red-500">{linkError}</div>}
        {linkSuccess && <div className="text-green-600">{linkSuccess}</div>}
        {!imagesLoading && !imagesError && images.length > 0 && (
          <>
            <div className="flex flex-wrap gap-4 max-h-40 overflow-y-auto border p-2 rounded bg-gray-50 mb-2">
              {images.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  className={`flex flex-col items-center w-20 focus:outline-none border-2 ${selectedImageId === img.id ? "border-purple-600" : "border-transparent"} rounded p-1 bg-white hover:bg-purple-50`}
                  onClick={() => setSelectedImageId(img.id)}
                  aria-pressed={selectedImageId === img.id}
                >
                  <img
                    src={img.url}
                    alt={img.originalName}
                    className="w-12 h-12 object-cover rounded border mb-1"
                    style={{ background: "#eee" }}
                  />
                  <span className="text-xs break-all text-center">
                    {img.originalName}
                  </span>
                  {selectedImageId === img.id && (
                    <span className="text-xs text-purple-700 font-bold mt-1">
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition disabled:opacity-60"
              onClick={handleLinkImage}
              disabled={!selectedImageId || linking}
            >
              {linking ? "Linking..." : "Link Selected Image"}
            </button>
          </>
        )}
        {!imagesLoading && !imagesError && images.length === 0 && (
          <div className="text-gray-400">No images available.</div>
        )}
      </div>
      {editing ? (
        <EditPostForm
          post={post}
          loading={editLoading}
          onCancel={() => setEditing(false)}
          onUpdate={handleUpdate}
        />
      ) : (
        <>
          <div className="mb-2">
            <span className="font-semibold">Title:</span> {post.title}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {post.description || (
              <span className="italic text-gray-400">No description</span>
            )}
          </div>
          <div className="mb-2 text-xs text-gray-500">
            <span>Created: {new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div className="mb-2 text-xs text-gray-500">
            <span>Updated: {new Date(post.updatedAt).toLocaleString()}</span>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-60"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
            <Link
              to="/posts"
              className="inline-block text-purple-600 hover:underline px-4 py-2"
            >
              Back to Posts
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
