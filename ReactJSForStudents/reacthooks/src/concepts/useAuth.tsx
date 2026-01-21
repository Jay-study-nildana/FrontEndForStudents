import { useState, useEffect } from "react";
import type { JSX } from "react";

/**
 * Simple fake auth hook for demo purposes.
 * - simulates async login/logout
 * - preserves "auth" in sessionStorage for the session
 */
function useAuth() {
  const [user, setUser] = useState<{ name: string } | null>(() => {
    try {
      const s = sessionStorage.getItem("demo_auth_user");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (user) sessionStorage.setItem("demo_auth_user", JSON.stringify(user));
      else sessionStorage.removeItem("demo_auth_user");
    } catch {}
  }, [user]);

  async function login(name: string, password: string) {
    setLoading(true);
    setError(null);
    // fake remote call
    return new Promise<void>((res) => {
      setTimeout(() => {
        if (password === "password") {
          setUser({ name });
        } else {
          setError("Invalid credentials (use password: \"password\")");
        }
        setLoading(false);
        res();
      }, 700);
    });
  }

  async function logout() {
    setLoading(true);
    return new Promise<void>((res) => {
      setTimeout(() => {
        setUser(null);
        setLoading(false);
        res();
      }, 300);
    });
  }

  return { user, loading, error, login, logout };
}

export default function UseAuth(): JSX.Element {
  const { user, loading, error, login, logout } = useAuth();
  const [name, setName] = useState("student");
  const [password, setPassword] = useState("");

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">useAuth — basic auth demo</h2>

      {!user ? (
        <section className="space-y-3">
          <p className="text-sm text-slate-600">
            This page demonstrates a lightweight auth hook. Use password "password" to succeed.
          </p>

          <div className="flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 rounded"
              placeholder="Username"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border px-3 py-2 rounded"
              placeholder="Password"
            />
            <div className="flex gap-2">
              <button
                onClick={() => login(name, password)}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
              <button
                onClick={() => { setName("student"); setPassword("password"); }}
                className="px-3 py-2 border rounded"
              >
                Fill demo creds
              </button>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <p>
            Signed in as <strong>{user.name}</strong>.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => logout()}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-60"
            >
              {loading ? "Signing out…" : "Sign out"}
            </button>
            <button
              onClick={() => alert("Protected action executed")}
              className="px-4 py-2 bg-slate-200 rounded"
            >
              Do protected action
            </button>
          </div>

          <article className="mt-4 p-4 bg-white/90 dark:bg-slate-800 rounded">
            <h3 className="font-semibold">Protected content</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              When logged in, you can access actions guarded by auth state. This is a mock — replace with real auth for production.
            </p>
          </article>
        </section>
      )}
    </main>
  );
}