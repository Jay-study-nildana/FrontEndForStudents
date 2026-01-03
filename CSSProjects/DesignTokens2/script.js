// --- DARK MODE TOGGLE ---
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  // Store preference
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('darkMode', '1');
  } else {
    localStorage.setItem('darkMode', '0');
  }
}
// On page load: respect stored preference
(function () {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches ||
    localStorage.getItem('darkMode') === '1') {
    document.body.classList.add('dark');
  }
})();

// --- MOBILE NAV TOGGLE ---
document.getElementById('navToggle').onclick = function() {
  document.getElementById('navMenu').classList.toggle('active');
};

// --- TESTIMONIAL CAROUSEL ---
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
function showTestimonial(idx) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
}
function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}
function prevTestimonial() {
  currentTestimonial = (currentTestimonial + testimonialSlides.length - 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}
// Init the first one
showTestimonial(currentTestimonial);

// Optional: Keyboard navigation for bonus points
document.addEventListener('keydown', (e) => {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
  if (e.key === "ArrowLeft") prevTestimonial();
  if (e.key === "ArrowRight") nextTestimonial();
});