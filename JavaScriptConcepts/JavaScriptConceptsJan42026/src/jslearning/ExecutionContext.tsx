import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * ExecutionContext — Interactive Playground
 * - Demonstrates JS execution context and `this` behavior:
 *   - global/module scope vs function scope
 *   - regular function vs arrow function `this`
 *   - call/apply/bind
 *   - constructors (`new`) and prototype `this`
 *   - timers and event-handler contexts
 *   - lexical scope vs dynamic this
 */
export default function ExecutionContext(): JSX.Element {
  const [logs, setLogs] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<string>("—");
  const divRef = useRef<HTMLDivElement | null>(null);

  const push = (s: string) => setLogs((l) => [s, ...l].slice(0, 200));

  // global / module scope demo
  function showGlobal() {
    // in modules strict mode applies; globalThis exists
    const g = typeof globalThis !== "undefined" ? "globalThis available" : "no globalThis";
    push(`Global check: ${g}`);
    setLastResult(g);
  }

  // regular function vs arrow function `this`
  function regularThis() {
    function f() {
      // in strict/module mode this === undefined for plain functions
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return String(this);
    }
    const a = f();
    const arrow = (() => {
      // arrow inherits `this` lexically from surrounding scope (here undefined in module)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return String(this);
    })();
    push(`regular -> ${a}; arrow -> ${arrow}`);
    setLastResult(`regular:${a} arrow:${arrow}`);
  }

  // call/apply/bind demo
  const obj = { name: "CTX" };
  function fnWithThis(this: any, suffix = "") {
    // eslint-disable-next-line no-invalid-this
    return `${this && this.name ? this.name : String(this)}${suffix}`;
  }
  function callApplyBind() {
    // call
    const c = fnWithThis.call(obj, " (call)");
    // apply
    const a = fnWithThis.apply({ name: "APPLY" }, [" (apply)"]);
    // bind
    const bfn = fnWithThis.bind({ name: "BIND" }, " (bind)");
    const b = bfn();
    push(`call:${c} | apply:${a} | bind:${b}`);
    setLastResult(`call:${c} apply:${a} bind:${b}`);
  }

  // constructor / new
  function ctorDemo() {
    function Thing(this: any, id: number) {
      this.id = id;
      // eslint-disable-next-line no-invalid-this
      this.desc = `Thing#${this.id}`;
    }
    // @ts-ignore
    const t = new (Thing as any)(7);
    push(`constructed ${t.desc}`);
    setLastResult(JSON.stringify(t));
  }

  // timer `this` behavior and fixes
  const timerRef = useRef<number | null>(null);
  function startTimerDemo() {
    if (timerRef.current) {
      push("timer already running");
      return;
    }
    const contextObj = { label: "TIMER" };
    // plain function will have undefined `this` in module strict mode
    timerRef.current = window.setInterval(function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      push(`timer fn sees this: ${String(this)}`);
    }.bind(contextObj), 1000); // show binding as typical fix
    push("started timer (bound function)");
  }
  function stopTimerDemo() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      push("stopped timer");
    }
  }

  // event handler context demo (addEventListener vs JSX handler)
  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    function listener(this: any, _e: Event) {
      // `this` here is element when used via addEventListener (non-arrow)
      push(`addEventListener this.tagName=${String(this?.tagName)}`);
      setLastResult(`listener this=${String(this?.tagName)}`);
    }
    el.addEventListener("click", listener);
    return () => {
      el.removeEventListener("click", listener);
    };
  }, []);

  // stack / execution order example (sync vs microtask vs macrotask)
  function showStack() {
    push("sync start");
    Promise.resolve().then(() => push("microtask (Promise)"));
    setTimeout(() => push("macrotask (setTimeout)"), 0);
    push("sync end");
    setLastResult("stack demo executed");
  }

  // utility to clear log
  function clear() {
    setLogs([]);
    setLastResult("—");
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Execution Context — Interactive Playground</h2>
        <p className="text-slate-600">Inspect global vs function scope, `this` rules, call/apply/bind, constructors, timers and event contexts.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Global / Module / Function</h3>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={showGlobal}>Show global</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={regularThis}>Regular vs Arrow `this`</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={showStack}>Sync / Microtask / Macrotask</button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Dynamic `this` (call/apply/bind)</h3>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={callApplyBind}>call / apply / bind</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={ctorDemo}>Constructor (new)</button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Timers & Binding</h3>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={startTimerDemo}>Start bound timer</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={stopTimerDemo}>Stop timer</button>
          </div>
          <p className="mt-3 text-sm text-slate-700">Note: bound function ensures desired `this` inside timer callback.</p>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Event Handler Context</h3>
          <div className="mt-3">
            <div ref={divRef} className="p-4 border rounded cursor-pointer select-none">Click me (addEventListener listener attached)</div>
            <button
              className="mt-3 px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={(e) => {
                // JSX inline handler: `this` is not the element; use event.currentTarget instead
                push(`JSX handler currentTarget.tagName=${String((e.currentTarget as HTMLElement).tagName)}`);
                setLastResult(`JSX handler: ${String((e.currentTarget as HTMLElement).tagName)}`);
              }}
            >
              Trigger JSX handler
            </button>
            <p className="mt-2 text-sm text-slate-700">Compare addEventListener (`this` = element) vs JSX handler (use event.currentTarget).</p>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Results & Logs</h3>
          <div className="mt-3 text-sm text-slate-700">
            <div><strong>Last result:</strong> {lastResult}</div>
            <div className="mt-2 bg-slate-50 dark:bg-slate-700 p-2 rounded max-h-48 overflow-auto text-xs">
              {logs.length === 0 ? <div className="text-slate-500">No logs yet</div> : logs.map((l, i) => <div key={i}>{l}</div>)}
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clear}>Clear</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => { console.log("logs:", logs); alert("Logs dumped to console"); }}>Dump to console</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}