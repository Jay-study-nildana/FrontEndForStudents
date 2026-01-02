// Minimal script to illustrate picture behavior and format support detection.
// - Detects AVIF / WebP support and reports it (informational).
// - "Show selected source" button inspects currently used image src for the hero picture.
// This is purely educational — picture behavior is native to the browser.

(function () {
  const showBtn = document.getElementById('show-sources');
  const formatSupport = document.getElementById('format-support');
  const heroImg = document.querySelector('.hero-picture img');

  // Feature-detect WebP and AVIF support (lightweight tests)
  function testImageFormat(type, dataURI) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.width > 0 && img.height > 0);
      img.onerror = () => resolve(false);
      img.src = dataURI;
    });
  }

  // tiny WebP 1x1 dataURI
  const webpData = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  // tiny AVIF may be unsupported in some engines; use a widely acceptable test if available
  const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAAAAA==';

  Promise.all([testImageFormat('webp', webpData), testImageFormat('avif', avifData)])
    .then(([webp, avif]) => {
      formatSupport.textContent = `webp: ${webp ? 'supported' : 'no'}, avif: ${avif ? 'supported' : 'no'}`;
    })
    .catch(() => {
      formatSupport.textContent = 'format test unavailable';
    });

  // When clicked, show which final src is currently used for the hero <img>.
  // Note: browsers may pick a source from <source> elements; the inner <img>.currentSrc reflects the final chosen resource.
  if (showBtn && heroImg) {
    showBtn.addEventListener('click', () => {
      // currentSrc is the effective URL chosen by the browser (may be empty if not painted yet)
      const chosen = heroImg.currentSrc || heroImg.src || '(no src)';
      alert(`Browser selected: ${chosen}`);
    });
  }
})();