// Responsive header/menu toggle with accessible attributes
(function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("primaryNav");
  let isOpen = false;

  function openMenu() {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    // optionally prevent background scroll on mobile
    document.documentElement.style.overflow = "hidden";
    isOpen = true;
  }

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.documentElement.style.overflow = "";
    isOpen = false;
  }

  navToggle.addEventListener("click", () => {
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close menu when a nav link is clicked (mobile)
  navMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.tagName === "A" &&
      window.matchMedia("(max-width: 779px)").matches
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
      navToggle.focus();
    }
  });

  // On resize, ensure menu state consistent with layout
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 780px)").matches) {
      // ensure menu visible and no scroll lock on larger screens
      navMenu.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// Simple demo handler for sign-in form on `signin.html`
document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("signinForm");
  if (!signInForm) return;
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(signInForm);
    const email = formData.get("email");
    // demo behavior: show a friendly message (no real auth)
    const msg = document.getElementById("signinMessage");
    if (msg) msg.textContent = `Demo sign-in successful for ${email}`;
  });
});
