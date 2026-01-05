// Storage Demo: localStorage & sessionStorage
// Lots of console.logs and interactive controls for learning purposes.
// Date: 2026-01-05

// DOM refs
const form = document.getElementById('item-form');
const keyInput = document.getElementById('key-input');
const valueInput = document.getElementById('value-input');
const overwriteBtn = document.getElementById('overwrite-btn');
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const importArea = document.getElementById('import-area');

const localList = document.getElementById('local-list');
const sessionList = document.getElementById('session-list');
const localMeta = document.getElementById('local-meta');
const sessionMeta = document.getElementById('session-meta');

const clearLocalBtn = document.getElementById('clear-local');
const clearSessionBtn = document.getElementById('clear-session');
const moveAllToSessionBtn = document.getElementById('move-all-to-session');
const moveAllToLocalBtn = document.getElementById('move-all-to-local');

const simulateStorageBtn = document.getElementById('simulate-storage-event');
const clearConsoleBtn = document.getElementById('clear-console');

// Small helpers
function log(...args) {
  console.log('[storage-demo]', ...args);
}

function getStorageByType(type) {
  return type === 'session' ? window.sessionStorage : window.localStorage;
}

function listEntries(storage) {
  const result = [];
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i);
    try {
      const raw = storage.getItem(k);
      result.push({ key: k, value: raw });
    } catch (err) {
      // getItem can throw in some weird cases; catch to keep UI responsive
      log('Error reading key', k, err);
      result.push({ key: k, value: '<unreadable>' });
    }
  }
  return result;
}

function renderPanel() {
  // Render localStorage list
  const localEntries = listEntries(localStorage);
  localList.innerHTML = '';
  for (const e of localEntries) {
    const li = createItemNode(e.key, e.value, 'local');
    localList.appendChild(li);
  }
  localMeta.textContent = `items: ${localEntries.length}`;

  // Render sessionStorage list
  const sessionEntries = listEntries(sessionStorage);
  sessionList.innerHTML = '';
  for (const e of sessionEntries) {
    const li = createItemNode(e.key, e.value, 'session');
    sessionList.appendChild(li);
  }
  sessionMeta.textContent = `items: ${sessionEntries.length}`;

  log('Rendered panels. local items:', localEntries.length, 'session items:', sessionEntries.length);
}

// Create a LI node for an item with action chips
function createItemNode(key, value, type) {
  const li = document.createElement('li');
  li.className = 'storage-item';
  li.dataset.key = key;
  li.dataset.type = type;

  const left = document.createElement('div');
  left.style.display = 'flex';
  left.style.flexDirection = 'column';
  left.style.gap = '4px';

  const keySpan = document.createElement('div');
  keySpan.className = 'storage-key';
  keySpan.textContent = String(key);

  const valueSpan = document.createElement('div');
  valueSpan.className = 'storage-value';
  valueSpan.textContent = String(value);

  left.appendChild(keySpan);
  left.appendChild(valueSpan);

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '6px';
  actions.style.alignItems = 'center';

  // Edit
  const edit = document.createElement('button');
  edit.className = 'chip';
  edit.textContent = 'edit';
  edit.title = 'Edit value (prompt)';
  edit.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const newVal = prompt(`Edit value for "${key}" in ${type}Storage:`, value);
    log('Edit clicked', { key, oldValue: value, newValue: newVal, type });
    if (newVal !== null) {
      getStorageByType(type).setItem(key, String(newVal));
      flashRow(li);
      renderPanel();
    }
  });

  // Delete
  const del = document.createElement('button');
  del.className = 'chip';
  del.textContent = 'delete';
  del.title = 'Remove this key';
  del.addEventListener('click', (ev) => {
    ev.stopPropagation();
    log('Delete clicked', { key, type });
    getStorageByType(type).removeItem(key);
    renderPanel();
  });

  // Move
  const move = document.createElement('button');
  move.className = 'chip';
  move.textContent = type === 'local' ? '→ session' : '→ local';
  move.title = 'Move this key to the other storage';
  move.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const from = getStorageByType(type);
    const to = getStorageByType(type === 'local' ? 'session' : 'local');
    const val = from.getItem(key);
    log('Move clicked', { key, from: type, to: type === 'local' ? 'session' : 'local', val });
    // overwrite if exists in target
    to.setItem(key, val);
    from.removeItem(key);
    renderPanel();
  });

  actions.appendChild(edit);
  actions.appendChild(del);
  actions.appendChild(move);

  li.appendChild(left);
  li.appendChild(actions);

  // click on whole row copies value to clipboard (for demo)
  li.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(value);
      log('Row clicked — copied value to clipboard for key', key);
      flashRow(li);
    } catch (err) {
      log('Clipboard copy failed', err);
    }
  });

  return li;
}

// small visual flash
function flashRow(node) {
  node.classList.add('flash');
  setTimeout(() => node.classList.remove('flash'), 420);
}

/* ---------- Form: add/update item ---------- */
let overwriteMode = false;
overwriteBtn.addEventListener('click', () => {
  overwriteMode = !overwriteMode;
  overwriteBtn.textContent = overwriteMode ? 'Overwrite (on)' : 'Overwrite';
  log('Overwrite mode toggled:', overwriteMode);
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const key = keyInput.value.trim();
  const value = valueInput.value;
  const type = document.querySelector('input[name="storage-type"]:checked').value; // 'local' | 'session'
  if (!key) {
    log('Empty key — ignoring submit');
    return;
  }

  const storage = getStorageByType(type);
  const exists = storage.getItem(key) !== null;
  log('Form submit', { key, value, type, exists, overwriteMode });

  if (exists && !overwriteMode) {
    const keep = confirm(`Key "${key}" already exists in ${type}Storage. Overwrite?`);
    if (!keep) {
      log('User cancelled overwrite');
      return;
    }
  }

  try {
    storage.setItem(key, String(value));
    log(`Saved key "${key}" into ${type}Storage`);
    renderPanel();
    keyInput.value = '';
    valueInput.value = '';
  } catch (err) {
    log('Error saving to storage', err);
    alert('Error: cannot save item. See console for details.');
  }
});

/* ---------- Export / Import ---------- */

exportBtn.addEventListener('click', () => {
  const data = {
    local: {},
    session: {}
  };

  for (const { key, value } of listEntries(localStorage)) data.local[key] = value;
  for (const { key, value } of listEntries(sessionStorage)) data.session[key] = value;

  const json = JSON.stringify(data, null, 2);
  log('Export JSON generated:', json);

  // download as file
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'storage-export.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener('click', () => {
  const text = importArea.value.trim();
  if (!text) {
    alert('Paste JSON into the textarea first.');
    return;
  }
  try {
    const parsed = JSON.parse(text);
    log('Importing JSON:', parsed);
    if (parsed.local && typeof parsed.local === 'object') {
      for (const k of Object.keys(parsed.local)) {
        localStorage.setItem(k, String(parsed.local[k]));
      }
    }
    if (parsed.session && typeof parsed.session === 'object') {
      for (const k of Object.keys(parsed.session)) {
        sessionStorage.setItem(k, String(parsed.session[k]));
      }
    }
    renderPanel();
    log('Import complete.');
  } catch (err) {
    log('Failed to parse import JSON', err);
    alert('Invalid JSON. See console for details.');
  }
});

/* ---------- Clear / Move all ---------- */

clearLocalBtn.addEventListener('click', () => {
  if (!confirm('Clear all keys from localStorage?')) return;
  localStorage.clear();
  log('localStorage cleared');
  renderPanel();
});

clearSessionBtn.addEventListener('click', () => {
  if (!confirm('Clear all keys from sessionStorage?')) return;
  sessionStorage.clear();
  log('sessionStorage cleared');
  renderPanel();
});

moveAllToSessionBtn.addEventListener('click', () => {
  const entries = listEntries(localStorage);
  if (entries.length === 0) {
    log('No localStorage entries to move');
    return;
  }
  log('Moving all localStorage entries to sessionStorage', entries);
  for (const { key, value } of entries) {
    sessionStorage.setItem(key, value);
    localStorage.removeItem(key);
  }
  renderPanel();
});

moveAllToLocalBtn.addEventListener('click', () => {
  const entries = listEntries(sessionStorage);
  if (entries.length === 0) {
    log('No sessionStorage entries to move');
    return;
  }
  log('Moving all sessionStorage entries to localStorage', entries);
  for (const { key, value } of entries) {
    localStorage.setItem(key, value);
    sessionStorage.removeItem(key);
  }
  renderPanel();
});

/* ---------- Storage event listener (cross-tab) ---------- */
window.addEventListener('storage', (ev) => {
  // NOTE: storage events fire in OTHER tabs/windows, not in the tab that performed the change.
  log('storage event received (cross-tab):', {
    key: ev.key,
    oldValue: ev.oldValue,
    newValue: ev.newValue,
    url: ev.url,
    storageArea: ev.storageArea === localStorage ? 'localStorage' : 'sessionStorage (or unknown)'
  });
  // Update UI (safe to always re-render)
  renderPanel();
});

/* ---------- Simulate storage event (for demo in single tab) ---------- */
simulateStorageBtn.addEventListener('click', () => {
  // This simulates a storage event payload and dispatches it — useful when you don't have another tab.
  const fakeKey = 'demo-simulate-' + Date.now();
  const fakeOld = null;
  const fakeNew = 'simulated-value';
  // set something in localStorage first so state changes are visible
  localStorage.setItem(fakeKey, fakeNew);
  log('Simulate: set localStorage key', fakeKey);

  // Create and dispatch a StorageEvent (many browsers allow this)
  try {
    const ev = new StorageEvent('storage', {
      key: fakeKey,
      oldValue: fakeOld,
      newValue: fakeNew,
      url: location.href,
      storageArea: localStorage
    });
    window.dispatchEvent(ev);
    log('Simulated storage event dispatched', ev);
  } catch (err) {
    log('Failed to dispatch synthetic StorageEvent (some browsers restrict this):', err);
  }

  // cleanup after a short while
  setTimeout(() => {
    localStorage.removeItem(fakeKey);
    renderPanel();
    log('Simulate: cleaned up fake key', fakeKey);
  }, 1200);
});

/* ---------- Clipboard / Console helpers ---------- */
clearConsoleBtn.addEventListener('click', () => {
  console.clear();
  log('Console cleared by user');
});

/* ---------- Initialize with some seeded values (only if empty) ---------- */
function seedIfEmpty() {
  if (localStorage.length === 0) {
    log('Seeding localStorage sample keys');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('preferredLang', 'en');
  }
  if (sessionStorage.length === 0) {
    log('Seeding sessionStorage sample key');
    sessionStorage.setItem('sessionStartedAt', new Date().toISOString());
  }
}

seedIfEmpty();
renderPanel();

log('Storage demo initialized. localStorage.length =', localStorage.length, 'sessionStorage.length =', sessionStorage.length);
log('TIP: Open this page in another tab to observe "storage" events when you modify localStorage from one tab.');