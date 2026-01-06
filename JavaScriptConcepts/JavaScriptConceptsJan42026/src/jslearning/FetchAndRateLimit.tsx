import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Fetch & Rate-Limit Playground
 * - Demonstrates: fetch with AbortController, debounced search, throttled action,
 *   client-side filtering, simple cancellation and logs.
 */

function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      fn(...args);
      t = null;
    }, wait);
  };
}

function throttle<T extends (...args: any[]) => void>(fn: T, limit = 1000) {
  let last = 0;
  let scheduled: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = limit - (now - last);
    if (remaining <= 0) {
      if (scheduled) {
        clearTimeout(scheduled);
        scheduled = null;
      }
      last = now;
      fn(...args);
    } else if (!scheduled) {
      scheduled = setTimeout(() => {
        last = Date.now();
        scheduled = null;
        fn(...args);
      }, remaining);
    }
  };
}

export default function FetchAndRateLimit(): JSX.Element {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ id: number; title: string }>>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [throttleMs, setThrottleMs] = useState<number>(1500);
  const [debounceMs, setDebounceMs] = useState<number>(400);
  const fetchController = useRef<AbortController | null>(null);
  const lastFetchTime = useRef<number | null>(null);

  function addLog(msg: string) {
    setLogs((s) => [new Date().toLocaleTimeString() + " — " + msg, ...s].slice(0, 200));
  }

  async function doFetch(q = "") {
    try {
      fetchController.current?.abort();
      fetchController.current = new AbortController();
      const ctrl = fetchController.current;
      addLog(`fetch start (${q || "<all>"})`);
      lastFetchTime.current = Date.now();
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", { signal: ctrl.signal });
      if (!res.ok) throw new Error("network error " + res.status);
      const data: Array<{ id: number; title: string }> = await res.json();
      // simple client-side filter to simulate search
      const filtered = q ? data.filter((d) => d.title.includes(q)) : data.slice(0, 20);
      setResults(filtered.slice(0, 30));
      addLog(`fetch success (${filtered.length})`);
    } catch (e) {
      if ((e as Error).name === "AbortError" || (e as any).message === "aborted") {
        addLog("fetch aborted");
      } else {
        addLog("fetch error: " + String((e as Error).message));
      }
      setResults([]);
    } finally {
      fetchController.current = null;
    }
  }

  // Debounced search: will call doFetch after user stops typing
  const debouncedFetchRef = useRef<(q: string) => void>(() => {});
  useEffect(() => {
    debouncedFetchRef.current = debounce((q: string) => doFetch(q), debounceMs);
  }, [debounceMs]);

  // Throttled manual fetch (e.g., button) — updates if throttleMs changes
  const throttledFetchRef = useRef<(q?: string) => void>(() => {});
  useEffect(() => {
    throttledFetchRef.current = throttle((q = "") => doFetch(q), throttleMs);
  }, [throttleMs]);

  // wire input change to debounced fetch
  useEffect(() => {
    if (query === "") {
      // optional: fetch a small default set when cleared
      debouncedFetchRef.current("");
      return;
    }
    debouncedFetchRef.current(query);
  }, [query]);

  function manualFetch() {
    throttledFetchRef.current(query);
  }

  function cancelFetch() {
    if (fetchController.current) {
      fetchController.current.abort();
      fetchController.current = null;
      addLog("manual cancel");
    } else {
      addLog("no active fetch");
    }
  }

  // quick helper showing time since last fetch
//   const timeSinceLast = lastFetchTime.current ? Math.max(0, Date.now() - lastFetchTime.current) : null;
  useEffect(() => {
    const t = setInterval(() => setLogs((s) => s.slice(0)), 2000); // noop to keep component active; small perf cost
    return () => clearInterval(t);
  }, []);

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Fetch, Debounce & Throttle — Playground</h2>
        <p className="text-slate-600">Try debounced search, throttled manual fetch, cancellation and observe timings.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Search (debounced)</h3>
          <p className="text-sm text-slate-600">Typing triggers a debounced fetch against a demo API.</p>

          <div className="mt-3 text-sm text-slate-700">
            <label className="block">query:
              <input className="ml-2 px-2 py-1 border rounded w-full" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="type to search titles..." />
            </label>

            <label className="block mt-2">debounce (ms):
              <input className="ml-2 px-2 py-1 border rounded w-24" type="number" min={0} value={debounceMs} onChange={(e) => setDebounceMs(Number(e.target.value) || 0)} />
            </label>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => debouncedFetchRef.current(query)}>Force debounced fetch</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => { setQuery(""); doFetch(""); }}>Clear / fetch default</button>
            </div>

            <div className="mt-3 text-xs">
              <strong>Results:</strong>
              <ul className="mt-1 max-h-40 overflow-auto text-xs">
                {results.length === 0 ? <li className="text-slate-500">none</li> : results.map((r) => <li key={r.id}>{r.id} — {r.title}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Throttled Actions</h3>
          <p className="text-sm text-slate-600">Use throttle to limit how often an action (fetch) runs.</p>

          <div className="mt-3 text-sm text-slate-700">
            <label className="block">throttle (ms):
              <input className="ml-2 px-2 py-1 border rounded w-28" type="number" min={100} value={throttleMs} onChange={(e) => setThrottleMs(Number(e.target.value) || 100)} />
            </label>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={manualFetch}>Throttled fetch</button>
              <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={cancelFetch}>Cancel</button>
            </div>

            <div className="mt-3 text-xs">
              <div><strong>Last fetch:</strong> {lastFetchTime.current ? `${Math.round((Date.now() - lastFetchTime.current)/1000)}s ago` : "none"}</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 shadow md:col-span-2">
          <h3 className="font-semibold">Logs</h3>
          <div className="mt-3 text-sm text-slate-700">
            <div className="h-64 overflow-auto bg-slate-50 p-2 rounded text-xs">
              {logs.length === 0 ? <div className="text-slate-500">no logs</div> : logs.map((l, i) => <div key={i} className="whitespace-pre-wrap">{l}</div>)}
            </div>
          </div>

          <h3 className="font-semibold mt-4">Notes</h3>
          <ul className="mt-2 text-sm text-slate-700">
            <li>Debounce: postpone work until user stops triggering events (search inputs).</li>
            <li>Throttle: limit how frequently a function runs over time (buttons, scroll handlers).</li>
            <li>Use AbortController to cancel in-flight fetches to avoid race conditions and wasted work.</li>
            <li>Client-side filtering used for demo; in production prefer server query parameters & pagination.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}