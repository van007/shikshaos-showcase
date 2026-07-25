// Mobile nav. Below 860px the header links collapse into a hamburger panel;
// above that .nav is visible and none of this fires.
var navHeader = document.querySelector('.site-header');
var navToggle = document.getElementById('navToggle');
var navPanel = document.getElementById('mobileNav');

function navIsOpen() { return navHeader.hasAttribute('data-nav-open'); }

function navSetOpen(open) {
  if (open) { navHeader.setAttribute('data-nav-open', ''); }
  else { navHeader.removeAttribute('data-nav-open'); }
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

navToggle.addEventListener('click', function () { navSetOpen(!navIsOpen()); });

// A tapped link scrolls to its section and closes the panel behind it.
navPanel.addEventListener('click', function (e) {
  if (e.target.closest('a')) navSetOpen(false);
});

// Tap anywhere off the header to dismiss. The toggle's own click lands inside
// the header, so it never double-fires against the handler above.
document.addEventListener('click', function (e) {
  if (navIsOpen() && !navHeader.contains(e.target)) navSetOpen(false);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && navIsOpen()) { navSetOpen(false); navToggle.focus(); }
});

// Rotating to landscape past the breakpoint would otherwise leave the panel
// open and stranded under the desktop nav.
var navWide = matchMedia('(min-width: 860px)');
navWide.addEventListener('change', function (e) { if (e.matches) navSetOpen(false); });
