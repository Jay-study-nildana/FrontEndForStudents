// ...existing code...
import { useCallback, useState, useEffect } from "react";
import { addToQueue, getQueue, removeFromQueue } from "../utils/idb";

export function useBackgroundSync() {
  const [queue, setQueue] = useState<any[]>([]);

  async function refresh() {
    setQueue(await getQueue());
  }

  useEffect(() => {
    refresh();

    // Listen for service worker messages about sync progress and refresh queue accordingly
    const onMessage = (ev: MessageEvent) => {
      try {
        const data = ev.data || {};
        if (
          data &&
          (data.type === "SYNC_ITEM_PROCESSED" || data.type === "SYNC_FINISHED")
        ) {
          // refresh queue view when items are processed or when sync ends
          refresh();
        }
      } catch (e) {}
    };

    navigator.serviceWorker?.addEventListener("message", onMessage);
    return () =>
      navigator.serviceWorker?.removeEventListener("message", onMessage);
  }, []);

  const enqueue = useCallback(async (payload: any) => {
    // add to IDB first so it's persisted if anything fails
    const id = await addToQueue(payload);

    // If we're online, prefer immediate send-and-remove to avoid showing pending
    if (navigator.onLine) {
      try {
        const resp = await fetch("/api/sync", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (resp && resp.ok) {
          // remove the item we persisted earlier
          try {
            await removeFromQueue(id);
          } catch (e) {
            console.warn(
              "Failed to remove queued item after immediate send",
              e,
            );
          }
          await refresh();
          return;
        }
      } catch (err) {
        console.warn(
          "Immediate send failed, will register background sync if available",
          err,
        );
        // fallthrough to register background sync
      }
    }

    // If we reach here, either offline or immediate send failed — register background sync when available
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if ((reg as any).sync) {
          await (reg as any).sync.register("sync-queue");
        }
      } catch (e) {
        console.warn("Background sync registration failed", e);
      }
    }

    await refresh();
  }, []);

  return { queue, enqueue, refresh };
}
