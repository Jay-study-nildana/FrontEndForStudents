// ...existing code...
import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-4xl font-extrabold">Welcome Home</h2>
        <p className="text-slate-600">
          A Tailwind v4 playground showcasing responsive layout, components and
          utilities.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Core Features</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Responsive grid and utility-first styling</li>
            <li>Accessible forms and focus states</li>
            <li>Dark mode support</li>
          </ul>
        </div>

        <div className="rounded-lg p-6 bg-linear-to-tr from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 shadow">
          <h3 className="font-semibold text-lg">Get started</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Explore About and Contact pages. Try resizing the viewport and
            toggling dark mode.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Explore
            </button>
            <Link
              to="/concepts/combined-hooks"
              className="px-4 py-2 border rounded bg-white/90 dark:bg-slate-700"
            >
              Combined Hooks
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Responsive</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Layouts adapt to any screen.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Accessible</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Focus rings and semantic markup.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Customizable</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Utility classes you can extend.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Concepts & Hooks</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Jump to interactive pages that demonstrate useEffect, useRef and
          useReducer.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Link
            to="/concepts/combined-hooks"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="Combined Hooks"
          >
            <h4 className="font-semibold">Combined Hooks</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">useEffect + useRef + useReducer demo</p>
          </Link>

          <Link
            to="/concepts/use-effect"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="useEffect demo"
          >
            <h4 className="font-semibold">useEffect</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Lifecycle and side-effect examples</p>
          </Link>

          <Link
            to="/concepts/use-ref"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="useRef demo"
          >
            <h4 className="font-semibold">useRef</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Refs for DOM and mutable values</p>
          </Link>

          <Link
            to="/concepts/use-reducer"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="useReducer demo"
          >
            <h4 className="font-semibold">useReducer</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Reducer-driven state management</p>
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">More Concepts</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Additional hooks and patterns to explore.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <Link
            to="/concepts/use-auth"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="useAuth demo"
          >
            <h4 className="font-semibold">useAuth</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Simple auth hook with sign-in/out simulation</p>
          </Link>

          <Link
            to="/concepts/use-debounced-value"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="useDebouncedValue demo"
          >
            <h4 className="font-semibold">useDebouncedValue</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Debounced input / search pattern</p>
          </Link>

          <Link
            to="/concepts/infinite-scroll-fetch-more"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="Infinite Scroll Fetch More demo"
          >
            <h4 className="font-semibold">Infinite Scroll</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">IntersectionObserver based infinite loading</p>
          </Link>
        </div>
      </section>
    </section>
  );
}
// ...existing code...