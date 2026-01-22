// ...existing code...
export async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const r = indexedDB.open('pwa-sync-db', 1);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains('sync-queue')) {
        db.createObjectStore('sync-queue', { keyPath: 'id', autoIncrement: true });
      }
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

export async function addToQueue(payload: any) {
  const db = await openDB();
  return new Promise<number>((res, rej) => {
    const tx = db.transaction('sync-queue', 'readwrite');
    const store = tx.objectStore('sync-queue');
    const req = store.add({ payload, createdAt: Date.now() });
    req.onsuccess = () => res(req.result as number);
    req.onerror = () => rej(req.error);
  });
}

export async function getQueue() {
  const db = await openDB();
  return new Promise<any[]>((res, rej) => {
    const tx = db.transaction('sync-queue', 'readonly');
    const store = tx.objectStore('sync-queue');
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

export async function removeFromQueue(id: number) {
  const db = await openDB();
  return new Promise<void>((res, rej) => {
    const tx = db.transaction('sync-queue', 'readwrite');
    const store = tx.objectStore('sync-queue');
    const req = store.delete(id);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}