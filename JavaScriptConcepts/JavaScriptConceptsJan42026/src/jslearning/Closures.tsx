import type { JSX } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Closures — Interactive Playground
 * - Demonstrates closure nuances: private state, loop capture pitfalls,
 *   stale closures with timers, module pattern, memory/leak examples, and fixes.
 * - Inline comments explain each pattern. Use the controls to run examples.
 */
export default function Closures(): JSX.Element {
  const [logs, setLogs] = useState<string[]>([]);
  const [privateCounterValue, setPrivateCounterValue] = useState<number | null>(null);
  const [staleCount, setStaleCount] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const staleIntervalRef = useRef<number | null>(null);
  const largeStoreRef = useRef<string | null>(null);

  // helper to append to logs
  function pushLog(line: string) {
    setLogs((l) => [line, ...l].slice(0, 200));
  }

  // 1) Factory that uses closures for private state
  function createCounter(start = 0) {
    // `count` is closed over and inaccessible directly from outside
    let count = start;
    return {
      increment(by = 1) {
        count += by;
        return count;
      },
      value() {
        return count;
      },
      reset() {
        count = start;
        return count;
      },
    };
  }

  function runCounterFactory() {
    const c = createCounter(5);
    pushLog(`factory initial: ${c.value()}`);
    pushLog(`factory +1 => ${c.increment()}`);
    pushLog(`factory +3 => ${c.increment(3)}`);
    setPrivateCounterValue(c.value());
  }

  // 2) Loop capture pitfall (var) vs correct (let / IIFE)
  function runVarLoopPitfall() {
    pushLog("var loop pitfall (schedules 3 timeouts)");
    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        // var `i` is shared; this prints 3 three times in the classic pitfall
        pushLog(`var loop timeout -> i = ${i}`);
      }, 50 * (i + 1));
    }
  }

  function runLetLoopFixed() {
    pushLog("let loop fixed (schedules 3 timeouts)");
    for (let i = 0; i < 3; i++) {
      setTimeout(() => pushLog(`let loop timeout -> i = ${i}`), 50 * (i + 1));
    }
  }

  function runIIEFix() {
    pushLog("IIFE fix for var (schedules 3 timeouts)");
    for (var i = 0; i < 3; i++) {
      ((n: number) => {
        setTimeout(() => pushLog(`IIFE var fix -> n = ${n}`), 50 * (n + 1));
      })(i);
    }
  }

  // 3) Stale closure with setInterval reading state incorrectly
  // start a naive interval that closes over `staleCount` initial value
  function startStaleInterval() {
    if (staleIntervalRef.current) {
      pushLog("stale interval already running");
      return;
    }
    pushLog("starting STALE interval (closure captures value at start)");
    const id = window.setInterval(() => {
      // this callback closes over the `staleCount` value that existed when interval was started
      // updating state outside the interval will not be seen here unless we reference latest via ref
      pushLog(`stale interval callback sees staleCount (state read): ${staleCount}`);
    }, 1000);
    staleIntervalRef.current = id;
  }

  function stopStaleInterval() {
    if (staleIntervalRef.current) {
      clearInterval(staleIntervalRef.current);
      staleIntervalRef.current = null;
      pushLog("stale interval stopped");
    }
  }

  // Correct pattern: use a ref that is updated with latest state and read inside interval
  const latestCountRef = useRef<number>(staleCount);
  useEffect(() => {
    latestCountRef.current = staleCount;
  }, [staleCount]);

  function startRefInterval() {
    if (intervalRef.current) {
      pushLog("ref-backed interval already running");
      return;
    }
    pushLog("starting ref-backed interval (reads latest via ref)");
    const id = window.setInterval(() => {
      pushLog(`ref interval sees latestCountRef: ${latestCountRef.current}`);
    }, 1000);
    intervalRef.current = id;
  }

  function stopRefInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      pushLog("ref-backed interval stopped");
    }
  }

  // 4) Module pattern via closure
  function makeModule() {
    let secret = "s3cr3t";
    return {
      getSecret() {
        return secret;
      },
      setSecret(s: string) {
        secret = s;
      },
    };
  }

  function runModuleDemo() {
    const mod = makeModule();
    pushLog(`module.getSecret() -> ${mod.getSecret()}`);
    mod.setSecret("newSecret");
    pushLog(`module.getSecret() after set -> ${mod.getSecret()}`);
  }

  // 5) Memory leak example: closure holds large data until you null it
  function createLeakyClosure() {
    // simulate a large string retained by closure
    const big = "x".repeat(2_000_000); // ~2MB string (demo size)
    largeStoreRef.current = big;
    // closure holds reference to big via `keep`
    function keep() {
      return big.length;
    }
    // return function but we store nothing; big remains reachable via largeStoreRef unless cleared
    return keep;
  }

  let leakyHandleRef = useRef<(() => number) | null>(null);
  function runLeakyDemo() {
    leakyHandleRef.current = createLeakyClosure();
    pushLog(`leaky closure created, big size -> ${leakyHandleRef.current?.()}`);
  }
  function clearLeakyDemo() {
    leakyHandleRef.current = null;
    largeStoreRef.current = null;
    // allow GC to reclaim large string
    pushLog("leaky closure references cleared (eligible for GC)");
  }

  // cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (staleIntervalRef.current) clearInterval(staleIntervalRef.current);
    };
  }, []);

  // quick derived example list for the UI
  const stats = useMemo(() => {
    return {
      logs: logs.length,
      privateCounter: privateCounterValue ?? "—",
      staleCount,
      intervalsRunning: (intervalRef.current ? 1 : 0) + (staleIntervalRef.current ? 1 : 0),
      leakyStored: largeStoreRef.current ? "yes" : "no",
    };
  }, [logs, privateCounterValue, staleCount]);

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Closure Nuances — Interactive Playground</h2>
        <p className="text-slate-600">Hands-on closure patterns, pitfalls, and fixes. Click buttons to run examples and inspect logs.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Factory / private state */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Private state via factory</h3>
          <p className="text-sm text-slate-600">Closures let you keep data private and expose functions that operate on it.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={runCounterFactory}>Run counter factory</button>
            <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">value: {stats.privateCounter}</div>
          </div>
        </div>

        {/* Loop capture */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Loop capture pitfalls</h3>
          <p className="text-sm text-slate-600">Classic var vs let and IIFE fixes for captured loop variables.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-amber-600 text-white rounded" onClick={runVarLoopPitfall}>Run var pitfall</button>
            <button type="button" className="px-3 py-1 bg-green-600 text-white rounded" onClick={runLetLoopFixed}>Run let fixed</button>
            <button type="button" className="px-3 py-1 bg-pink-600 text-white rounded" onClick={runIIEFix}>Run IIFE fix</button>
          </div>
        </div>

        {/* Stale closure */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Stale closures with timers</h3>
          <p className="text-sm text-slate-600">Demonstrates stale reads and the ref-based fix (keep latest value in a ref).</p>
          <div className="mt-2 flex gap-2 items-center">
            <button type="button" className="px-3 py-1 bg-rose-600 text-white rounded" onClick={() => setStaleCount((c) => c + 1)}>Inc external state</button>
            <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">staleCount: {stats.staleCount}</div>
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={startStaleInterval}>Start stale interval</button>
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={stopStaleInterval}>Stop stale interval</button>
            <button type="button" className="px-3 py-1 bg-green-600 text-white rounded" onClick={startRefInterval}>Start ref-backed interval</button>
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={stopRefInterval}>Stop ref interval</button>
          </div>
        </div>

        {/* Module / memory */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Module pattern & memory</h3>
          <p className="text-sm text-slate-600">Module-like closures and an example showing how closures can retain large data (memory leak risk).</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={runModuleDemo}>Run module demo</button>
            <button type="button" className="px-3 py-1 bg-amber-600 text-white rounded" onClick={runLeakyDemo}>Create leaky closure</button>
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearLeakyDemo}>Clear leaky references</button>
          </div>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">Large data retained? {stats.leakyStored}</div>
        </div>

        {/* Logs */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Activity Log</h3>
          <div className="mt-2 text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded max-h-64 overflow-auto">
            {logs.length === 0 ? <div className="text-slate-500">No logs yet</div> : logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => setLogs([])}>Clear logs</button>
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => { console.log("logs:", logs); alert("Logs dumped to console"); }}>Dump logs</button>
          </div>
        </div>
      </div>
    </section>
  );
}