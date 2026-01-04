import type { JSX } from "react";
import { useRef, useState } from "react";

/**
 * BindCallApply — Interactive Playground
 * - Demonstrates Function.prototype.bind / call / apply usage and common patterns:
 *   - setting function `this`
 *   - borrowing methods
 *   - partial application with bind
 *   - fixing callback `this` (timers / event handlers)
 *   - forwarding argument arrays with apply / spread
 */
export default function BindCallApply(): JSX.Element {
  const [logs, setLogs] = useState<string[]>([]);
  const [last, setLast] = useState<string>("—");
  const timerRef = useRef<number | null>(null);

  const push = (s: string) => {
    setLogs((l) => [s, ...l].slice(0, 200));
    setLast(s);
  };

  // simple function that uses `this`
  function describe(this: any, suffix = "") {
    // eslint-disable-next-line no-invalid-this
    return `${this && this.name ? this.name : String(this)}${suffix}`;
  }

  function demoCallApplyBind() {
    const ctxA = { name: "Alpha" };
    const ctxB = { name: "Beta" };

    const viaCall = describe.call(ctxA, " (call)");
    const viaApply = describe.apply(ctxB, [" (apply)"]);
    const bound = describe.bind({ name: "Bound" }, " (bind)")();
    push(`call:${viaCall} | apply:${viaApply} | bind:${bound}`);
  }

  // borrow array slice for arguments-like objects
  function demoBorrowSlice() {
    // create an arguments-like object
    const obj = { 0: "a", 1: "b", length: 2 } as any;
    const slice = Array.prototype.slice.call(obj);
    push(`borrowed slice -> [${slice.join(", ")}]`);
  }

  // partial application via bind
  function demoPartial() {
    function add(this: any, a: number, b: number, c: number) {
      return `${this?.prefix ?? ""}${a + b + c}`;
    }
    const part = add.bind({ prefix: "sum:" }, 1, 2); // b=2 prefilled
    push(`partial add -> ${part(3)}`);
  }

  // apply to forward arrays (Math.max)
  function demoApplyMax() {
    const arr = [3, 7, 2, 9];
    const m = Math.max.apply(null, arr as number[]);
    push(`Math.max.apply -> ${m}`);
  }

  // timer `this` pitfall & fix
  const timerObj = { name: "TimerObj" };
  function timerMethod(this: any) {
    // eslint-disable-next-line no-invalid-this
    push(`timerMethod sees this: ${this?.name ?? String(this)}`);
  }

  function startUnboundTimer() {
    if (timerRef.current) {
      push("timer already running");
      return;
    }
    // passing unbound method -> `this` will be undefined in strict/module mode
    timerRef.current = window.setInterval(timerMethod as TimerHandler, 800);
    push("started unbound timer (this will be undefined inside callback)");
  }

  function startBoundTimer() {
    if (timerRef.current) {
      push("timer already running");
      return;
    }
    // bind the method to timerObj so `this` is correct
    timerRef.current = window.setInterval((timerMethod as any).bind(timerObj), 800);
    push("started bound timer (this fixed via bind)");
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      push("stopped timer");
    }
  }

  // method borrowing: use Array.prototype.join on non-array via call
  function demoJoinBorrow() {
    const likeArray = { 0: "x", 1: "y", length: 2 } as any;
    const joined = Array.prototype.join.call(likeArray, "+");
    push(`joined via borrow -> ${joined}`);
  }

  // clearing logs
  function clear() {
    setLogs([]);
    setLast("—");
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">bind / call / apply — Interactive</h2>
        <p className="text-slate-600">Small demos showing how to control `this`, borrow methods, and forward args.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Basics: call, apply, bind</h3>
          <div className="mt-3 flex gap-2 flex-wrap">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={demoCallApplyBind}>call / apply / bind</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={demoPartial}>Partial via bind</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={demoApplyMax}>Apply  Math.max</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={demoBorrowSlice}>Borrow slice</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={demoJoinBorrow}>Borrow join</button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Timers & callbacks</h3>
          <p className="text-sm text-slate-600">Demonstrates losing `this` when passing methods as callbacks and fixing via bind.</p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={startUnboundTimer}>Start unbound timer</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={startBoundTimer}>Start bound timer</button>
            <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={stopTimer}>Stop timer</button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Results & Activity</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>Last:</strong> {last}</div>
            <div className="mt-2 bg-slate-50 dark:bg-slate-700 p-2 rounded max-h-56 overflow-auto text-xs">
              {logs.length === 0 ? <div className="text-slate-500">No activity</div> : logs.map((l, i) => <div key={i}>{l}</div>)}
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clear}>Clear</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => { console.log("logs:", logs); alert("Logs sent to console"); }}>Dump</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}