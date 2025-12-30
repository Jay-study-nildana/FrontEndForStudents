# Bootstrap Custom Variables — Mini Project

Goal
- Demonstrate two approaches to customizing Bootstrap:
  - Quick runtime CSS variable overrides (no build step).
  - Full Sass customization (recommended for deep customization) with an example `_custom.scss`.

Files
- `index.html` — demo page
- `overrides.css` — quick CSS variable overrides (apply without rebuild)
- `_custom.scss` — Sass partial showing how to override variables before compiling Bootstrap
- `styles.css` — optional small helpers

Quick run
- Open `index.html` in your browser to see CSS variable overrides in action.
- Click "Toggle theme" to switch the CSS-variable based theme.

Sass-based customization (recommended if you need to change many variables)
1. Initialize project:
   npm init -y
   npm install bootstrap sass --save-dev
2. Create `styles.scss`:
   @import "bootstrap-custom-variables/_custom.scss";
   @import "bootstrap/scss/bootstrap";
3. Build:
   npx sass styles.scss styles.css --no-source-map
4. Include the generated `styles.css` in your HTML instead of CDN if you want the compiled result.

Notes
- CSS variable overrides are fast and useful for theming (colors, a few tokens) without a build step.
- For changing breakpoints, grid behavior, or component internals you must use Sass variables and rebuild Bootstrap.
```