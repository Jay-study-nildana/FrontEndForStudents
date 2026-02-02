// ...existing code...
import type { JSX } from "react";

/**
 * Fundamentals.tsx
 *
 * Revised demo component that focuses on main content only (no header/footer).
 * Shows:
 * - paragraph content
 * - two-column layout
 * - three-column grid
 * - responsive table
 * - an image example
 * - an unordered list
 *
 * Drop into src/components and render <TailwindFundamentals /> from your app.
 */

export default function Fundamentals(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro paragraph */}
        <section className="prose max-w-none mb-8">
          <h2 className="text-2xl font-bold">Tailwind fundamentals — content examples</h2>
          <p>
            This demo shows common content patterns you can build with Tailwind CSS: paragraphs, multi-column
            layouts, grids, tables, images, and lists. Resize the window to see responsive utilities in action.
          </p>
        </section>

        {/* Two-column section */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Two-column layout</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Left column: article</h4>
              <p className="text-gray-700 mb-3">
                Use the grid utilities for simple responsive columns. On small screens this stacks vertically; on
                medium and above it becomes two columns. Tailwind spacing utilities (p-*, m-*, gap-*) help control
                whitespace precisely.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Semantic structure</li>
                <li>Responsive utilities</li>
                <li>Accessible focus states</li>
              </ul>
            </article>

            <aside className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Right column: highlights</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Highlights or callouts fit well in the second column. Use small cards or list groups for quick
                  scanning.
                </p>
                <div className="inline-flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-800 text-xs">New</span>
                  <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Docs</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Three-column grid */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Three-column features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Fast" description="Small, utility-driven CSS for rapid UI building." />
            <FeatureCard title="Responsive" description="Mobile-first breakpoints: sm, md, lg, xl." />
            <FeatureCard title="Composable" description="Compose utilities to build consistent components." />
            <FeatureCard title="Accessible" description="Focus rings and semantic markup matter." />
            <FeatureCard title="Customizable" description="Extend the theme with your design tokens." />
            <FeatureCard title="Plugin-ready" description="Use official plugins for forms, typography, aspect-ratio." />
          </div>
        </section>

        {/* Image + caption */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Image example</h3>
          <figure className="bg-white rounded-lg p-4 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop"
              alt="Ocean waves at sunset"
              className="w-full h-64 object-cover rounded-md border border-gray-200"
            />
            <figcaption className="mt-2 text-sm text-gray-600">Photo: Unsplash (example)</figcaption>
          </figure>
        </section>

        {/* Table */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Responsive table</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-sm">Classic Tee</td>
                  <td className="px-4 py-3 text-sm">$24</td>
                  <td className="px-4 py-3 text-sm">In stock</td>
                  <td className="px-4 py-3 text-sm">4.6</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Denim Jacket</td>
                  <td className="px-4 py-3 text-sm">$79</td>
                  <td className="px-4 py-3 text-sm">Low stock</td>
                  <td className="px-4 py-3 text-sm">4.8</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Sneakers</td>
                  <td className="px-4 py-3 text-sm">$59</td>
                  <td className="px-4 py-3 text-sm">Out of stock</td>
                  <td className="px-4 py-3 text-sm">4.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* List */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">List of things</h3>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  1
                </span>
                <div>
                  <div className="font-medium">Semantic HTML</div>
                  <div className="text-gray-600">Start with meaningful elements like article, nav, section.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  2
                </span>
                <div>
                  <div className="font-medium">Utility composition</div>
                  <div className="text-gray-600">Combine small utilities to express layout, spacing, and colors.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                  3
                </span>
                <div>
                  <div className="font-medium">Responsive-first</div>
                  <div className="text-gray-600">Use breakpoint prefixes to change behavior across screen sizes.</div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- small helper component ---------- */
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-3">
        <span className="inline-flex items-center gap-2 text-xs text-gray-500">
          <svg className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Try it
        </span>
      </div>
    </article>
  );
}
// ...existing code...