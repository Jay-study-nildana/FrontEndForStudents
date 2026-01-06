import type { JSX } from "react";
import { useRef, useState } from "react";

/**
 * Promise.all vs Promise.allSettled — Interactive Demo
 * - Illustrates how Promise.all short-circuits on first rejection
 *   and how Promise.allSettled returns per-promise outcome.
 */
export default function PromiseAllDemo(): JSX.Element {
  const [count, setCount] = useState<number>(5);
  const [baseDelay, setBaseDelay] = useState<number>(500);
  const [failRate, setFailRate] = useState<number>(30);
  const [logs, setLogs] = useState<string[]>([]);
  const [lastAllResult, setLastAllResult] = useState<string | null>(null);
  const [lastAllSettledResult, setLastAllSettledResult] = useState<Array<{ id: number; status: string; value?: string; reason?: string }> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const addLog = (s: string) => setLogs((l) => [new Date().toLocaleTimeString() + " — " + s, ...l].slice(0, 200));

  function fakeRequest(id: number, ms = 700, failPct = 30, signal?: AbortSignal): Promise<string> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new Error("aborted"));
      const t = setTimeout(() => {
        const r = Math.random() * 100;
        if (r < failPct) reject(new Error(`req#${id} failed`));
        else resolve(`req#${id} ok (${ms}ms)`);
      }, ms);
      signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(t);
          reject(new Error("aborted"));
        },
        { once: true }
      );
    });
  }

  function buildPromises() {
    // each promise has slightly different delay to make ordering visible
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    return Array.from({ length: count }, (_, i) => fakeRequest(i + 1, baseDelay + i * 150, failRate, abortRef.current!.signal));
  }

  // Demonstrate Promise.all: will reject on first failing promise.
  async function runAll() {
    setLastAllResult(null);
    setLastAllSettledResult(null);
    addLog("run Promise.all");
    const arr = buildPromises();
    // Wrap rejections to include id so we can report which failed
    const wrapped = arr.map((p, i) =>
      p.catch((e) => {
        throw { id: i + 1, error: (e as Error).message || String(e) };
      })
    );
    try {
      const res = await Promise.all(wrapped);
      setLastAllResult("all succeeded: " + JSON.stringify(res));
      addLog("Promise.all succeeded");
    } catch (e) {
      const info = e as { id?: number; error?: string };
      const msg = info?.id ? `Promise.all failed: req#${info.id} => ${info.error}` : `Promise.all failed: ${String(e)}`;
      setLastAllResult(msg);
      addLog(msg);
    }
  }

  // Demonstrate Promise.allSettled: returns outcome for every promise
  async function runAllSettled() {
    setLastAllResult(null);
    setLastAllSettledResult(null);
    addLog("run Promise.allSettled");
    const arr = buildPromises();
    const results = await Promise.allSettled(arr);
    const mapped = results.map((r, i) =>
      r.status === "fulfilled"
        ? { id: i + 1, status: "fulfilled", value: (r as PromiseFulfilledResult<string>).value }
        : { id: i + 1, status: "rejected", reason: String((r as PromiseRejectedResult).reason) }
    );
    setLastAllSettledResult(mapped);
    addLog("allSettled complete");
  }

  function cancel() {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      addLog("abort requested");
    } else addLog("no active run to cancel");
  }

  function clear() {
    setLogs([]);
    setLastAllResult(null);
    setLastAllSettledResult(null);
    addLog("cleared");
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Promise.all vs Promise.allSettled</h2>
        <p className="text-slate-600">See difference: all short-circuits on rejection; allSettled reports every result.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Controls</h3>
          <div className="mt-3 text-sm text-slate-700 space-y-2">
            <label className="block">count:
              <input className="ml-2 px-2 py-1 border rounded w-20" type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} />
            </label>
            <label className="block">base delay (ms):
              <input className="ml-2 px-2 py-1 border rounded w-24" type="number" min={0} value={baseDelay} onChange={(e) => setBaseDelay(Number(e.target.value) || 0)} />
            </label>
            <label className="block">fail rate (%):
              <input className="ml-2 px-2 py-1 border rounded w-20" type="number" min={0} max={100} value={failRate} onChange={(e) => setFailRate(Number(e.target.value) || 0)} />
            </label>

            <div className="flex gap-2 mt-2 flex-wrap">
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={runAll}>Run Promise.all</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded" onClick={runAllSettled}>Run allSettled</button>
              <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={cancel}>Cancel</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clear}>Clear</button>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Results</h3>
          <div className="mt-3 text-sm text-slate-700">
            <div className="mb-2 text-xs">
              <strong>Promise.all:</strong>
              <div className="mt-1 text-xs text-slate-600">{lastAllResult ?? "no run yet"}</div>
            </div>

            <div className="text-xs">
              <strong>Promise.allSettled:</strong>
              <ul className="mt-1 list-disc ml-5 max-h-40 overflow-auto text-xs">
                {!lastAllSettledResult ? <li className="text-slate-500">no run yet</li> : lastAllSettledResult.map((r) => (
                  <li key={r.id} className={r.status === "fulfilled" ? "text-green-700" : "text-rose-700"}>
                    req#{r.id} — {r.status}{r.status === "fulfilled" ? ` => ${r.value}` : ` => ${r.reason}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 shadow md:col-span-2">
          <h3 className="font-semibold">Logs</h3>
          <div className="mt-3 text-sm text-slate-700">
            <div className="h-48 overflow-auto bg-slate-50 p-2 rounded text-xs">
              {logs.length === 0 ? <div className="text-slate-500">no logs</div> : logs.map((l, i) => <div key={i} className="whitespace-pre-wrap">{l}</div>)}
            </div>
            <p className="mt-3 text-xs text-slate-600">Tip: adjust fail rate to see Promise.all quickly short-circuit vs allSettled reporting all outcomes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
