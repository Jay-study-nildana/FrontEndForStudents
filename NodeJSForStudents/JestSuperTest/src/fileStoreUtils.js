/**
 * In-memory file store for uploaded files (metadata + buffer)
 *
 * Provides:
 *  - addFile({ originalname, mimetype, size, buffer }) -> stored metadata including id and uploadDate
 *  - listFiles() -> array of metadata (id, originalname, mimetype, size, uploadDate)
 *  - resetStore() -> clears store (useful for tests)
 */

let store = [];
let idCounter = 1;

function generateId() {
  return String(idCounter++);
}

function addFile({ originalname, mimetype, size, buffer }) {
  const id = generateId();
  const uploadDate = new Date().toISOString();
  const entry = {
    id,
    originalname,
    mimetype,
    size,
    uploadDate,
    // store buffer so callers (if needed) can access content; tests don't rely on this
    buffer,
  };
  store.push(entry);
  return entry;
}

function listFiles() {
  // Return shallow copy without exposing buffers by default in listings
  return store.map(({ buffer, ...meta }) => ({ ...meta }));
}

function resetStore() {
  store = [];
  idCounter = 1;
}

module.exports = {
  addFile,
  listFiles,
  resetStore,
};