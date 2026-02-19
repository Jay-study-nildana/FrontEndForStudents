import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import FieldLoader from "../Utils/FieldLoader";
// import { fetchWrapper } from "../api/fetchWrapper";

const endpoints = [
  { label: "Public Info", path: "/auth/public-info" },
  { label: "Protected", path: "/auth/protected" },
  { label: "Admin Only", path: "/auth/admin-only" },
  { label: "User Only", path: "/auth/user-only" },
];

const RoleCheck: React.FC = () => {
  const { getAccessToken } = useAuth();
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleCheck = async (label: string, path: string) => {
    setLoading(label);
    setError(null);
    try {
      const token = getAccessToken();
      const url = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${path}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }
      setResults((prev) => ({ ...prev, [label]: data }));
      setOpenAccordion(label);
    } catch (err: any) {
      setError(err.message || "Error fetching endpoint");
      setResults((prev) => ({ ...prev, [label]: null }));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Role Check</h2>
      <div className="flex flex-col gap-3 mb-4">
        {endpoints.map((ep) => (
          <div key={ep.label}>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-60 w-full text-left"
              onClick={() => handleCheck(ep.label, ep.path)}
              disabled={loading === ep.label}
            >
              {loading === ep.label
                ? `Checking ${ep.label}...`
                : `Check ${ep.label}`}
            </button>
            {/* Accordion for response or loader */}
            <div className="mt-2">
              {loading === ep.label ? (
                <FieldLoader />
              ) : results[ep.label] !== undefined ? (
                <>
                  <button
                    className="text-xs text-blue-700 underline mb-1"
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === ep.label ? null : ep.label)}
                  >
                    {openAccordion === ep.label ? "Hide Response" : "Show Response"}
                  </button>
                  {openAccordion === ep.label && (
                    <div className="bg-gray-100 rounded p-3">
                      <div className="font-semibold mb-1">{ep.label} Result:</div>
                      <pre className="text-xs break-all whitespace-pre-wrap">
                        {JSON.stringify(results[ep.label], null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {error && <div className="mb-2 text-red-600">{error}</div>}
    </div>
  );
};

export default RoleCheck;
