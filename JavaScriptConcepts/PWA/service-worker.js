/* Service Worker for the Vanilla PWA demo
   - precaches app shell
   - runtime caching for same-origin GET requests (cache-first)
   - navigation fallback to index.html for SPA routing
   - handles 'sync' event to flush outbox from IndexedDB
   - accepts postMessage {type: 'SKIP_WAITING'} to activate immediately
*/

const CACHE_PREFIX = 'vanilla-pwa';
const CACHE_VERSION = 'v1';
const PRECACHE = `${CACHE_PREFIX}-precache-${CACHE_VERSION}`;
const RUNTIME = `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/', // HTML entry
  '/index.html',
  '/styles.css',
  '/main.js',
  '/manifest.json'
];

/* ===== Helpers for IndexedDB access in SW ===== */
const DB_NAME = 'pwa-notes-db';
const DB_VERSION = 1;
const STORE_OUTBOX = 'outbox';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_OUTBOX)) db.createObjectStore(STORE_OUTBOX, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGetAll(storeName) {
  return openDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  }));
}

function idbDelete(storeName, key) {
  return openDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  }));
}

/* ===== Install: precache app shell ===== */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

/* ===== Activate: cleanup old caches ===== */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => ![PRECACHE, RUNTIME].includes(k)).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

/* ===== Fetch: simple strategies ===== */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Navigation requests: network-first, fallback to precached index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(networkResp => {
        // optionally update cache for index.html
        caches.open(PRECACHE).then(c => c.put('/index.html', networkResp.clone()));
        return networkResp;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Only handle GET same-origin requests: cache-first (for static assets)
  if (req.method === 'GET' && req.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(networkResp => {
        // put in runtime cache for next time
        return caches.open(RUNTIME).then(cache => {
          cache.put(req, networkResp.clone());
          return networkResp;
        });
      }).catch(() => cached))
    );
  }
  // All other requests (cross-origin or POST) will be handled by network directly
});

/* ===== Background sync handling =====
   The page writes outbound items to the 'outbox' object store.
   When a 'sync' event with tag 'outbox-sync' arrives, the SW will read outbox,
   try to POST each item to the remote endpoint and delete on success.
*/
self.addEventListener('sync', (event) => {
  if (event.tag === 'outbox-sync') {
    event.waitUntil(flushOutbox());
  }
});

async function flushOutbox() {
  const items = await idbGetAll(STORE_OUTBOX).catch(() => []);
  if (!items.length) return;
  for (const item of items) {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.payload)
      });
      if (!resp.ok) throw new Error('network failed');
      // success -> remove from outbox
      await idbDelete(STORE_OUTBOX, item.id);
    } catch (err) {
      // if any item fails, stop and retry later
      console.log('flushOutbox item failed, will retry later', err);
      return;
    }
  }
  // notify controlled clients that sync completed
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage({ type: 'sync-complete' });
  }
}

/* ===== Messaging from the page ===== */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data && data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* ===== Optional: notify clients when caches changed (useful for UI) ===== */
async function notifyCacheUpdated() {
  const clientsList = await clients.matchAll({ includeUncontrolled: true });
  for (const c of clientsList) {
    c.postMessage({ type: 'CACHE_UPDATED' });
  }
}