// ...existing code...
import { useState, useEffect } from "react";
import { useBackgroundSync } from "../hooks/useBackgroundSync";
import { getQueue, removeFromQueue } from "../utils/idb";

export default function SyncQueueViewer() {
  const { queue, enqueue, refresh } = useBackgroundSync();
  const [text, setText] = useState("");
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  async function clearLocalDB() {
    setWorking(true);
    try {
      const items = await getQueue();
      await Promise.all(items.map((it: any) => removeFromQueue(it.id)));
      await refresh();
    } catch (e) {
      console.warn("Failed to clear local DB", e);
    } finally {
      setWorking(false);
    }
  }

  async function manualSync() {
    setWorking(true);
    try {
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        const reg = await navigator.serviceWorker.ready;
        try {
          await (reg as any).sync.register("sync-queue");
        } catch (err) {
          console.warn(
            "Manual sync registration failed, attempting immediate flush",
            err,
          );
          // fallback: attempt to send queued items immediately
          const items = await getQueue();
          for (const item of items) {
            try {
              const resp = await fetch("/api/sync", {
                method: "POST",
                body: JSON.stringify(item.payload),
                headers: { "Content-Type": "application/json" },
              });
              if (resp && resp.ok) await removeFromQueue(item.id);
            } catch (e) {
              console.warn("Immediate flush failed for item", item.id, e);
            }
          }
        }
      } else {
        // No background sync — flush immediately when online
        const items = await getQueue();
        for (const item of items) {
          try {
            const resp = await fetch("/api/sync", {
              method: "POST",
              body: JSON.stringify(item.payload),
              headers: { "Content-Type": "application/json" },
            });
            if (resp && resp.ok) await removeFromQueue(item.id);
          } catch (e) {
            console.warn("Immediate flush failed for item", item.id, e);
          }
        }
      }
    } catch (e) {
      console.warn("Manual sync error", e);
    } finally {
      await refresh();
      setWorking(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 6 }}>
      <h3>Background Sync Queue</h3>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <form
          style={{ display: "flex", gap: 8, alignItems: "center" }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!text) return;
            await enqueue({ message: text, ts: Date.now() });
            setText("");
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message to sync later"
          />
          <button type="submit">Queue (works offline)</button>
        </form>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={manualSync} disabled={working}>
            {working ? "Syncing…" : "Manual Sync"}
          </button>
          <button onClick={clearLocalDB} disabled={working}>
            Clear Local DB
          </button>
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Status:</strong>{" "}
        <span style={{ color: isOnline ? "green" : "crimson" }}>
          {isOnline ? "Online" : "Offline"}
        </span>
        <span style={{ marginLeft: 12 }}>
          <strong>Pending:</strong> {queue.length}
        </span>
      </div>
      <ul>
        {queue.map((q: any) => (
          <li key={q.id}>
            {new Date(q.createdAt).toLocaleTimeString()}:{" "}
            {JSON.stringify(q.payload)}
          </li>
        ))}
        {queue.length === 0 && (
          <li>
            <i>Queue empty</i>
          </li>
        )}
      </ul>
    </div>
  );
}
