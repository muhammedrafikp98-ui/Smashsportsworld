/* ============================================================
   main.js  —  Smash Badminton Store  —  Shared Utilities
   Include on every page: <script src="js/main.js"></script>
   ============================================================ */

/* ── THEME TOGGLE ── */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon  = document.getElementById('modeIcon');
  const label = document.getElementById('modeLabel');
  if (icon)  icon.textContent  = isDark ? '☀️' : '🌙';
  if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
  localStorage.setItem('smash-theme', isDark ? 'light' : 'dark');
}

/* Restore saved theme on load */
(function () {
  const saved = localStorage.getItem('smash-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const icon  = document.getElementById('modeIcon');
    const label = document.getElementById('modeLabel');
    if (icon)  icon.textContent  = saved === 'light' ? '☀️' : '🌙';
    if (label) label.textContent = saved === 'light' ? 'Light mode' : 'Dark mode';
  }
})();

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ── MOBILE NAV ── */
function openMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) { nav.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) { nav.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ── CART COUNT (localStorage) ── */
function getCartCount() {
  return parseInt(localStorage.getItem('smash-cart-count') || '0');
}
function setCartCount(n) {
  localStorage.setItem('smash-cart-count', n);
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = n;
}
function addToCartCount() {
  setCartCount(getCartCount() + 1);
}

/* Sync cart badge on page load */
(function () {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = getCartCount();
})();

/* ── RACKET SVG (used across pages) ── */
function racketSVG(color, opacity) {
  color   = color   || 'var(--text)';
  opacity = opacity !== undefined ? opacity : 0.7;
  return `<svg style="width:52px;color:${color};opacity:${opacity}" viewBox="0 0 100 220" fill="none">
    <ellipse cx="50" cy="55" rx="34" ry="44" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <ellipse cx="50" cy="55" rx="22" ry="32" fill="none" stroke="currentColor" stroke-width=".8" opacity=".3"/>
    <line x1="50" y1="16" x2="50" y2="94" stroke="currentColor" stroke-width=".8" opacity=".25"/>
    <line x1="18" y1="45" x2="82" y2="45" stroke="currentColor" stroke-width=".8" opacity=".25"/>
    <line x1="18" y1="62" x2="82" y2="62" stroke="currentColor" stroke-width=".8" opacity=".25"/>
    <rect x="44" y="97" width="12" height="70" rx="3" fill="currentColor" opacity=".6"/>
    <rect x="45" y="158" width="10" height="28" rx="3" fill="currentColor" opacity=".4"/>
    <ellipse cx="50" cy="190" rx="7" ry="4.5" fill="currentColor" opacity=".35"/>
  </svg>`;
}

/* ── PRICE FORMATTER ── */
function fmt(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}