import React, { useState } from "react";
import SearchPostsResults from "./SearchPostsResults";

export interface PostItem {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string | null;
}

interface SearchResponse {
  items: PostItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const SearchPostsView: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [results, setResults] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        sortBy: "title",
        sortOrder: "asc",
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(title && { title }),
        ...(content && { content }),
      });
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiUrl}/posts/search?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SearchResponse = await response.json();
      setResults(Array.isArray(data.items) ? data.items : []);
      setTotalPages(typeof data.totalPages === "number" ? data.totalPages : 1);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

    const handleReset = () => {
    console.log("Resetting search form and results");
    setTitle("");
    setContent("");
    setPage(1);
    setPageSize(5);
    setError(null);
    setResults([]); // <-- Add this line to clear results
    // Do not call handleSearch here; just reset form for user to do a fresh search
    };

  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <div className="p-6 mx-auto border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Search Posts</h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 transition border border-gray-300"
          onClick={handleReset}
          disabled={loading}
        >
          Reset Search
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <SearchPostsResults
        results={results}
        loading={loading}
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default SearchPostsView;