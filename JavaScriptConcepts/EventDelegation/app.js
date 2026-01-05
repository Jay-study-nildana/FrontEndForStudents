// Simple Event Delegation demo (lots of console.logs + interactive)
// One delegated listener on #todo-list handles edits, deletes, and selection.
// Author: interactive demo for learning

const listEl = document.getElementById('todo-list');
const addForm = document.getElementById('add-form');
const input = document.getElementById('item-input');
const clearBtn = document.getElementById('clear-btn');
const logStateBtn = document.getElementById('log-state');
const toggleListenerBtn = document.getElementById('toggle-listener');

let delegatedActive = true;
let idCounter = 1;
let items = [
  { id: idCounter++, text: 'Example item — try edit or delete me', done: false },
  { id: idCounter++, text: 'Click an item to select it', done: false }
];

// Render function: simple, recreates list
function render() {
  console.log('[render] rendering list with items:', items);
  listEl.innerHTML = '';
  for (const it of items) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = String(it.id);

    // Use data-action on buttons so our delegated listener can detect intent
    li.innerHTML = `
      <div class="left">
        <input class="toggle" type="checkbox" ${it.done ? 'checked' : ''} aria-label="Toggle done" />
        <div class="title">${escapeHtml(it.text)}</div>
      </div>

      <div class="controls">
        <button class="small" data-action="edit">edit</button>
        <button class="small" data-action="delete">delete</button>
      </div>
    `;
    listEl.appendChild(li);
  }
}

// tiny escaper to avoid HTML injection for demo
function escapeHtml(s) {
  return (s + '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

/* ---------- Delegated Click Listener (single handler) ---------- */

function delegatedClickHandler(event) {
  console.log('--- delegatedClickHandler start ---');
  console.log('event.type:', event.type);
  console.log('event.target:', describe(event.target));
  console.log('event.currentTarget:', describe(event.currentTarget));
  console.log('bubbles:', event.bubbles, 'cancelable:', event.cancelable);

  // Find nearest actionable element (button with data-action)
  const actionEl = event.target.closest('[data-action]');
  if (actionEl && listEl.contains(actionEl)) {
    const action = actionEl.dataset.action;
    console.log('[delegation] detected action:', action, 'on element', describe(actionEl));

    const itemEl = actionEl.closest('li[data-id]');
    const id = itemEl?.dataset?.id;
    console.log('[delegation] item id:', id);

    if (action === 'delete') {
      console.log(`[action:delete] removing item id=${id}`);
      // simple remove with animation class
      itemEl.classList.add('fade-out');
      setTimeout(() => {
        items = items.filter(i => String(i.id) !== String(id));
        render();
      }, 180);
    } else if (action === 'edit') {
      console.log(`[action:edit] editing item id=${id}`);
      // very simple inline prompt for demo
      const it = items.find(i => String(i.id) === String(id));
      if (!it) {
        console.warn('[action:edit] item not found');
      } else {
        const newText = prompt('Edit item text:', it.text);
        console.log('[action:edit] prompt result:', newText);
        if (newText !== null) {
          it.text = newText.trim() || it.text;
          render();
        }
      }
    }
    // We handled an actionable control; stop further processing here
    console.log('--- delegatedClickHandler end (handled action) ---');
    return;
  }

  // If not an action control, maybe user clicked the item root: toggle selection highlight
  const li = event.target.closest('li[data-id]');
  if (li && listEl.contains(li)) {
    console.log('[click] clicked item element; toggling selection for', li.dataset.id);
    // Remove selection from others
    for (const other of listEl.querySelectorAll('li')) other.classList.remove('selected');
    li.classList.add('selected');
    console.log('[click] selected element:', li.dataset.id);
  } else {
    console.log('[click] clicked outside any item inside the list');
  }

  console.log('--- delegatedClickHandler end (no action) ---');
}

/* ---------- Delegated Change Listener (checkbox) ---------- */
function delegatedChangeHandler(event) {
  console.log('--- delegatedChangeHandler start ---');
  console.log('event.type:', event.type);
  console.log('event.target:', describe(event.target));

  // Only handle the checkbox input with class "toggle"
  if (event.target.matches('input.toggle')) {
    const li = event.target.closest('li[data-id]');
    const id = li?.dataset?.id;
    const checked = event.target.checked;
    console.log(`[change] checkbox for id=${id} changed -> ${checked}`);
    items = items.map(it => String(it.id) === String(id) ? { ...it, done: checked } : it);
    render();
  }

  console.log('--- delegatedChangeHandler end ---');
}

/* ---------- Attach / detach delegated listeners ---------- */

function attachDelegates() {
  console.log('[attachDelegates] attaching delegation listeners');
  listEl.addEventListener('click', delegatedClickHandler);
  listEl.addEventListener('change', delegatedChangeHandler);
  delegatedActive = true;
  toggleListenerBtn.textContent = 'Toggle Delegated Listener (on)';
}

function detachDelegates() {
  console.log('[detachDelegates] removing delegation listeners');
  listEl.removeEventListener('click', delegatedClickHandler);
  listEl.removeEventListener('change', delegatedChangeHandler);
  delegatedActive = false;
  toggleListenerBtn.textContent = 'Toggle Delegated Listener (off)';
}

/* ---------- Helpers and small UI wiring ---------- */

function describe(node) {
  if (!node) return 'null';
  if (node.nodeType === Node.TEXT_NODE) return '#text';
  if (!(node instanceof Element)) return String(node);
  const tag = node.tagName.toLowerCase();
  const id = node.id ? `#${node.id}` : '';
  const cls = node.classList?.length ? '.' + [...node.classList].slice(0,2).join('.') : '';
  return `<${tag}${id}${cls}>`;
}

/* Form: add item */
addForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const v = input.value.trim();
  console.log('[form submit] value:', v);
  if (!v) {
    console.log('[form submit] empty input — ignoring');
    return;
  }
  const newItem = { id: idCounter++, text: v, done: false };
  items.unshift(newItem);
  input.value = '';
  render();
  console.log('[form submit] added item:', newItem);
});

/* Clear all */
clearBtn.addEventListener('click', () => {
  console.log('[clearBtn] clearing all items');
  items = [];
  render();
});

/* Log state button */
logStateBtn.addEventListener('click', () => {
  console.log('[logState] current items array:', items);
});

/* Toggle listener button */
toggleListenerBtn.addEventListener('click', () => {
  if (delegatedActive) detachDelegates();
  else attachDelegates();
});

/* Initialize */
render();
attachDelegates();
console.log('Demo initialized. Items rendered and delegation attached. Interact with the list and check the console for many logs.');