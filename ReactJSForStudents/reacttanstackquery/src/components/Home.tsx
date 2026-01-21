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
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/tanstack-query-demo"
              className="px-4 py-2  text-white rounded hover:bg-indigo-700"
            >
              Query Demo
            </Link>
            <Link
              to="/tanstack-query-advanced-demo"
              className="px-4 py-2  text-white rounded hover:bg-indigo-700"
            >
              Advanced Query Demo
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
    </section>
  );
}
// ...existing code...