import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await register(email, password, name);
      setSuccess("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");
      setName("");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      {success && <div className="mb-2 text-green-700">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="mt-4 text-center">
        <span className="text-sm text-slate-600">
          Already have an account?{" "}
        </span>
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
