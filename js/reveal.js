// Scroll-in reveals. Sections marked [data-reveal] hide their direct children
// until they scroll into view, then stagger them in with .rise.
document.documentElement.classList.add('has-reveal');

var blocks = document.querySelectorAll('[data-reveal]');

if (!window.IntersectionObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.remove('has-reveal');
} else {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      e.target.classList.add('revealed'); // diagrams draw their accent path off this
      Array.prototype.forEach.call(e.target.children, function (child, i) {
        child.style.animationDelay = (i * 0.08) + 's';
        child.classList.add('rise');
      });
    });
  }, { threshold: 0.12 });

  blocks.forEach(function (b) { io.observe(b); });
}
