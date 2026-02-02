import { useState } from "react";
import type { JSX } from "react";

/**
 * ResponsiveDesign.tsx
 *
 * A self-contained React + TypeScript demo component that showcases Tailwind's responsive utilities.
 * Drop into src/components and render <ResponsiveDesign />.
 *
 * Demonstrates:
 * - Mobile-first approach with breakpoint prefixes (sm:, md:, lg:, xl:)
 * - Responsive typography, spacing, and layout
 * - Responsive navigation (desktop links vs mobile hamburger)
 * - Responsive grids and column counts
 * - Responsive images and aspect behavior
 * - Responsive visibility, ordering, and alignment
 *
 * Notes:
 * - Ensure your tailwind.config.content covers this file so classes are generated.
 * - This file intentionally uses only Tailwind utility classes.
 */

export default function ResponsiveDesign(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Responsive Hero */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Responsive by default
              </h1>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Tailwind uses a mobile-first approach. Add breakpoint prefixes (sm:, md:, lg:, xl:) to change styles
                at larger screen sizes. Resize the preview to see the text, spacing and layout adapt.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
                Primary
              </button>
              <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm">
                Secondary
              </button>
            </div>
          </div>
        </section>

        {/* Responsive Navigation: desktop links vs mobile hamburger */}
        <nav className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-linear-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="font-semibold">ResponsiveNav</span>
            </div>

            {/* Desktop links (hidden on small screens) */}
            <ul className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-200">
              <li className="hover:text-indigo-600">Home</li>
              <li className="hover:text-indigo-600">About</li>
              <li className="hover:text-indigo-600">Docs</li>
              <li className="hover:text-indigo-600">Contact</li>
            </ul>

            {/* Mobile actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className="inline-flex items-center justify-center p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <span className="sr-only">Toggle menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu (collapsible) */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="mt-4 md:hidden border-t border-gray-100 dark:border-gray-700 pt-3">
              <ul className="space-y-2 text-sm">
                <li className="px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900">Home</li>
                <li className="px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900">About</li>
                <li className="px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900">Docs</li>
                <li className="px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900">Contact</li>
              </ul>
            </div>
          )}
        </nav>

        {/* Responsive columns & ordering */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Responsive columns & ordering</h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Below: one column on mobile, two on md, three on lg. Notice the ordering change on small vs larger screens.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded border border-indigo-100 dark:border-indigo-800">
              <div className="font-semibold">Card A</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Default order</div>
            </div>

            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded border border-indigo-200 dark:border-indigo-700 order-first md:order-0">
              <div className="font-semibold">Card B</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">This appears first on mobile (order-first)</div>
            </div>

            <div className="p-4 bg-indigo-200 dark:bg-indigo-900/10 rounded border border-indigo-200 dark:border-indigo-700">
              <div className="font-semibold">Card C</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Regular card</div>
            </div>
          </div>
        </section>

        {/* Responsive grid with varying column counts */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Grid: 1 → 2 → 4 responsive</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-center">
                <div className="text-sm font-medium mb-1">Item {i + 1}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">responsive cell</div>
              </div>
            ))}
          </div>
        </section>

        {/* Responsive image examples */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Responsive images</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Image with responsive height */}
            <figure className="rounded overflow-hidden bg-gray-100 dark:bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1200&q=80&auto=format&fit=crop"
                alt="Mountain"
                className="w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover"
              />
              <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-300">Image: responsive heights via classes</figcaption>
            </figure>

            {/* Image with aspect-like box using padding + object-cover */}
            <figure className="rounded overflow-hidden bg-gray-100 dark:bg-gray-900">
              <div className="w-full" style={{ paddingTop: "56.25%" /* 16:9 */ }}>
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop"
                  alt="Forest"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ position: "relative", top: "-56.25%" }}
                />
              </div>
              <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-300">Image: demo of aspect ratio technique</figcaption>
            </figure>
          </div>
        </section>

        {/* Responsive visibility & utility examples */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Visibility & responsive utilities</h3>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded">
              <div className="text-sm">
                <span className="font-semibold">Visible only on small screens:</span>{" "}
                <span className="inline md:hidden text-indigo-600">I disappear on md+</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded">
              <div className="text-sm">
                <span className="font-semibold">Visible on md and up:</span>{" "}
                <span className="hidden md:inline text-green-600">I show on md+</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded">
              <div className="text-sm">
                <span className="font-semibold">Responsive padding and text:</span>{" "}
                <span className="px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/30 text-xs sm:text-sm md:text-base">
                  sm:text-sm, md:text-base
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: Tailwind is mobile-first. Declare base (mobile) styles, then layer sm:, md:, lg: overrides for larger
          screens.
        </div>
      </div>
    </div>
  );
}