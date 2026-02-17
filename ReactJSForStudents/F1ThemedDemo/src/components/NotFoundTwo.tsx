import type { JSX } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./notfound-animate.css";
import "./notfound-rain.css";

// Rain overlay component
function RainOverlay({ dropCount = 32 }: { dropCount?: number }) {
  // Generate random left positions and delays for each drop
  const drops = Array.from({ length: dropCount }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 1.5 + Math.random() * 1.5;
    return (
      <div
        key={i}
        className="rain-drop"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });
  return (
    <div className="rain-overlay" aria-hidden="true">
      {drops}
    </div>
  );
}

export default function NotFoundTwo(): JSX.Element {
  const [animate, setAnimate] = useState(true);
  // Helper to conditionally apply animation classes
  const anim = animate;
  return (
    <section
      className="w-full p-2"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <RainOverlay dropCount={36} />
      <div className="mb-8 flex gap-4 items-center">
        <button
          className={`px-4 py-2 rounded font-semibold shadow ${animate ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          onClick={() => setAnimate((a) => !a)}
        >
          {animate ? "Disable Animation" : "Animate"}
        </button>
      </div>
      <header className="mb-6">
        <h2
          className={`text-4xl font-extrabold ${anim ? "float-animate" : ""}`}
        >
          404 - Page Not Found - Not Found Two
        </h2>
        <p className={`text-slate-600 ${anim ? "float-animate-delay1" : ""}`}>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
      </header>

      <header className="mb-6 text-center">
        <h2
          className={`text-4xl font-extrabold ${anim ? "float-animate-delay2" : ""}`}
        >
          404 - Not Found
        </h2>
        <p className={`text-slate-600 ${anim ? "float-animate-delay3" : ""}`}>
          We couldn't find the page you requested.
        </p>
      </header>

      <header className="mb-6 flex flex-col items-center">
        <h2
          className={`text-4xl font-extrabold ${anim ? "float-animate-delay4" : ""}`}
        >
          Oops! Not Found
        </h2>
        <p className={`text-slate-600 ${anim ? "float-animate-delay5" : ""}`}>
          The page you tried to access doesn't exist. Please check the URL or
          return to the homepage.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Lost?</h3>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            The page you’re looking for can’t be found. Double-check the URL or
            use the navigation to find your way.
          </p>
        </div>

        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Need Help?</h3>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            If you think this is a mistake, contact support or return to the
            homepage.
          </p>
        </div>
      </div>
      <div className="rounded-lg p-6 bg-linear-to-tr from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 shadow w-full">
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg">Go Home</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Click below to return to the main page and continue browsing.
          </p>
          <div className="mt-4">
            {/* <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Home
              </button> */}
            <NavLink
              to="/"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Home
            </NavLink>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Error Code: 404</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This is a standard HTTP response for a missing page.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Why am I seeing this?</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The link you followed may be broken or the page may have been
            removed.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">What can I do?</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Try searching, use the menu, or go back to the previous page.
          </p>
        </div>
      </div>
    </section>
  );
}
