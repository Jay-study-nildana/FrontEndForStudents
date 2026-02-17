import type { JSX } from "react";

export default function About(): JSX.Element {
  return (
    <section className="p-6 prose lg:prose-lg">
      <h2 className="text-3xl font-extrabold">About this Project</h2>
      <p className="text-slate-600 dark:text-slate-300">
        This demo showcases Tailwind v4 utilities, component patterns and
        responsive layouts built with React + TypeScript.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Mission</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Provide a compact, reusable UI kit for experimentation and learning
            Tailwind utilities.
          </p>
        </div>

        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Tech stack</h3>
          <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            <li>React + TypeScript</li>
            <li>Tailwind CSS v4</li>
            <li>Vite / Create React App (as preferred)</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg p-6 bg-linear-to-br from-amber-50 to-rose-50 dark:from-slate-900 dark:to-slate-800 shadow">
        <h3 className="font-semibold">Team</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Solo demo: designed to be straightforward and easy to extend.
        </p>
      </div>
    </section>
  );
}
