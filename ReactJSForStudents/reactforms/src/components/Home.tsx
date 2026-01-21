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
        <h3 className="text-2xl font-semibold mb-4">React Hook Form demos</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Interactive form examples using react-hook-form + yup validation.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Link
            to="/reacthookform/contact-page-one"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="Contact Page One"
          >
            <h4 className="font-semibold">Contact Page One</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Simple contact form with validation</p>
          </Link>

          <Link
            to="/reacthookform/register-page-one"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="Register Page One"
          >
            <h4 className="font-semibold">Register Page One</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Registration form with password confirmation</p>
          </Link>

          <Link
            to="/reacthookform/profile-upload-page-one"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="Profile Upload Page One"
          >
            <h4 className="font-semibold">Profile Upload</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">File uploads with client-side previews</p>
          </Link>

          <Link
            to="/reacthookform/survey-page-one"
            className="block p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow hover:shadow-md"
            aria-label="Survey Page One"
          >
            <h4 className="font-semibold">Survey Page One</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">Checkboxes, radios and required agreement</p>
          </Link>
        </div>
      </section>

    </section>
  );
}
