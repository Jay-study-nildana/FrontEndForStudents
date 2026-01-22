const CACHE_NAME = "react-pwa-cache-v1";
const OFFLINE_URL = "/index.html";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/vite.svg",
  "/manifest.webmanifest",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) return caches.delete(key);
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/* ----------------------------- IndexedDB helpers ---------------------------- */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("pwa-sync-db", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("sync-queue")) {
        db.createObjectStore("sync-queue", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readAllQueue() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction("sync-queue", "readonly");
    const store = tx.objectStore("sync-queue");
    const r = store.getAll();
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

async function removeFromQueue(id) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction("sync-queue", "readwrite");
    const store = tx.objectStore("sync-queue");
    const r = store.delete(id);
    r.onsuccess = () => res();
    r.onerror = () => rej(r.error);
  });
}

/* ----------------------------- Background sync ----------------------------- */
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-queue") {
    event.waitUntil(
      (async () => {
        try {
          const items = await readAllQueue();

          // notify clients that sync started
          const startedClients = await self.clients.matchAll({
            includeUncontrolled: true,
            type: "window",
          });
          for (const c of startedClients)
            c.postMessage({ type: "SYNC_STARTED", count: items.length });

          for (const item of items) {
            try {
              const resp = await fetch("/api/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item.payload),
              });
              if (resp && resp.ok) {
                await removeFromQueue(item.id);
                const allClients = await self.clients.matchAll({
                  includeUncontrolled: true,
                  type: "window",
                });
                for (const client of allClients) {
                  client.postMessage({
                    type: "SYNC_ITEM_PROCESSED",
                    id: item.id,
                    payload: item.payload,
                  });
                }
              }
            } catch (err) {
              // network error -> rethrow so browser will retry later
              throw err;
            }
          }

          // notify clients that sync finished
          const finishedClients = await self.clients.matchAll({
            includeUncontrolled: true,
            type: "window",
          });
          for (const c of finishedClients)
            c.postMessage({ type: "SYNC_FINISHED" });
        } catch (e) {
          // Keep the sync alive for retry
          console.error("Background sync failed", e);
          throw e;
        }
      })(),
    );
  }
});

/* ------------------------------- Push events -------------------------------- */
self.addEventListener("push", (event) => {
  let data = { title: "New message", body: "You have new content", url: "/" };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {}

  const options = {
    body: data.body,
    data: { url: data.url, payload: data },
    actions: [
      { action: "open", title: "Open" },
      { action: "dismiss", title: "Dismiss" },
    ],
    badge: "/icons/icon-192.svg",
    icon: "/icons/icon-192.svg",
  };

  event.waitUntil(
    (async () => {
      await self.registration.showNotification(data.title, options);
      // also broadcast to open clients so UI can update immediately
      const all = await self.clients.matchAll({
        includeUncontrolled: true,
        type: "window",
      });
      for (const client of all) {
        client.postMessage({ type: "PUSH_MESSAGE", payload: data });
      }
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((all) => {
        for (const client of all) {
          if (client.url === url && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      }),
  );
});

/* ------------------------------- Fetch handler ------------------------------ */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        try {
          const copy = networkResponse.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
        } catch (e) {}
        return networkResponse;
      })
      .catch(() =>
        caches
          .match(event.request)
          .then((resp) => resp || caches.match(OFFLINE_URL)),
      ),
  );
});
