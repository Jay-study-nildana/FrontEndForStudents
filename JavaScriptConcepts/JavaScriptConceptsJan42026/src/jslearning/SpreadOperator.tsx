import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * SpreadOperator
 * - Interactive playground demonstrating the spread operator for arrays and objects.
 * - Shows cloning, merging, immutably updating nested structures, rest params, and prop spreading.
 * - Plenty of inline comments explain what is happening for students.
 */
export default function SpreadOperator(): JSX.Element {
  // simple array example state
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const [newItem, setNewItem] = useState<string>("4");

  // object example state (nested structure)
  const [user, setUser] = useState({
    id: 1,
    name: "Taylor",
    prefs: { theme: "light", notifications: true },
  });

  // small form inputs for object merge demo
  const [extraKey, setExtraKey] = useState<string>("role");
  const [extraValue, setExtraValue] = useState<string>("student");

  // Derived values using spread in pure expressions
  const doubled = useMemo(() => items.map((n) => n * 2), [items]);

  // Rest parameters demo function: collects arbitrary args into an array
  function collect(...args: Array<string | number>) {
    return args.join(" • ");
  }

  // 1) Append an item immutably using spread
  function appendItem() {
    const parsed = Number(newItem);
    // Only append if parsed is a valid number
    if (!Number.isNaN(parsed)) {
      setItems((prev) => [...prev, parsed]);
    }
    setNewItem("");
  }

  // 2) Prepend an item immutably
  function prependItem() {
    const parsed = Number(newItem);
    // Only prepend if parsed is a valid number
    if (!Number.isNaN(parsed)) {
      setItems((prev) => [parsed, ...prev]);
    }
    setNewItem("");
  }

  // 3) Merge two arrays using spread
  function mergeWithExtras() {
    const extras = [100, 200];
    // result is a new array; original arrays unchanged
    setItems((prev) => [...prev, ...extras]);
  }

  // 4) Clone & mutate the clone to show original unaffected (shallow clone)
  function cloneAndMutate() {
    const cloned = [...items]; // shallow clone
    // mutate clone
    if (cloned.length)
      cloned[0] =
        typeof cloned[0] === "number" ? (cloned[0] as number) + 999 : cloned[0];
    // set state to cloned to demonstrate replacing state
    setItems(cloned);
  }

  // 5) Object merge: add/override fields immutably
  function mergeUserExtra() {
    // computed property name using extraKey
    const extra = { [extraKey]: extraValue };
    // spread merges into a new object; later spreads override earlier keys
    setUser((prev) => ({ ...prev, ...extra }));
  }

  // 6) Update nested property immutably (common pattern)
  function toggleNotifications() {
    setUser((prev) => ({
      ...prev,
      prefs: { ...prev.prefs, notifications: !prev.prefs.notifications }, // nested spread
    }));
  }

  // 7) Demonstrate shallow-copy caveat: deep clone via JSON (for demo only)
  function deepCloneAndChangeTheme() {
    const deep = JSON.parse(JSON.stringify(user));
    deep.prefs.theme = deep.prefs.theme === "light" ? "dark" : "light";
    setUser(deep);
  }

  // 8) Spread props into a child component (prop spreading)
  const UserCard = ({
    id,
    name,
    prefs,
  }: {
    id: number;
    name: string;
    prefs: any;
  }) => (
    <div className="p-2 border rounded bg-slate-50 dark:bg-slate-800">
      <div className="text-sm font-medium">
        #{id} — {name}
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300">
        theme: {prefs.theme} • notifications: {String(prefs.notifications)}
      </div>
    </div>
  );

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-4xl font-extrabold">Spread Operator</h2>
        <p className="text-slate-600">
          Interactive examples showing array & object spread, cloning, merging,
          and common immutable update patterns.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Arrays */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
        <h3 className="font-semibold">Arrays — clone, merge, prepend/append</h3>
        <p className="text-sm text-slate-600">
            Spread creates shallow copies and can merge arrays immutably.
        </p>

        <div className="mt-3 text-sm text-slate-700">
            <div>
            <strong>items:</strong> [{items.join(", ")}]
            </div>
            <div>
            <strong>doubled:</strong> [{doubled.join(", ")}]
            </div>
        </div>

        {/* input above, buttons split into two rows using CSS grid */}
        <div className="mt-3">
            <div className="flex gap-2 items-center mb-2">
            <input
                className="px-2 py-1 border rounded flex-1"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="value"
            />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
                type="button"
                className="w-full px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
                onClick={appendItem}
            >
                Append (…items)
            </button>
            <button
                type="button"
                className="w-full px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
                onClick={prependItem}
            >
                Prepend (…items)
            </button>
            <button
                type="button"
                className="w-full px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700"
                onClick={mergeWithExtras}
            >
                Merge extras
            </button>
            <button
                type="button"
                className="w-full px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
                onClick={cloneAndMutate}
            >
                Clone & mutate (shallow)
            </button>
            </div>
        </div>
        </div>

        {/* Objects */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">
            Objects — merge, override, nested updates
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Use spread to merge objects and update nested fields immutably.
          </p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>user:</strong> {JSON.stringify(user)}
            </div>
            <div className="mt-2">
              <strong>prefers theme:</strong> {user.prefs.theme}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <div className="flex gap-2 items-center">
              <input
                className="px-2 py-1 border rounded"
                value={extraKey}
                onChange={(e) => setExtraKey(e.target.value)}
              />
              <input
                className="px-2 py-1 border rounded"
                value={extraValue}
                onChange={(e) => setExtraValue(e.target.value)}
              />
              <button
                type="button"
                className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
                onClick={mergeUserExtra}
              >
                Merge extra field
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
                onClick={toggleNotifications}
              >
                Toggle notifications (nested spread)
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-rose-600 text-white border border-rose-600 rounded hover:bg-rose-700"
                onClick={deepCloneAndChangeTheme}
              >
                Deep-clone & toggle theme (JSON)
              </button>
            </div>
          </div>
        </div>

        {/* Rest / Spread in functions */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">
            Rest parameters & forwarding with spread
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Rest gathers arguments; spread forwards arrays into function calls.
          </p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>collect("a", 1, "b") →</strong> {collect("a", 1, "b")}
            </div>
            <div className="mt-2">
              <strong>Forward items into Math.max:</strong>{" "}
              {Math.max(
                ...(items.filter((n) => typeof n === "number") as number[])
              )}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700"
              onClick={() =>
                alert(
                  `max: ${Math.max(
                    ...(items.filter((n) => typeof n === "number") as number[])
                  )}`
                )
              }
            >
              Show max (spread)
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
              onClick={() => console.log("forwarded args:", [...items])}
            >
              Log forwarded args
            </button>
          </div>
        </div>

        {/* Props spreading */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Props spreading</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Spread props into child components for concise JSX.
          </p>

          <div className="mt-3">
            <UserCard {...user} />
            <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              <strong>Note:</strong> spreading is convenient but be explicit
              with prop names in public components.
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
              onClick={() => setUser((u) => ({ ...u, name: u.name + " ★" }))}
            >
              Annotate name
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-rose-600 text-white border border-rose-600 rounded hover:bg-rose-700"
              onClick={() =>
                setUser({
                  id: 2,
                  name: "New",
                  prefs: { theme: "light", notifications: true },
                })
              }
            >
              Replace user
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
