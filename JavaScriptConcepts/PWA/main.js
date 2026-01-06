// Vanilla PWA demo main script
// Features:
// - localStorage for username
// - IndexedDB for notes + outbox (for background sync)
// - Service Worker registration + update flow
// - Cache info and control buttons
// - beforeinstallprompt handling

/* ======= Minimal IndexedDB helper (promise-based) ======= */
const DB_NAME = 'pwa-notes-db';
const DB_VERSION = 1;
const STORE_NOTES = 'notes';
const STORE_OUTBOX = 'outbox';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NOTES)) {
        db.createObjectStore(STORE_NOTES, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORE_OUTBOX)) {
        db.createObjectStore(STORE_OUTBOX, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbAdd(storeName, value) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.add(value);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

async function idbGetAll(storeName) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

async function idbDelete(storeName, key) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

async function idbClear(storeName) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.clear();
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

/* ======= DOM refs ======= */
const usernameEl = document.getElementById('username');
const noteTitleEl = document.getElementById('noteTitle');
const noteBodyEl = document.getElementById('noteBody');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notesList');
const queuedCountEl = document.getElementById('queuedCount');
const onlineStateEl = document.getElementById('onlineState');
const statusEl = document.getElementById('status');
const swStateEl = document.getElementById('swState');
const manifestStateEl = document.getElementById('manifestState');
const cacheSizeEl = document.getElementById('cacheSize');

const installBtn = document.getElementById('installBtn');
const updateBanner = document.getElementById('updateBanner');
const reloadBtn = document.getElementById('reloadBtn');
const dismissUpdateBtn = document.getElementById('dismissUpdateBtn');
const syncNowBtn = document.getElementById('syncNowBtn');
const clearCacheBtn = document.getElementById('clearCacheBtn');
const clearDBBtn = document.getElementById('clearDBBtn');

/* ======= localStorage: persist username ======= */
const LS_KEY = 'pwa-username';
usernameEl.value = localStorage.getItem(LS_KEY) || '';
usernameEl.addEventListener('input', () => {
  localStorage.setItem(LS_KEY, usernameEl.value);
});

/* ======= UI helpers ======= */
function setOnlineStatus() {
  const online = navigator.onLine;
  onlineStateEl.textContent = online ? 'Online' : 'Offline';
  onlineStateEl.className = online ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';
  statusEl.textContent = online ? 'Online' : 'Offline';
  statusEl.className = online ? 'inline-flex items-center px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-sm' : 'inline-flex items-center px-3 py-1 rounded bg-rose-100 text-rose-800 text-sm';
}
window.addEventListener('online', () => {
  setOnlineStatus();
  trySendOutbox(); // attempt to flush outbox when back online
});
window.addEventListener('offline', setOnlineStatus);
setOnlineStatus();

/* ======= Notes UI & storage ======= */
async function refreshNotesUI() {
  const notes = await idbGetAll(STORE_NOTES);
  notesList.innerHTML = '';
  if (!notes.length) {
    notesList.innerHTML = '<li class="text-slate-500">No notes yet.</li>';
    return;
  }
  notes.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  for (const n of notes) {
    const li = document.createElement('li');
    li.className = 'p-3 border rounded bg-slate-50';
    li.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="font-medium">${escapeHtml(n.title)}</div>
          <div class="text-xs text-slate-500 mt-1">${escapeHtml(n.body)}</div>
          <div class="text-xs text-slate-400 mt-2">${new Date(n.createdAt).toLocaleString()}</div>
        </div>
        <div class="text-xs text-slate-500">${n.synced ? '<span class="text-emerald-700">synced</span>' : '<span class="text-amber-700">pending</span>'}</div>
      </div>
    `;
    notesList.appendChild(li);
  }
}

function escapeHtml(s = '') {
  return s.replace?.(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])) || s;
}

saveBtn.addEventListener('click', async () => {
  const title = noteTitleEl.value.trim();
  const body = noteBodyEl.value.trim();
  if (!title && !body) return alert('Please enter a title or body for the note.');
  const note = { title, body, createdAt: Date.now(), author: usernameEl.value || 'anonymous', synced: false };

  // store note locally in notes store
  await idbAdd(STORE_NOTES, note);

  // also push to outbox for background sync / remote delivery
  await idbAdd(STORE_OUTBOX, { payload: note });

  noteTitleEl.value = '';
  noteBodyEl.value = '';
  await refreshNotesUI();
  await refreshQueuedCount();

  // ask service worker to schedule a sync if available
  scheduleSync();
});

/* ======= Outbox (attempt to send queued items) ======= */
async function trySendOutbox() {
  // Try to send outbox items from the page (works even if background sync not available)
  const items = await idbGetAll(STORE_OUTBOX);
  if (!items.length) return;
  // iterate and attempt delivery
  for (const item of items) {
    try {
      // demo endpoint that accepts posts
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.payload)
      });
      if (!resp.ok) throw new Error('Network response not ok');
      // on success remove outbox entry and mark corresponding note as synced
      await idbDelete(STORE_OUTBOX, item.id);
      // rudimentary: mark matching note (by createdAt) as synced
      const notes = await idbGetAll(STORE_NOTES);
      const match = notes.find(n => n.createdAt === item.payload.createdAt);
      if (match) {
        // update note record to show synced
        const db = await openDB();
        await new Promise((res, rej) => {
          const tx = db.transaction(STORE_NOTES, 'readwrite');
          const store = tx.objectStore(STORE_NOTES);
          const updated = Object.assign({}, match, { synced: true });
          const req = store.put(updated);
          req.onsuccess = () => res();
          req.onerror = () => rej(req.error);
        });
      }
    } catch (err) {
      console.log('Outbox item send failed (will retry later):', err);
      // keep it in outbox for later sync
      return;
    }
  }
  await refreshNotesUI();
  await refreshQueuedCount();
}

/* schedule a background sync via service worker (if supported) */
async function scheduleSync() {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  if ('sync' in reg) {
    try {
      await reg.sync.register('outbox-sync');
      console.log('Background sync registered');
    } catch (err) {
      console.log('Background sync registration failed, will attempt immediate send', err);
      // fallback: try to send now
      trySendOutbox();
    }
  } else {
    // no background sync support, try to send immediately
    trySendOutbox();
  }
}

/* ======= queued count UI ======= */
async function refreshQueuedCount() {
  const items = await idbGetAll(STORE_OUTBOX);
  queuedCountEl.textContent = `Queued: ${items.length}`;
}

/* ======= Clear controls ======= */
clearDBBtn.addEventListener('click', async () => {
  if (!confirm('Clear local notes DB? This removes all saved notes and queue.')) return;
  await idbClear(STORE_NOTES);
  await idbClear(STORE_OUTBOX);
  await refreshNotesUI();
  await refreshQueuedCount();
});

clearCacheBtn.addEventListener('click', async () => {
  if (!confirm('Clear all caches?')) return;
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  updateCacheInfo();
  alert('Caches cleared');
});

/* ======= Service worker registration & update UX ======= */
let deferredPrompt = null; // for beforeinstallprompt
let newSWWaiting = null;

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    swStateEl.textContent = 'Not supported';
    return;
  }

  try {
    const reg = await navigator.serviceWorker.register('/service-worker.js');
    swStateEl.textContent = 'Registered';

    // detect updates
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // new update available (worker installed and waiting)
            newSWWaiting = newWorker;
            showUpdateBanner();
          } else {
            // cached for first load
            console.log('Content is cached for offline use.');
          }
        }
      });
    });

    // Listen for messages from SW (e.g., after background sync)
    navigator.serviceWorker.addEventListener('message', (ev) => {
      const data = ev.data || {};
      if (data.type === 'sync-complete') {
        // a SW background sync finished
        refreshNotesUI();
        refreshQueuedCount();
      }
      if (data.type === 'CACHE_UPDATED') {
        updateCacheInfo();
      }
    });

    // if there's a waiting worker on page load, show update UI
    if (reg.waiting) {
      newSWWaiting = reg.waiting;
      showUpdateBanner();
    }
  } catch (err) {
    swStateEl.textContent = 'Registration failed';
    console.error('SW register failed', err);
  }
}

function showUpdateBanner() {
  updateBanner.classList.remove('hidden');
}

reloadBtn.addEventListener('click', async () => {
  // tell waiting SW to skipWaiting, then reload when controllerchanged
  if (!newSWWaiting) return;
  newSWWaiting.postMessage({ type: 'SKIP_WAITING' });
});

dismissUpdateBtn.addEventListener('click', () => {
  updateBanner.classList.add('hidden');
});

/* When the new SW takes control, reload so the user sees new content */
navigator.serviceWorker?.addEventListener?.('controllerchange', () => {
  // Avoid infinite reload loop by only reloading when there's a new SW that we requested to skipWaiting.
  console.log('controllerchange event: reloading to activate new SW');
  window.location.reload();
});

/* ======= beforeinstallprompt (A2HS) handling ======= */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('User choice', outcome);
  installBtn.classList.add('hidden');
  deferredPrompt = null;
});

/* ======= Misc UI controls ======= */
syncNowBtn.addEventListener('click', async () => {
  await trySendOutbox();
  await refreshQueuedCount();
});

/* ======= Populate initial UI and states ======= */
async function init() {
  // manifest detection
  try {
    const manifestURL = document.querySelector('link[rel="manifest"]')?.href;
    manifestStateEl.textContent = manifestURL ? 'Linked' : 'Missing';
  } catch { manifestStateEl.textContent = 'Unknown'; }

  await registerServiceWorker();
  await refreshNotesUI();
  await refreshQueuedCount();
  updateCacheInfo();
}
init();

/* ======= Track cache info ======= */
async function updateCacheInfo() {
  try {
    const keys = await caches.keys();
    let total = 0;
    for (const k of keys) {
      const cache = await caches.open(k);
      const requests = await cache.keys();
      total += requests.length;
    }
    cacheSizeEl.textContent = `${total} entries, ${keys.length} cache(s)`;
  } catch (err) {
    cacheSizeEl.textContent = 'unavailable';
  }
}

/* ======= Listen to messages from page/service worker for manual actions ======= */
navigator.serviceWorker?.addEventListener?.('message', (ev) => {
  // handled above in registration too
});

/* ======= Utility: try background sync from page on load if online ======= */
window.addEventListener('load', () => {
  if (navigator.onLine) {
    // attempt to flush outbox for demo (if sync wasn't triggered)
    trySendOutbox().then(() => refreshQueuedCount());
  }
});