import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * MapFilterReduce — Interactive Playground
 * - Demonstrates map, filter, reduce, and common chaining patterns:
 *   - transform items with map
 *   - filter items by predicate
 *   - aggregate with reduce (sum, max, groupBy, flatten)
 *   - combine operations and compare performance via useMemo
 */
export default function MapFilterReduce(): JSX.Element {
  const [items, setItems] = useState<Array<number | string>>([1, 2, 3, 4, 5]);
  const [input, setInput] = useState<string>("6");
  const [multiplier, setMultiplier] = useState<number>(2);
  const [threshold, setThreshold] = useState<number>(3);
  const [groupByMod, setGroupByMod] = useState<number>(2);

  // parsed numeric view for numeric-only operations
  const numeric = useMemo(() => items.filter((x): x is number => typeof x === "number"), [items]);

  // map examples
  const doubled = useMemo(() => numeric.map((n) => n * 2), [numeric]);
  const scaled = useMemo(() => numeric.map((n) => n * multiplier), [numeric, multiplier]);
  const toObjects = useMemo(
    () => items.map((v, i) => ({ idx: i, raw: v, asString: String(v) })),
    [items]
  );

  // filter examples
  const filteredAbove = useMemo(() => numeric.filter((n) => n > threshold), [numeric, threshold]);
  const filteredStrings = useMemo(() => items.filter((v) => typeof v === "string") as string[], [items]);

  // reduce examples
  const sum = useMemo(() => numeric.reduce((acc, n) => acc + n, 0), [numeric]);
  const max = useMemo(() => (numeric.length ? numeric.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY) : null), [numeric]);

  // groupBy using reduce: group numbers by modulo (example)
  const groupedByMod = useMemo(() => {
    return numeric.reduce<Record<string, number[]>>((acc, n) => {
      const key = String(n % Math.max(1, groupByMod));
      (acc[key] ||= []).push(n);
      return acc;
    }, {});
  }, [numeric, groupByMod]);

  // flatten nested arrays with reduce
  const [nested, setNested] = useState<number[][]>([[1, 2], [3, 4], [5]]);
  const flattened = useMemo(() => nested.reduce((acc, arr) => acc.concat(arr), [] as number[]), [nested]);

  // common chains
  const chainExample = useMemo(() => {
    // filter odd, map * multiplier, sum
    return numeric.filter((n) => n % 2 === 1).map((n) => n * multiplier).reduce((a, b) => a + b, 0);
  }, [numeric, multiplier]);

  // operations
  function append() {
    const parsed = Number(input);
    setItems((p) => [...p, Number.isNaN(parsed) ? input : parsed]);
    setInput("");
  }
  function prepend() {
    const parsed = Number(input);
    setItems((p) => [(Number.isNaN(parsed) ? input : parsed), ...p]);
    setInput("");
  }
  function duplicate() {
    setItems((p) => [...p, ...p]);
  }
  function removeFirst() {
    setItems((p) => p.slice(1));
  }
  function pushNestedRandom() {
    setNested((n) => {
      const copy = n.map((a) => a.slice());
      copy.push([Math.floor(Math.random() * 10)]);
      return copy;
    });
  }
  function resetAll() {
    setItems([1, 2, 3, 4, 5]);
    setMultiplier(2);
    setThreshold(3);
    setGroupByMod(2);
    setNested([[1, 2], [3, 4], [5]]);
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Map • Filter • Reduce — Interactive Playground</h2>
        <p className="text-slate-600">Try transformations, predicates and aggregations with live controls.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Transformations */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Map / Transform</h3>
          <p className="text-sm text-slate-600">Transform items to new shapes or scaled values.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>items:</strong> [{items.join(", ")}]</div>
            <div><strong>doubled:</strong> [{doubled.join(", ")}]</div>
            <div><strong>scaled (× {multiplier}):</strong> [{scaled.join(", ")}]</div>
            <div className="mt-2"><strong>as objects:</strong> <pre className="inline text-xs">{JSON.stringify(toObjects)}</pre></div>
          </div>

          <div className="mt-3 flex gap-2 items-center">
            <input className="px-2 py-1 border rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder="value" />
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={append}>Append</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={prepend}>Prepend</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => setMultiplier((m) => m + 1)}>Inc multiplier</button>
            <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">multiplier: {multiplier}</div>
          </div>
        </div>

        {/* Predicates */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Filter / Predicate</h3>
          <p className="text-sm text-slate-600">Keep subsets of data that match conditions.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>numeric:</strong> [{numeric.join(", ")}]</div>
            <div><strong>filtered &gt; {threshold}:</strong> [{filteredAbove.join(", ")}]</div>
            <div><strong>strings only:</strong> [{filteredStrings.join(", ")}]</div>
          </div>

          <div className="mt-3 flex gap-2 items-center">
            <input type="number" className="px-2 py-1 border rounded w-24" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => setThreshold((t) => t + 1)}>Inc threshold</button>
            <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={removeFirst}>Remove first</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={duplicate}>Duplicate list</button>
          </div>
        </div>

        {/* Aggregation */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Reduce / Aggregate</h3>
          <p className="text-sm text-slate-600">Sum, max, and arbitrary reductions like groupBy or flatten.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>sum:</strong> {sum}</div>
            <div><strong>max:</strong> {max ?? "—"}</div>
            <div className="mt-2"><strong>chain (odd → ×mult → sum):</strong> {chainExample}</div>
          </div>

          <div className="mt-3 flex gap-2 items-center">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => setItems((p) => p.map((v) => (typeof v === "number" ? (v as number) + 1 : v)))}>Map +1 (numbers)</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={() => setItems((p) => p.filter((_, i) => i % 2 === 0))}>Filter by idx (even)</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => setItems([])}>Clear items</button>
          </div>
        </div>

        {/* Grouping & Flatten */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">groupBy (reduce) & flatten</h3>
          <p className="text-sm text-slate-600">Group items by a key computed via reduce; flatten nested arrays.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <label className="block">group by modulo:
              <input className="ml-2 px-2 py-1 border rounded w-20" type="number" value={groupByMod} onChange={(e) => setGroupByMod(Math.max(1, Number(e.target.value)))} />
            </label>

            <div className="mt-2"><strong>grouped:</strong> <pre className="inline text-xs">{JSON.stringify(groupedByMod)}</pre></div>
            <div className="mt-2"><strong>nested:</strong> {JSON.stringify(nested)}</div>
            <div><strong>flattened:</strong> [{flattened.join(", ")}]</div>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={pushNestedRandom}>Push nested random</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => setNested([[9, 9]])}>Replace nested</button>
          </div>
        </div>

        {/* Notes & reset */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Notes & Tips</h3>
          <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Prefer pure functions with map/filter/reduce — avoid side effects inside callbacks.</li>
            <li>Chain operations mindfully — sometimes a single reduce can be more efficient than multiple passes.</li>
            <li>Use useMemo to avoid recomputing expensive derived arrays on every render.</li>
          </ul>

          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={resetAll}>Reset demo</button>
          </div>
        </div>
      </div>
    </section>
  );
}