// import React from "react";
import type { JSX } from "react";

/**
 * FlexboxGrid.tsx
 *
 * Demonstrates Flexbox and Grid techniques using Tailwind CSS in React + TypeScript.
 * Drop into src/components and render <FlexboxGrid />.
 *
 * Sections included:
 * - Basic flex directions (row / column)
 * - Alignment & justification examples
 * - Flex sizing: grow / shrink / basis
 * - Wrapping and order
 * - Nested flex layouts (cards / toolbars)
 * - Grid: basic columns, responsive grid, gap
 * - Grid: colspan / row-span and minmax / auto-fit examples
 * - Grid alignment and centering
 *
 * This file is purely presentational and uses Tailwind utility classes to demonstrate patterns.
 */

export default function FlexboxGrid(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Flexbox: directions & basic alignment</h2>

          <div className="space-y-6">
            {/* Row direction */}
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Row (default) — justify & align</div>
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/40 p-4 rounded gap-4">
                <div className="p-3 bg-indigo-600 text-white rounded">Left</div>
                <div className="p-3 bg-indigo-500 text-white rounded">Center</div>
                <div className="p-3 bg-indigo-400 text-white rounded">Right</div>
              </div>
            </div>

            {/* Column direction */}
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Column direction</div>
              <div className="flex flex-col items-start bg-gray-50 dark:bg-gray-900/40 p-4 rounded gap-3">
                <div className="p-2 bg-green-600 text-white rounded">Top</div>
                <div className="p-2 bg-green-500 text-white rounded">Middle</div>
                <div className="p-2 bg-green-400 text-white rounded">Bottom</div>
              </div>
            </div>

            {/* Alignment examples */}
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Alignment variations (align-items)</div>
              <div className="flex gap-4">
                <div className="flex items-start w-1/3 h-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3">
                  <div className="bg-pink-400 text-white p-2 rounded">start</div>
                </div>

                <div className="flex items-center w-1/3 h-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3">
                  <div className="bg-pink-400 text-white p-2 rounded">center</div>
                </div>

                <div className="flex items-end w-1/3 h-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3">
                  <div className="bg-pink-400 text-white p-2 rounded">end</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Flex sizing: grow / shrink / basis</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Grow to fill available space</div>
              <div className="flex gap-3 bg-gray-50 dark:bg-gray-900/40 p-4 rounded items-center">
                <div className="flex-initial w-32 p-3 bg-indigo-200 rounded text-center">Fixed 32</div>
                <div className="flex-1 p-3 bg-indigo-500 text-white rounded text-center">flex-1 (grows)</div>
                <div className="flex-initial w-24 p-3 bg-indigo-300 rounded text-center">Fixed 24</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Control basis + shrink</div>
              <div className="flex gap-3 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="basis-1/4 shrink p-3 bg-emerald-200 rounded text-center">basis-1/4 shrink</div>
                <div className="basis-1/2 p-3 bg-emerald-400 rounded text-center">basis-1/2</div>
                <div className="basis-1/4 p-3 bg-emerald-600 text-white rounded text-center">basis-1/4</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Order (re-order items)</div>
              <div className="flex gap-3 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="order-3 p-3 bg-yellow-200 rounded">order-3</div>
                <div className="order-1 p-3 bg-yellow-300 rounded">order-1</div>
                <div className="order-2 p-3 bg-yellow-400 rounded">order-2</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Wrapping, gaps & nested flex (toolbars / cards)</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Wrapping items with gap</div>
              <div className="flex flex-wrap gap-3 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded">
                    Chip {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Toolbar (nested flex)</div>
              <div className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">My App</div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Primary</button>
                    <button className="px-3 py-1 rounded border text-sm">Secondary</button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-900" placeholder="Search" />
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="text-sm">User</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Card with header & actions (nested flex)</div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-indigo-500" />
                    <div>
                      <div className="font-medium">Card title</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Subtitle</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded border text-sm">Share</button>
                    <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Action</button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Card body: use nested flex containers to layout content and controls efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Grid: basic columns, responsive & gaps</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Responsive grid (1 → 2 → 4)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
                    Grid item {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Col-span & row-span</div>
              <div className="grid grid-cols-6 gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="col-span-6 sm:col-span-4 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded">col-span-4 (on sm+)</div>
                <div className="col-span-6 sm:col-span-2 p-4 bg-indigo-200 dark:bg-indigo-900/20 rounded">col-span-2</div>

                <div className="col-span-6 sm:col-span-2 p-4 bg-indigo-300 dark:bg-indigo-900/10 rounded">col-span-2</div>
                <div className="col-span-6 sm:col-span-4 p-4 bg-indigo-400 dark:bg-indigo-900/05 rounded">col-span-4</div>

                <div className="col-span-6 p-4 bg-indigo-500 text-white rounded">full-width row</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Auto-fit / minmax (responsive cards)</div>
              <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
                    Flexible card {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Grid alignment (place-items / justify / content)</div>
              <div className="grid grid-cols-3 gap-4 items-center justify-items-center content-start bg-gray-50 dark:bg-gray-900/40 p-6 rounded">
                <div className="p-6 bg-emerald-100 dark:bg-emerald-900/30 rounded w-full text-center">Centered</div>
                <div className="p-6 bg-emerald-200 dark:bg-emerald-900/20 rounded w-full text-center">Centered</div>
                <div className="p-6 bg-emerald-300 dark:bg-emerald-900/10 rounded w-full text-center">Centered</div>
              </div>
            </div>
          </div>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Try editing classes to see how layout changes — switch between flex and grid, adjust gaps, or change column spans.
        </div>
      </div>
    </div>
  );
}