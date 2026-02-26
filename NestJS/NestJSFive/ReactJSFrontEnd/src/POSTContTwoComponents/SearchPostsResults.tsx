import React from "react";
import { type PostItem } from "./SearchPostsView";

interface SearchPostsResultsProps {
  results: PostItem[];
  loading: boolean;
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const SearchPostsResults: React.FC<SearchPostsResultsProps> = ({
  results,
  loading,
  page,
  totalPages,
  total,
  pageSize,
  setPage,
  setPageSize,
}) => (
  <>
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border w-40">Title</th>
            <th className="px-3 py-2 border w-96">Content</th>
            <th className="px-3 py-2 border w-24">Published</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 && !loading ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-400">
                No posts found.
              </td>
            </tr>
          ) : (
            results.map((post) => (
              <tr key={post.id} className="hover:bg-blue-50">
                <td
                  className="px-3 py-2 border font-medium w-40 truncate"
                  style={{ maxWidth: "10rem" }}
                >
                  {post.title}
                </td>
                <td
                  className="px-3 py-2 border w-96"
                  style={{ maxWidth: "24rem" }}
                >
                  <ContentCollapse content={post.content} />
                </td>
                <td
                  className="px-3 py-2 border text-center w-24"
                  style={{ maxWidth: "6rem" }}
                >
                  {post.published ? "Yes" : "No"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-between mt-6">
      <div className="text-gray-600 text-sm">
        Showing page {page} of {totalPages} ({total} results)
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
        >
          Next
        </button>
      </div>
      <div>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          disabled={loading}
        >
          {[1, 5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  </>
);

export default SearchPostsResults;

// Collapse component for post content
const ContentCollapse: React.FC<{ content: string }> = ({ content }) => {
  const [expanded, setExpanded] = React.useState(false);
  const lines = content.split("\n");
  const previewLines = lines.slice(0, 3);
  const previewChars = content.slice(0, 200);
  const hasMore = lines.length > 3 || content.length > 200;
  return (
    <div>
      <div
        className={
          expanded ? "" : "max-h-24 overflow-hidden whitespace-pre-line"
        }
      >
        {expanded ? (
          <span className="whitespace-pre-line">{content}</span>
        ) : (
          <span className="whitespace-pre-line">
            {lines.length > 3
              ? previewLines.join("\n")
              : previewChars + (content.length > 200 ? "..." : "")}
          </span>
        )}
      </div>
      {hasMore && (
        <button
          className="mt-1 text-xs text-blue-600 hover:underline focus:outline-none"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Collapse" : "View More"}
        </button>
      )}
    </div>
  );
};
