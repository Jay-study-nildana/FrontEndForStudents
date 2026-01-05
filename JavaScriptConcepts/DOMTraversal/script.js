// DOM Traversal Demo (vanilla JS)
// Interactively select elements and explore parent/children/sibling/ancestor traversal methods.

const demoArea = document.getElementById('demo-area');
const selectedSummary = document.getElementById('selected-summary');
const childrenList = document.getElementById('children-list');
const ancestorsDiv = document.getElementById('ancestors');
const cssPathPre = document.getElementById('css-path');

const btnParent = document.getElementById('select-parent');
const btnRoot = document.getElementById('select-root');
const btnPrev = document.getElementById('prev-sib');
const btnNext = document.getElementById('next-sib');
const selectorInput = document.getElementById('selector-input');
const btnTestSelector = document.getElementById('test-selector');
const selectorResult = document.getElementById('selector-result');

let selectedEl = null;

// Utility: pretty name for element
function elName(el) {
  if (!el) return '—';
  const id = el.id ? `#${el.id}` : '';
  const cls = el.classList?.length ? '.' + [...el.classList].join('.') : '';
  return `<${el.tagName.toLowerCase()}${id}${cls}>`;
}

// Utility: compute a simple CSS path for an element
function computeCssPath(el) {
  if (!el) return '';
  const parts = [];
  let node = el;
  while (node && node.nodeType === Node.ELEMENT_NODE && node !== document.documentElement) {
    const tag = node.tagName.toLowerCase();
    let part = tag;
    if (node.id) {
      part += `#${node.id}`;
      parts.unshift(part);
      break; // ID is unique enough
    } else {
      const parent = node.parentElement;
      if (!parent) {
        parts.unshift(part);
      } else {
        // find index among same-tag siblings
        const siblings = Array.from(parent.children).filter(c => c.tagName === node.tagName);
        if (siblings.length > 1) {
          const idx = siblings.indexOf(node) + 1; // nth-child is 1-based
          part += `:nth-of-type(${idx})`;
        }
        parts.unshift(part);
      }
      node = parent;
    }
  }
  // include html at start
  return parts.length ? parts.join(' > ') : el.tagName.toLowerCase();
}

// Highlighting logic
function clearHighlight() {
  const prev = demoArea.querySelector('.selected-highlight');
  if (prev) prev.classList.remove('selected-highlight');
  demoArea.classList.remove('dimmed');
}

function highlight(el) {
  clearHighlight();
  if (!el) return;
  el.classList.add('selected-highlight');
  // slightly dim rest of demo area to emphasize selection
  demoArea.classList.add('dimmed');
}

// Render details of the selected element
function renderDetails() {
  if (!selectedEl) {
    selectedSummary.innerHTML = `<div class="text-slate-500">No element selected — click an element in the demo area.</div>`;
    childrenList.innerHTML = '';
    ancestorsDiv.innerHTML = '';
    cssPathPre.textContent = '';
    btnParent.disabled = true;
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }

  // Summary
  const tag = selectedEl.tagName.toLowerCase();
  const id = selectedEl.id ? ` id="${selectedEl.id}"` : '';
  const classes = selectedEl.classList.length ? ` class="${[...selectedEl.classList].join(' ')}"` : '';
  selectedSummary.innerHTML = `
    <div class="text-sm"><strong>${tag}</strong>${id}${classes}</div>
    <div class="text-xs text-slate-500 mt-1">Inner text: ${selectedEl.innerText ? selectedEl.innerText.trim().slice(0, 80) : '<empty>'}</div>
  `;

  // Children
  childrenList.innerHTML = '';
  const children = Array.from(selectedEl.children);
  if (children.length === 0) {
    childrenList.innerHTML = `<div class="text-xs text-slate-400">No element children</div>`;
  } else {
    for (const child of children) {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.innerHTML = elName(child);
      btn.title = child.dataset.nodeName || child.tagName.toLowerCase();
      btn.addEventListener('click', () => selectElement(child));
      childrenList.appendChild(btn);
    }
  }

  // Siblings
  const prev = selectedEl.previousElementSibling;
  const next = selectedEl.nextElementSibling;
  btnPrev.disabled = !prev;
  btnNext.disabled = !next;

  // Ancestors (chain)
  ancestorsDiv.innerHTML = '';
  let ancestor = selectedEl.parentElement;
  const chain = [];
  while (ancestor) {
    chain.push(ancestor);
    ancestor = ancestor.parentElement;
  }
  if (chain.length === 0) {
    ancestorsDiv.innerHTML = `<div class="text-xs text-slate-400">No ancestors (at root)</div>`;
  } else {
    for (const anc of chain) {
      const el = document.createElement('div');
      el.className = 'chip';
      el.innerHTML = elName(anc);
      el.style.cursor = 'pointer';
      el.title = 'Click to select this ancestor';
      el.addEventListener('click', () => selectElement(anc));
      ancestorsDiv.appendChild(el);
    }
  }

  // Parent button enabled?
  btnParent.disabled = !selectedEl.parentElement;

  // CSS path
  cssPathPre.textContent = computeCssPath(selectedEl);
}

// Select an element programmatically
function selectElement(el) {
  if (!el || !(el instanceof Element)) return;
  selectedEl = el;
  highlight(el);
  renderDetails();
  // scroll the element into view nicely
  el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

// Demo: clicking inside demo area selects the clicked element (closest element that has .demo-node)
demoArea.addEventListener('click', (ev) => {
  // choose the nearest element with the demo-node class (so clicks on whitespace chooses container)
  const target = ev.target;
  const picked = target.closest('.demo-node');
  if (picked && demoArea.contains(picked)) {
    selectElement(picked);
  } else {
    // If user clicked outside demo nodes but inside demo area, select the demo area itself
    if (demoArea.contains(target)) {
      selectElement(demoArea);
    }
  }
});

// Control buttons:
btnParent.addEventListener('click', () => {
  if (!selectedEl) return;
  const p = selectedEl.parentElement;
  if (p) selectElement(p);
});

btnRoot.addEventListener('click', () => {
  selectElement(demoArea);
});

btnPrev.addEventListener('click', () => {
  if (!selectedEl) return;
  const prev = selectedEl.previousElementSibling;
  if (prev) selectElement(prev);
});

btnNext.addEventListener('click', () => {
  if (!selectedEl) return;
  const next = selectedEl.nextElementSibling;
  if (next) selectElement(next);
});

// Selector test: closest & matches
btnTestSelector.addEventListener('click', () => {
  const selector = selectorInput.value.trim();
  if (!selector || !selectedEl) {
    selectorResult.textContent = 'Enter a selector and select an element first.';
    return;
  }
  let closestMatch = null;
  let matches = false;
  try {
    closestMatch = selectedEl.closest(selector);
    matches = selectedEl.matches(selector);
  } catch (err) {
    selectorResult.textContent = `Invalid selector: ${err.message}`;
    return;
  }
  selectorResult.innerHTML = `
    <div class="text-xs">selectedElement.matches(selector): <strong>${matches}</strong></div>
    <div class="text-xs mt-1">closest(selector): ${closestMatch ? elName(closestMatch) : '<none>'}</div>
    <div class="text-xs mt-1">document.querySelectorAll(selector) count: <strong>${document.querySelectorAll(selector).length}</strong></div>
  `;
});

// Initialize: optionally select the demo area root
selectElement(demoArea);

/* 
  Notes (for learning):
  - parentElement / parentNode: move upwards in the element tree
  - children / childNodes: list element children vs all nodes (text nodes included)
  - previousElementSibling / nextElementSibling: traverse sideways among element siblings
  - closest(selector): find nearest ancestor (including self) matching selector
  - matches(selector): test if element matches selector
  - querySelectorAll / querySelector: find nodes by selector
  - You can iterate upwards: while (node) { ... node = node.parentElement; }
*/