import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

/**
 * Simple infinite scroll demo using IntersectionObserver.
 * - fetchMore simulates paged network requests
 */
function FetchMore(page: number, pageSize = 20) {
  return new Promise<{ id: number; text: string }[]>((res) => {
    setTimeout(() => {
      const start = page * pageSize;
      const items = Array.from({ length: pageSize }).map((_, i) => ({
        id: start + i,
        text: `Item #${start + i + 1}`,
      }));
      res(items);
    }, 700);
  });
}

export default function InfiniteScrollFetchMore(): JSX.Element {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const next = await FetchMore(page);
      if (!mounted) return;
      setItems((s) => [...s, ...next]);
      setHasMore(next.length > 0);
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, [page]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !loading && hasMore) {
            setPage((p) => p + 1);
          }
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loading, hasMore]);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">useInfiniteScroll — IntersectionObserver demo</h2>

      <p className="text-sm text-slate-600 mb-4">
        Scroll the list — more items load as the sentinel becomes visible.
      </p>

      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id} className="p-3 bg-white/90 dark:bg-slate-800 rounded shadow-sm">
            {it.text}
          </li>
        ))}
      </ul>

      <div ref={sentinelRef} className="h-8" />

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <div>{loading ? "Loading…" : hasMore ? "Scroll to load more" : "No more items"}</div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-slate-200 rounded"
          disabled={loading || !hasMore}
        >
          Load more
        </button>
      </div>
    </main>
  );
}
