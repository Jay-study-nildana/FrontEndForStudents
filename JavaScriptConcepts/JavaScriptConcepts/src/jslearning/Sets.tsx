import type { JSX } from "react";
import { useMemo, useRef, useState } from "react";

/**
 * Sets — Interactive Playground
 * - Demonstrates ES6 Set / WeakSet usage:
 *   - creation, membership, add/delete
 *   - union, intersection, difference, symmetric difference
 *   - deduplicating arrays
 *   - WeakSet for object membership (non-iterable)
 */
export default function Sets(): JSX.Element {
  const [input, setInput] = useState<string>("a,b,c,a");
  const [setA, setSetA] = useState<Set<string>>(() => new Set(["a", "b", "c"]));
  const [setB, setSetB] = useState<Set<string>>(() => new Set(["b", "c", "d"]));
  const [log, setLog] = useState<string[]>([]);
  type WeakObj = { id: string; created: number };
  const objCounter = useRef(0);
  const weakSetRef = useRef<WeakSet<WeakObj>>(new WeakSet());
  const objStoreRef = useRef<WeakObj[]>([]); // keep refs so we can inspect created objects

  const push = (s: string) => setLog((l) => [s, ...l].slice(0, 200));

  // helpers: set operations (immutable results)
  function union<T>(a: Set<T>, b: Set<T>) {
    return new Set<T>([...a, ...b]);
  }
  function intersection<T>(a: Set<T>, b: Set<T>) {
    return new Set<T>([...a].filter((x) => b.has(x)));
  }
  function difference<T>(a: Set<T>, b: Set<T>) {
    return new Set<T>([...a].filter((x) => !b.has(x)));
  }
  function symmetricDifference<T>(a: Set<T>, b: Set<T>) {
    const u = union(a, b);
    const i = intersection(a, b);
    return difference(u, i);
  }

  // derived arrays for rendering
  const arrA = useMemo(() => Array.from(setA.values()), [setA]);
  const arrB = useMemo(() => Array.from(setB.values()), [setB]);

  // parse input into normalized tokens and create a set
  function loadFromInput() {
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setSetA(new Set(parts));
    push(`Loaded setA from input (${parts.length} items)`);
  }

  function addRandomToA() {
    const v = `v${Math.floor(Math.random() * 100)}`;
    setSetA((prev) => new Set([...prev, v]));
    push(`added ${v} to setA`);
  }

  function removeFromA(val: string) {
    setSetA((prev) => {
      const next = new Set(prev);
      next.delete(val);
      return next;
    });
    push(`removed ${val} from setA`);
  }

  function clearA() {
    setSetA(new Set());
    push("cleared setA");
  }

  // array dedupe example
  function dedupeArrayExample() {
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    const deduped = [...new Set(parts)];
    push(`deduped → [${deduped.join(", ")}]`);
  }

  // WeakSet demo: create object and add to WeakSet (can't iterate WeakSet)
  function createWeakObject() {
    const idx = ++objCounter.current;
    const o: WeakObj = { id: `obj${idx}`, created: Date.now() };
    objStoreRef.current.push(o);
    weakSetRef.current.add(o);
    push(`created object ${o.id} and added to WeakSet`);
  }
  function checkWeakObject(index: number) {
    const o = objStoreRef.current[index];
    if (!o) {
      push("no such object stored");
      return;
    }
    push(`${o.id} is in WeakSet? ${weakSetRef.current.has(o)}`);
  }
  function dropStoredObjects() {
    // clear our strong refs so objects may be GC'd (WeakSet won't prevent)
    objStoreRef.current = [];
    push("cleared strong refs to created objects (WeakSet entries now only weakly referenced)");
  }

  // small utility to replace setB with union/intersection/diff results
  function applyOpToB(op: "union" | "intersection" | "difference" | "symdiff") {
    let next: Set<string>;
    if (op === "union") next = union(setB, setA);
    else if (op === "intersection") next = intersection(setB, setA);
    else if (op === "difference") next = difference(setB, setA);
    else next = symmetricDifference(setB, setA);
    setSetB(next);
    push(`applied ${op} with setA → setB now has ${next.size} items`);
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Sets — Interactive Playground</h2>
        <p className="text-slate-600">Work with Set & WeakSet: operations, dedupe patterns, and object membership semantics.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Set A */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Set A (editable)</h3>
          <p className="text-sm text-slate-600">Create from CSV, add/remove, or dedupe arrays using Set.</p>

          <div className="mt-3 text-sm text-slate-700">
            <label className="block">CSV input:
              <input className="ml-2 px-2 py-1 border rounded w-full mt-2" value={input} onChange={(e) => setInput(e.target.value)} />
            </label>

            <div className="mt-3"><strong>setA:</strong> [{arrA.join(", ")}]</div>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={loadFromInput}>Load from input</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={addRandomToA}>Add random</button>
            <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={() => dedupeArrayExample()}>Dedupe array</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearA}>Clear</button>
          </div>

          <div className="mt-3 text-xs">
            <div>Remove an item from setA by clicking:</div>
            <div className="mt-2 flex gap-1 flex-wrap">{arrA.map((v) => (
              <button key={v} className="px-2 py-0.5 bg-slate-100 rounded text-xs" onClick={() => removeFromA(v)}>{v} ✕</button>
            ))}</div>
          </div>
        </div>

        {/* Set B & operations */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Set B & Operations</h3>
          <p className="text-sm text-slate-600">Compute union/intersection/difference/symmetric-diff immutably.</p>

          <div className="mt-3 text-sm text-slate-700">
            <div><strong>setB:</strong> [{arrB.join(", ")}]</div>
            <div className="mt-2"><strong>union(A,B):</strong> {[...union(setA, setB)].join(", ")}</div>
            <div><strong>intersection(A,B):</strong> {[...intersection(setA, setB)].join(", ")}</div>
            <div><strong>difference(A\\B):</strong> {[...difference(setA, setB)].join(", ")}</div>
            <div><strong>symDiff:</strong> {[...symmetricDifference(setA, setB)].join(", ")}</div>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => applyOpToB("union")}>B = B ∪ A</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={() => applyOpToB("intersection")}>B = B ∩ A</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => applyOpToB("difference")}>B = B \\ A</button>
            <button className="px-3 py-1 bg-pink-600 text-white rounded" onClick={() => applyOpToB("symdiff")}>B = A Δ B</button>
          </div>
        </div>

        {/* WeakSet */}
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">WeakSet (object membership)</h3>
          <p className="text-sm text-slate-600">WeakSet holds object references weakly and is not iterable.</p>

          <div className="mt-3 text-sm text-slate-700">
            <div>Created objects (strong refs kept in array): {objStoreRef.current.map((o) => o.id).join(", ") || "none"}</div>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={createWeakObject}>Create & add to WeakSet</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={() => checkWeakObject(0)}>Check first object</button>
            <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={dropStoredObjects}>Drop strong refs</button>
          </div>

          <div className="mt-3 text-xs">
            <div><strong>Note:</strong> WeakSet cannot be enumerated; used for per-object metadata without preventing GC.</div>
          </div>
        </div>

        {/* Activity log */}
        <div className="rounded-lg p-4 bg-white/90 shadow md:col-span-2">
          <h3 className="font-semibold">Activity Log</h3>
          <div className="mt-2 text-xs bg-slate-50 p-2 rounded max-h-48 overflow-auto">
            {log.length === 0 ? <div className="text-slate-500">No actions yet</div> : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => setLog([])}>Clear log</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => { console.log("sets:", { setA: Array.from(setA), setB: Array.from(setB), weakRefs: objStoreRef.current }); push("dumped sets to console"); }}>Dump to console</button>
          </div>
        </div>
      </div>
    </section>
  );
}