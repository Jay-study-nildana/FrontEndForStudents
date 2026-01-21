import type { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          © {new Date().getFullYear()} Tailwind Playground. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a className="text-indigo-600 hover:underline text-sm" href="#">
            Privacy
          </a>
          <a className="text-indigo-600 hover:underline text-sm" href="#">
            Terms
          </a>
          <a className="text-indigo-600 hover:underline text-sm" href="#">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
