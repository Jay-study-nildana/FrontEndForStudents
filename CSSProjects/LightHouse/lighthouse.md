# Lighthouse One‑Sheet — Practical Guide for Students

A compact, shareable reference for using Google Lighthouse to audit and improve web page quality (Performance, Accessibility, Best Practices, SEO, and PWA). Includes how to run audits, interpret results, common fixes, CI integration, and tips for NestJS/SSR projects.

---

## What is Lighthouse?
- Open‑source automated auditing tool (Google) that runs in headless Chrome.
- Reports on Performance, Accessibility, Best Practices, SEO, and Progressive Web App aspects.
- Generates actionable diagnostics, suggestions, and a numeric score (0–100) per category.
- Great for quick automated checks; complements manual testing and other tools (axe, Accessibility Insights).

---

## Why use Lighthouse?
- Finds common problems quickly (e.g., missing alt text, slow LCP, low contrast).
- Prioritizes issues and shows the affected resources and lines of code.
- Integrates into DevTools, CI (Lighthouse CI), and other workflows.
- Tracks regressions and enforces quality gates.

---

## How Lighthouse works (high level)
- Loads the page in a clean Chrome instance, emulates mobile by default, captures a trace, and runs audits.
- Some audits are deterministic checks (e.g., meta tags), others measure runtime behavior (LCP, CLS).
- Scores are weighted aggregates of individual audits; use them as guidance, not gospel.

---

## Run Lighthouse (quick commands)

- In Chrome DevTools:
  1. Open page → DevTools → Lighthouse tab → choose categories → Generate report.

- CLI (single run):
  ```
  npx lighthouse https://example.com --output html --output-path=./lighthouse.html
  ```
  For accessibility only:
  ```
  npx lighthouse http://localhost:3000 --only-categories=accessibility --output html --output-path=./lh-accessibility.html
  ```

- Programmatic (Node):
  - Use `lighthouse` npm package or `@lhci/cli` for automation.

- PageSpeed Insights (web UI) uses Lighthouse under the hood.

---

## Lighthouse CI (automate in CI)
- Useful to run Lighthouse on pull requests, merges, or nightly builds and enforce thresholds.

Basic GitHub Actions example:
```yaml
name: lighthouse-ci
on: [push, pull_request]

jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Start app (example: serve build)
        run: |
          npm ci
          npm run build
          npm run start:prod & # start server in background
          sleep 2
      - name: Run LHCI
        run: |
          npx -y @lhci/cli autorun --upload.target=temporary-public-storage
```

- For stable reports and thresholds, use LHCI server or GitHub Actions with `lhci autorun`.
- Configure `.lighthouserc.js` or `lighthouserc.json` to set budgets and upload targets.

---

## Recommended thresholds (example)
- Performance: aim ≥ 90 (mobile desktop may differ)
- Accessibility: aim ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90
Adjust thresholds for your project and enforce in CI where appropriate.

---

## Common Lighthouse audits & fixes (actionable)

Performance
- LCP slow (Largest Contentful Paint)
  - Fixes: optimize/resize/compress images, serve images in modern formats (WebP/AVIF), preload hero resources, minimize render-blocking CSS/JS, use server-side rendering or caching.
- Reduce unused JS/CSS
  - Fixes: code-splitting, remove dead code, tree-shake, lazy-load non-critical components.
- Long main-thread tasks / INP
  - Fixes: break up long tasks, avoid heavy synchronous work, defer non-essential work.

Accessibility
- Images missing `alt`
  - Fix: provide meaningful `alt` text or empty alt (`alt=""`) for decorative images.
- Form controls without label
  - Fix: add `<label for="id">`, or `aria-label`, or `aria-labelledby`.
- Low color contrast
  - Fix: pick higher-contrast colors (WCAG AA: ≥ 4.5:1 for normal text).
- Missing `lang` on `<html>`
  - Fix: add `<html lang="en">`.
- Icon-only buttons
  - Fix: add `aria-label` or visually-hidden text.

Best Practices
- Use HTTPS
- Avoid insecure APIs or deprecated features
- Properly size images and avoid `document.write`

SEO
- Ensure `<title>` and `<meta name="description">`
- Ensure status 200 for page, not 404
- Provide meaningful hreflang/canonical where needed

---

## Limitations — what Lighthouse does NOT do
- Automated audits cover only a portion (roughly 20–50%) of WCAG. Manual testing is still essential.
- Cannot judge content clarity, tone, or real-world UX issues.
- May report false positives; treat results as guidance and validate manually.

---

## Manual & complementary testing
- Keyboard navigation (Tab, Shift+Tab) — ensure focus order and focus styles.
- Screen reader testing (NVDA, VoiceOver, TalkBack)
- axe-core (extension / library) — often used in CI and dev tools
- Accessibility Insights, WAVE — additional visualization and checks
- Real device testing for performance and responsiveness

---

## Interpreting results — practical approach
1. Prioritize: fix high-impact, easy wins first (missing alt, labels, contrast issues).
2. Group by category: Accessibility and SEO fixes often increase usability and SERP signals.
3. Address performance bottlenecks: images, caching, critical CSS/JS.
4. Re-run Lighthouse after each major change to measure impact.
5. Use CI to prevent regressions.

---

## Using Lighthouse with NestJS (SSR / SPA considerations)
- If your NestJS app uses SSR (e.g., with a templating engine or SSR framework):
  - Run Lighthouse against the server‑rendered route so the audit sees the same HTML users get.
- For client-side rendered SPA served by NestJS:
  - Ensure the page fully renders in CI staging before running Lighthouse (wait for API responses or seed test data).
  - Use Puppeteer to authenticate and render protected pages before running Lighthouse:
    - Example flow: Puppeteer -> login -> set session cookie -> run Lighthouse on authenticated URL.
- For LCI in CI: start your NestJS server on a port, ensure it serves the built front-end, then run LHCI autorun.

Puppeteer + Lighthouse (authenticated page example):
```js
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const { port } = new URL(browser.wsEndpoint());
  // Navigate and login with Puppeteer, set cookie/session...
  // Then run lighthouse on the page:
  const result = await lighthouse('http://localhost:3000/protected', {
    port: new URL(browser.wsEndpoint()).port,
  });
  console.log('Report saved:', result.report); // process/report
  await browser.close();
})();
```

---

## Remediation workflow (example)
1. Run Lighthouse and export report (HTML & JSON).
2. Triage issues: label as Accessibility, Performance, SEO, P0/P1/P2 by impact and effort.
3. Fix in codebase, add unit/visual/regression tests where possible.
4. Re-audit locally and in CI.
5. Merge and monitor real-world metrics (Real User Monitoring — RUM, Core Web Vitals).

---

## Quick checklist to run before class or a demo
- [ ] Run Lighthouse in DevTools and save the HTML report.
- [ ] Identify top 3 issues to fix live (e.g., missing label, missing alt, LCP image).
- [ ] Prepare a before/after demo: fix code and re-run Lighthouse.
- [ ] Show CI integration example and fail a PR when score < threshold.

---

## Helpful commands & snippets
- Single run (desktop):
  ```
  npx lighthouse https://example.com --preset=desktop --output html --output-path=./lh-desktop.html
  ```
- Accessibility only:
  ```
  npx lighthouse https://example.com --only-categories=accessibility --output json --output-path=./lh-acc.json
  ```
- LHCI autorun (quick):
  ```
  npx @lhci/cli autorun
  ```

---

## Further reading & tools
- Lighthouse docs: https://developer.chrome.com/docs/lighthouse/
- Web.dev (guides & audits): https://web.dev/
- Google Search Central (SEO): https://developers.google.com/search
- axe-core: https://www.deque.com/axe/
- Accessibility Insights: https://accessibilityinsights.io/

---

## Classroom tips
- Pair students to run Lighthouse on a small project and fix 1–2 accessibility issues.
- Use LHCI in CI for class projects to teach quality gates and regression prevention.
- Emphasize that Lighthouse is a tool in a broader accessibility and performance workflow — encourage manual testing and user testing.

---

## One‑minute summary
Lighthouse is an automated auditor that helps find and prioritize issues across Performance, Accessibility, Best Practices, SEO, and PWA. Use it with manual testing and CI to improve site quality, and adapt it to your NestJS workflow by running audits against rendered pages (authenticated + SSR pages require extra handling).

---