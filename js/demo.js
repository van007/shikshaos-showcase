// Mock "generate a quiz" theater. Canned data, zero network calls — the real
// product reads the school's own textbooks.
(function () {
  var DEMO = {
    hi: {
      title: 'जल चक्र',
      meta: 'कक्षा 5 · हिंदी · पाठ 3',
      script: 'Devanagari detected → Hindi',
      q: [
        { q: 'जल किन तीन अवस्थाओं में पाया जाता है?', o: ['ठोस, द्रव और गैस', 'केवल द्रव', 'ठोस और गैस', 'केवल गैस'], a: 0 },
        { q: 'सूर्य की गर्मी से जल के वाष्प में बदलने की क्रिया क्या कहलाती है?', o: ['वाष्पीकरण', 'संघनन', 'वर्षण', 'अवशोषण'], a: 0 },
        { q: 'बादलों में जलवाष्प ठंडी होकर बूँदों में बदल जाती है। इसे क्या कहते हैं?', o: ['संघनन', 'वाष्पीकरण', 'पिघलना', 'जमना'], a: 0 }
      ]
    },
    en: {
      title: 'The Water Cycle',
      meta: 'Class 5 · English · Chapter 3',
      script: 'Latin detected → English',
      q: [
        { q: 'In which three states is water found on Earth?', o: ['Solid, liquid and gas', 'Liquid only', 'Solid and gas', 'Gas only'], a: 0 },
        { q: 'What is the process called when the sun’s heat turns water into vapour?', o: ['Evaporation', 'Condensation', 'Precipitation', 'Absorption'], a: 0 },
        { q: 'Water vapour cools in the clouds and turns into tiny droplets. What is this called?', o: ['Condensation', 'Evaporation', 'Melting', 'Freezing'], a: 0 }
      ]
    },
    mr: {
      title: 'जलचक्र',
      meta: 'इयत्ता 5 · मराठी · पाठ 3',
      script: 'Devanagari detected → Marathi',
      q: [
        { q: 'पाणी कोणत्या तीन अवस्थांमध्ये आढळते?', o: ['घन, द्रव आणि वायू', 'फक्त द्रव', 'घन आणि वायू', 'फक्त वायू'], a: 0 },
        { q: 'सूर्याच्या उष्णतेने पाण्याची वाफ होण्याच्या क्रियेला काय म्हणतात?', o: ['बाष्पीभवन', 'सांद्रीभवन', 'पर्जन्य', 'शोषण'], a: 0 },
        { q: 'ढगांतील वाफ थंड होऊन थेंबांमध्ये बदलते. याला काय म्हणतात?', o: ['सांद्रीभवन', 'बाष्पीभवन', 'वितळणे', 'गोठणे'], a: 0 }
      ]
    }
  };

  var out = document.getElementById('demoOut');
  var runBtn = document.getElementById('demoRun');
  var ansBtn = document.getElementById('demoAns');
  var chips = document.querySelectorAll('#demoChips button');
  var current = 'hi';
  var timer;

  var KEYS = ['A', 'B', 'C', 'D'];

  function esc(s) {
    return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
  }

  function reset() {
    clearTimeout(timer);
    out.innerHTML = '';
    out.classList.remove('show-ans');
    ansBtn.hidden = true;
    ansBtn.textContent = 'Show answers';
  }

  function render() {
    var d = DEMO[current];
    out.lang = current; // so screen readers switch voice for Devanagari output
    out.innerHTML =
      '<div class="demo-head"><span class="t">' + esc(d.title) + '</span>' +
      '<span class="tag"><span class="dot"></span>' + esc(d.meta) + '</span>' +
      '<span class="tag"><span class="dot"></span>' + esc(d.script) + '</span></div>' +
      d.q.map(function (it, i) {
        return '<div class="q"><p class="qt"><span class="qn">' + (i + 1 < 10 ? '0' : '') + (i + 1) +
          '</span><span>' + esc(it.q) + '</span></p><ol>' +
          it.o.map(function (o, j) {
            return '<li class="' + (j === it.a ? 'right' : '') + '"><span class="k">' + KEYS[j] + '</span>' + esc(o) + '</li>';
          }).join('') + '</ol></div>';
      }).join('');
    ansBtn.hidden = false;
  }

  function run() {
    reset();
    out.innerHTML = '<div class="sk-row">' +
      '<div class="skeleton sk" style="width:45%"></div>' +
      '<div class="skeleton sk" style="width:88%;margin-top:1rem"></div>' +
      '<div class="skeleton sk" style="width:62%"></div>' +
      '<div class="skeleton sk" style="width:70%;margin-top:1rem"></div>' +
      '<div class="skeleton sk" style="width:52%"></div></div>';
    runBtn.disabled = true;
    timer = setTimeout(function () { runBtn.disabled = false; render(); }, 900);
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      current = c.dataset.lang;
      chips.forEach(function (o) { o.setAttribute('aria-pressed', String(o === c)); });
      reset();
    });
  });

  runBtn.addEventListener('click', run);
  ansBtn.addEventListener('click', function () {
    var on = out.classList.toggle('show-ans');
    ansBtn.textContent = on ? 'Hide answers' : 'Show answers';
  });
})();
