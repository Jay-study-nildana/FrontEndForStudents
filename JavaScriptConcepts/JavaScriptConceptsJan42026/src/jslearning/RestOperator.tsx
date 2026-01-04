import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * RestOperator
 * - Interactive playground demonstrating rest parameters and the rest syntax for arrays/objects.
 * - Examples:
 *   - rest in function parameters (...args)
 *   - rest in array destructuring ([first, ...rest])
 *   - rest in object destructuring ({ a, ...rest })
 *   - forwarding with spread (...array)
 *   - using rest to separate props before passing children
 *
 * Short, commented examples that students can interact with.
 */
export default function RestOperator(): JSX.Element {
  // Input: comma-separated values (numbers or strings)
  const [input, setInput] = useState<string>("1,2,3");
  const [items, setItems] = useState<Array<string | number>>([1, 2, 3]);
  const [log, setLog] = useState<string | null>(null);

  // Parse input into an array of numbers if possible, otherwise keep as strings
  function parseInput(value: string): Array<string | number> {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const n = Number(s);
        return Number.isNaN(n) ? s : n;
      });
  }

  // --- 1) Rest parameters in functions ---
  // collect demonstrates gathering any number of args into an array
  function collect(...args: Array<string | number>) {
    return `collected: [${args.join(", ")}]`;
  }

  // sum uses rest to accept many numeric args
  function sumRest(...nums: number[]) {
    return nums.reduce((a, b) => a + b, 0);
  }

  // higher-order example: logger that captures rest args and returns a function
  const logger =
    (...args: Array<string | number>) =>
    () =>
      setLog(`logger captured: [${args.join(", ")}]`);

  // --- 2) Destructuring with rest (arrays) ---
  // first + rest example derived from current items
  const [firstItem, ...restItems] = items;

  // swap first item with a new value using rest to rebuild array immutably
  function replaceFirst(newVal: string | number) {
    const [, ...tail] = items;
    setItems([newVal, ...tail]);
  }

  // --- 3) Object rest ---
  const [user, setUser] = useState({
    id: 42,
    name: "Jamie",
    role: "student",
    prefs: { theme: "light" },
  });

  // separate a couple of fields and collect the rest
  const { id, name, ...userRest } = user;

  // merge an extra field using spread (complementary to rest)
  function addUserField(key: string, value: string) {
    setUser((prev) => ({ ...prev, [key]: value }));
  }

  // --- 4) Forwarding/rest + spread ---
  // forwardArray uses spread to pass array elements as separate args
  function forwardArrayToMax(arr: number[]) {
    // safe fallback when arr is empty
    if (!arr.length) return "no numbers";
    return `max: ${Math.max(...arr)}`;
  }

  // --- 5) Prop separation example ---
  const DisplayCard = (props: { title: string; subtitle?: string; [k: string]: any }) => {
    // extract title and collect the rest to forward to a container
    const { title, ...rest } = props;
    return (
      <div className="p-3 border rounded bg-slate-50 dark:bg-slate-800">
        <div className="font-semibold">{title}</div>
        <pre className="text-xs mt-2">{JSON.stringify(rest, null, 2)}</pre>
      </div>
    );
  };

  // Derived helpers for UI
  const parsedInput = useMemo(() => parseInput(input), [input]);
  const numericItems = useMemo(() => items.filter((i): i is number => typeof i === "number"), [items]);

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Rest Operator — Interactive Examples</h2>
        <p className="text-slate-600">Experiment with rest parameters, rest destructuring and forwarding via spread.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Function rest params */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Rest in function parameters</h3>
          <p className="text-sm text-slate-600">Use ...args to accept variable arguments.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <label className="block">
              Enter comma-separated values:
              <input
                className="ml-2 px-2 py-1 border rounded w-full mt-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 1,2,3 or a,b,c"
              />
            </label>

            <div className="mt-3 flex gap-2 flex-wrap">
              <button
                type="button"
                className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
                onClick={() => setLog(collect(...parsedInput))}
              >
                Collect (rest)
              </button>

              <button
                type="button"
                className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
                onClick={() => {
                  const nums = parsedInput.filter((v): v is number => typeof v === "number");
                  setLog(`sum: ${sumRest(...nums)}`);
                }}
              >
                Sum numeric inputs
              </button>

              <button
                type="button"
                className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700"
                onClick={() => logger(...parsedInput)()}
              >
                Capture with logger (HOF)
              </button>
            </div>

            <div className="mt-3 text-sm">
              <strong>Result:</strong> <span className="text-slate-700 dark:text-slate-300">{log ?? "—"}</span>
            </div>
          </div>
        </div>

        {/* Array destructuring with rest */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Array destructuring & rest</h3>
          <p className="text-sm text-slate-600">Extract first element and collect the rest with [...rest]</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>items:</strong> [{items.join(", ")}]
            </div>
            <div>
              <strong>firstItem:</strong> {String(firstItem)}
            </div>
            <div>
              <strong>restItems:</strong> [{restItems.join(", ")}]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
              onClick={() => setItems(parsedInput)}
            >
              Load from input
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
              onClick={() => {
                if (parsedInput.length) setItems((prev) => [...prev, ...parsedInput]);
              }}
            >
              Append parsed input
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700"
              onClick={() => replaceFirst(Math.random() < 0.5 ? "X" : Math.floor(Math.random() * 100))}
            >
              Replace first
            </button>
          </div>
        </div>

        {/* Object rest */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Object rest</h3>
          <p className="text-sm text-slate-600">Extract a few fields and gather the remaining properties with {`...rest`}</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>id:</strong> {String(id)} — <strong>name:</strong> {String(name)}
            </div>
            <div className="mt-2">
              <strong>userRest:</strong>
              <pre className="bg-slate-50 dark:bg-slate-700 p-2 rounded text-xs mt-1">{JSON.stringify(userRest, null, 2)}</pre>
            </div>
          </div>

            <div className="mt-3">
            {/* Inputs row — placed above the buttons */}
            <div className="flex gap-2 mb-2">
                <input
                id="rk"
                className="px-2 py-1 border rounded flex-1"
                placeholder="newKey"
                />
                <input
                id="rv"
                className="px-2 py-1 border rounded w-32"
                placeholder="value"
                />
            </div>

            {/* Buttons below — responsive grid (1 column on xs, 2 columns on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                type="button"
                className="w-full px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
                onClick={() => {
                    const k = (document.getElementById("rk") as HTMLInputElement | null)?.value || "meta";
                    const v = (document.getElementById("rv") as HTMLInputElement | null)?.value || "val";
                    addUserField(k, v);
                }}
                >
                Add field to user (merge)
                </button>

                <button
                type="button"
                className="w-full px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
                onClick={() => setUser({ id: 1, name: "Jamie", role: "student", prefs: { theme: "light" } })}
                >
                Reset user
                </button>
            </div>
            </div>
        </div>

        {/* Forwarding & props separation */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Forwarding & props separation</h3>
          <p className="text-sm text-slate-600">Use spread to forward collected args or remaining props.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>numeric items:</strong> [{numericItems.join(", ")}]
            </div>
            <div className="mt-2">
              <strong>forwardArrayToMax:</strong> {forwardArrayToMax(numericItems)}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <div>
              <DisplayCard title="Profile" subtitle="demo" role={user.role} prefs={user.prefs} extra="hello" />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
                onClick={() => setLog(`forwarded args: [${[...items].join(", ")}]`)}
              >
                Forward items (log)
              </button>

              <button
                type="button"
                className="px-3 py-1 bg-rose-600 text-white border border-rose-600 rounded hover:bg-rose-700"
                onClick={() => {
                  setItems([]);
                  setLog("items cleared");
                }}
              >
                Clear items
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
