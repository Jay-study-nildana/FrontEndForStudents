/* Accessible interactions:
   - Tabs keyboard handling (Left/Right/Home/End)
   - Modal open/close with focus-trap + restore focus
   - Simple form validation + announcements via live region
   - Generic data-modal-target toggles
*/

/* Small helper: querySelectorAll to array */
const $all = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const $ = (sel, ctx=document) => ctx.querySelector(sel);

/* ANNOUNCER for polite notifications */
const announcer = $('#announcer');

/* -------------------------
   Tabs behavior
   ------------------------- */
(function initTabs() {
  const tablists = $all('[role="tablist"]');
  tablists.forEach((tablist) => {
    const tabs = $all('[role="tab"]', tablist);
    function activateTab(tab) {
      tabs.forEach(t => {
        const sel = (t === tab);
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        t.tabIndex = sel ? 0 : -1;
        const panelId = t.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = !sel;
      });
      tab.focus();
    }

    tablist.addEventListener('click', (e) => {
      const t = e.target.closest('[role="tab"]');
      if (!t) return;
      activateTab(t);
    });

    tablist.addEventListener('keydown', (e) => {
      const current = e.target.closest('[role="tab"]');
      if (!current) return;
      let index = tabs.indexOf(current);
      if (e.key === 'ArrowRight') { index = (index + 1) % tabs.length; tabs[index].focus(); tabs[index].click(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { index = (index - 1 + tabs.length) % tabs.length; tabs[index].focus(); tabs[index].click(); e.preventDefault(); }
      if (e.key === 'Home') { tabs[0].focus(); tabs[0].click(); e.preventDefault(); }
      if (e.key === 'End') { tabs[tabs.length-1].focus(); tabs[tabs.length-1].click(); e.preventDefault(); }
    });
  });
})();

/* -------------------------
   Modal behavior and focus trap
   ------------------------- */
(function initModals() {
  let openModal = null;
  let lastActive = null;

  const focusablesSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function trapFocus(modal) {
    const foc = $all(focusablesSelector, modal);
    if (!foc.length) return;
    const first = foc[0], last = foc[foc.length -1];

    function handle(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      } else if (e.key === 'Escape') {
        closeModal(modal);
      }
    }
    modal.__trapHandler = handle;
    modal.addEventListener('keydown', handle);
    // focus the first focusable
    first.focus();
  }

  function releaseTrap(modal) {
    if (modal && modal.__trapHandler) {
      modal.removeEventListener('keydown', modal.__trapHandler);
      modal.__trapHandler = null;
    }
  }

  function openModalEl(modal) {
    if (!modal) return;
    lastActive = document.activeElement;
    openModal = modal;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden'; // prevent background scroll
    modal.addEventListener('click', modalClickDismiss);
    trapFocus(modal);
    announcer.textContent = modal.querySelector('[aria-labelledby]')?.textContent || 'Dialog opened';
  }

  function closeModal(modal) {
    if (!modal) return;
    releaseTrap(modal);
    modal.setAttribute('aria-hidden', 'true');
    modal.removeEventListener('click', modalClickDismiss);
    document.documentElement.style.overflow = '';
    openModal = null;
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
    announcer.textContent = 'Dialog closed';
  }

  function modalClickDismiss(e) {
    // close when clicking the overlay or elements with data-dismiss-modal
    if (e.target.hasAttribute('data-dismiss-modal') || e.target.closest('[data-dismiss-modal]')) {
      const modal = e.currentTarget;
      closeModal(modal);
    }
  }

  // Toggle open buttons by data-modal-target
  $all('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sel = btn.getAttribute('data-modal-target');
      const modal = document.querySelector(sel);
      if (modal) openModalEl(modal);
    });
  });

  // Dismiss buttons inside modals
  $all('.modal [data-dismiss-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  // Close on global Escape if modal open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openModal) {
      closeModal(openModal);
    }
  });
})();

/* -------------------------
   Form validation (client-side) with live region announcements
   ------------------------- */
(function initForm() {
  const form = $('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name');
    const email = $('#email');
    let valid = true;

    // reset errors
    $('#name-error').textContent = '';
    $('#email-error').textContent = '';

    if (!name.value.trim()) {
      $('#name-error').textContent = 'Please enter your name.';
      name.focus();
      valid = false;
    }

    // simple email-ish check
    if (!/\S+@\S+\.\S+/.test(email.value)) {
      $('#email-error').textContent = 'Please enter a valid email address.';
      if (valid) email.focus();
      valid = false;
    }

    if (!valid) {
      $('#form-status').textContent = 'There are problems with your submission.';
      announcer.textContent = 'Form has errors. Please correct them.';
      return;
    }

    // simulate successful submission
    $('#form-status').textContent = 'Sending…';
    announcer.textContent = 'Message sent';
    setTimeout(() => {
      form.reset();
      $('#form-status').textContent = 'Message sent — we will get back to you shortly.';
      announcer.textContent = 'Message sent successfully';
    }, 800);
  });
})();

/* -------------------------
   Small utility: open demo modal buttons
   ------------------------- */
document.getElementById('open-modal')?.addEventListener('click', (e) => {
  // handled by data-modal-target attribute in modal init
});
document.getElementById('open-getting-started')?.addEventListener('click', (e) => {
  announcer.textContent = 'Getting started dialog would open in a full app.';
});