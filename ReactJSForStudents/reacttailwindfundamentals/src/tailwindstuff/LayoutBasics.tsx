// import React from "react";
import type { JSX } from "react";

/**
 * LayoutBasics.tsx
 *
 * A small React + TypeScript demo component that showcases Tailwind layout basics:
 * - Display types: block, inline, inline-block
 * - Flexbox: row/column, alignment, gap, wrapping
 * - Grid: column counts, gaps, col-span
 * - Box model: padding, margin, border, rounded, box-sizing visualized
 * - Spacing helpers: m-*, p-*, gap-*, space-x-*, space-y-*
 *
 * Drop into your project (e.g. src/components/LayoutBasics.tsx) and render <LayoutBasics />.
 * This is intended as an interactive reference for beginners.
 */

export default function LayoutBasics(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Display types</h2>

          <div className="space-y-4">
            <div>
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">Block elements (take full width)</div>
              <div className="bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 rounded p-3">
                <div className="bg-indigo-600 text-white rounded p-2">I am block (div)</div>
                <div className="bg-indigo-500 text-white rounded p-2 mt-2">I stack below the previous block</div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">Inline elements (flow with text)</div>
              <div className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-800 rounded p-3">
                <p>
                  Text with an <span className="inline bg-green-600 text-white px-2 rounded">inline span</span> inside — it
                  flows inline with surrounding text.
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">Inline-block (like inline but box-sized)</div>
              <div className="bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                <div className="inline-block w-40 p-2 bg-yellow-300 text-sm rounded">inline-block box 1</div>
                <div className="inline-block w-40 p-2 bg-yellow-400 text-sm rounded ml-2">inline-block box 2</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Flexbox basics</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Row, center alignment, gap</div>
              <div className="flex items-center justify-center gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="p-3 bg-indigo-600 text-white rounded">Item A</div>
                <div className="p-3 bg-indigo-500 text-white rounded">Item B</div>
                <div className="p-3 bg-indigo-400 text-white rounded">Item C</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Column direction with spacing (space-y)</div>
              <div className="flex flex-col items-start space-y-3 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">Column 1</div>
                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">Column 2</div>
                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">Column 3</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Wrapping and responsive reflow</div>
              <div className="flex flex-wrap gap-3 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="w-48 p-3 bg-pink-100 dark:bg-pink-900/40 rounded">Wide item 1</div>
                <div className="w-48 p-3 bg-pink-200 dark:bg-pink-900/30 rounded">Wide item 2</div>
                <div className="w-48 p-3 bg-pink-300 dark:bg-pink-900/20 rounded">Wide item 3</div>
                <div className="w-48 p-3 bg-pink-400 dark:bg-pink-900/10 rounded">Wide item 4</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Grid basics</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Simple responsive columns (1 → 2 → 3)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Grid cell 1</div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Grid cell 2</div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Grid cell 3</div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Grid cell 4</div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Grid cell 5</div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Grid cell 6</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Column span example</div>
              <div className="grid grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="col-span-4 sm:col-span-2 p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded">Span 2 on small+</div>
                <div className="col-span-4 sm:col-span-2 p-3 bg-indigo-200 dark:bg-indigo-900/30 rounded">Span 2</div>
                <div className="col-span-4 p-3 bg-indigo-300 dark:bg-indigo-900/20 rounded">Full width</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Box model & spacing</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Padding vs Margin (visualized)</div>
              <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                  <div className="p-6 border-t border-dashed border-indigo-200 dark:border-indigo-800">
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Outer box (has padding)</div>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4">Content area (padding: p-4)</div>
                    <div className="mt-4 border border-red-300 dark:border-red-700 p-2">Inner box with margin-top (mt-4)</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Spacing utilities: gap, space-x, space-y</div>
              <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-green-200 rounded">A</div>
                  <div className="p-2 bg-green-300 rounded">B</div>
                  <div className="p-2 bg-green-400 rounded">C</div>
                </div>

                <div className="flex gap-6">
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">gap-6</div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">gap-6</div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">gap-6</div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Horizontal spacing with space-x</div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded">1</div>
                    <div className="p-2 bg-pink-200 rounded">2</div>
                    <div className="p-2 bg-pink-300 rounded">3</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Border, radius and box-sizing note</div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded">
                <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">This box has border + padding. Tailwind uses the browser default box-sizing (content-box). You can set global box-sizing via CSS if desired.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Common utility classes: rounded, border, ring, shadow</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: try resizing the window to see responsive grid/flex behavior and experiment by editing classes.
        </div>
      </div>
    </div>
  );
}