// ...existing code...
import type { JSX } from "react";

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
            Explore the demo pages. Try resizing the viewport and toggling dark mode.
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Explore
            </button>
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

      <hr className="my-8 border-slate-200 dark:border-slate-700" />

      <section className="grid gap-4 sm:grid-cols-4">
        <a
          href="/counter"
          className="group block rounded-xl p-6 bg-linear-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 hover:scale-[1.01] transform transition-shadow shadow-md dark:shadow-none focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900"
          aria-label="Go to Counter"
        >
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Counter</h5>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Simple increment/decrement demo wired to Redux Toolkit.
              </p>
            </div>
            <div className="ml-4 flex items-center">
              <svg className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5">/counter</span>
          </div>
        </a>

        <a
          href="/posts"
          className="group block rounded-xl p-6 bg-linear-to-br from-white to-cyan-50 dark:from-slate-900 dark:to-slate-800 hover:scale-[1.01] transform transition-shadow shadow-md dark:shadow-none focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
          aria-label="Go to Posts"
        >
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Posts</h5>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                View and fetch posts (RTK Query example) with pagination and caching.
              </p>
            </div>
            <div className="ml-4 flex items-center">
              <svg className="h-10 w-10 text-cyan-500" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-cyan-100 text-cyan-800 text-xs px-2 py-0.5">/posts</span>
          </div>
        </a>

        <a
          href="/auth"
          className="group block rounded-xl p-6 bg-linear-to-br from-white to-amber-50 dark:from-slate-900 dark:to-slate-800 hover:scale-[1.01] transform transition-shadow shadow-md dark:shadow-none focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-900"
          aria-label="Go to Auth"
        >
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Auth</h5>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Sign in, register and manage session state with Redux Toolkit.
              </p>
            </div>
            <div className="ml-4 flex items-center">
              <svg className="h-10 w-10 text-amber-500" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 11a3 3 0 100-6 3 3 0 000 6zM5 21v-1a4 4 0 014-4h6a4 4 0 014 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-0.5">/auth</span>
          </div>
        </a>

        <a
          href="/apod"
          className="group block rounded-xl p-6 bg-linear-to-br from-white to-violet-50 dark:from-slate-900 dark:to-slate-800 hover:scale-[1.01] transform transition-shadow shadow-md dark:shadow-none focus:outline-none focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900"
          aria-label="Go to APOD Viewer"
        >
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-100">APOD</h5>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Browse NASA Astronomy Picture of the Day (RTK Query + slice).
              </p>
            </div>
            <div className="ml-4 flex items-center">
              <svg className="h-10 w-10 text-violet-500" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2v4M5 7l1.5 1.5M19 7l-1.5 1.5M12 22v-4M7 17l-1.5-1.5M17 17l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-violet-100 text-violet-800 text-xs px-2 py-0.5">/apod</span>
          </div>
        </a>
      </section>
    </section>
  );
}
// ...existing code...