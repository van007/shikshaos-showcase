// Theme toggle. The pre-paint resolver lives inline in <head> — it has to run
// before first paint, which a deferred external script can't do.
document.getElementById('themeToggle').addEventListener('click', function () {
  var el = document.documentElement;
  var next = el.dataset.theme === 'light' ? 'dark' : 'light';
  var go = function () { el.dataset.theme = next; try { localStorage.setItem('theme', next); } catch (_) {} };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  (document.startViewTransition && !reduce) ? document.startViewTransition(go) : go();
});
