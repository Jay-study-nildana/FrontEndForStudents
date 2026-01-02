// Reliable Image Slider — minimal but robust
// - Explicit image loading from data-src/data-srcset
// - Preloads neighbor slides
// - Prev/next, dots, keyboard, autoplay toggle
// - Minimal swipe with pointer events
// - Error handling and aria-live announcements

(function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  // Remove no-js marker (if present); CSS fallback can use .no-js on <html> if you set it
  document.documentElement.classList.remove('no-js');

  const track = document.getElementById('track');
  const slides = Array.from(track.querySelectorAll('.slide'));
  const total = slides.length;
  if (total === 0) return;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsRoot = document.getElementById('dots');
  const playBtn = document.getElementById('playBtn');
  const announcer = document.getElementById('announcer');

  let current = 0;
  const autoplay = slider.dataset.autoplay === 'true';
  const interval = 4000;
  let timer = null;
  let isPlaying = Boolean(autoplay);

  // Utility: set slide transform
  function updateTrack() {
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  // Create dots
  function createDots() {
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'slider__dot';
      btn.type = 'button';
      btn.setAttribute('aria-label', `Go to slide ${i + 1} of ${total}`);
      btn.setAttribute('data-index', i);
      btn.setAttribute('aria-current', i === current ? 'true' : 'false');
      btn.addEventListener('click', () => goTo(i, { user: true }));
      dotsRoot.appendChild(btn);
    }
  }

  function updateDots() {
    const dots = Array.from(dotsRoot.children);
    dots.forEach((d, i) => d.setAttribute('aria-current', i === current ? 'true' : 'false'));
  }

  // Accessibility announcer
  function announce(text) {
    if (!announcer) return;
    announcer.hidden = false;
    announcer.textContent = text;
    setTimeout(() => { announcer.textContent = ''; announcer.hidden = true; }, 1200);
  }

  // Explicitly set img.src / srcset from data attributes and handle load/error
  function loadImageForSlide(index) {
    const fig = slides[index];
    if (!fig) return;
    const img = fig.querySelector('img.slide__img');
    if (!img) return;
    // already loaded?
    if (img.dataset.loaded === 'true' || img.src) return;

    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');
    if (!src && !srcset) return;

    img.dataset.loading = 'true';
    img.dataset.error = 'false';

    // attach handlers
    const onLoad = () => {
      img.dataset.loaded = 'true';
      img.removeAttribute('data-loading');
      cleanup();
    };
    const onError = () => {
      img.dataset.error = 'true';
      img.removeAttribute('data-loading');
      // keep a visible empty/fallback state (styled via CSS)
      cleanup();
    };
    function cleanup() {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    }

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    // set attributes to kick off the request
    if (srcset) img.srcset = srcset;
    if (src) img.src = src;
  }

  // Preload neighbors to avoid blank frames during navigation
  function preloadNeighbors(index) {
    loadImageForSlide(index); // ensure current loaded
    loadImageForSlide((index + 1) % total);
    loadImageForSlide((index - 1 + total) % total);
  }

  // navigation
  function goTo(n, opts = {}) {
    current = ((n % total) + total) % total;
    updateTrack();
    updateDots();
    announce(`Slide ${current + 1} of ${total}: ${getCaption(current)}`);
    // ensure this and neighbors are loaded
    preloadNeighbors(current);
    if (opts.user && isPlaying) restartAutoplay();
  }

  function prev() { goTo(current - 1, { user: true }); }
  function next() { goTo(current + 1, { user: true }); }

  function getCaption(i) {
    const fig = slides[i].querySelector('.slide__caption');
    return fig ? fig.textContent.trim() : `Slide ${i + 1}`;
  }

  // autoplay
  function play() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, interval);
    isPlaying = true;
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.textContent = 'Pause';
  }
  function pause() {
    if (timer) clearInterval(timer);
    timer = null;
    isPlaying = false;
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.textContent = 'Play';
  }
  function togglePlay() { isPlaying ? pause() : play(); }
  function restartAutoplay() { pause(); play(); }

  // minimal pointer-swipe support
  function addSwipe() {
    let startX = 0;
    let endX = 0;
    let pointerId = null;

    track.addEventListener('pointerdown', (e) => {
      pointerId = e.pointerId;
      startX = e.clientX;
      track.setPointerCapture(pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (pointerId !== e.pointerId) return;
      endX = e.clientX;
    });
    track.addEventListener('pointerup', (e) => {
      if (pointerId !== e.pointerId) return;
      const dx = endX - startX;
      const threshold = 40; // px
      if (dx > threshold) prev();
      else if (dx < -threshold) next();
      try { track.releasePointerCapture(pointerId); } catch {}
      pointerId = null;
    });
    // cancel on leave/cancel
    track.addEventListener('pointercancel', () => { pointerId = null; });
  }

  // keyboard
  function addKeyboard() {
    slider.tabIndex = 0; // make slider focusable
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); togglePlay(); }
    });
  }

  // control events
  function addControls() {
    prevBtn.addEventListener('click', (e) => { e.preventDefault(); prev(); });
    nextBtn.addEventListener('click', (e) => { e.preventDefault(); next(); });
    playBtn.addEventListener('click', (e) => { e.preventDefault(); togglePlay(); });
    // pause on hover/focus
    slider.addEventListener('mouseenter', () => pause());
    slider.addEventListener('mouseleave', () => { if (autoplay) play(); });
    slider.addEventListener('focusin', () => pause());
    slider.addEventListener('focusout', (e) => {
      if (!slider.contains(e.relatedTarget) && autoplay) play();
    });
  }

  // initialization
  function init() {
    createDots();
    // load first slide and neighbors
    preloadNeighbors(0);
    updateTrack();
    updateDots();
    addControls();
    addKeyboard();
    addSwipe();
    if (autoplay) play();
  }

  init();

  // expose for debugging if you need
  window.__reliableSlider = { goTo, next, prev, play, pause, slidesCount: total };
})();