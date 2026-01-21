import type { JSX } from "react";
import { useMemo, useRef, useState } from "react";

/**
 * Maps — Interactive Playground
 * - Demonstrates ES6 Map / WeakMap usage:
 *   - creating, reading, deleting entries
 *   - object keys vs primitive keys
 *   - iteration, conversion to/from arrays & plain objects
 *   - frequency counting, memoization with Map, Map vs plain object
 */
export default function Maps(): JSX.Element {
  const [primitiveMap, setPrimitiveMap] = useState<Map<string, string>>(() => new Map([["a", "alpha"], ["b", "beta"]]));
  const [useObjectKeys, setUseObjectKeys] = useState(false);
  const [keyInput, setKeyInput] = useState<string>("");
  const [valInput, setValInput] = useState<string>("");
  const [itemsInput, setItemsInput] = useState<string>("apple,banana,apple,orange");
  const [freqMapSnap, setFreqMapSnap] = useState<Array<[string, number]>>([]);
  const objectKeyCounter = useRef(0);

  // Map storing object keys (demo) — we keep reference in state to render UI when replaced
  const [objectMap, setObjectMap] = useState<Map<object, string>>(() => new Map());

  // WeakMap demo for metadata keyed by object
  const weakMeta = useRef<WeakMap<object, { createdAt: number }>>(new WeakMap());

  // Convert Map -> array of entries (useful for rendering)
  const primitiveEntries = useMemo(() => Array.from(primitiveMap.entries()), [primitiveMap]);
  const objectEntries = useMemo(() => Array.from(objectMap.entries()), [objectMap]);

  // Add an entry (primitive or object-keyed depending on toggle)
  function addEntry() {
    if (useObjectKeys) {
      const objKey = { id: ++objectKeyCounter.current, label: keyInput || `obj${objectKeyCounter.current}` };
      weakMeta.current.set(objKey, { createdAt: Date.now() });
      const next = new Map(objectMap);
      next.set(objKey, valInput || "(value)");
      setObjectMap(next);
      setKeyInput("");
      setValInput("");
      return;
    }
    const next = new Map(primitiveMap);
    next.set(keyInput || String(Math.random()).slice(2, 6), valInput || "(value)");
    setPrimitiveMap(next);
    setKeyInput("");
    setValInput("");
  }

  // Delete key (primitive or object by index)
  function deleteEntryPrimitive(k: string) {
    const next = new Map(primitiveMap);
    next.delete(k);
    setPrimitiveMap(next);
  }
  function deleteEntryObject(index: number) {
    const next = new Map(objectMap);
    const key = Array.from(next.keys())[index];
    if (key) {
      next.delete(key);
      setObjectMap(next);
    }
  }

  // Clear maps
  function clearPrimitive() {
    setPrimitiveMap(new Map());
  }
  function clearObject() {
    setObjectMap(new Map());
    weakMeta.current = new WeakMap();
  }

  // Frequency count example: string list -> Map<string, number>
  function buildFrequencyMap() {
    const parts = itemsInput.split(",").map((s) => s.trim()).filter(Boolean);
    const m = new Map<string, number>();
    for (const p of parts) m.set(p, (m.get(p) ?? 0) + 1);
    setFreqMapSnap(Array.from(m.entries()));
  }

  // Memoization example using Map as cache (Fibonacci)
  const fibCache = useRef<Map<number, number>>(new Map([[0, 0], [1, 1]]));
  function fib(n: number): number {
    const cached = fibCache.current.get(n);
    if (cached !== undefined) return cached;
    const v = fib(n - 1) + fib(n - 2);
    fibCache.current.set(n, v);
    return v;
  }
  const [fibN, setFibN] = useState<number>(10);
  const [fibResult, setFibResult] = useState<number | null>(null);
  function runFib() {
    setFibResult(fib(fibN));
  }
  function clearFibCache() {
    fibCache.current = new Map([[0, 0], [1, 1]]);
    setFibResult(null);
  }

  // Convert primitive Map to plain object (only safe for string keys)
  function mapToObject(): Record<string, string> {
    const obj: Record<string, string> = {};
    for (const [k, v] of primitiveMap) obj[k] = v;
    return obj;
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Maps — Interactive Playground</h2>
        <p className="text-slate-600">Work with Map, WeakMap, conversion patterns, frequency counting and memoization.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Primitive-key Map */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Primitive-key Map</h3>
          <p className="text-sm text-slate-600">String keys, iterate entries, convert to plain object.</p>

          <div className="mt-3 text-sm text-slate-700">
            <div><strong>Entries:</strong></div>
            <ul className="mt-1">
              {primitiveEntries.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4">
                  <span>{k} → {v}</span>
                  <div className="flex gap-2">
                    <button className="px-2 py-0.5 bg-rose-600 text-white rounded text-xs" onClick={() => deleteEntryPrimitive(k)}>Delete</button>
                  </div>
                </li>
              ))}
              {primitiveEntries.length === 0 && <li className="text-slate-500">empty</li>}
            </ul>

            <div className="mt-3 flex gap-2">
              <input className="px-2 py-1 border rounded" placeholder="key" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} />
              <input className="px-2 py-1 border rounded" placeholder="value" value={valInput} onChange={(e) => setValInput(e.target.value)} />
              <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => { setUseObjectKeys(false); addEntry(); }}>Add (primitive)</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearPrimitive}>Clear</button>
            </div>

            <div className="mt-3 text-xs">
              <div><strong>As plain object:</strong> <pre className="inline">{JSON.stringify(mapToObject())}</pre></div>
            </div>
          </div>
        </div>

        {/* Object-key Map & WeakMap */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Object-key Map & WeakMap</h3>
          <p className="text-sm text-slate-600">Store values keyed by objects; use WeakMap for metadata to avoid preventing GC.</p>

          <div className="mt-3 text-sm text-slate-700">
            <div><strong>Entries (object keys show .id if present):</strong></div>
            <ul className="mt-1">
              {objectEntries.map(([k, v], i) => {
                const id = (k as any).id ?? `obj${i}`;
                return (
                  <li key={i} className="flex justify-between gap-4">
                    <span>{String(id)} → {v}</span>
                    <div className="flex gap-2">
                      <button className="px-2 py-0.5 bg-rose-600 text-white rounded text-xs" onClick={() => deleteEntryObject(i)}>Delete</button>
                    </div>
                  </li>
                );
              })}
              {objectEntries.length === 0 && <li className="text-slate-500">empty</li>}
            </ul>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={() => { setUseObjectKeys(true); setKeyInput(""); setValInput(""); }}>Switch to object-key add</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearObject}>Clear object map</button>
            </div>

            <div className="mt-3 text-xs">
              <div><strong>WeakMap metadata (createdAt):</strong> {objectEntries.map(([k]) => weakMeta.current.get(k as object)?.createdAt ? "yes" : "no").join(", ") || "—"}</div>
            </div>
          </div>
        </div>

        {/* Frequency counting & conversion */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Frequency Count (Map)</h3>
          <p className="text-sm text-slate-600">Build a Map of counts from a comma list.</p>

          <div className="mt-3 text-sm text-slate-700">
            <label className="block">items:
              <input className="ml-2 px-2 py-1 border rounded w-full mt-2" value={itemsInput} onChange={(e) => setItemsInput(e.target.value)} />
            </label>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={buildFrequencyMap}>Build freq map</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => setFreqMapSnap([])}>Clear</button>
            </div>

            <div className="mt-3">
              <strong>Freq entries:</strong>
              <ul className="mt-1 text-xs">
                {freqMapSnap.length === 0 ? <li className="text-slate-500">none</li> : freqMapSnap.map(([k, n]) => <li key={k}>{k} → {n}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Memoization */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Memoization with Map</h3>
          <p className="text-sm text-slate-600">Cache expensive results keyed by input using a Map.</p>

          <div className="mt-3 text-sm text-slate-700">
            <label className="block">fib(n):
              <input className="ml-2 px-2 py-1 border rounded w-24" type="number" value={fibN} onChange={(e) => setFibN(Number(e.target.value))} />
            </label>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={runFib}>Compute</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearFibCache}>Clear cache</button>
            </div>

            <div className="mt-3 text-xs">
              <div><strong>Result:</strong> {fibResult === null ? "—" : String(fibResult)}</div>
              <div className="mt-2"><strong>Cache size:</strong> {fibCache.current.size}</div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-lg p-4 bg-white/90 shadow md:col-span-2">
          <h3 className="font-semibold">Notes & Tips</h3>
          <ul className="mt-2 text-sm text-slate-700">
            <li>Map preserves insertion order and accepts non-string keys (objects, functions).</li>
            <li>WeakMap keys must be objects and do not prevent GC — use for per-object metadata.</li>
            <li>Convert Map → Array with Array.from(map.entries()) and Map → Object when keys are strings.</li>
            <li>Prefer Map when you need non-string keys or guaranteed insertion-order iteration.</li>
            <li>When using Map in React state, replace the Map reference (new Map(old)) to trigger re-render.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
