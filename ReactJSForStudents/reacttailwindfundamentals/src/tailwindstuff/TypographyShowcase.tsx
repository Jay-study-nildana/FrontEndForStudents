// import React from "react";
import type { JSX } from "react";

/**
 * TypographyShowcase.tsx
 *
 * Demonstrates Tailwind CSS typography utilities and common content patterns:
 * - Headings (scale + responsive sizes)
 * - Paragraphs, lead text, muted text
 * - Blockquote and small caption
 * - Inline code and code block styling
 * - Ordered & unordered lists, definition list (dl)
 * - Text truncation and line-clamp (requires @tailwindcss/line-clamp plugin)
 * - Letter spacing, word breaking, text transform, alignment
 * - Font-family examples (sans, serif, mono)
 *
 * Drop into src/components and render <TypographyShowcase /> in your app.
 */

export default function TypographyShowcase(): JSX.Element {
  const longText =
    "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. " +
    "Compose utilities to build designs directly in your markup, keep styles consistent with design tokens, " +
    "and use responsive & variant prefixes to adapt across screen sizes.";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Intro / Heading scale */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3">Typography showcase</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Examples of headings, paragraphs, lists, code, and other typographic elements using Tailwind utility classes.
          </p>
        </section>

        {/* Headings + lead */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Heading levels</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">H3 — Example heading</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Subheading / short description</p>
            </div>

            <div>
              <h4 className="text-lg font-medium">H4 — Smaller heading</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Use headings to structure content for accessibility.</p>
            </div>

            <p className="mt-2 text-base text-gray-700 dark:text-gray-200">
              <span className="font-semibold">Lead text:</span>{" "}
              <span className="text-lg text-gray-800 dark:text-gray-100">
                {longText}
              </span>
            </p>
          </div>
        </section>

        {/* Paragraphs, alignment, transforms */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Paragraphs, transforms & alignment</h2>

          <div className="space-y-4">
            <p className="text-justify text-gray-700 dark:text-gray-300">
              This paragraph is <strong>justified</strong> so you can see how text flows with equal line lengths on both sides.
              Use <span className="uppercase tracking-wide text-xs text-gray-500">tracking utilities</span> to adjust letter-spacing.
            </p>

            <p className="text-left text-gray-700 dark:text-gray-300">
              Left-aligned paragraph for normal reading. Use <em>responsive</em> classes to change alignment at breakpoints: e.g.,
              <span className="ml-1 inline-block px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 rounded">sm:text-center</span>.
            </p>

            <p className="text-right text-gray-600 dark:text-gray-400 text-sm">Right-aligned small caption / byline.</p>

            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Word breaking: long words like <span className="wrap-break-word">supercalifragilisticexpialidocious-super-long-word</span> will break to avoid overflow.
                </p>
              </div>

              <div className="w-32 text-xs text-center text-gray-500 dark:text-gray-400">
                Example: <span className="capitalize">capitalized</span>, <span className="lowercase">lowercase</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blockquote, figure, caption */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Blockquote & figure</h2>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
            “Design is not just what it looks like and feels like. Design is how it works.” — Steve Jobs
          </blockquote>

          <figure className="bg-gray-50 dark:bg-gray-900/30 rounded p-3">
            <img
              src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=60&auto=format&fit=crop"
              alt="Desk and laptop"
              className="w-full h-48 object-cover rounded mb-2 border border-gray-200 dark:border-gray-700"
            />
            <figcaption className="text-sm text-gray-600 dark:text-gray-400">Photo: Workspace example</figcaption>
          </figure>
        </section>

        {/* Code examples */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Inline code & code blocks</h2>

          <p className="text-gray-700 dark:text-gray-300">
            Use <code className="bg-gray-100 dark:bg-gray-900/60 px-1 rounded text-sm font-mono">inline code</code> for short snippets.
          </p>

          <pre className="mt-4 rounded bg-gray-900 text-white p-4 overflow-x-auto text-sm font-mono">
{`// Example: simple function
function greet(name) {
  return \`Hello, \${name}!\`;
}`}
          </pre>
        </section>

        {/* Lists */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Lists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Unordered</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Simple bullet</li>
                <li>Indented item</li>
                <li>Another item with a longer description to show wrapping behavior in a list.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Ordered</h3>
              <ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>First step</li>
                <li>Second step</li>
                <li>Third step</li>
              </ol>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Definition list (dl)</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="font-medium">Framework</dt>
                <dd className="text-gray-600 dark:text-gray-400">Tailwind CSS</dd>
              </div>
              <div>
                <dt className="font-medium">Approach</dt>
                <dd className="text-gray-600 dark:text-gray-400">Utility-first</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Truncation & line-clamp */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Truncation & line-clamp</h2>

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-1">Single-line truncate</div>
              <p className="truncate max-w-xs bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                {longText}
              </p>
            </div>

            <div>
              <div className="font-medium mb-1">Multi-line clamp (requires plugin)</div>
              <p className="line-clamp-3 max-w-xl bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                {longText} {longText}
              </p>
            </div>
          </div>
        </section>

        {/* Font families and small helpers */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Font families, sizes & utilities</h2>

          <div className="space-y-4">
            <div>
              <div className="font-sans text-base">Sans (default) — quick paragraph demonstrating the default system stack.</div>
            </div>

            <div>
              <div className="font-serif text-base">Serif — use for article headings or a more classic tone.</div>
            </div>

            <div>
              <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900/30 p-2 rounded">Monospace sample: console output or code labels</div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="text-sm tracking-tight">Tighter tracking</div>
              <div className="text-sm tracking-wide">Wider tracking</div>
              <div className="text-sm uppercase">Uppercase</div>
              <div className="text-sm lowercase">lowercase</div>
            </div>
          </div>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: for long-form content use the official Typography plugin and the <code className="font-mono">prose</code> classes.
        </div>
      </div>
    </div>
  );
}