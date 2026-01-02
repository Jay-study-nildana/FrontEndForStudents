// Lightweight responsive-image helper
// - Progressive enhancement for images using data-src / data-srcset
// - Uses IntersectionObserver to lazy-load images when they enter viewport
// - Honors Save-Data client hint (navigator.connection.saveData) by selecting a smaller srcset if provided
// - Minimal: if IntersectionObserver not supported, loads images immediately

(function () {
  const imgs = Array.from(document.querySelectorAll('img.responsive, img.hero-img'));
  if (!imgs.length) return;

  const saveData = navigator.connection && navigator.connection.saveData;
  const ioSupported = 'IntersectionObserver' in window;

  function applySrc(img) {
    // If the image already has src/srcset, do nothing
    if (img.dataset.loaded === 'true' || img.src && img.getAttribute('src') !== '') {
      img.dataset.loaded = 'true';
      return;
    }

    // If the user requested reduced data and data-low-srcset is provided, use it.
    const lowSrcset = img.getAttribute('data-low-srcset');
    const normalSrcset = img.getAttribute('data-srcset');
    const src = img.getAttribute('data-src');

    if (saveData && lowSrcset) {
      img.setAttribute('srcset', lowSrcset);
    } else if (normalSrcset) {
      img.setAttribute('srcset', normalSrcset);
    }

    if (src) img.setAttribute('src', src);

    // mark as loaded (even though browser will still fetch/resolve)
    img.dataset.loaded = 'true';
  }

  if (ioSupported) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          applySrc(img);
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' }); // pre-load a bit before entering view

    imgs.forEach((img) => {
      // If an image already has explicit src (e.g., icons using srcset density descriptors), skip observation
      if (img.getAttribute('src') && !img.hasAttribute('data-src')) {
        img.dataset.loaded = 'true';
        return;
      }
      observer.observe(img);
    });
  } else {
    // Fallback: load immediately
    imgs.forEach(applySrc);
  }

  // Optional: small UX improvement — if Save-Data active, show a subtle notice
  if (saveData) {
    const notice = document.createElement('div');
    notice.style.cssText = 'position:fixed;left:12px;bottom:12px;background:#fff;padding:.5rem .75rem;border-radius:8px;border:1px solid rgba(2,6,23,0.06);box-shadow:0 6px 20px rgba(2,6,23,0.04);font-size:.9rem';
    notice.textContent = 'Data-saver detected: loading smaller images';
    document.body.appendChild(notice);
    setTimeout(() => { notice.style.opacity = '0'; notice.style.transition = 'opacity 600ms'; setTimeout(() => notice.remove(), 700); }, 3500);
  }
})();