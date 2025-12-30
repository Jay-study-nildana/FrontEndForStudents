# Accessibility One‑Sheet — WCAG, Keyboard Navigation & Color Contrast

A concise, practical reference for students to design, build, and test accessible web interfaces. Use this as a checklist and quick reference in labs and projects.

---

## 1. WCAG — Overview & Practical Guidance

What is WCAG?
- Web Content Accessibility Guidelines (WCAG) are international recommendations for making web content more accessible to people with disabilities.
- Updated versions (2.0, 2.1, 2.2, 3.0 in progress). Most projects aim for WCAG 2.1 or 2.2 conformance.

Four Principles (POUR)
- Perceivable — Users must be able to perceive the information (text alternatives, captions, adaptable content).
- Operable — Interface components must be operable (keyboard accessibility, time limits, navigation).
- Understandable — Information and operation of UI must be understandable (readable text, predictable UI).
- Robust — Content must be compatible with user agents and assistive technologies (valid markup, ARIA where needed).

Conformance Levels
- A (lowest) — basic accessibility features.
- AA (recommended target) — balances effort and coverage; many laws/regulations require AA.
- AAA (highest) — most stringent; not always realistic for all content.

Common & high‑impact WCAG success criteria (examples)
- Perceivable
  - Text alternatives for non-text content (images, icons): 1.1.1 (A)
  - Captions for prerecorded audio (1.2.2) and transcripts for audio-only (1.2.1)
  - Info and relationships: semantic markup, headings, lists (1.3.1)
- Operable
  - Keyboard accessible: all functionality must work via keyboard (2.1.1)
  - Enough time to read and use content (2.2.x)
  - No keyboard traps (2.1.2)
- Understandable
  - Readable language (3.1.x)
  - Predictable navigation and consistent UI (3.2.x)
  - Input assistance; error suggestions (3.3.x)
- Robust
  - Name, role, value for UI components (4.1.2) — ARIA and native semantics

Practical takeaways
- Aim for WCAG 2.1/2.2 AA for most projects.
- Prefer native HTML semantics (button, input, nav, main, header, footer) before ARIA.
- Use ARIA to enhance accessibility only when native semantics are insufficient.
- Test early and often: automated checks + manual keyboard & screen reader testing.

---

## 2. Keyboard Navigation — Principles & Techniques

Why keyboard navigation matters
- Many users (screen reader users, motor impairment, power users) rely on keyboard-only navigation.
- Keyboard accessibility is a core WCAG requirement.

Essential keyboard behaviors
- Tab order follows DOM order (default).
- Focusable elements: links (<a href>), buttons (<button>), inputs, select, textarea, and elements with tabindex="0".
- Use Enter/Space to activate controls (buttons, links) and arrow keys for composite widgets (menus, tabs, carousels).

Standard keyboard controls to support
- Tab — move forward focusable elements
- Shift + Tab — move backward
- Enter / Space — activate controls, toggle buttons (Space often toggles native buttons)
- Esc — close modal/dialog
- Arrow keys — move between items in a group (radio group, menu, select-like widget)
- Home / End — jump to start/end of a list or group
- Page Up / Page Down — scroll by viewport

Design & implementation rules
- Preserve logical DOM order — visual reordering with CSS (order) can confuse keyboard and screen reader flow. If visual order differs, ensure DOM order still logical or manage focus carefully.
- Focus styles:
  - Provide clear focus-visible styles; use :focus-visible when possible.
  - Avoid removing outlines without mimicking a clear alternative.
  - Example:
    ```css
    :focus { outline: none; }
    :focus-visible { outline: 3px solid Highlight; outline-offset: 2px; }
    ```
- Skip links:
  - Add a hidden link that becomes visible on keyboard focus to allow skipping to main content:
    ```html
    <a class="skip-link" href="#main">Skip to main content</a>
    ```
- Landmarks & headings:
  - Use semantic landmarks (<nav>, <main>, <header>, <footer>, <aside>) and heading structure (one <h1>, then <h2>...) to speed navigation for assistive tech.
- Manage focus for dynamic UI:
  - When opening a modal/dialog: move focus into the modal, trap focus within it, and return focus to the launching control when closed.
  - For SPAs: when content updates, set focus to the meaningful element (e.g., first error or success message). Use aria-live regions for announcements.
- Avoid tabindex misuse:
  - tabindex="-1" — makes element programmatically focusable (useful for focusing regions).
  - tabindex="0" — include in natural tab order.
  - tabindex>0 — avoid (creates complex, brittle tab orders).
- Keyboard-accessible custom controls
  - Implement keyboard events and accessible name/role attributes:
    - Use role="button" + tabindex="0" only when you cannot use <button>.
    - Provide aria-pressed, aria-expanded, aria-haspopup as needed.
    - Ensure Space/Enter behavior is implemented as expected.

Focus trap pattern (simple rules)
- When modal opens:
  - Save activeElement.
  - Move focus to a focusable element inside modal.
  - Prevent focus from escaping (listen for Tab/Shift+Tab wrap).
  - On close: restore focus to original launcher.
- Prefer tested libraries (reach-ui, aria-dialog) rather than writing trap code from scratch for production.

Testing keyboard accessibility (manual checklist)
- Tab to every interactive control and activate it.
- Ensure all functionality reachable and usable with keyboard alone.
- No hidden focusable elements that unexpectedly get focus.
- Focus order follows a logical reading order.
- Focus is visible (keyboard users can see where focus is).

Quick keyboard test tips
- In Chrome DevTools, use "Emulate Focus" or simply press Tab.
- Use NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android) for assistive-tech testing.
- Keyboard-only walkthrough: try to complete a critical flow (search → open item → form → submit) using Tab/Enter/Esc only.

---

## 3. Color Contrast — Rules, Tools & Practicals

Why color contrast matters
- Ensures text and important graphical elements are readable for users with low vision or color blindness.
- WCAG defines numeric contrast ratios and thresholds.

Contrast ratio basics
- Contrast ratio is computed from relative luminance of foreground and background colors.
- Range: 1:1 (identical colors) to 21:1 (black vs white).

WCAG contrast thresholds (most relevant)
- Normal text (< 18pt or 24px bold) — Level AA: ≥ 4.5:1; Level AAA: ≥ 7:1.
- Large text (≥ 18pt or 24px bold; or ≥ 14pt/18.66px bold) — Level AA: ≥ 3:1; Level AAA: ≥ 4.5:1.
- Graphical objects and UI components (icons, focus indicators): Level AA: ≥ 3:1 against adjacent background (for conformance on non-text elements).
- Contrast for disabled elements should still meet minimums when conveying information.

Practical color contrast rules
- Body text, navigation, buttons with text must meet 4.5:1 (AA).
- Use larger sizes to allow lower contrast (>=3:1) when appropriate.
- Ensure hover/focus states maintain adequate contrast (especially focus outlines).
- For brand colors, provide accessible variants for text/background, or use them only for non-text decoration.

Tools to measure contrast
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Lighthouse and axe-core show failing contrast issues.
- Browser extensions: "Accessibility Insights", "axe", "WCAG Contrast Checker".
- DevTools Color Picker (Chrome) shows contrast ratio.

CSS & workflow tips
- Prefer semantic tokens and compute contrasts during design:
  - Example token approach:
    ```css
    :root {
      --color-bg: #ffffff;
      --color-text: #0b1220; /* ensure contrast >= 4.5:1 */
      --color-primary: #2563eb;
      --color-primary-text: #ffffff; /* verify contrast */
    }
    ```
- Always validate both normal and hover/focus/active states:
  - `.btn { background: var(--color-primary); color: var(--color-primary-text); }`
  - On hover, if background darkens, ensure text contrast still OK.
- For icons (non-text), ensure a minimum contrast of 3:1 with background or provide text alternatives (aria-hidden appropriately).

Color testing strategies
- Grayscale test: convert page to grayscale to check color-only distinctions:
  - In devtools, apply a filter: `filter: grayscale(100%);` — if information becomes indistinguishable, rely on more than color alone.
- Test with color-blindness simulators (Deuteranopia, Protanopia, Tritanopia).
- Use automated tests in CI for regressions (axe-core integration or Lighthouse assertions).

Examples & snippets

1) Focus-visible outline (high contrast)
```css
:focus-visible {
  outline: 3px solid #ffb703; /* ensure contrast with surrounding */
  outline-offset: 2px;
}
```

2) Skip link (keyboard access with good contrast)
```html
<a class="skip-link" href="#main">Skip to main content</a>
```
```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
}
.skip-link:focus {
  left: 1rem;
  top: 1rem;
  background: #000;
  color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}
```

3) CSS variables + accessible fallback colors
```css
:root{
  --brand: #2563eb;
  --brand-text: #ffffff;
}
.btn {
  background: var(--brand);
  color: var(--brand-text);
}

/* Provide a higher contrast variant for small text */
.btn.small { font-size:.85rem; background: #1e40af; color: #fff; }
```

4) Checking contrast programmatically (example using color-contrast-checker libraries)
- In JS build/test step, use a package (e.g., color-contrast-checker) to assert token ratios and fail CI if below threshold.

Common contrast pitfalls
- Light gray text on white background (e.g., UI hints) often fails.
- Subtle disabled states that convey important information (disabled form field text) — ensure text still readable or provide non-color cues.
- Low-contrast focus rings — keyboard users may not see focus if the ring is too subtle or low-contrast.
- Background images under text — ensure text overlays have adequate contrast (use overlays or adjust text color/shadow).

---

## 4. Combined Checklist (Quick classroom checklist)

WCAG / Structure
- [ ] Use semantic HTML elements (main, nav, header, footer, article, section).
- [ ] Logical heading structure (one H1, then H2 → H3).
- [ ] Images have descriptive alt text (or alt=" " for decorative images).
- [ ] Forms: labels associated (label for= or wrapping), error messages linked with aria-describedby.

Keyboard
- [ ] All functionality reachable and operable via keyboard.
- [ ] Focus styles visible and consistent (:focus-visible).
- [ ] Skip link present if page has repeated navigation.
- [ ] No keyboard traps (modals trap then release focus correctly).
- [ ] Avoid tabindex > 0; prefer tabindex="0" and programmatic focus when needed.

Color & Contrast
- [ ] Text contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text).
- [ ] UI components and icons meet contrast thresholds (>=3:1) or provide alternate indicators.
- [ ] Hover/focus/active states retain adequate contrast.
- [ ] Test with grayscale and color-blindness simulators.

Testing & QA
- [ ] Run automated audits: Lighthouse, axe-core, Accessibility Insights.
- [ ] Manual testing with keyboard-only navigation and a screen reader.
- [ ] Use color contrast tools and fix token colors before finalizing UI.
- [ ] Include accessibility in PR checklist and reject regressions.

---

## 5. Classroom Exercises (mini tasks)

Exercise A — Keyboard navigation lab
- Build a small nav and content area.
- Add a skip link, ensure tab order is logical.
- Add a modal dialog; implement focus trapping and restore focus on close.
- Test with keyboard only and report any issues.

Exercise B — Contrast fixes lab
- Given a set of color tokens (primary, secondary, muted), compute contrast ratios with the background.
- Adjust colors (or provide accessible variants) to meet AA and record before/after ratios.

Exercise C — WCAG spot audit (group)
- Pick a page from a project (or sample).
- Use automated tools then manually test headings, labels, keyboard flows, and contrast.
- Produce a prioritized bug list and fix three highest-impact issues.

---

## 6. Tools & Resources
- WCAG quick reference: https://www.w3.org/WAI/standards-guidelines/wcag/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Lighthouse (Chrome DevTools)
- axe-core (browser extension & CI integration): https://www.deque.com/axe/
- Accessibility Insights: https://accessibilityinsights.io/
- NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android) — screen readers for manual testing
- Color contrast testing libraries (npm): color-contrast-checker, tinycolor2

---

## 7. Final Tips (practical & habit-forming)
- Start accessibility early — fix is cheaper during design than after launch.
- Prefer semantic HTML over ARIA; ARIA is a supplement, not a substitute.
- Treat accessibility as a UX problem that benefits everyone.
- Add accessibility checks to your CI (axe) to catch regressions.
- Pair program manual tests: one keyboard-only tester, one screen-reader tester.

---

## 8. Quick reference snippets

1) Accessible button (preferred)
```html
<button type="button" class="btn" aria-pressed="false">Toggle</button>
```

2) Accessible form control
```html
<label for="email">Email</label>
<input id="email" name="email" type="email" required aria-describedby="email-help" />
<div id="email-help">We will only use this to reply.</div>
```

3) Modal focus management (pseudo)
```js
// on open:
const previous = document.activeElement;
modalElement.querySelector('[data-autofocus]').focus();
trapFocus(modalElement);

// on close:
previous.focus();
```