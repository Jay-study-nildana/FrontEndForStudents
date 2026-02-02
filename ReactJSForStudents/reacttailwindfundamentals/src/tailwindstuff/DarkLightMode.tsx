import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

/**
 * DarkLightMode.tsx
 *
 * Self-contained React + TypeScript component demonstrating dark/light themes
 * and a variety of common UI components styled with Tailwind CSS:
 * - Theme toggle (applies "dark" class to <html>)
 * - Buttons (primary, outline, ghost) with hover/focus states
 * - Form inputs with validation styles
 * - Cards (with avatar and badge)
 * - Responsive table
 * - Tabs
 * - Accordion
 * - Modal (basic focus management)
 * - Toast notification
 * - Progress bar and small helper utilities
 *
 * Drop into src/components and render <ThemeShowcase /> from your app.
 */

export default function DarkLightMode(): JSX.Element {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  // Modal state + focus management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      // Move focus to modal close button after opening
      modalCloseRef.current?.focus();
      // prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Toast
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  // Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "reviews">("overview");

  // Accordion
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const emailIsValid = /\S+@\S+\.\S+/.test(email);

  // Progress (demo)
  const [progress, setProgress] = useState(42);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top controls */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dark / Light UI Showcase (TODO: as of now, not working)</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setToast({ show: true, message: `Switched to ${!dark ? "dark" : "light"} theme` });
                setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
                setDark((d) => !d);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-linear-to-tr from-indigo-600 to-pink-500 text-white text-sm shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              aria-pressed={dark}
              title="Toggle theme"
            >
              {dark ? "Switch to Light" : "Switch to Dark"}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Open Modal
            </button>
          </div>
        </div>

        {/* Buttons row */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Buttons</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              Primary
            </button>
            <button className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              Outline
            </button>
            <button className="px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
              Ghost
            </button>

            <button
              onClick={() => {
                setToast({ show: true, message: "Saved settings" });
                setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
              }}
              className="px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              Save (toast)
            </button>
          </div>
        </section>

        {/* Form and validation */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Simple form</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!emailIsValid) {
                  setToast({ show: true, message: "Please enter a valid email." });
                  setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
                  return;
                }
                setToast({ show: true, message: `Thanks, ${name || "friend"}!` });
                setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
              }}
              className="space-y-4"
            >
              <label className="block text-sm">
                <span className="font-medium">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full rounded-md px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 ${
                    email.length === 0
                      ? "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus-visible:ring-indigo-400"
                      : emailIsValid
                      ? "border border-green-300 dark:border-green-700 bg-white dark:bg-gray-900 focus-visible:ring-green-400"
                      : "border border-red-300 dark:border-red-700 bg-white dark:bg-gray-900 focus-visible:ring-red-400"
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={!emailIsValid && email.length > 0}
                />
                {!emailIsValid && email.length > 0 ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">Enter a valid email address.</p>
                ) : null}
              </label>

              <div className="flex items-center gap-3">
                <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white focus:outline-none">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                  }}
                  className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Card + progress + avatar */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=60&auto=format"
                  alt="avatar"
                  className="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
                <div>
                  <div className="font-medium">Jane Developer</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Frontend engineer</div>
                </div>
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800">
                  Pro
                </span>
              </div>

              <div className="mt-4">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Profile completeness</div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-indigo-600"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{progress}% complete</div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setProgress((p) => Math.min(100, p + 10))}
                    className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => setProgress((p) => Math.max(0, p - 10))}
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                  >
                    -10
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 text-sm">
              <div className="font-medium mb-1">Small stats</div>
              <div className="flex gap-3">
                <Stat label="Projects" value="8" />
                <Stat label="Commits" value="1.2k" />
                <Stat label="Followers" value="420" />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs, accordion, and table */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-3">Tabs</h3>
            <div className="flex gap-2 mb-4">
              <Tab
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                label="Overview"
              />
              <Tab active={activeTab === "details"} onClick={() => setActiveTab("details")} label="Details" />
              <Tab active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} label="Reviews" />
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300">
              {activeTab === "overview" && <p>Overview content: short description and highlights.</p>}
              {activeTab === "details" && <p>Details content: more technical specs and configuration.</p>}
              {activeTab === "reviews" && <p>Reviews content: ratings and user comments.</p>}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-3">Accordion</h3>
            <div className="space-y-2">
              {[
                { title: "What is Tailwind?", body: "Tailwind is a utility-first CSS framework for rapidly building designs." },
                { title: "Why use utility classes?", body: "They make styling predictable and composable without leaving markup." },
                { title: "How to theme?", body: "Use dark: variants, CSS variables, and extend the theme in tailwind.config." },
              ].map((item, i) => (
                <div key={item.title} className="border border-gray-200 dark:border-gray-700 rounded">
                  <button
                    onClick={() => setOpenIndex((cur) => (cur === i ? null : i))}
                    className="w-full text-left px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-900"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-medium">{item.title}</span>
                    <svg
                      className={`h-4 w-4 transform transition-transform ${openIndex === i ? "rotate-90" : ""}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                    </svg>
                  </button>

                  {openIndex === i && (
                    <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                      {item.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-3">Responsive table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last active</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                  {[
                    { name: "Ava Martín", role: "Designer", status: "Active", last: "2h ago" },
                    { name: "Noah Lee", role: "Backend", status: "Idle", last: "1d ago" },
                    { name: "Liam Patel", role: "Frontend", status: "Active", last: "10m ago" },
                  ].map((r) => (
                    <tr key={r.name}>
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="px-4 py-2">{r.role}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                            r.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{r.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* small footer inside demo */}
        <div className="text-xs text-center text-gray-500 dark:text-gray-400">
          Demo: light & dark variants, focus states, responsive utilities, and common UI patterns.
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-50 max-w-xl w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="flex items-start gap-4">
                  <h4 className="text-lg font-semibold">Modal title</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Small informative text</p>
                </div>

                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  This is a demo modal. Clicking outside or pressing close will dismiss it. Focus is moved to the
                  close button for simple accessibility.
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    ref={modalCloseRef}
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setToast({ show: true, message: "Action completed" });
                      setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
                    }}
                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
                  >
                    Do action
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div
          className="fixed right-4 bottom-4 z-50"
          role="status"
          aria-live="polite"
        >
          <div className="rounded-md bg-gray-900 text-white px-4 py-2 shadow-md">
            <div className="text-sm">{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Helper subcomponents ---------- */

function Tab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm focus:outline-none ${
        active
          ? "bg-indigo-600 text-white focus-visible:ring-2 focus-visible:ring-indigo-400"
          : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
      aria-current={active ? "true" : undefined}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 text-sm">
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}