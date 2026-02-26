import React, { useState } from "react";
import TokenExpiryTimer from "./TokenExpiryTimer";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

// ...existing code...

const UserProfile: React.FC = () => {
  const { isAuthenticated, getEmail, getRoles, tokens, refreshAccessToken } =
    useAuth();
  const [copied, setCopied] = useState<string | null>(null);
  // const navigate = useNavigate();
  const [countdown, _setCountdown] = useState(10);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  const handleRefreshToken = async () => {
    try {
      await refreshAccessToken();
    } catch (err) {
      alert("Failed to refresh access token.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">User Profile</h2>
        <p className="text-red-600 mb-2">You are not logged in.</p>
        <p className="mb-2">
          Redirecting to login in{" "}
          <span className="font-semibold">{countdown}</span> second
          {countdown !== 1 ? "s" : ""}...
        </p>
        <p>
          <a
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Go to login now
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {getEmail()}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Roles:</span> {getRoles().join(", ")}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <Link
          to="/posts"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Posts (In Memory DB. ContOne endpoints)
        </Link>
        <Link
          to="/posts-cont-two"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Posts (PostGre DB. ContTwo endpoints)
        </Link>
        <Link
          to="/role-check"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Role Check
        </Link>
        <Link
          to="/files-hq"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Files HQ
        </Link>
        <Link
          to="/posts-cont-two-search"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Search Posts (Cont Two, PostGre DB)
        </Link>
        <Link
          to="/posts/public"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Public Posts (Cont One, In Memory DB)
        </Link>
        <Link
          to="/posts-cont-two-public"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          Go to Public Posts (Cont Two, PostGre DB)
        </Link>
        {getRoles().includes("admin") ? (
          <Link
            to="/admin"
            className="text-blue-600 hover:underline font-semibold text-sm"
          >
            Go to Admin Panel
          </Link>
        ) : (
          <span
            className="text-gray-400 font-semibold text-sm cursor-not-allowed select-none"
            title="Admin role required"
          >
            Go to Admin Panel
          </span>
        )}
      </div>
      {tokens && (
        <>
          <div className="mb-2">
            <span className="font-semibold">Access Token:</span>
            <button
              className="ml-2 text-xs text-blue-600 hover:underline"
              type="button"
              onClick={() => handleCopy(tokens.access_token, "access")}
            >
              {copied === "access" ? "Copied!" : "Copy"}
            </button>
            <button
              className="ml-2 text-xs text-green-600 hover:underline border border-green-600 rounded px-2"
              type="button"
              onClick={handleRefreshToken}
            >
              Refresh Access Token
            </button>
            <div className="break-all text-xs bg-gray-100 p-2 rounded mt-1">
              {tokens.access_token}
            </div>
            <TokenExpiryTimer token={tokens.access_token} />
          </div>
          <div className="mb-2">
            <span className="font-semibold">Refresh Token:</span>
            <button
              className="ml-2 text-xs text-blue-600 hover:underline"
              type="button"
              onClick={() => handleCopy(tokens.refresh_token, "refresh")}
            >
              {copied === "refresh" ? "Copied!" : "Copy"}
            </button>
            <div className="break-all text-xs bg-gray-100 p-2 rounded mt-1">
              {tokens.refresh_token}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
