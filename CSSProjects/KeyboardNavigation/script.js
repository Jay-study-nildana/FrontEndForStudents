/* Keyboard Navigation Demo
   - Roving tabindex for toolbars & tabs
   - Menubar left/right arrow navigation
   - Grid arrow-key traversal (Left/Right/Up/Down, Enter)
   - Listbox up/down + typeahead
   - Modal focus trap + Escape to close
   - "/" shortcut to focus search
*/

/* helpers */
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
const live = $('#live');

/* -----------------------
   Roving tabindex utility
   Elements container should have data-roving attribute.
   Left/Right handles horizontal arrangements; Up/Down for vertical lists.
   ----------------------- */
function initRoving(container, options = {}) {
  const items = Array.from(container.querySelectorAll(options.item || 'button, [role="tab"], [role="menuitem"]'));
  if (!items.length) return;

  // set initial tabindex: first item focusable
  items.forEach((it, i) => it.tabIndex = i === 0 ? 0 : -1);

  container.addEventListener('keydown', (e) => {
    const current = document.activeElement;
    const idx = items.indexOf(current);
    if (idx === -1) return;

    const isHorizontal = options.axis !== 'vertical';
    if (isHorizontal && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      let next = e.key === 'ArrowRight' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
      moveFocus(items, idx, next);
    } else if (!isHorizontal && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      let next = e.key === 'ArrowDown' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
      moveFocus(items, idx, next);
    } else if (e.key === 'Home') {
      e.preventDefault(); moveFocus(items, idx, 0);
    } else if (e.key === 'End') {
      e.preventDefault(); moveFocus(items, idx, items.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      // space/enter should activate for toolbar buttons
      // let native handlers proceed, but ensure the item is focused and aria-pressed toggled if present
      const el = items[idx];
      if (el.getAttribute('aria-pressed') !== null) {
        el.setAttribute('aria-pressed', el.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      }
    }
  });

  // click also sets active tabindex
  container.addEventListener('click', (e) => {
    const btn = e.target.closest(options.item || 'button, [role="tab"], [role="menuitem"]');
    if (!btn) return;
    const idx = items.indexOf(btn);
    if (idx >= 0) {
      const prev = items.find(i => i.tabIndex === 0);
      if (prev) prev.tabIndex = -1;
      btn.tabIndex = 0;
      btn.focus();
    }
  });

  function moveFocus(list, from, to) {
    list[from].tabIndex = -1;
    list[to].tabIndex = 0;
    list[to].focus();
    if (options.onMove) options.onMove(list[to], to);
  }
}

/* initialize toolbars and tabs (horizontal roving) */
$$('[data-roving]').forEach(node => {
  const type = node.getAttribute('data-roving');
  if (type === 'toolbar') {
    initRoving(node, { axis: 'horizontal', item: '.tool' });
  } else if (type === 'tabs') {
    initRoving(node, {
      axis: 'horizontal',
      item: '[role="tab"]',
      onMove: (el) => {
        // update aria-selected and panels
        const tabs = Array.from(node.querySelectorAll('[role="tab"]'));
        tabs.forEach(t => t.setAttribute('aria-selected', t === el ? 'true' : 'false'));
        const ctrl = el.getAttribute('aria-controls');
        if (ctrl) {
          Array.from(document.querySelectorAll('[role="tabpanel"]')).forEach(p => p.hidden = true);
          const panel = document.getElementById(ctrl);
          if (panel) panel.hidden = false;
        }
      }
    });
  }
});

/* -----------------------
   Menubar arrow navigation (left/right, Home/End)
   ----------------------- */
(function initMenubar(){
  const menubar = $('.menubar');
  if (!menubar) return;
  const items = Array.from(menubar.querySelectorAll('[role="menuitem"]'));
  items.forEach((it,i)=>it.tabIndex = i===0?0:-1);

  menubar.addEventListener('keydown', (e) => {
    const cur = document.activeElement;
    const idx = items.indexOf(cur);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      let next;
      if (e.key === 'ArrowRight') next = (idx+1)%items.length;
      if (e.key === 'ArrowLeft') next = (idx-1+items.length)%items.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = items.length-1;
      items[idx].tabIndex = -1;
      items[next].tabIndex = 0;
      items[next].focus();
    }
  });
})();

/* -----------------------
   Grid navigation
   Left/Right/Up/Down moves focus in visual grid.
   We compute columns based on computed width.
   ----------------------- */
(function initGrid(){
  const grid = document.querySelector('[data-grid]');
  if (!grid) return;
  const cells = Array.from(grid.querySelectorAll('[role="gridcell"]'));
  // make first cell tabbable
  cells.forEach((c,i)=> c.tabIndex = i===0?0:-1);

  grid.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    const idx = cells.indexOf(active);
    if (idx === -1) return;

    // compute columns by measuring offsetTop pattern
    const cols = computeColumns(cells);
    let row = Math.floor(idx / cols);
    let col = idx % cols;
    let nextIdx = idx;

    if (e.key === 'ArrowRight') { nextIdx = idx + 1; }
    else if (e.key === 'ArrowLeft') { nextIdx = idx - 1; }
    else if (e.key === 'ArrowDown') { nextIdx = idx + cols; }
    else if (e.key === 'ArrowUp') { nextIdx = idx - cols; }
    else if (e.key === 'Home') { nextIdx = row * cols; }
    else if (e.key === 'End') { nextIdx = Math.min((row+1)*cols - 1, cells.length -1); }
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // demo activation
      live.textContent = `Activated ${active.querySelector('h3')?.textContent || 'item'}`;
      return;
    } else return;

    e.preventDefault();
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= cells.length) nextIdx = cells.length - 1;
    // move focus
    cells[idx].tabIndex = -1;
    cells[nextIdx].tabIndex = 0;
    cells[nextIdx].focus();
  });

  function computeColumns(items){
    if (!items.length) return 1;
    // Determine by comparing offsetTop of first row items
    const top = items[0].offsetTop;
    let count = 0;
    for (let i=0;i<items.length;i++){
      if (items[i].offsetTop === top) count++;
      else break;
    }
    return Math.max(count,1);
  }
})();

/* -----------------------
   Listbox: up/down and typeahead
   ----------------------- */
(function initListbox(){
  const list = document.querySelector('[data-listbox]') || $('#fruit-list');
  if (!list) return;
  const options = Array.from(list.querySelectorAll('[role="option"]'));
  let active = 0;
  // init
  options.forEach((o,i)=>{ o.tabIndex = -1; if (i===0){ o.classList.add('focused'); list.setAttribute('aria-activedescendant', o.id);} });
  list.tabIndex = 0;

  let typeBuffer = '';
  let typeTimeout;

  list.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      // typeahead
      typeBuffer += e.key.toLowerCase();
      clearTimeout(typeTimeout);
      typeTimeout = setTimeout(()=> typeBuffer = '', 800);
      const match = options.find(o => o.textContent.trim().toLowerCase().startsWith(typeBuffer));
      if (match) focusOption(options.indexOf(match));
    } else if (e.key === 'Home') { e.preventDefault(); focusOption(0); }
    else if (e.key === 'End') { e.preventDefault(); focusOption(options.length - 1); }
  });

  list.addEventListener('click', (e)=>{
    const opt = e.target.closest('[role="option"]');
    if (!opt) return;
    focusOption(options.indexOf(opt));
  });

  function move(delta){
    const next = (active + delta + options.length) % options.length;
    focusOption(next);
  }
  function focusOption(i){
    options[active].classList.remove('focused');
    options[active].tabIndex = -1;
    active = i;
    options[active].tabIndex = 0;
    options[active].classList.add('focused');
    list.setAttribute('aria-activedescendant', options[active].id);
    options[active].focus();
    live.textContent = `Selected ${options[active].textContent.trim()}`;
  }
})();

/* -----------------------
   Modal: open/close, focus trap, restore focus
   ----------------------- */
(function initModal(){
  let open = null;
  let lastFocus = null;
  const focusable = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

  function trap(modal){
    const nodes = Array.from(modal.querySelectorAll(focusable));
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length-1];
    function handler(e){
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      } else if (e.key === 'Escape') {
        close(modal);
      }
    }
    modal.__trap = handler;
    modal.addEventListener('keydown', handler);
    first.focus();
  }

  function untrap(modal){
    if (!modal || !modal.__trap) return;
    modal.removeEventListener('keydown', modal.__trap);
    modal.__trap = null;
  }

  function openModal(modal){
    lastFocus = document.activeElement;
    open = modal;
    modal.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
    modal.querySelector('.modal-overlay')?.addEventListener('click', () => close(modal));
    trap(modal);
    live.textContent = modal.querySelector('[aria-labelledby]')?.textContent || 'Dialog opened';
  }

  function close(modal){
    if (!modal) return;
    untrap(modal);
    modal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
    open = null;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    live.textContent = 'Dialog closed';
  }

  $$('[data-modal-target]').forEach(btn => btn.addEventListener('click', (e) => {
    const sel = btn.getAttribute('data-modal-target');
    const modal = document.querySelector(sel);
    if (modal) openModal(modal);
  }));

  $$('[data-dismiss-modal]').forEach(btn => btn.addEventListener('click', (e) => {
    const modal = btn.closest('.modal');
    close(modal);
  }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modalEl = document.querySelector('.modal[aria-hidden="false"]');
      if (modalEl) close(modalEl);
    }
  });
})();

/* -----------------------
   "/" shortcut to focus search
   Prevent when typing in inputs or if modifier used
   ----------------------- */
(function initShortcut(){
  const search = $('#site-search');
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const active = document.activeElement;
      const tag = active && active.tagName;
      if (tag && (tag === 'INPUT' || tag === 'TEXTAREA' || active.isContentEditable)) return;
      e.preventDefault();
      search.focus();
      search.select?.();
      live.textContent = 'Search focused';
    }
  });
})();

/* -----------------------
   Small visual hints: announce focus changes on major widgets
   ----------------------- */
(function announceFocus(){
  // announce when toolbar or menubar receives focus
  const toolbar = document.querySelector('[role="toolbar"]');
  const menubar = document.querySelector('[role="menubar"]');
  [toolbar, menubar].forEach(widget => {
    if (!widget) return;
    widget.addEventListener('focusin', (e) => {
      live.textContent = widget.getAttribute('aria-label') || 'Widget focused';
    });
  });
})();