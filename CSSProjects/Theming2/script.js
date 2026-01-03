// --- THEME SWITCHER ---
const themeMap = {
  light: "",
  dark: "theme-dark",
  solarized: "theme-solarized",
};
const themeSwitcher = document.getElementById("themeSwitcher");
// Restore previous theme if set
(function () {
  const stored = localStorage.getItem("themeBox-theme");
  if (stored && themeMap[stored] !== undefined) {
    setTheme(stored);
    themeSwitcher.value = stored;
  }
})();
themeSwitcher.addEventListener("change", () => {
  setTheme(themeSwitcher.value);
  localStorage.setItem("themeBox-theme", themeSwitcher.value);
});
function setTheme(theme) {
  // safely remove previous theme-* classes (no empty tokens)
  const prev = Array.from(document.documentElement.classList).filter(
    (c) => c && c.startsWith("theme-")
  );
  if (prev.length) document.documentElement.classList.remove(...prev);
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem("theme", theme);
}

// --- MOBILE NAV TOGGLE ---
document.getElementById("navToggle").onclick = function () {
  document.getElementById("navMenu").classList.toggle("active");
};

// --- TESTIMONIAL CAROUSEL ---
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
function showTestimonial(idx) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === idx);
  });
}
function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}
function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial + testimonialSlides.length - 1) %
    testimonialSlides.length;
  showTestimonial(currentTestimonial);
}
showTestimonial(currentTestimonial);
document.addEventListener("keydown", (e) => {
  if (
    document.activeElement.tagName === "INPUT" ||
    document.activeElement.tagName === "TEXTAREA"
  )
    return;
  if (e.key === "ArrowLeft") prevTestimonial();
  if (e.key === "ArrowRight") nextTestimonial();
});
