import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * Arrays — Interactive Playground
 * - Map/filter/reduce, find/includes/some/every, sort (immutable vs in-place),
 *   slice vs splice, chunking, uniq, groupBy, flatMap, and mutation vs immutable patterns.
 */
export default function Arrays(): JSX.Element {
  const [items, setItems] = useState<Array<number | string>>([1, 2, 3, 4, 5]);
  const [input, setInput] = useState<string>("6");
  const [filterThreshold, setFilterThreshold] = useState<number>(3);
  const [chunkSize, setChunkSize] = useState<number>(2);
  const [searchVal, setSearchVal] = useState<string>("3");
  const [nested, setNested] = useState<Array<Array<number>>>([
    [1, 2],
    [3, 4],
    [5],
  ]);

  const numericItems = useMemo(
    () => items.filter((i): i is number => typeof i === "number"),
    [items]
  );

  const mapped = useMemo(
    () => items.map((x) => (typeof x === "number" ? x * 2 : x + "!")),
    [items]
  );
  const filtered = useMemo(
    () => numericItems.filter((n) => n > filterThreshold),
    [numericItems, filterThreshold]
  );
  const reduced = useMemo(
    () => numericItems.reduce((acc, n) => acc + n, 0),
    [numericItems]
  );

  const found = useMemo(
    () => items.find((x) => String(x) === searchVal),
    [items, searchVal]
  );
  const foundIndex = useMemo(
    () => items.findIndex((x) => String(x) === searchVal),
    [items, searchVal]
  );

  const includesVal = useMemo(
    () =>
      items.includes(
        (() => {
          const n = Number(searchVal);
          return Number.isNaN(n)
            ? searchVal
            : (n as unknown as number | string);
        })()
      ),
    [items, searchVal]
  );

  const uniq = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((x) => {
      const key = typeof x === "string" ? `s:${x}` : `n:${x}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [items]);

  function chunkArray<T>(arr: T[], size: number): T[][] {
    if (size <= 0) return [arr.slice()];
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }
  const chunks = useMemo(
    () => chunkArray(items, chunkSize),
    [items, chunkSize]
  );

  function groupBy<T>(arr: T[], fn: (v: T) => string) {
    return arr.reduce<Record<string, T[]>>((acc, v) => {
      const k = fn(v);
      (acc[k] ||= []).push(v);
      return acc;
    }, {});
  }
  const grouped = useMemo(
    () =>
      groupBy(items, (v) =>
        typeof v === "number" ? (v % 2 === 0 ? "even" : "odd") : "str"
      ),
    [items]
  );

  const flatMapped = useMemo(
    () => nested.flatMap((a) => a.map((n) => n * 10)),
    [nested]
  );

  // Immutable sort (numeric if possible)
  function sortedCopy(asc = true) {
    return [...items].sort((a, b) => {
      const na = typeof a === "number" ? a : Number(a as string);
      const nb = typeof b === "number" ? b : Number(b as string);
      if (Number.isNaN(na) || Number.isNaN(nb))
        return String(a).localeCompare(String(b)) * (asc ? 1 : -1);
      return (na - nb) * (asc ? 1 : -1);
    });
  }

  // Mutating splice example (in-place)
  function spliceDemo() {
    const copy = [...items];
    copy.splice(1, 1); // remove second item
    setItems(copy);
  }

  // Slice demo (non-mutating)
  function sliceDemo() {
    setItems((prev) => prev.slice(1)); // new array without first item
  }

  // Add / prepend
  function append() {
    const parsed = Number(input);
    setItems((p) => [...p, Number.isNaN(parsed) ? input : parsed]);
    setInput("");
  }
  function prepend() {
    const parsed = Number(input);
    setItems((p) => [Number.isNaN(parsed) ? input : parsed, ...p]);
    setInput("");
  }

  // Toggle in-place sort vs immutable replace
  function sortInPlace() {
    const mut = [...items];
    mut.sort();
    setItems(mut);
  }
  function sortImmutableAsc() {
    setItems(sortedCopy(true));
  }

  // Nested flatten / mutate
  // function pushNested() {
  //   setNested((n) => {
  //     const copy = n.map((a) => a.slice());
  //     copy[0].push(Math.floor(Math.random() * 10));
  //     return copy;
  //   });
  // }
  function replaceNestedFlatten() {
    setNested((_) => [[99, 100]]);
  }

  function resetDemo() {
    setItems([1, 2, 3, 4, 5]);
    setChunkSize(2);
    setFilterThreshold(3);
    setSearchVal("3");
    setNested([[1, 2], [3, 4], [5]]);
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">
          Arrays — Interactive Playground
        </h2>
        <p className="text-slate-600">
          Explore common array operations and the difference between mutating
          and immutable patterns.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Basics & Transformations</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>items:</strong> [{items.join(", ")}]
            </div>
            <div>
              <strong>mapped:</strong> [{mapped.join(", ")}]
            </div>
            <div>
              <strong>filtered (&gt; threshold):</strong> [{filtered.join(", ")}
              ]
            </div>
            <div>
              <strong>reduced (sum of numbers):</strong> {reduced}
            </div>
            <div>
              <strong>uniq:</strong> [{uniq.join(", ")}]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <input
              className="px-2 py-1 border rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="value"
            />
            <button
              className="px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={append}
            >
              Append
            </button>
            <button
              className="px-3 py-1 bg-amber-600 text-white rounded"
              onClick={prepend}
            >
              Prepend
            </button>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={spliceDemo}
            >
              Splice demo (remove idx 1)
            </button>
            <button
              className="px-3 py-1 bg-slate-300 text-slate-900 rounded"
              onClick={sliceDemo}
            >
              Slice demo (drop first)
            </button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Search & Checks</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <label className="block">
              Search value:
              <input
                className="ml-2 px-2 py-1 border rounded"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </label>
            <div className="mt-2">
              <strong>find:</strong> {String(found ?? "—")}
            </div>
            <div>
              <strong>findIndex:</strong> {foundIndex}
            </div>
            <div>
              <strong>includes:</strong> {String(includesVal)}
            </div>
            <div>
              <strong>some greater than equals filter):</strong>{" "}
              {String(numericItems.some((n) => n >= filterThreshold))}
            </div>
            <div>
              <strong>every (&gt;0):</strong>{" "}
              {String(numericItems.every((n) => n > 0))}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="number"
              className="px-2 py-1 border rounded w-24"
              value={filterThreshold}
              onChange={(e) => setFilterThreshold(Number(e.target.value))}
            />
            <button
              className="px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={() => setFilterThreshold((s) => s + 1)}
            >
              Inc threshold
            </button>
            <button
              className="px-3 py-1 bg-slate-300 text-slate-900 rounded"
              onClick={() => setSearchVal("")}
            >
              Clear search
            </button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Chunk / Group / FlatMap</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <label className="block">
              Chunk size:
              <input
                className="ml-2 px-2 py-1 border rounded w-20"
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
              />
            </label>
            <div className="mt-2">
              <strong>chunks:</strong> [
              {chunks.map((c) => `[${c.join(", ")}]`).join(", ")}]
            </div>
            <div className="mt-2">
              <strong>grouped (odd/even/str):</strong> {JSON.stringify(grouped)}
            </div>
            <div className="mt-2">
              <strong>nested:</strong> {JSON.stringify(nested)}
            </div>
            <div>
              <strong>flatMap (nested *10):</strong> [{flatMapped.join(", ")}]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={() => setItems((p) => [...p, ...p])}
            >
              Duplicate
            </button>
            <button
              className="px-3 py-1 bg-amber-600 text-white rounded"
              onClick={() => setItems((p) => p.filter((_, i) => i % 2 === 0))}
            >
              Keep evens (by idx)
            </button>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() =>
                setNested((n) => [...n, [Math.floor(Math.random() * 10)]])
              }
            >
              Push nested
            </button>
            <button
              className="px-3 py-1 bg-slate-300 text-slate-900 rounded"
              onClick={replaceNestedFlatten}
            >
              Replace nested
            </button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Sort & Mutability</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>items:</strong> [{items.join(", ")}]
            </div>
            <div className="mt-2">
              <strong>sorted copy (asc):</strong> [{sortedCopy(true).join(", ")}
              ]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={sortImmutableAsc}
            >
              Sort (immutable)
            </button>
            <button
              className="px-3 py-1 bg-amber-600 text-white rounded"
              onClick={sortInPlace}
            >
              Sort (in-place)
            </button>
            <button
              className="px-3 py-1 bg-rose-600 text-white rounded"
              onClick={resetDemo}
            >
              Reset demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
