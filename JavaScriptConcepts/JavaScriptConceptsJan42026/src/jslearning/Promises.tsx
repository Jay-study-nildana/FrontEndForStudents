import type { JSX } from "react";
import { useRef, useState } from "react";

/**
 * Promises — Interactive Playground
 * Demonstrates: creating promises, chaining, error handling, Promise.all, Promise.race,
 * Promise.allSettled, sequential execution, retry, timeout and basic cancellation via AbortController.
 */
export default function Promises(): JSX.Element {
  const [logs, setLogs] = useState<string[]>([]);
  const [count, setCount] = useState<number>(3);
  const [delayMs, setDelayMs] = useState<number>(700);
  const [failRate, setFailRate] = useState<number>(30); // percent chance to fail
  const abortCtrl = useRef<AbortController | null>(null);

  function addLog(msg: string) {
    setLogs((s) => [new Date().toLocaleTimeString() + " — " + msg, ...s].slice(0, 200));
  }

  // Simulated async request that may succeed or fail, supports AbortSignal
  function fakeRequest(name: string, ms = 700, failPct = 30, signal?: AbortSignal): Promise<string> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new Error("aborted"));
      const id = setTimeout(() => {
        const r = Math.random() * 100;
        if (r < failPct) reject(new Error(`${name} failed`));
        else resolve(`${name} ok (${ms}ms)`);
      }, ms);

      signal?.addEventListener("abort", () => {
        clearTimeout(id);
        reject(new Error("aborted"));
      }, { once: true });
    });
  }

  function clearLogs() {
    setLogs([]);
  }

  function runSingle() {
    addLog("start single");
    abortCtrl.current = new AbortController();
    fakeRequest("req1", delayMs, failRate, abortCtrl.current.signal)
      .then((r) => addLog("single then: " + r))
      .catch((e) => addLog("single catch: " + (e as Error).message))
      .finally(() => addLog("single finally"));
  }

  function runChain() {
    addLog("start chain");
    abortCtrl.current = new AbortController();
    fakeRequest("chain-1", delayMs, failRate, abortCtrl.current.signal)
      .then((r) => {
        addLog("chain step1: " + r);
        return fakeRequest("chain-2", delayMs, failRate, abortCtrl.current?.signal);
      })
      .then((r) => addLog("chain step2: " + r))
      .catch((e) => addLog("chain error: " + (e as Error).message))
      .finally(() => addLog("chain done"));
  }

  function runAll() {
    addLog("start Promise.all");
    abortCtrl.current = new AbortController();
    const arr = Array.from({ length: count }, (_, i) => fakeRequest(`all-${i + 1}`, delayMs + i * 100, failRate, abortCtrl.current!.signal));
    Promise.all(arr)
      .then((res) => addLog("all success: " + JSON.stringify(res)))
      .catch((e) => addLog("all failed: " + (e as Error).message))
      .finally(() => addLog("Promise.all done"));
  }

  function runAllSettled() {
    addLog("start Promise.allSettled");
    abortCtrl.current = new AbortController();
    const arr = Array.from({ length: count }, (_, i) => fakeRequest(`settle-${i + 1}`, delayMs + i * 80, failRate, abortCtrl.current!.signal));
    Promise.allSettled(arr).then((results) => {
      addLog("allSettled results:");
      results.forEach((r, idx) => addLog(`  ${idx + 1}: ${r.status}${r.status === "fulfilled" ? " => " + (r as PromiseFulfilledResult<string>).value : " => " + (r as PromiseRejectedResult).reason}`));
      addLog("allSettled done");
    });
  }

  function runRace() {
    addLog("start Promise.race");
    abortCtrl.current = new AbortController();
    const arr = Array.from({ length: count }, (_, i) => fakeRequest(`race-${i + 1}`, delayMs + Math.random() * 600, failRate, abortCtrl.current!.signal));
    Promise.race(arr)
      .then((r) => addLog("race winner: " + r))
      .catch((e) => addLog("race error: " + (e as Error).message))
      .finally(() => addLog("race done"));
  }

  // Sequential execution: run requests one after another
  async function runSequential() {
    addLog("start sequential");
    abortCtrl.current = new AbortController();
    try {
      for (let i = 0; i < count; i++) {
        const res = await fakeRequest(`seq-${i + 1}`, delayMs + i * 50, failRate, abortCtrl.current.signal);
        addLog("seq got: " + res);
      }
      addLog("sequential complete");
    } catch (e) {
      addLog("sequential error: " + (e as Error).message);
    }
  }

  // Retry helper: attempts fn up to n times with delayBetween ms
  async function retry<T>(fn: () => Promise<T>, attempts = 3, delayBetween = 300): Promise<T> {
    let lastErr: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (e) {
        lastErr = e;
        if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayBetween));
      }
    }
    throw lastErr;
  }

  function runWithRetry() {
    addLog("start with retry");
    abortCtrl.current = new AbortController();
    retry(() => fakeRequest("retry-req", delayMs, failRate, abortCtrl.current!.signal), 4, 250)
      .then((r) => addLog("retry success: " + r))
      .catch((e) => addLog("retry failed: " + (e as Error).message));
  }

  // Timeout wrapper: rejects if promise doesn't settle within ms
  function withTimeout<T>(p: Promise<T>, ms: number) {
    return Promise.race([
      p,
      new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
    ]);
  }

  function runWithTimeout() {
    addLog("start with timeout");
    abortCtrl.current = new AbortController();
    withTimeout(fakeRequest("timeout-req", delayMs * 2, failRate, abortCtrl.current.signal), delayMs)
      .then((r) => addLog("timeout success: " + r))
      .catch((e) => addLog("timeout catch: " + (e as Error).message));
  }

  function cancelRunning() {
    if (abortCtrl.current) {
      abortCtrl.current.abort();
      addLog("abort requested");
      abortCtrl.current = null;
    } else {
      addLog("no active controller");
    }
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Promises — Interactive Playground</h2>
        <p className="text-slate-600">Explore Promise creation, chaining, aggregation, sequential runs, retry and timeout patterns.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Controls</h3>
          <div className="mt-3 text-sm text-slate-700 space-y-2">
            <label className="block">count:
              <input className="ml-2 px-2 py-1 border rounded w-20" type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} />
            </label>
            <label className="block">base delay (ms):
              <input className="ml-2 px-2 py-1 border rounded w-28" type="number" min={0} value={delayMs} onChange={(e) => setDelayMs(Number(e.target.value) || 0)} />
            </label>
            <label className="block">fail rate (%):
              <input className="ml-2 px-2 py-1 border rounded w-20" type="number" min={0} max={100} value={failRate} onChange={(e) => setFailRate(Number(e.target.value) || 0)} />
            </label>

            <div className="flex flex-wrap gap-2 mt-2">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={runSingle}>Single</button>
              <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={runChain}>Chain</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={runAll}>Promise.all</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded" onClick={runAllSettled}>allSettled</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={runRace}>Race</button>
              <button className="px-3 py-1 bg-cyan-600 text-white rounded" onClick={runSequential}>Sequential</button>
              <button className="px-3 py-1 bg-lime-600 text-white rounded" onClick={runWithRetry}>Retry</button>
              <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={runWithTimeout}>Timeout</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={cancelRunning}>Cancel</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearLogs}>Clear logs</button>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 shadow">
          <h3 className="font-semibold">Logs</h3>
          <div className="mt-3 text-sm text-slate-700">
            <div className="h-64 overflow-auto bg-slate-50 p-2 rounded text-xs">
              {logs.length === 0 ? <div className="text-slate-500">no logs</div> : logs.map((l, i) => <div key={i} className="whitespace-pre-wrap">{l}</div>)}
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 shadow md:col-span-2">
          <h3 className="font-semibold">Notes</h3>
          <ul className="mt-2 text-sm text-slate-700">
            <li>Use Promise chaining to sequence dependent async ops; use async/await for clearer syntax.</li>
            <li>Promise.all rejects fast on the first rejection; Promise.allSettled returns full results.</li>
            <li>Promise.race resolves/rejects with the first settled promise; useful for timeouts via Promise.race.</li>
            <li>Basic cancellation here uses AbortController to signal tasks — integrate with APIs that support AbortSignal.</li>
            <li>Retry and timeout patterns help with transient failures; prefer exponential backoff in production.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
