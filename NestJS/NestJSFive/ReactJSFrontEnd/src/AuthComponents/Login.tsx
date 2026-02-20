// src/components/Login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { login, isAuthenticated, getEmail } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [email, setEmail] = useState("seed@example.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    if (countdown === 0) {
      navigate("/profile");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, countdown, navigate]);

  if (isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">
          Welcome, {getEmail() || "User"}!
        </h2>
        <p className="mb-2">You are logged in.</p>
        <p className="mb-2">
          Redirecting to your profile in{" "}
          <span className="font-semibold">{countdown}</span> second
          {countdown !== 1 ? "s" : ""}...
        </p>
        <p>
          <a
            href="/profile"
            className="text-blue-600 hover:underline font-semibold"
          >
            Go to your profile now
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="mt-4 text-center">
        <span className="text-sm text-slate-600">Don't have an account? </span>
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-semibold"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;
