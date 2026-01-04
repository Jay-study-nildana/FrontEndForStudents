// Contrast Lab script.js
// - Live contrast computation (WCAG 2.1 formula)
// - UI glue: sync color inputs and hex fields, update sample, evaluate AA/AAA for normal/large text
// - Palette card rendering and annotation toggles
// - Theme selector that switches CSS variables via data-theme on :root
// - Accessible announcements via #announcer live region

/* Helpers */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
const announcer = $('#announcer') || document.createElement('div');

function clampHex(hex) {
  if (!hex) return '#000000';
  hex = hex.trim();
  if (!hex.startsWith('#')) hex = '#' + hex;
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    // expand shorthand
    hex = hex.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,
                      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`);
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return '#000000';
  return hex.toLowerCase();
}

function hexToRgb(hex) {
  hex = clampHex(hex).substring(1);
  return {
    r: parseInt(hex.substring(0,2), 16),
    g: parseInt(hex.substring(2,4), 16),
    b: parseInt(hex.substring(4,6), 16)
  };
}

function srgbToLinear(v) {
  v = v / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(fgHex, bgHex) {
  const L1 = relativeLuminance(clampHex(fgHex));
  const L2 = relativeLuminance(clampHex(bgHex));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return +( (lighter + 0.05) / (darker + 0.05) ).toFixed(2);
}

function wcagPasses(ratio, level = 'AA', large = false) {
  // thresholds per WCAG 2.1
  // AA normal: 4.5, AA large: 3.0
  // AAA normal: 7.0, AAA large: 4.5
  const thresholds = {
    'AA': large ? 3.0 : 4.5,
    'AAA': large ? 4.5 : 7.0
  };
  return ratio >= thresholds[level];
}

/* UI Wiring */
document.addEventListener('DOMContentLoaded', () => {
  const fgInput = $('#fg-color');
  const bgInput = $('#bg-color');
  const fgHex = $('#fg-hex');
  const bgHex = $('#bg-hex');
  const sample = $('#sample-text');
  const ratioEl = $('#ratio');
  const aaNormal = $('#aa-normal');
  const aaLarge = $('#aa-large');
  const aaaNormal = $('#aaa-normal');
  const aaaLarge = $('#aaa-large');
  const fontSizeSel = $('#font-size');
  const fontWeightSel = $('#font-weight');
  const swapBtn = $('#swap-btn');
  const usePaletteBtn = $('#use-palette');
  const paletteGrid = $('#palette-grid');
  const toggleAnnotations = $('#toggle-annotations');
  const themeSelect = $('#theme-select');
  const bodyRoot = document.documentElement;

  function updateSampleStyle() {
    const fg = clampHex(fgHex.value);
    const bg = clampHex(bgHex.value);
    sample.style.color = fg;
    sample.style.background = bg;
    sample.style.fontSize = fontSizeSel.value + 'px';
    sample.style.fontWeight = fontWeightSel.value;
  }

  function updateScores() {
    const fg = clampHex(fgHex.value);
    const bg = clampHex(bgHex.value);
    const ratio = contrastRatio(fg, bg);
    ratioEl.textContent = ratio.toFixed(2) + ':1';

    const passesAaNormal = wcagPasses(ratio, 'AA', false);
    const passesAaLarge = wcagPasses(ratio, 'AA', true);
    const passesAaaNormal = wcagPasses(ratio, 'AAA', false);
    const passesAaaLarge = wcagPasses(ratio, 'AAA', true);

    aaNormal.textContent = passesAaNormal ? 'Pass' : 'Fail';
    aaNormal.style.color = passesAaNormal ? 'var(--accent)' : '#b91c1c';

    aaLarge.textContent = passesAaLarge ? 'Pass' : 'Fail';
    aaLarge.style.color = passesAaLarge ? 'var(--accent)' : '#b91c1c';

    aaaNormal.textContent = passesAaaNormal ? 'Pass' : 'Fail';
    aaaNormal.style.color = passesAaaNormal ? 'var(--accent)' : '#b91c1c';

    aaaLarge.textContent = passesAaaLarge ? 'Pass' : 'Fail';
    aaaLarge.style.color = passesAaaLarge ? 'var(--accent)' : '#b91c1c';

    // make an accessible summary
    const summary = `Contrast ratio ${ratio.toFixed(2)} to 1. ${passesAaNormal ? 'Meets' : 'Does not meet'} WCAG AA for normal text. ${passesAaLarge ? 'Meets' : 'Does not meet'} WCAG AA for large text.`;
    announcer.textContent = summary;
  }

  function syncHexToColorInputs() {
    fgInput.value = clampHex(fgHex.value);
    bgInput.value = clampHex(bgHex.value);
  }

  function syncColorToHex() {
    fgHex.value = clampHex(fgInput.value);
    bgHex.value = clampHex(bgInput.value);
  }

  // initial sync
  syncColorToHex();
  updateSampleStyle();
  updateScores();

  // events
  fgInput.addEventListener('input', () => { syncColorToHex(); updateSampleStyle(); updateScores(); });
  bgInput.addEventListener('input', () => { syncColorToHex(); updateSampleStyle(); updateScores(); });

  fgHex.addEventListener('change', () => { fgHex.value = clampHex(fgHex.value); syncHexToColorInputs(); updateSampleStyle(); updateScores(); });
  bgHex.addEventListener('change', () => { bgHex.value = clampHex(bgHex.value); syncHexToColorInputs(); updateSampleStyle(); updateScores(); });

  fontSizeSel.addEventListener('change', () => { updateSampleStyle(); updateScores(); });
  fontWeightSel.addEventListener('change', () => { updateSampleStyle(); updateScores(); });

  swapBtn.addEventListener('click', () => {
    const t = fgHex.value;
    fgHex.value = bgHex.value;
    bgHex.value = t;
    syncHexToColorInputs();
    updateSampleStyle();
    updateScores();
  });

  // sample palette application: toggles through few curated palettes
  const samplePalettes = [
    { fg: '#0b1220', bg: '#ffffff' },
    { fg: '#ffffff', bg: '#0b75ff' },
    { fg: '#6b7280', bg: '#ffffff' },
    { fg: '#ffffff', bg: '#111827' },
    { fg: '#ffb020', bg: '#0b1220' }
  ];
  let paletteIndex = 0;
  usePaletteBtn.addEventListener('click', () => {
    const p = samplePalettes[paletteIndex % samplePalettes.length];
    paletteIndex++;
    fgHex.value = p.fg;
    bgHex.value = p.bg;
    syncHexToColorInputs();
    updateSampleStyle();
    updateScores();
    announcer.textContent = `Applied palette ${p.fg} on ${p.bg}`;
  });

  // theme switching updates CSS variables by toggling data-theme on :root
  themeSelect.addEventListener('change', (e) => {
    const t = e.target.value;
    if (t === 'light') bodyRoot.setAttribute('data-theme', '');
    else bodyRoot.setAttribute('data-theme', t);
    announcer.textContent = `Theme switched to ${t}`;
    // re-evaluate palette cards annotations if visible
    annotatePaletteCards(toggleAnnotations.getAttribute('data-visible') === 'true');
  });

  // palette cards: render colors and annotate pass/fail
  function renderPaletteCards() {
    const cards = $$('.palette-card', paletteGrid);
    cards.forEach((card) => {
      const fg = card.getAttribute('data-fore') || '#000000';
      const bg = card.getAttribute('data-back') || '#ffffff';
      const sw = $('.swatch', card);
      const metaSample = card.querySelector('.token-sample');
      // set swatch gradient to show both bg and fg text overlay
      sw.style.background = `${bg}`;
      card.style.background = colorMixSurface(bg);
      metaSample.style.color = fg;
      metaSample.style.background = 'transparent';
      // store computed ratio as attribute for annotation convenience
      const ratio = contrastRatio(fg, bg);
      card.setAttribute('data-ratio', ratio);
      // annotate by default hidden; visible via toggleAnnotations
      const ann = card.querySelector('.annotation');
      ann.textContent = `${ratio.toFixed(2)}:1`;
      ann.setAttribute('data-pass-aa', wcagPasses(ratio, 'AA', false) ? 'true' : 'false');
      ann.setAttribute('data-pass-aa-large', wcagPasses(ratio, 'AA', true) ? 'true' : 'false');
    });
  }

  function colorMixSurface(bg) {
    // subtle function to return a background suitable for card using bg color
    // try to produce a very light tint based on bg to avoid identical card color
    return `linear-gradient(180deg, color-mix(in srgb, ${bg} 6%, white 94%), transparent)`;
  }

  function annotatePaletteCards(show = false) {
    const cards = $$('.palette-card', paletteGrid);
    cards.forEach((card) => {
      const ann = card.querySelector('.annotation');
      if (!show) {
        ann.style.display = 'none';
        card.classList.remove('annotated-pass', 'annotated-fail');
        ann.setAttribute('aria-hidden', 'true');
      } else {
        ann.style.display = 'inline-block';
        ann.setAttribute('aria-hidden', 'false');
        const ratio = parseFloat(card.getAttribute('data-ratio') || '0');
        const pass = wcagPasses(ratio, 'AA', false);
        if (pass) {
          card.classList.add('annotated-pass');
          card.classList.remove('annotated-fail');
          ann.textContent = `Pass ${ratio.toFixed(2)}:1`;
        } else {
          card.classList.add('annotated-fail');
          card.classList.remove('annotated-pass');
          ann.textContent = `Fail ${ratio.toFixed(2)}:1`;
        }
      }
    });
  }

  // toggle annotations button
  toggleAnnotations.addEventListener('click', () => {
    const pressed = toggleAnnotations.getAttribute('aria-pressed') === 'true';
    toggleAnnotations.setAttribute('aria-pressed', (!pressed).toString());
    toggleAnnotations.setAttribute('data-visible', (!pressed).toString());
    annotatePaletteCards(!pressed);
    announcer.textContent = !pressed ? 'Annotations shown' : 'Annotations hidden';
  });

  // initial render of palette cards
  renderPaletteCards();
  annotatePaletteCards(false);

  // make palette cards clickable to apply their colors
  paletteGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.palette-card');
    if (!card) return;
    const fg = card.getAttribute('data-fore');
    const bg = card.getAttribute('data-back');
    fgHex.value = clampHex(fg);
    bgHex.value = clampHex(bg);
    syncHexToColorInputs();
    updateSampleStyle();
    updateScores();
    announcer.textContent = `Applied palette ${fg} on ${bg}`;
  });

  // Keyboard accessibility: allow Enter/Space to activate palette cards when focused
  paletteGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.palette-card');
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  // make palette cards focusable
  $$('.palette-card', paletteGrid).forEach((c) => { c.tabIndex = 0; });

  // Expose a small public API for developers (useful when embedding)
  window.ContrastLab = {
    contrastRatio,
    wcagPasses,
    updateSampleStyle,
    updateScores
  };
});

/* End of script.js */