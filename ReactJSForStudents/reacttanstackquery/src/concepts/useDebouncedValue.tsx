import { useEffect, useState } from "react";
import type { JSX } from "react";

/**
 * Hook: useDebouncedValue
 * - returns a debounced version of a value that updates after `delay` ms
 */
function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function UseDebouncedValue(): JSX.Element {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 500);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // simulate search whenever debounced query changes
  useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }
    setLoading(true);
    const id = window.setTimeout(() => {
      // fake results: return variations that include the query
      setResults(Array.from({ length: 5 }).map((_, i) => `${debounced} result ${i + 1}`));
      setLoading(false);
    }, 600);

    return () => clearTimeout(id);
  }, [debounced]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">useDebouncedValue — debounced input demo</h2>

      <p className="text-sm text-slate-600 mb-4">
        Type into the input — the search runs only after you stop typing for 500ms.
      </p>

      <div className="space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search (debounced)"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="text-sm">
          <div>Live value: <strong>{query || "—"}</strong></div>
          <div>Debounced: <strong>{debounced || "—"}</strong></div>
        </div>

        <div className="mt-2">
          {loading ? (
            <div className="text-sm text-slate-500">Searching…</div>
          ) : (
            <ul className="space-y-1">
              {results.length === 0 ? (
                <li className="text-sm text-slate-500">No results</li>
              ) : (
                results.map((r) => (
                  <li key={r} className="p-2 bg-white/90 dark:bg-slate-800 rounded shadow-sm">
                    {r}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}