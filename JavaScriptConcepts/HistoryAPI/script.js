// History API — Simple Interactive Demo
// Lots of console.log to observe behaviour
// - pushState(state, title, url)
// - replaceState(state, title, url)
// - popstate event (back/forward)
// - reading history.length and history.state
// - graceful rendering based on location.pathname

const view = document.getElementById('view');
const links = document.querySelectorAll('a[data-link]');
const locationDisplay = document.getElementById('location-display');
const historyLength = document.getElementById('history-length');
const stateDisplay = document.getElementById('state-display');

const btnGoAbout = document.getElementById('btn-go-about');
const btnReplaceSettings = document.getElementById('btn-replace-settings');
const btnBack = document.getElementById('btn-back');
const btnForward = document.getElementById('btn-forward');

const stateInput = document.getElementById('state-input');
const pathInput = document.getElementById('path-input');
const btnPushState = document.getElementById('btn-push-state');

const btnClearConsole = document.getElementById('clear-console');

console.log('Demo initializing. current location:', location.pathname, location.search, location.hash);
console.log('Initial history.length:', history.length);
console.log('Initial history.state:', history.state);

// ROUTES: map path to render function/content
const routes = {
  '/': () => '<h2>Home</h2><p>Welcome — this is the home view.</p>',
  '/about': () => '<h2>About</h2><p>We are demonstrating the History API (pushState/replaceState/popstate).</p>',
  '/users': (state) => `<h2>Users</h2><p>Users view. State: ${escapeHtml(String(state ?? 'none'))}</p>`,
  '/settings': () => '<h2>Settings</h2><p>Configure things here.</p>',
};

// Simple HTML escape for demo
function escapeHtml(s) {
  return (s + '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

// Render content based on current location and history.state
function render() {
  const path = location.pathname || '/';
  const state = history.state;
  console.log('[render] location.pathname =', path, 'history.state =', state);

  // Choose a route renderer or show 404
  const renderer = routes[path];
  if (renderer) {
    view.innerHTML = renderer(state && state._demoState ? state._demoState : state);
  } else {
    view.innerHTML = `<h2>404</h2><p>No route for <code>${escapeHtml(path)}</code></p>`;
  }

  // Update active link UI
  for (const a of links) {
    const isActive = a.getAttribute('href') === path;
    a.classList.toggle('active', isActive);
  }

  // Update inspector UI
  locationDisplay.textContent = location.pathname + location.search + location.hash;
  historyLength.textContent = String(history.length);
  stateDisplay.textContent = JSON.stringify(history.state, null, 2);
}

// Navigation helper
function navigate(path, state = null, replace = false) {
  console.log(`[navigate] path=${path} replace=${replace} state=`, state);
  const wrappedState = state !== null ? { _demoState: state } : null;

  try {
    if (replace) {
      history.replaceState(wrappedState, '', path);
      console.log('[navigate] called history.replaceState');
    } else {
      history.pushState(wrappedState, '', path);
      console.log('[navigate] called history.pushState');
    }
  } catch (err) {
    console.error('[navigate] push/replace failed (maybe invalid URL):', err);
  }

  // After pushing/replacing state, render the view for the new path
  render();
}

// Handle clicks on nav links: delegation for anchors with data-link
document.addEventListener('click', (ev) => {
  const a = ev.target.closest('a[data-link]');
  if (!a) return;
  // If user used modifier keys, let browser handle (open new tab etc)
  if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) {
    console.log('[click] modifier key pressed — let browser handle native navigation');
    return;
  }

  ev.preventDefault();
  const path = a.getAttribute('href');
  console.log('[click] intercepting link to', path);
  navigate(path, { from: 'link', href: path }, false);
});

// Popstate: fired when user presses back/forward or when history.back()/forward() moves
window.addEventListener('popstate', (ev) => {
  console.log('[popstate] event fired. event.state =', ev.state);
  // ev.state is the state object passed to pushState/replaceState (or null)
  render();
});

// Programmatic buttons
btnGoAbout.addEventListener('click', () => {
  console.log('[btnGoAbout] push to /about');
  navigate('/about', { from: 'button-go-about' }, false);
});

btnReplaceSettings.addEventListener('click', () => {
  console.log('[btnReplaceSettings] replace to /settings');
  navigate('/settings', { replaced: true }, true);
});

btnBack.addEventListener('click', () => {
  console.log('[btnBack] history.back() called');
  history.back();
});

btnForward.addEventListener('click', () => {
  console.log('[btnForward] history.forward() called');
  history.forward();
});

btnPushState.addEventListener('click', () => {
  const path = pathInput.value.trim() || '/';
  const s = stateInput.value.trim() || null;
  console.log('[btnPushState] pushing', path, 'with state:', s);
  navigate(path, s, false);
});

// Clear console logs quickly (for convenience while learning)
btnClearConsole.addEventListener('click', () => {
  console.clear();
  console.log('Console cleared by user.');
});

// Initialize view based on current location when loading the page
render();

// Extra: demonstrate replaceState on load to attach an initial state (optional)
if (!history.state) {
  console.log('[init] attaching initial replaceState to record start timestamp');
  history.replaceState({ _demoState: 'initial', createdAt: Date.now() }, '', location.pathname);
  render();
}

/*
  Notes for learning:
  - history.pushState(state, title, url) adds a new entry to the session history stack.
  - history.replaceState(state, title, url) modifies the current entry.
  - popstate event fires when navigating via back/forward (or calling history.back()/forward()).
  - location.pathname reflects the address bar path; SPA routers map paths to UI views.
  - Always provide real hrefs on anchor tags so links work without JS.
  - Some servers must be configured to serve index.html for all routes to support SPA navigation.
*/