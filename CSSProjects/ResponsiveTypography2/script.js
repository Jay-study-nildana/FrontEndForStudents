// Minimal demo script for the Responsive Typography project.
// Purpose:
// - Progressive enhancement: reveal base-size control when JS is available.
// - Let the user tweak the root font-size (demo only) to see how rem/em-based layout responds.
// - Persist the chosen base size in localStorage so the demo stays consistent across reloads.

(function () {
  document.documentElement.classList.remove('no-js');

  const controls = document.getElementById('controls');
  const range = document.getElementById('baseSize');
  const valueLabel = document.getElementById('baseValue');

  if (!controls || !range || !valueLabel) return;

  // Show controls (progressive enhancement)
  controls.setAttribute('aria-hidden', 'false');
  controls.style.display = 'flex';

  const KEY = 'typography-demo-base-size';

  function setRootFontSize(px) {
    // set root font-size as a pixel value so rem-based spacing updates live
    document.documentElement.style.fontSize = px + 'px';
    valueLabel.textContent = px + 'px';
  }

  // initialize from storage or range's default
  const stored = Number(localStorage.getItem(KEY));
  const initial = (stored && !isNaN(stored)) ? stored : Number(range.value);
  range.value = initial;
  setRootFontSize(initial);

  range.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    setRootFontSize(val);
  });

  // persist on change (debounced)
  let debounce;
  range.addEventListener('change', (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      localStorage.setItem(KEY, e.target.value);
    }, 250);
  });

  // ensure value label reflects any external changes
  window.addEventListener('resize', () => {
    const fs = parseFloat(getComputedStyle(document.documentElement).fontSize);
    valueLabel.textContent = Math.round(fs) + 'px';
  });
})();