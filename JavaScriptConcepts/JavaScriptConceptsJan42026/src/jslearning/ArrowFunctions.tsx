import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * ArrowFunctions
 * - Interactive playground that demonstrates many arrow-function patterns:
 *   - concise vs block bodies
 *   - implicit return
 *   - returning object literals
 *   - rest params / spread
 *   - higher-order functions & currying
 *   - async arrow functions (simulated)
 *   - inline event handlers
 *
 * Plenty of inline comments explain each example for students.
 */
export default function ArrowFunctions(): JSX.Element {
  // sample array used in many examples
  const [nums, setNums] = useState<number[]>([1, 2, 3, 5, 8]);
  const [thresh, setThresh] = useState<number>(3);
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(4);
  const [lastAsyncResult, setLastAsyncResult] = useState<string | null>(null);

  /* 1) concise arrow with implicit return (map)
     - concise body: no curly braces, expression returned implicitly
  */
  const doubled = useMemo(() => nums.map((n) => n * 2), [nums]);

  /* 2) block-body arrow (multiple statements)
     - use when you need local variables or side-effects
  */
  const doubledVerbose = useMemo(
    () =>
      nums.map((n) => {
        const result = n * 2;
        // (could add logging or other logic here)
        return result;
      }),
    [nums]
  );

  /* 3) returning an object literal
     - wrap object literal in parentheses to avoid being parsed as block
  */
  const asObjects = useMemo(
    () => nums.map((n) => ({ value: n, squared: n * n })),
    [nums]
  );

  /* 4) rest params + spread
     - rest collects arguments into an array
     - spread expands an array back into arguments
  */
  const joinWith = (...parts: Array<string | number>) => parts.join(" • ");

  /* 5) higher-order & currying
     - functions that return functions
     - useful to create reusable filters/predicates
  */
  const greaterThan = (t: number) => (arr: number[]) => arr.filter((x) => x > t);
  const filtered = useMemo(() => greaterThan(thresh)(nums), [thresh, nums]);

  /* 6) currying example for addition */
  const add = (x: number) => (y: number) => x + y;
  const curriedSum = useMemo(() => add(a)(b), [a, b]);

  /* 7) arrow used for async function (simulated fetch)
     - demonstrates async/await with arrow functions
  */
  const simulateAsync = async (delay = 600) => {
    // async arrow function returning a Promise
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(`done after ${delay}ms — nums: [${nums.join(", ")}]`), delay);
    });
  };

  async function runAsyncDemo() {
    setLastAsyncResult("loading...");
    const res = await simulateAsync(800);
    setLastAsyncResult(res);
  }

  /* 8) inline arrow event handlers
     - commonly used in JSX; show as a small helper below
  */
  function prependRandom() {
    const rand = Math.floor(Math.random() * 10) + 1;
    // spread used to create a new array with the new value first
    setNums((prev) => [rand, ...prev]);
  }

  /* 9) demonstrate returning object literal in map with immediate formatting */
  const objStrings = useMemo(() => asObjects.map((o) => `${o.value}→${o.squared}`), [asObjects]);

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Arrow Functions — Interactive Playground</h2>
        <p className="text-slate-600">
          Try the controls below to see different arrow-function patterns in action.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Array examples */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Mapping & Returns</h3>
          <p className="text-sm text-slate-600">
            concise vs block-body, returning objects, and inline event handlers.
          </p>

          <div className="mt-3 text-sm text-slate-700">
            <div>
              <strong>nums:</strong> [{nums.join(", ")}]
            </div>
            <div className="mt-2">
              <strong>doubled (implicit return):</strong> [{doubled.join(", ")}]
            </div>
            <div>
              <strong>doubled (block body):</strong> [{doubledVerbose.join(", ")}]
            </div>
            <div>
              <strong>as objects:</strong> [{objStrings.join(", ")}]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
              onClick={() => setNums([1, 2, 3, 5, 8])}
            >
              Reset nums
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
              onClick={prependRandom}
            >
              Prepend random
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
              onClick={() => setNums((p) => p.concat(p.map((n) => n + 10)))}
            >
              Duplicate & offset
            </button>
          </div>
        </div>

        {/* Higher-order, currying, rest/spread */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">HOFs, Currying & Rest/Spread</h3>
          <p className="text-sm text-slate-600">
            Build reusable predicates and small curried helpers.
          </p>

          <div className="mt-2 text-sm text-slate-700">
            <label className="block">
              Threshold (filter &gt;):
              <input
                type="number"
                value={thresh}
                onChange={(e) => setThresh(Number(e.target.value))}
                className="ml-2 px-2 py-1 border rounded"
              />
            </label>

            <div className="mt-2">
              <strong>filtered:</strong> [{filtered.join(", ")}]
            </div>

            <div className="mt-3">
              <strong>Currying: add(a)(b)</strong>
              <div className="flex gap-2 items-center mt-1">
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="px-2 py-1 border rounded"
                />
                <span className="text-sm">+</span>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="px-2 py-1 border rounded"
                />
                <div className="px-3 py-1 bg-slate-100 rounded text-sm">= {curriedSum}</div>
              </div>
            </div>

            <div className="mt-3">
              <strong>Rest / Join example:</strong>
              <div className="mt-1 text-sm">{joinWith("a", 1, "b", 2)}</div>
            </div>
          </div>
        </div>

        {/* Async and examples */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Async Arrow Function (simulated)</h3>
          <p className="text-sm text-slate-600">
            Async arrow functions use async/await; here we simulate a network call.
          </p>

          <div className="mt-3 text-sm text-slate-700">
            <div>
              <strong>Last async result:</strong> {lastAsyncResult ?? "—"}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700"
                onClick={runAsyncDemo}
              >
                Run async demo
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
                onClick={() => setLastAsyncResult(null)}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Small notes and tips */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Notes & Tips</h3>
          <ul className="mt-2 text-sm text-slate-700">
            <li>
              Arrow functions have lexical this — they don't get their own this binding.
            </li>
            <li>Use concise bodies for single-expression returns; use block bodies for multi-step logic.</li>
            <li>
              To return an object literal from a concise arrow, wrap it in parentheses:
              <code className="ml-1">{`() => ({ foo: 1 })`}</code>
            </li>
            <li>Prefer pure arrow helpers for small utils — they are concise and composable.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
