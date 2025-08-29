// script/darkmode.js
const STORAGE_KEY = 'theme'; // 'dark' | 'light' | null (system)
const themeSwitch = document.getElementById('theme-switch');
const docEl = document.documentElement;
const mql = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(mode) {
  const dark = mode === 'dark' || (mode == null && mql.matches);
  docEl.classList.toggle('darkmode', dark);
  if (themeSwitch) themeSwitch.setAttribute('aria-pressed', String(dark));
}

// Initialize
let saved = localStorage.getItem(STORAGE_KEY); // null => follow system
applyTheme(saved);

// If user hasn’t chosen (saved == null), follow OS changes live
if (mql.addEventListener) {
  mql.addEventListener('change', () => { if (saved == null) applyTheme(saved); });
} else if (mql.addListener) {
  // Safari / older
  mql.addListener(() => { if (saved == null) applyTheme(saved); });
}

// Click toggles between explicit light/dark (overrides system)
themeSwitch?.addEventListener('click', () => {
  const isDark = docEl.classList.contains('darkmode');
  saved = isDark ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY, saved);
  applyTheme(saved);
});

// OPTIONAL: expose a way to reset to system (e.g., double-click)
themeSwitch?.addEventListener('dblclick', () => {
  saved = null;
  localStorage.removeItem(STORAGE_KEY);
  applyTheme(saved);
});
