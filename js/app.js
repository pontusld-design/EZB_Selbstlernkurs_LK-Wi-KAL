/* =====================================================================
   EZB und Geldpolitik – Selbstlernkurs: App-Logik
   Navigation, Fortschritt, Quiz-Engine, Feedback, Glossar, Druckansicht, Export/Import.
   Keine externen Abhängigkeiten.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------- Einstellungen für die Lehrkraft ---------------- */
  var STRICT_ORDER = true;          // true: Modul n+1 erst nach bestandenem Quiz von Modul n
  var GESAMTQUIZ_STRICT = true;     // true: Gesamtquiz erst nach allen Modulquizzen
  var BESTANDEN = 60;               // Prozent, ab denen ein Quiz als bestanden gilt (schaltet nächstes Modul frei)
  var STUFE_GUT = 85;               // ab hier: „Prima, alles verstanden“
  var STUFE_MITTEL = 60;            // ab hier: „Schon ganz gut“; darunter: „Wiederholung lohnt sich“
  var QUIZ_FRAGEN_STANDARD = 6;     // Fragen pro Modulquiz, falls im Modul nicht festgelegt
  var GESAMTQUIZ_FRAGEN = 12;       // Fragen im Gesamtquiz (je 1 aus jedem Modulpool, Rest aus content/gesamtquiz.js)
  var ANZAHL_MODULE = 6;
  var STORAGE_KEY = "ezb-kurs-fortschritt-v1";
  var THEME_KEY = "ezb-kurs-theme";
  var EXPORT_PREFIX = "EZB1-";

  var MODULE = window.KURS_MODULE || {};
  var app = document.getElementById("app");

  /* ---------------- Hilfsfunktionen ---------------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  // Mini-Markup: **fett**, *kursiv*, [Text](https://...) oder [Text](#/...), \n
  function fmt(s) {
    var t = esc(s == null ? "" : s);
    t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    t = t.replace(/\[([^\]]+)\]\((#\/[^\s)]*)\)/g, '<a href="$2">$1</a>');
    t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return t.replace(/\n/g, "<br>");
  }
  function h(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") e.className = v;
        else if (k === "html") e.innerHTML = v;
        else if (k === "text") e.textContent = v;
        else if (k.indexOf("on") === 0) e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? "" : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  }
  function add(parent, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { add(parent, x); });
    else if (typeof c === "string" || typeof c === "number") parent.appendChild(document.createTextNode(c));
    else parent.appendChild(c);
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pct(p, n) { return n > 0 ? Math.round((p / n) * 100) : 0; }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }); } catch (e) { return ""; }
  }
  function toast(msg) {
    var t = h("div", { class: "toast", role: "status", text: msg });
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2600);
  }
  var uidCounter = 0;

  /* ---------------- Speicher (localStorage, mit Fallback) ---------------- */
  var storageOK = true;
  function defaultState() { return { v: 1, name: "", abschnitte: {}, quiz: {}, gesamt: null, besuch: {} }; }
  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.v === 1) return Object.assign(defaultState(), o);
      }
    } catch (e) { storageOK = false; }
    return defaultState();
  }
  var S = loadState();
  function save() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(S)); }
    catch (e) { storageOK = false; }
  }
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* ignorieren */ } }

  /* ---------------- Darstellung (hell/dunkel) ---------------- */
  var THEMES = ["auto", "light", "dark"];
  var THEME_LABEL = { auto: "automatisch", light: "hell", dark: "dunkel" };
  var theme = lsGet(THEME_KEY) || "auto";
  function applyTheme() {
    if (theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    var b = document.getElementById("themeBtn");
    if (b) b.textContent = "Darstellung: " + THEME_LABEL[theme];
  }
  document.getElementById("themeBtn").addEventListener("click", function () {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    lsSet(THEME_KEY, theme);
    applyTheme();
  });
  applyTheme();

  /* ---------------- Modul-Zugriff & Fortschritt ---------------- */
  function mod(n) { return MODULE[n] || null; }
  function hasContent(n) { var m = mod(n); return !!(m && !m.inhaltFehlt && m.abschnitte); }
  function moduleIds() { var a = []; for (var i = 1; i <= ANZAHL_MODULE; i++) a.push(i); return a; }
  function secDone(n, id) { return !!(S.abschnitte[n] && S.abschnitte[n][id]); }
  function setSecDone(n, id) {
    S.abschnitte[n] = S.abschnitte[n] || {};
    if (!S.abschnitte[n][id]) { S.abschnitte[n][id] = true; save(); }
  }
  function bestPct(n) { var q = S.quiz[n]; return q && q.best ? q.best.pct : null; }
  function passed(n) { var b = bestPct(n); return b !== null && b >= BESTANDEN; }
  function moduleProgress(n) {
    if (!hasContent(n)) return 0;
    var m = mod(n), total = m.abschnitte.length + 1, done = 0;
    m.abschnitte.forEach(function (a) { if (secDone(n, a.id)) done++; });
    if (passed(n)) done++;
    return Math.round((done / total) * 100);
  }
  function moduleStatus(n) {
    if (!hasContent(n)) return "folgt";
    if (passed(n)) return "bestanden";
    if (moduleProgress(n) > 0 || (S.quiz[n] && S.quiz[n].versuche)) return "bearbeitung";
    return "neu";
  }
  function isLocked(n) { return STRICT_ORDER && n > 1 && !passed(n - 1); }
  function allQuizzesDone() {
    return moduleIds().every(function (n) { return hasContent(n) && passed(n); });
  }
  function gesamtLocked() { return GESAMTQUIZ_STRICT && !allQuizzesDone(); }
  function gesamtAvailable() { return !!(window.KURS_GESAMT && !window.KURS_GESAMT.inhaltFehlt); }
  function overallProgress() {
    var sum = 0;
    moduleIds().forEach(function (n) { sum += moduleProgress(n); });
    var g = S.gesamt && S.gesamt.best && S.gesamt.best.pct >= BESTANDEN ? 100 : 0;
    return Math.round((sum + g) / (ANZAHL_MODULE + 1));
  }
  function thema(n, id) {
    var m = mod(n);
    if (!m || !m.abschnitte) return null;
    for (var i = 0; i < m.abschnitte.length; i++) if (m.abschnitte[i].id === id) return m.abschnitte[i];
    return null;
  }
  function bar(p, thin) {
    return h("div", { class: "bar" + (thin ? " thin" : ""), role: "progressbar", "aria-valuenow": p, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": p + " Prozent" },
      h("span", { style: "width:" + p + "%" }));
  }

  /* ====================================================================
     FRAGETYPEN
     Jeder Typ liefert { node, answered(), grade(), solution() }
     grade() markiert die Antworten und gibt einen Wert von 0 bis 1 zurück.
     ==================================================================== */
  var TYPES = {};

  function optLabel(inputEl, text) {
    return h("label", { class: "opt" }, inputEl, h("span", { html: fmt(text) }));
  }

  TYPES.single = function (q, uid) {
    var order = shuffle(q.optionen.map(function (t, i) { return { t: t, i: i }; }));
    var fs = h("fieldset", null, h("legend", { html: fmt(q.frage) }));
    var items = order.map(function (o) {
      var inp = h("input", { type: "radio", name: uid, value: o.i });
      var lab = optLabel(inp, o.t);
      fs.appendChild(lab);
      return { o: o, inp: inp, lab: lab };
    });
    return {
      node: fs,
      answered: function () { return items.some(function (x) { return x.inp.checked; }); },
      grade: function () {
        var ok = false;
        items.forEach(function (x) {
          x.inp.disabled = true;
          if (x.o.i === q.richtig) { x.lab.classList.add("right"); if (x.inp.checked) ok = true; }
          else if (x.inp.checked) x.lab.classList.add("wrong");
        });
        return ok ? 1 : 0;
      },
      solution: function () { return null; }
    };
  };

  TYPES.multiple = function (q, uid) {
    var order = shuffle(q.optionen.map(function (t, i) { return { t: t, i: i }; }));
    var fs = h("fieldset", null, h("legend", { html: fmt(q.frage) }), h("p", { class: "muted", text: "Mehrere Antworten können richtig sein." }));
    var items = order.map(function (o) {
      var inp = h("input", { type: "checkbox", name: uid, value: o.i });
      var lab = optLabel(inp, o.t);
      fs.appendChild(lab);
      return { o: o, inp: inp, lab: lab };
    });
    return {
      node: fs,
      answered: function () { return items.some(function (x) { return x.inp.checked; }); },
      grade: function () {
        var good = 0, bad = 0;
        items.forEach(function (x) {
          var isRight = q.richtig.indexOf(x.o.i) >= 0;
          x.inp.disabled = true;
          if (isRight) { x.lab.classList.add("right"); if (x.inp.checked) good++; }
          else if (x.inp.checked) { x.lab.classList.add("wrong"); bad++; }
        });
        return Math.max(0, (good - bad) / q.richtig.length);
      },
      solution: function () { return null; }
    };
  };

  TYPES.zuordnung = function (q, uid) {
    var rights = shuffle(q.paare.map(function (p) { return p[1]; }));
    var fs = h("fieldset", null, h("legend", { html: fmt(q.frage) }));
    var wrap = h("div", { class: "pairs" });
    var rows = shuffle(q.paare.map(function (p, i) { return { l: p[0], r: p[1], i: i }; })).map(function (p, k) {
      var sel = h("select", { id: uid + "-s" + k, "aria-label": "Zuordnung zu: " + p.l });
      sel.appendChild(h("option", { value: "", text: "– bitte wählen –" }));
      rights.forEach(function (r, ri) { sel.appendChild(h("option", { value: r, text: r })); });
      var note = h("div", { class: "muted", style: "font-size:.9rem" });
      wrap.appendChild(h("div", { class: "pair" }, h("label", { for: uid + "-s" + k, html: fmt(p.l) }), h("div", null, sel, note)));
      return { p: p, sel: sel, note: note };
    });
    fs.appendChild(wrap);
    return {
      node: fs,
      answered: function () { return rows.every(function (r) { return r.sel.value !== ""; }); },
      grade: function () {
        var ok = 0;
        rows.forEach(function (r) {
          r.sel.disabled = true;
          if (r.sel.value === r.p.r) { r.sel.classList.add("right"); ok++; }
          else { r.sel.classList.add("wrong"); r.note.textContent = "Richtig: " + r.p.r; }
        });
        return ok / rows.length;
      },
      solution: function () { return null; }
    };
  };

  TYPES.reihenfolge = function (q, uid) {
    var correct = q.schritte.slice();
    var items = shuffle(correct);
    var guard = 0;
    while (guard++ < 20 && items.every(function (x, i) { return x === correct[i]; })) items = shuffle(correct);
    var fs = h("fieldset", null, h("legend", { html: fmt(q.frage) }), h("p", { class: "muted", text: "Ordne mit den Pfeil-Schaltflächen: oberster Eintrag = erster Schritt." }));
    var ul = h("ol", { class: "ord" });
    fs.appendChild(ul);
    var locked = false, marks = null;
    function draw(focusIdx, focusDir) {
      ul.innerHTML = "";
      items.forEach(function (t, i) {
        var li = h("li", null, h("span", { class: "txt", html: fmt(t) }));
        if (!locked) {
          li.appendChild(h("button", { type: "button", "data-i": i, "data-d": "up", "aria-label": "Nach oben: " + t, disabled: i === 0, text: "▲", onclick: function () { move(i, -1, "up"); } }));
          li.appendChild(h("button", { type: "button", "data-i": i, "data-d": "down", "aria-label": "Nach unten: " + t, disabled: i === items.length - 1, text: "▼", onclick: function () { move(i, 1, "down"); } }));
        }
        if (marks) li.classList.add(marks[i] ? "right" : "wrong");
        ul.appendChild(li);
      });
      if (focusIdx != null) {
        var b = ul.querySelector('[data-i="' + focusIdx + '"][data-d="' + focusDir + '"]');
        if (b && !b.disabled) b.focus();
        else { var alt = ul.querySelector('[data-i="' + focusIdx + '"]:not([disabled])'); if (alt) alt.focus(); }
      }
    }
    function move(i, d, dir) {
      var j = i + d;
      if (j < 0 || j >= items.length) return;
      var t = items[i]; items[i] = items[j]; items[j] = t;
      draw(j, dir);
    }
    draw();
    return {
      node: fs,
      answered: function () { return true; },
      grade: function () {
        locked = true;
        marks = items.map(function (t, i) { return t === correct[i]; });
        draw();
        var ok = marks.filter(Boolean).length;
        if (ok < items.length) {
          fs.appendChild(h("div", { class: "muted" }, h("strong", { text: "Richtige Reihenfolge:" }),
            h("ol", null, correct.map(function (t) { return h("li", { html: fmt(t) }); }))));
        }
        return ok === items.length ? 1 : ok / items.length;
      },
      solution: function () { return null; }
    };
  };

  TYPES.lueckentext = function (q, uid) {
    var fs = h("fieldset", null, h("legend", { html: fmt(q.frage) }));
    var p = h("p", { class: "lueck" });
    var sels = [];
    q.text.split(/(\{\d+\})/).forEach(function (part) {
      var m = part.match(/^\{(\d+)\}$/);
      if (!m) { p.appendChild(h("span", { html: fmt(part) })); return; }
      var idx = parseInt(m[1], 10) - 1;
      var l = q.luecken[idx];
      var sel = h("select", { "aria-label": "Lücke " + (idx + 1) });
      sel.appendChild(h("option", { value: "", text: "– wählen –" }));
      shuffle(l.optionen.map(function (t, i) { return { t: t, i: i }; })).forEach(function (o) {
        sel.appendChild(h("option", { value: o.i, text: o.t }));
      });
      sels.push({ sel: sel, l: l });
      p.appendChild(sel);
    });
    fs.appendChild(p);
    return {
      node: fs,
      answered: function () { return sels.every(function (s) { return s.sel.value !== ""; }); },
      grade: function () {
        var ok = 0;
        sels.forEach(function (s) {
          s.sel.disabled = true;
          if (parseInt(s.sel.value, 10) === s.l.richtig) { s.sel.classList.add("right"); ok++; }
          else s.sel.classList.add("wrong");
        });
        if (ok < sels.length) {
          var sol = q.text.replace(/\{(\d+)\}/g, function (m0, n) { var l = q.luecken[parseInt(n, 10) - 1]; return "[" + l.optionen[l.richtig] + "]"; });
          fs.appendChild(h("p", { class: "muted", html: "<strong>Richtig:</strong> " + fmt(sol) }));
        }
        return ok / sels.length;
      },
      solution: function () { return null; }
    };
  };

  TYPES.richtigfalsch = function (q, uid) {
    var fs = h("fieldset", null, h("legend", { text: "Beurteile die Aussage und wähle die passende Begründung." }),
      h("p", { html: "<strong>Aussage:</strong> " + fmt(q.aussage) }));
    var rf = [{ v: true, t: "Die Aussage ist richtig." }, { v: false, t: "Die Aussage ist falsch." }].map(function (o) {
      var inp = h("input", { type: "radio", name: uid + "-rf", value: String(o.v) });
      var lab = optLabel(inp, o.t);
      fs.appendChild(lab);
      return { o: o, inp: inp, lab: lab };
    });
    fs.appendChild(h("p", { style: "margin-bottom:0" }, h("strong", { text: "Begründung:" })));
    var bg = shuffle(q.begruendungen.map(function (t, i) { return { t: t, i: i }; })).map(function (o) {
      var inp = h("input", { type: "radio", name: uid + "-bg", value: o.i });
      var lab = optLabel(inp, o.t);
      fs.appendChild(lab);
      return { o: o, inp: inp, lab: lab };
    });
    return {
      node: fs,
      answered: function () {
        return rf.some(function (x) { return x.inp.checked; }) && bg.some(function (x) { return x.inp.checked; });
      },
      grade: function () {
        var s = 0;
        rf.forEach(function (x) {
          x.inp.disabled = true;
          if (x.o.v === q.richtig) { x.lab.classList.add("right"); if (x.inp.checked) s += 0.5; }
          else if (x.inp.checked) x.lab.classList.add("wrong");
        });
        bg.forEach(function (x) {
          x.inp.disabled = true;
          if (x.o.i === q.richtigeBegruendung) { x.lab.classList.add("right"); if (x.inp.checked) s += 0.5; }
          else if (x.inp.checked) x.lab.classList.add("wrong");
        });
        return s;
      },
      solution: function () { return null; }
    };
  };

  /* Rendert eine Frage. opts: { check:boolean, meta:string, onResult(score) } */
  function renderQuestion(q, opts) {
    opts = opts || {};
    var uid = "q" + (++uidCounter);
    var impl = TYPES[q.typ];
    var box = h("div", { class: "q" + (opts.check ? " check" : "") });
    if (!impl) { box.textContent = "Unbekannter Fragetyp: " + q.typ; return box; }
    var ctx = impl.call(null, q, uid);
    if (opts.meta) box.appendChild(h("div", { class: "qmeta", text: opts.meta }));
    else if (opts.check) box.appendChild(h("div", { class: "qmeta", text: "Check dich" }));
    box.appendChild(ctx.node);
    var fb = h("div", { "aria-live": "polite" });
    var btn = h("button", { type: "button", class: "btn", text: "Antwort prüfen" });
    var row = h("div", { class: "row", style: "margin-top:.8rem" }, btn);
    box.appendChild(row);
    box.appendChild(fb);
    btn.addEventListener("click", function () {
      if (!ctx.answered()) {
        fb.innerHTML = "";
        fb.appendChild(h("div", { class: "fb part", text: "Bitte beantworte die Frage vollständig, bevor du prüfst." }));
        return;
      }
      var score = ctx.grade();
      btn.remove();
      var cls = score >= 0.999 ? "ok" : score > 0 ? "part" : "bad";
      var head = score >= 0.999 ? "Richtig!" : score > 0 ? "Teilweise richtig." : "Leider nicht richtig.";
      fb.innerHTML = "";
      fb.appendChild(h("div", { class: "fb " + cls },
        h("div", { class: "fbtitle", text: head }),
        h("div", { html: fmt(q.erklaerung || "") })));
      if (opts.check) {
        row.appendChild(h("button", { type: "button", class: "btn sec", text: "Noch einmal versuchen", onclick: function () {
          var fresh = renderQuestion(q, opts);
          box.parentNode.replaceChild(fresh, box);
        } }));
      }
      if (opts.onResult) opts.onResult(score, box);
    });
    return box;
  }

  /* ====================================================================
     QUIZ-ENGINE
     ==================================================================== */
  function drawQuestions(pool, n) {
    var byThema = {};
    pool.forEach(function (q) { (byThema[q.thema] = byThema[q.thema] || []).push(q); });
    var chosen = [];
    Object.keys(byThema).forEach(function (t) { chosen.push(shuffle(byThema[t])[0]); });
    var rest = shuffle(pool.filter(function (q) { return chosen.indexOf(q) < 0; }));
    while (chosen.length < n && rest.length) chosen.push(rest.shift());
    return shuffle(chosen).slice(0, Math.max(n, 0) || chosen.length);
  }

  // answers: [{q, score}] -> { pct, themen:{id:{p,n}} }
  function summarize(answers, keyFn) {
    var themen = {}, p = 0;
    answers.forEach(function (a) {
      var k = keyFn(a.q, a);
      themen[k] = themen[k] || { p: 0, n: 0 };
      themen[k].p += a.score;
      themen[k].n += 1;
      p += a.score;
    });
    Object.keys(themen).forEach(function (k) { themen[k].p = Math.round(themen[k].p * 100) / 100; });
    return { pct: pct(p, answers.length), themen: themen, datum: new Date().toISOString(), n: answers.length };
  }

  function storeResult(slot, res) {
    var rec = slot || { versuche: 0 };
    rec.versuche = (rec.versuche || 0) + 1;
    rec.last = res;
    if (!rec.best || res.pct >= rec.best.pct) rec.best = res;
    return rec;
  }

  function runModuleQuiz(n, host) {
    var m = mod(n);
    var count = m.quizFragen || QUIZ_FRAGEN_STANDARD;
    var qs = drawQuestions(m.pool, count);
    var answers = [];
    var i = 0;
    function show() {
      host.innerHTML = "";
      var q = qs[i];
      host.appendChild(h("h2", { id: "qh", tabindex: "-1", text: "Frage " + (i + 1) + " von " + qs.length }));
      host.appendChild(bar(Math.round((i / qs.length) * 100), true));
      var done = false;
      var box = renderQuestion(q, {
        meta: "Modulquiz Modul " + n,
        onResult: function (score) {
          if (done) return;
          done = true;
          answers.push({ q: q, score: score });
          var last = i === qs.length - 1;
          box.appendChild(h("div", { class: "row", style: "margin-top:.8rem" },
            h("button", { type: "button", class: "btn", id: "nextQ", text: last ? "Auswertung anzeigen" : "Weiter", onclick: function () {
              if (last) finish(); else { i++; show(); }
            } })));
          var nb = document.getElementById("nextQ"); if (nb) nb.focus();
        }
      });
      host.appendChild(box);
      var hh = document.getElementById("qh"); if (hh) hh.focus({ preventScroll: false });
    }
    function finish() {
      var res = summarize(answers, function (q) { return q.thema; });
      S.quiz[n] = storeResult(S.quiz[n], res);
      save();
      host.innerHTML = "";
      renderModuleResult(n, res, host, true);
    }
    show();
  }

  function level(p) { return p >= STUFE_GUT ? "gut" : p >= STUFE_MITTEL ? "mittel" : "schwach"; }

  function renderModuleResult(n, res, host, justFinished) {
    var m = mod(n);
    var ids = Object.keys(res.themen);
    // Reihenfolge der Abschnitte beibehalten
    var order = m.abschnitte.map(function (a) { return a.id; }).filter(function (id) { return ids.indexOf(id) >= 0; });
    var lvlAll = level(res.pct);
    var head = lvlAll === "gut" ? "Prima, du hast alles verstanden!" : lvlAll === "mittel" ? "Schon ganz gut!" : "Hier lohnt sich eine Wiederholung.";
    host.appendChild(h("h2", { id: "resh", tabindex: "-1", text: "Auswertung Modulquiz " + n }));
    host.appendChild(h("div", { class: "card" },
      h("p", { style: "font-size:1.3rem;margin:.2rem 0" }, h("strong", { text: res.pct + " %" }), " ", h("span", { class: "badge " + (res.pct >= BESTANDEN ? "ok" : "warn"), text: res.pct >= BESTANDEN ? "bestanden" : "noch nicht bestanden" })),
      bar(res.pct),
      h("p", { html: "<strong>" + esc(head) + "</strong>" })));

    var weak = [], mid = [];
    host.appendChild(h("h3", { text: "Ergebnis je Unterthema" }));
    var list = h("div", { class: "result-grid" });
    order.forEach(function (id) {
      var t = res.themen[id], p = pct(t.p, t.n), lv = level(p), a = thema(n, id);
      if (lv === "schwach") weak.push(id); else if (lv === "mittel") mid.push(id);
      list.appendChild(h("div", { class: "themarow" },
        h("a", { href: "#/m/" + n + "/" + id, text: a ? a.titel : id }),
        bar(p, true),
        h("span", { class: "badge " + (lv === "gut" ? "ok" : lv === "mittel" ? "warn" : ""), text: p + " %" })));
    });
    host.appendChild(h("div", { class: "card" }, list));

    var fb = h("div", { class: "card" });
    function links(arr) {
      var f = h("span");
      arr.forEach(function (id, k) {
        var a = thema(n, id);
        if (k) f.appendChild(document.createTextNode(k === arr.length - 1 ? " und " : ", "));
        f.appendChild(h("a", { href: "#/m/" + n + "/" + id, text: "„" + (a ? a.titel : id) + "“" }));
      });
      return f;
    }
    if (!weak.length && !mid.length) {
      fb.appendChild(h("p", { html: "<strong>Prima, du hast alles verstanden!</strong> In allen Unterthemen hast du mindestens " + STUFE_GUT + " % erreicht." }));
    }
    if (mid.length) {
      fb.appendChild(h("p", null, h("strong", { text: "Schon ganz gut! " }), "Schau dir aber das Thema ", links(mid), " noch einmal an."));
    }
    if (weak.length) {
      fb.appendChild(h("p", null, h("strong", { text: "Hier lohnt sich eine Wiederholung. " }),
        "Arbeite " + (weak.length > 1 ? "diese Abschnitte" : "diesen Abschnitt") + " noch einmal durch: ", links(weak), ". Danach kannst du einen neuen Quizversuch starten."));
    }
    host.appendChild(fb);

    var acts = h("div", { class: "row no-print" });
    acts.appendChild(h("a", { class: "btn" + (res.pct >= STUFE_GUT && !weak.length && !mid.length ? " sec" : ""), href: "#/m/" + n + "/quiz", onclick: function (e) {
      if (justFinished) { e.preventDefault(); host.innerHTML = ""; runModuleQuiz(n, host); }
    }, text: "Neuer Quizversuch" }));
    var next = n + 1;
    if (res.pct >= BESTANDEN) {
      if (next <= ANZAHL_MODULE) acts.appendChild(h("a", { class: "btn", href: "#/m/" + next, text: "Weiter zu Modul " + next + " →" }));
      else acts.appendChild(h("a", { class: "btn", href: "#/gesamtquiz", text: "Weiter zum Gesamtquiz →" }));
    } else {
      acts.appendChild(h("a", { class: "btn sec", href: "#/m/" + n, text: "Modul wiederholen" }));
    }
    host.appendChild(acts);
    if (res.pct < BESTANDEN && STRICT_ORDER && next <= ANZAHL_MODULE) {
      host.appendChild(h("p", { class: "muted", text: "Das nächste Modul wird empfohlen freigeschaltet, sobald du mindestens " + BESTANDEN + " % erreicht hast." }));
    }
    var hh = document.getElementById("resh"); if (hh) hh.focus();
  }

  /* ====================================================================
     VIEWS
     ==================================================================== */
  function setTitle(t) { document.title = t + " – EZB & Geldpolitik"; }
  function mount(node, focus) {
    app.innerHTML = "";
    app.appendChild(node);
    window.scrollTo(0, 0);
    var hd = app.querySelector("h1");
    if (hd && focus !== false) { hd.setAttribute("tabindex", "-1"); hd.focus({ preventScroll: true }); }
  }

  /* ---------- Startseite ---------- */
  function viewHome() {
    setTitle("Start");
    var root = h("div");
    root.appendChild(h("h1", { text: "EZB und Geldpolitik" }));
    root.appendChild(h("p", { html: "Willkommen" + (S.name ? ", <strong>" + esc(S.name) + "</strong>" : "") + "! In diesem Selbstlernkurs erarbeitest du in " + ANZAHL_MODULE + " kurzen Modulen, wie Geld entsteht, wie die Europäische Zentralbank arbeitet und wie ihre Entscheidungen wirken. Zu jedem Modul gibt es Erklärtexte, Schaubilder, kurze Verständnisfragen und ein Quiz mit persönlicher Rückmeldung." }));

    var nameInp = h("input", { type: "text", id: "nameInp", maxlength: "30", value: S.name || "", autocomplete: "off" });
    nameInp.addEventListener("input", function () { S.name = nameInp.value.trim(); save(); });
    root.appendChild(h("div", { class: "card" },
      h("label", { for: "nameInp" }, "Vorname oder Kürzel (optional, wird nur lokal in deinem Browser gespeichert und auf der Ergebnisseite angezeigt): "),
      h("div", { class: "row", style: "margin-top:.4rem" }, nameInp)));

    var op = overallProgress();
    var totalMin = 0;
    moduleIds().forEach(function (n) { if (mod(n) && mod(n).minuten) totalMin += mod(n).minuten; });
    if (totalMin) root.appendChild(h("p", { class: "muted", text: "Geplante Bearbeitungszeit insgesamt: ca. " + totalMin + " Minuten." }));
    root.appendChild(h("div", { class: "card" },
      h("div", { class: "row", style: "justify-content:space-between" }, h("strong", { text: "Gesamtfortschritt" }), h("strong", { text: op + " %" })),
      bar(op)));

    if (!storageOK) {
      root.appendChild(h("div", { class: "hinweis", html: "<strong>Hinweis:</strong> Dein Browser erlaubt kein dauerhaftes Speichern. Der Kurs funktioniert trotzdem, aber dein Fortschritt geht beim Schließen verloren – sichere ihn unter <a href='#/sichern'>Fortschritt sichern</a>." }));
    }

    root.appendChild(h("h2", { text: "Dein Lernpfad" }));
    var ol = h("ol", { class: "path", "aria-label": "Module" });
    moduleIds().forEach(function (n) {
      var m = mod(n), st = moduleStatus(n), locked = isLocked(n) && st !== "folgt";
      var pr = moduleProgress(n);
      var badge = st === "bestanden" ? h("span", { class: "badge ok", text: "Quiz bestanden" + (bestPct(n) != null ? " (" + bestPct(n) + " %)" : "") })
        : st === "bearbeitung" ? h("span", { class: "badge warn", text: "in Bearbeitung" })
        : st === "folgt" ? h("span", { class: "badge", text: "Inhalt folgt" })
        : locked ? h("span", { class: "badge", text: "empfohlen nach Quiz Modul " + (n - 1) })
        : h("span", { class: "badge", text: "nicht begonnen" });
      var li = h("li", { class: st === "bestanden" ? "done" : st === "bearbeitung" ? "prog" : locked ? "locked" : "" },
        h("span", { class: "num", "aria-hidden": "true", text: st === "bestanden" ? "✓" : n }),
        h("div", null,
          h("h3", null, "Modul " + n + ": " + (m ? m.titel : "")),
          h("div", { class: "muted", text: m ? m.kurz + (m.minuten ? " · ca. " + m.minuten + " Min." : "") : "" }),
          h("div", { style: "margin-top:.4rem" }, badge)),
        h("div", { class: "act" },
          st === "folgt" ? null :
          locked ? h("span", { class: "muted", text: "gesperrt" }) :
          h("a", { class: "btn" + (st === "neu" ? "" : " sec"), href: "#/m/" + n, text: st === "neu" ? "Starten" : "Weiterlernen" })));
      if (st !== "folgt" && !locked) li.querySelector("div:nth-child(2)").appendChild(h("div", { style: "margin-top:.5rem" }, bar(pr, true)));
      ol.appendChild(li);
    });
    // Gesamtquiz
    var gl = gesamtLocked() || !gesamtAvailable();
    var gb = S.gesamt && S.gesamt.best ? S.gesamt.best.pct : null;
    ol.appendChild(h("li", { class: gb != null && gb >= BESTANDEN ? "done" : gl ? "locked" : "" },
      h("span", { class: "num", "aria-hidden": "true", text: gb != null && gb >= BESTANDEN ? "✓" : "★" }),
      h("div", null, h("h3", { text: "Gesamtquiz" }), h("div", { class: "muted", text: "Fragen aus allen Modulen mit persönlicher Wiederholungsempfehlung" }),
        h("div", { style: "margin-top:.4rem" }, h("span", { class: "badge" + (gb != null && gb >= BESTANDEN ? " ok" : ""), text: !gesamtAvailable() ? "Inhalt folgt" : gl ? "verfügbar nach allen Modulquizzen" : gb != null ? "Bestes Ergebnis: " + gb + " %" : "bereit" }))),
      h("div", { class: "act" }, !gesamtAvailable() ? null : gl ? h("span", { class: "muted", text: "gesperrt" }) : h("a", { class: "btn", href: "#/gesamtquiz", text: "Starten" }))));
    if (window.KURS_BESUCH) {
      ol.appendChild(h("li", null,
        h("span", { class: "num", "aria-hidden": "true", text: "🏛" }),
        h("div", null, h("h3", { text: "Vorbereitung auf den Bundesbank-Besuch" }), h("div", { class: "muted", text: window.KURS_BESUCH.kurz || "" })),
        h("div", { class: "act" }, h("a", { class: "btn sec", href: "#/besuch", text: "Öffnen" }))));
    }
    root.appendChild(ol);

    root.appendChild(h("div", { class: "card" },
      h("p", { html: "<strong>Tipp:</strong> Dein Fortschritt liegt nur in diesem Browser. Wenn du zwischen Schule und zuhause wechselst, nutze <a href='#/sichern'>Fortschritt sichern</a> (Code oder Datei)." })));
    mount(root);
  }

  /* ---------- Inhaltsblöcke ---------- */
  function renderBlock(b, n) {
    switch (b.typ) {
      case "text": return h("p", { html: fmt(b.text) });
      case "liste": {
        var l = h(b.geordnet ? "ol" : "ul");
        b.items.forEach(function (it) { l.appendChild(h("li", { html: fmt(it) })); });
        return l;
      }
      case "merke": return h("div", { class: "merk", role: "note" }, h("div", { class: "lbl", text: "Merke" }), h("div", null, h("strong", { class: "term", text: b.begriff }), ": ", h("span", { html: fmt(b.text) })));
      case "beispiel": return h("div", { class: "beispiel" }, h("div", { class: "lbl", text: "Beispiel" + (b.titel ? ": " + b.titel : "") }), h("div", { html: fmt(b.text) }));
      case "hinweis": return h("div", { class: "hinweis", role: "note", html: fmt(b.text) });
      case "tabelle": {
        var t = h("table", { class: "tbl" });
        if (b.titel) t.appendChild(h("caption", { text: b.titel, style: "text-align:left;font-weight:600;padding-bottom:.3rem" }));
        t.appendChild(h("thead", null, h("tr", null, b.kopf.map(function (k) { return h("th", { scope: "col", text: k }); }))));
        t.appendChild(h("tbody", null, b.zeilen.map(function (z) { return h("tr", null, z.map(function (c) { return h("td", { html: fmt(c) }); })); })));
        return h("div", { class: "tblwrap" }, t);
      }
      case "svg": return h("figure", { class: "fig" }, h("div", { html: b.svg }), h("figcaption", { html: fmt(b.titel || "") }), h("p", { class: "sr-only", text: b.alt || "" }));
      case "check": return renderQuestion(b.frage, { check: true });
      case "sim": return renderSim(b);
      case "aufgabe": {
        var ta = h("textarea", { "aria-label": "Deine Antwort (wird nicht gespeichert)", placeholder: "Notiere hier deine Antwort in Stichpunkten …", style: "font-family:inherit;font-size:1rem" });
        var sol = h("div", { class: "fb ok", hidden: true }, h("div", { class: "fbtitle", text: "Musterlösung" }), h("div", { html: fmt(b.loesung) }));
        var btn = h("button", { type: "button", class: "btn", text: "Musterlösung anzeigen", onclick: function () { sol.hidden = !sol.hidden; btn.textContent = sol.hidden ? "Musterlösung anzeigen" : "Musterlösung ausblenden"; } });
        return h("div", { class: "q check" }, h("div", { class: "qmeta", text: "Urteilsaufgabe (AFB III)" }), h("h3", { style: "margin-top:0", text: b.titel }), h("p", { html: fmt(b.text) }), ta, h("div", { class: "row", style: "margin-top:.6rem" }, btn), sol);
      }
      default: return h("p", { class: "muted", text: "[Unbekannter Block: " + b.typ + "]" });
    }
  }

  /* Kleine Simulation „Du bist im EZB-Rat“ (didaktisches Modell) */
  function renderSim(b) {
    var box = h("div", { class: "q check", style: "border-left-color:var(--primary)" });
    box.appendChild(h("div", { class: "qmeta", text: "Simulation (stark vereinfachtes Modell)" }));
    box.appendChild(h("h3", { style: "margin-top:0", text: b.titel }));
    if (b.intro) box.appendChild(h("p", { html: fmt(b.intro) }));
    b.szenarien.forEach(function (sz) {
      var out = h("div", { "aria-live": "polite" });
      var row = h("div", { class: "row" });
      sz.optionen.forEach(function (o) {
        var btn = h("button", { type: "button", class: "btn sec", text: o.label });
        btn.addEventListener("click", function () {
          Array.prototype.forEach.call(row.children, function (c) { c.removeAttribute("aria-pressed"); });
          btn.setAttribute("aria-pressed", "true");
          out.innerHTML = "";
          out.appendChild(h("div", { class: "fb " + (o.urteil === "gut" ? "ok" : o.urteil === "mittel" ? "part" : "bad") },
            h("div", { class: "fbtitle", text: "Wirkungskette bei: " + o.label }),
            h("ol", null, o.kette.map(function (k) { return h("li", { html: fmt(k) }); })),
            h("div", { html: fmt(o.kommentar) })));
        });
        row.appendChild(btn);
      });
      box.appendChild(h("div", { class: "card", style: "margin:.8rem 0" },
        h("strong", { text: sz.titel }), h("p", { html: fmt(sz.text) }), row, out));
    });
    box.appendChild(h("p", { class: "muted", text: "Hinweis: Die Wirkungsketten sind ein vereinfachtes Lernmodell. In der Realität wirken viele Faktoren gleichzeitig, und die Wirkung tritt mit Verzögerung ein." }));
    return box;
  }

  /* ---------- Modul-Ansicht ---------- */
  function stepsOf(n) {
    var m = mod(n);
    var s = [{ key: "start", label: "Lernziele" }];
    m.abschnitte.forEach(function (a, i) { s.push({ key: a.id, label: (i + 1) + " " + a.titel }); });
    s.push({ key: "fazit", label: "Fazit" });
    s.push({ key: "quiz", label: "Modulquiz" });
    return s;
  }

  function viewModule(n, step, extra) {
    var m = mod(n);
    if (!m) { return viewNotFound(); }
    if (!hasContent(n)) {
      setTitle("Modul " + n);
      var r = h("div", null, h("h1", { text: "Modul " + n + ": " + m.titel }), h("p", { text: "Dieses Modul ist noch in Vorbereitung." }), h("a", { class: "btn", href: "#/", text: "Zurück zur Übersicht" }));
      return mount(r);
    }
    if (isLocked(n)) {
      setTitle("Modul " + n + " gesperrt");
      return mount(h("div", null, h("h1", { text: "Modul " + n + " ist noch gesperrt" }),
        h("p", { text: "Dieses Modul baut auf Modul " + (n - 1) + " auf. Schließe zuerst das Quiz von Modul " + (n - 1) + " mit mindestens " + BESTANDEN + " % ab." }),
        h("a", { class: "btn", href: "#/m/" + (n - 1) + "/quiz", text: "Zum Quiz von Modul " + (n - 1) }), " ",
        h("a", { class: "btn sec", href: "#/", text: "Zur Übersicht" })));
    }
    step = step || "start";
    var steps = stepsOf(n);
    var idx = steps.map(function (s) { return s.key; }).indexOf(step);
    if (idx < 0) return viewNotFound();

    var root = h("div");
    root.appendChild(h("p", { class: "muted" }, h("a", { href: "#/", text: "← Übersicht" }), " · Modul " + n));
    var head = h("h1", { text: m.titel });
    root.appendChild(head);
    var pr = moduleProgress(n);
    root.appendChild(h("div", { class: "row" }, h("span", { class: "muted", text: "Fortschritt im Modul:" }), h("div", { style: "flex:1;min-width:8rem" }, bar(pr, true)), h("strong", { text: pr + " %" })));
    var nav = h("ul", { class: "steps", "aria-label": "Abschnitte des Moduls" });
    steps.forEach(function (s, i) {
      var isDone = s.key === "start" ? false : s.key === "fazit" ? secDone(n, "fazit") : s.key === "quiz" ? passed(n) : secDone(n, s.key);
      nav.appendChild(h("li", null, h("a", { href: "#/m/" + n + (s.key === "start" ? "" : "/" + s.key), class: isDone ? "done" : "", "aria-current": i === idx ? "step" : null, text: s.label })));
    });
    root.appendChild(nav);

    var body = h("div", { class: "content" });
    var s = steps[idx];
    if (s.key === "start") {
      setTitle("Modul " + n + " – Lernziele");
      body.appendChild(h("h2", { text: "Das kannst du nach diesem Modul" }));
      body.appendChild(h("ul", null, m.lernziele.map(function (z) { return h("li", { html: fmt(z) }); })));
      body.appendChild(h("p", { class: "muted", text: "Das Modul hat " + m.abschnitte.length + " Lernabschnitte. Zwischendurch beantwortest du kurze „Check dich“-Fragen – danach folgen Fazit und Modulquiz." }));
    } else if (s.key === "fazit") {
      setTitle("Modul " + n + " – Fazit");
      body.appendChild(h("h2", { text: "Fazit" }));
      body.appendChild(h("div", { class: "card", html: fmt(m.fazit) }));
      if (m.quellen && m.quellen.length) {
        body.appendChild(h("h3", { text: "Quellen" }));
        body.appendChild(h("ul", null, m.quellen.map(function (q) { return h("li", null, h("a", { href: q.url, target: "_blank", rel: "noopener noreferrer", text: q.titel })); })));
      }
    } else if (s.key === "quiz") {
      setTitle("Modul " + n + " – Quiz");
      body.appendChild(h("h2", { text: "Modulquiz" }));
      var host = h("div");
      var cnt = m.quizFragen || QUIZ_FRAGEN_STANDARD;
      var rec = S.quiz[n];
      if (extra === "ergebnis" && rec && rec.last) {
        renderModuleResult(n, rec.last, host, false);
      } else {
        host.appendChild(h("p", { text: cnt + " Fragen, zufällig aus einem größeren Fragenpool gezogen. Nach jeder Frage bekommst du eine Erklärung; am Ende eine Auswertung je Unterthema. Du kannst das Quiz beliebig oft wiederholen." }));
        if (rec && rec.best) host.appendChild(h("p", { html: "Bisher: bestes Ergebnis <strong>" + rec.best.pct + " %</strong>, letzter Versuch <strong>" + rec.last.pct + " %</strong> (" + rec.versuche + " Versuch" + (rec.versuche === 1 ? "" : "e") + ")." }));
        var row = h("div", { class: "row" }, h("button", { type: "button", class: "btn", text: rec ? "Neuen Versuch starten" : "Quiz starten", onclick: function () { host.innerHTML = ""; runModuleQuiz(n, host); } }));
        if (rec && rec.last) row.appendChild(h("a", { class: "btn sec", href: "#/m/" + n + "/quiz/ergebnis", text: "Letzte Auswertung ansehen" }));
        host.appendChild(row);
      }
      body.appendChild(host);
    } else {
      var a = thema(n, s.key);
      setTitle("Modul " + n + " – " + a.titel);
      body.appendChild(h("h2", { text: (idx) + ". " + a.titel }));
      a.inhalt.forEach(function (b) { body.appendChild(renderBlock(b, n)); });
    }
    root.appendChild(body);

    // untere Navigation
    var prev = steps[idx - 1], next = steps[idx + 1];
    var bottom = h("div", { class: "nav-bottom no-print" });
    bottom.appendChild(prev ? h("a", { class: "btn sec", href: "#/m/" + n + (prev.key === "start" ? "" : "/" + prev.key), text: "← Zurück" }) : h("span"));
    if (next) {
      bottom.appendChild(h("a", { class: "btn", href: "#/m/" + n + "/" + next.key, text: "Weiter →", onclick: function () {
        if (s.key !== "start" && s.key !== "quiz") setSecDone(n, s.key);
      } }));
    }
    root.appendChild(bottom);
    mount(root);
  }

  /* ---------- Glossar ---------- */
  function glossarEntries() {
    var list = [];
    moduleIds().forEach(function (n) {
      if (!hasContent(n)) return;
      mod(n).abschnitte.forEach(function (a) {
        a.inhalt.forEach(function (b) {
          if (b.typ === "merke") list.push({ begriff: b.begriff, text: b.text, n: n, sec: a.id, secTitel: a.titel });
        });
      });
    });
    list.sort(function (x, y) { return x.begriff.localeCompare(y.begriff, "de"); });
    return list;
  }
  function viewGlossar() {
    setTitle("Glossar");
    var all = glossarEntries();
    var root = h("div", null, h("h1", { text: "Glossar" }),
      h("p", { class: "muted", text: "Alle Fachbegriffe aus den Merkkästen, alphabetisch. Das Glossar wächst mit den Modulen." }));
    var inp = h("input", { type: "search", id: "gs", placeholder: "Begriff suchen …", "aria-label": "Glossar durchsuchen", style: "width:100%;max-width:26rem" });
    var count = h("p", { class: "muted", "aria-live": "polite" });
    var dl = h("dl", { class: "gloss" });
    function draw() {
      var q = inp.value.trim().toLowerCase();
      dl.innerHTML = "";
      var shown = all.filter(function (e) { return !q || e.begriff.toLowerCase().indexOf(q) >= 0 || e.text.toLowerCase().indexOf(q) >= 0; });
      shown.forEach(function (e) {
        dl.appendChild(h("dt", { text: e.begriff }));
        dl.appendChild(h("dd", null, h("span", { html: fmt(e.text) }), " ", h("a", { href: "#/m/" + e.n + "/" + e.sec, text: "→ Modul " + e.n + ", " + e.secTitel })));
      });
      count.textContent = shown.length + " von " + all.length + " Begriffen";
    }
    inp.addEventListener("input", draw);
    root.appendChild(inp); root.appendChild(count); root.appendChild(dl);
    draw();
    mount(root);
  }

  /* ---------- Ergebnisse / Druckansicht ---------- */
  function viewErgebnis() {
    setTitle("Ergebnisse");
    var root = h("div");
    root.appendChild(h("h1", { text: "Meine Ergebnisse" }));
    root.appendChild(h("p", null, h("strong", { text: "Name/Kürzel: " }), S.name || "–", "   ", h("strong", { text: "Datum: " }), fmtDate(new Date().toISOString()), "   ", h("strong", { text: "Gesamtfortschritt: " }), overallProgress() + " %"));
    root.appendChild(h("div", { class: "row no-print" }, h("button", { type: "button", class: "btn", text: "Drucken / als PDF speichern", onclick: function () { window.print(); } })));
    var tbl = h("table", { class: "tbl" });
    tbl.appendChild(h("thead", null, h("tr", null, ["Modul", "Status", "Bestes Ergebnis", "Letzter Versuch", "Versuche"].map(function (t) { return h("th", { scope: "col", text: t }); }))));
    var tb = h("tbody");
    moduleIds().forEach(function (n) {
      var m = mod(n), rec = S.quiz[n], st = moduleStatus(n);
      tb.appendChild(h("tr", null,
        h("td", { text: "Modul " + n + ": " + (m ? m.titel : "") }),
        h("td", { text: st === "bestanden" ? "Quiz bestanden" : st === "bearbeitung" ? "in Bearbeitung" : st === "folgt" ? "Inhalt folgt" : "nicht begonnen" }),
        h("td", { text: rec && rec.best ? rec.best.pct + " %" : "–" }),
        h("td", { text: rec && rec.last ? rec.last.pct + " % (" + fmtDate(rec.last.datum) + ")" : "–" }),
        h("td", { text: rec ? rec.versuche : "–" })));
    });
    var g = S.gesamt;
    tb.appendChild(h("tr", null, h("td", { text: "Gesamtquiz" }), h("td", { text: g && g.best && g.best.pct >= BESTANDEN ? "bestanden" : gesamtAvailable() ? "offen" : "Inhalt folgt" }),
      h("td", { text: g && g.best ? g.best.pct + " %" : "–" }), h("td", { text: g && g.last ? g.last.pct + " % (" + fmtDate(g.last.datum) + ")" : "–" }), h("td", { text: g ? g.versuche : "–" })));
    tbl.appendChild(tb);
    root.appendChild(h("div", { class: "tblwrap" }, tbl));

    root.appendChild(h("h2", { text: "Ergebnis je Unterthema (letzter Versuch)" }));
    var any = false;
    moduleIds().forEach(function (n) {
      var rec = S.quiz[n];
      if (!rec || !rec.last || !hasContent(n)) return;
      any = true;
      var card = h("div", { class: "card" }, h("h3", { style: "margin-top:0", text: "Modul " + n + ": " + mod(n).titel }));
      mod(n).abschnitte.forEach(function (a) {
        var t = rec.last.themen[a.id];
        if (!t) return;
        var p = pct(t.p, t.n);
        card.appendChild(h("div", { class: "themarow" }, h("span", { text: a.titel }), bar(p, true), h("span", { text: p + " %" })));
      });
      root.appendChild(card);
    });
    if (!any) root.appendChild(h("p", { class: "muted", text: "Noch keine Quizergebnisse vorhanden." }));
    mount(root);
  }

  /* ---------- Fortschritt sichern (Export/Import) ---------- */
  function encodeState() {
    return EXPORT_PREFIX + btoa(unescape(encodeURIComponent(JSON.stringify(S))));
  }
  function parseImport(text) {
    text = String(text || "").trim();
    if (text.indexOf(EXPORT_PREFIX) === 0) text = decodeURIComponent(escape(atob(text.slice(EXPORT_PREFIX.length).replace(/\s+/g, ""))));
    var o = JSON.parse(text);
    if (!o || o.v !== 1 || typeof o !== "object") throw new Error("format");
    return o;
  }
  function mergeInto(cur, inc) {
    if (!cur.name && inc.name) cur.name = inc.name;
    Object.keys(inc.abschnitte || {}).forEach(function (n) {
      cur.abschnitte[n] = Object.assign({}, cur.abschnitte[n] || {}, inc.abschnitte[n]);
    });
    function mergeSlot(a, b) {
      if (!a) return b;
      if (!b) return a;
      var out = { versuche: Math.max(a.versuche || 0, b.versuche || 0) };
      out.best = (!a.best || (b.best && b.best.pct > a.best.pct)) ? b.best : a.best;
      out.last = (!a.last || (b.last && b.last.datum > a.last.datum)) ? b.last : a.last;
      return out;
    }
    Object.keys(inc.quiz || {}).forEach(function (n) { cur.quiz[n] = mergeSlot(cur.quiz[n], inc.quiz[n]); });
    cur.gesamt = mergeSlot(cur.gesamt, inc.gesamt);
    cur.besuch = Object.assign({}, inc.besuch || {}, cur.besuch || {});
  }
  function viewSichern() {
    setTitle("Fortschritt sichern");
    var root = h("div", null, h("h1", { text: "Fortschritt sichern" }),
      h("p", { text: "Dein Fortschritt liegt nur in diesem Browser auf diesem Gerät. Mit Code oder Datei nimmst du ihn mit – z. B. vom Schul-PC nach Hause." }));
    if (!storageOK) root.appendChild(h("div", { class: "hinweis", text: "Dein Browser blockiert das Speichern. Sichere deinen Stand regelmäßig hier." }));

    var code = h("textarea", { readonly: "readonly", id: "expCode", "aria-label": "Dein Fortschritts-Code" });
    code.value = encodeState();
    root.appendChild(h("div", { class: "card" }, h("h2", { style: "margin-top:0", text: "1. Sichern" }),
      h("p", { text: "Kopiere den Code und speichere ihn z. B. in einer Notiz – oder lade eine Datei herunter." }),
      code,
      h("div", { class: "row", style: "margin-top:.6rem" },
        h("button", { type: "button", class: "btn", text: "Code kopieren", onclick: function () {
          code.select();
          try { if (navigator.clipboard) navigator.clipboard.writeText(code.value); else document.execCommand("copy"); toast("Code kopiert"); } catch (e) { toast("Bitte Text markieren und mit Strg+C kopieren"); }
        } }),
        h("button", { type: "button", class: "btn sec", text: "Als Datei herunterladen", onclick: function () {
          try {
            var blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" });
            var a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "ezb-kurs-fortschritt.json";
            document.body.appendChild(a); a.click(); a.remove();
          } catch (e) { toast("Download nicht möglich – nutze den Code."); }
        } }))));

    var imp = h("textarea", { id: "impCode", "aria-label": "Code zum Einfügen", placeholder: "Code hier einfügen …" });
    var msg = h("p", { "aria-live": "polite" });
    function doImport(text) {
      try {
        var o = parseImport(text);
        mergeInto(S, o); save();
        msg.className = ""; msg.textContent = "Fortschritt übernommen. Bereits vorhandener Fortschritt bleibt erhalten, bessere Ergebnisse werden übernommen.";
        code.value = encodeState();
      } catch (e) {
        msg.className = "fb bad"; msg.textContent = "Der Code bzw. die Datei konnte nicht gelesen werden. Wurde er vollständig kopiert?";
      }
    }
    var file = h("input", { type: "file", accept: ".json,application/json", id: "impFile", "aria-label": "Fortschrittsdatei auswählen" });
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () { doImport(String(r.result)); };
      r.readAsText(f);
    });
    root.appendChild(h("div", { class: "card" }, h("h2", { style: "margin-top:0", text: "2. Laden" }),
      h("p", { text: "Füge einen Code ein oder wähle eine Datei. Dein jetziger Stand wird nicht gelöscht, sondern mit dem geladenen zusammengeführt." }),
      imp,
      h("div", { class: "row", style: "margin-top:.6rem" }, h("button", { type: "button", class: "btn", text: "Code übernehmen", onclick: function () { doImport(imp.value); } }),
        h("label", { for: "impFile", text: "oder Datei: " }), file),
      msg));
    root.appendChild(h("div", { class: "card" }, h("h2", { style: "margin-top:0", text: "Zurücksetzen" }),
      h("button", { type: "button", class: "btn sec", text: "Alles auf diesem Gerät löschen", onclick: function () {
        if (window.confirm("Wirklich den gesamten Fortschritt auf diesem Gerät löschen?")) { S = defaultState(); save(); toast("Fortschritt gelöscht"); viewSichern(); }
      } })));
    mount(root);
  }

  /* ---------- Gesamtquiz ---------- */
  function gesamtPool() {
    var G = window.KURS_GESAMT || {};
    return (G.pool || []).filter(function (q) { return hasContent(q.modul); });
  }
  function drawGesamt() {
    var chosen = [], taken = {};
    moduleIds().forEach(function (n) {
      if (!hasContent(n)) return;
      var q = shuffle(mod(n).pool)[0];
      chosen.push({ q: q, modul: n });
      taken[q.id] = true;
    });
    var extra = shuffle(gesamtPool());
    while (chosen.length < GESAMTQUIZ_FRAGEN && extra.length) {
      var x = extra.shift();
      chosen.push({ q: x, modul: x.modul });
    }
    return shuffle(chosen);
  }
  function runGesamt(host) {
    var qs = drawGesamt(), answers = [], i = 0;
    function show() {
      host.innerHTML = "";
      var item = qs[i];
      host.appendChild(h("h2", { id: "qh", tabindex: "-1", text: "Frage " + (i + 1) + " von " + qs.length }));
      host.appendChild(bar(Math.round((i / qs.length) * 100), true));
      var done = false;
      var box = renderQuestion(item.q, { meta: "Gesamtquiz", onResult: function (score) {
        if (done) return; done = true;
        answers.push({ q: item.q, modul: item.modul, score: score });
        var last = i === qs.length - 1;
        box.appendChild(h("div", { class: "row", style: "margin-top:.8rem" },
          h("button", { type: "button", class: "btn", id: "nextQ", text: last ? "Auswertung anzeigen" : "Weiter", onclick: function () { if (last) finish(); else { i++; show(); } } })));
        var nb = document.getElementById("nextQ"); if (nb) nb.focus();
      } });
      host.appendChild(box);
      var hh = document.getElementById("qh"); if (hh) hh.focus();
    }
    function finish() {
      var res = summarize(answers, function (q, a) { return a.modul + ":" + q.thema; });
      var mods = {};
      answers.forEach(function (a) { mods[a.modul] = mods[a.modul] || { p: 0, n: 0 }; mods[a.modul].p += a.score; mods[a.modul].n += 1; });
      res.module = mods;
      S.gesamt = storeResult(S.gesamt, res);
      save();
      host.innerHTML = "";
      renderGesamtResult(res, host);
    }
    show();
  }
  function renderGesamtResult(res, host) {
    host.appendChild(h("h2", { id: "resh", tabindex: "-1", text: "Auswertung Gesamtquiz" }));
    var lv = level(res.pct);
    host.appendChild(h("div", { class: "card" },
      h("p", { style: "font-size:1.3rem;margin:.2rem 0" }, h("strong", { text: res.pct + " %" }), " ", h("span", { class: "badge " + (res.pct >= BESTANDEN ? "ok" : "warn"), text: res.pct >= BESTANDEN ? "bestanden" : "noch nicht bestanden" })),
      bar(res.pct),
      h("p", { html: "<strong>" + (lv === "gut" ? "Prima, du hast alles verstanden!" : lv === "mittel" ? "Schon ganz gut!" : "Hier lohnt sich eine Wiederholung.") + "</strong>" })));
    host.appendChild(h("h3", { text: "Ergebnis je Modul" }));
    var card = h("div", { class: "card" });
    var strong = [], repeat = [];
    moduleIds().forEach(function (n) {
      var t = res.module && res.module[n]; if (!t) return;
      var p = pct(t.p, t.n), l = level(p);
      if (l === "gut") strong.push(n); else repeat.push({ n: n, l: l });
      card.appendChild(h("div", { class: "themarow" }, h("a", { href: "#/m/" + n, text: "Modul " + n + ": " + mod(n).titel }), bar(p, true), h("span", { class: "badge " + (l === "gut" ? "ok" : l === "mittel" ? "warn" : ""), text: p + " %" })));
    });
    host.appendChild(card);
    var rec = h("div", { class: "card" }, h("h3", { style: "margin-top:0", text: "Deine persönliche Empfehlung" }));
    rec.appendChild(h("p", null, h("strong", { text: "Deine Stärken: " }), strong.length ? strong.map(function (n) { return "Modul " + n; }).join(", ") : "noch keine Module mit ≥ " + STUFE_GUT + " % – das schaffst du mit einer Wiederholung!"));
    if (repeat.length) {
      var ul = h("ul");
      repeat.forEach(function (r) {
        var weakSecs = [];
        Object.keys(res.themen).forEach(function (k) {
          var parts = k.split(":");
          if (parseInt(parts[0], 10) !== r.n) return;
          var t = res.themen[k];
          if (pct(t.p, t.n) < STUFE_GUT) weakSecs.push(parts[1]);
        });
        var li = h("li", null, h("a", { href: "#/m/" + r.n, text: "Modul " + r.n }), (r.l === "schwach" ? " – hier lohnt sich eine Wiederholung, besonders: " : " – schau dir noch einmal an: "));
        weakSecs.forEach(function (id, k) {
          var a = thema(r.n, id);
          if (k) li.appendChild(document.createTextNode(", "));
          li.appendChild(h("a", { href: "#/m/" + r.n + "/" + id, text: "„" + (a ? a.titel : id) + "“" }));
        });
        ul.appendChild(li);
      });
      rec.appendChild(h("p", null, h("strong", { text: "Wiederhole: " })));
      rec.appendChild(ul);
    } else {
      rec.appendChild(h("p", { text: "Du kannst alle Inhalte sicher. Nutze jetzt die Vorbereitung auf den Bundesbank-Besuch." }));
    }
    host.appendChild(rec);
    host.appendChild(h("div", { class: "row no-print" },
      h("a", { class: "btn", href: "#/gesamtquiz", onclick: function (e) { e.preventDefault(); host.innerHTML = ""; runGesamt(host); }, text: "Neuer Versuch" }),
      window.KURS_BESUCH ? h("a", { class: "btn sec", href: "#/besuch", text: "Weiter: Besuch vorbereiten" }) : null));
    var hh = document.getElementById("resh"); if (hh) hh.focus();
  }
  function viewGesamt() {
    setTitle("Gesamtquiz");
    var root = h("div", null, h("h1", { text: "Gesamtquiz" }));
    if (!gesamtAvailable()) { root.appendChild(h("p", { text: "Das Gesamtquiz folgt." })); }
    else if (gesamtLocked()) {
      root.appendChild(h("p", { text: "Das Gesamtquiz wird empfohlen freigeschaltet, wenn du alle Modulquizze mit mindestens " + BESTANDEN + " % abgeschlossen hast." }));
    } else {
      var host = h("div");
      var g = S.gesamt;
      host.appendChild(h("p", { text: GESAMTQUIZ_FRAGEN + " Fragen aus allen Modulen, darunter Fragen, die mehrere Themen verbinden. Am Ende bekommst du eine Auswertung je Modul und eine persönliche Wiederholungsempfehlung." }));
      if (g && g.best) host.appendChild(h("p", { html: "Bestes Ergebnis: <strong>" + g.best.pct + " %</strong>, letzter Versuch: <strong>" + g.last.pct + " %</strong>." }));
      var row = h("div", { class: "row" }, h("button", { type: "button", class: "btn", text: g ? "Neuen Versuch starten" : "Gesamtquiz starten", onclick: function () { host.innerHTML = ""; runGesamt(host); } }));
      if (g && g.last && g.last.module) row.appendChild(h("button", { type: "button", class: "btn sec", text: "Letzte Auswertung ansehen", onclick: function () { host.innerHTML = ""; renderGesamtResult(g.last, host); } }));
      host.appendChild(row);
      root.appendChild(host);
    }
    root.appendChild(h("p", null, h("a", { href: "#/", text: "← Zur Übersicht" })));
    mount(root);
  }

  /* ---------- Vorbereitung Bundesbank-Besuch ---------- */
  function viewBesuch() {
    setTitle("Besuch vorbereiten");
    var B = window.KURS_BESUCH;
    if (!B) return viewNotFound();
    var root = h("div", null, h("h1", { text: B.titel }));
    root.appendChild(h("p", { html: fmt(B.intro) }));
    root.appendChild(h("h2", { text: "Checkliste: Das solltest du jetzt erklären können" }));
    var ul = h("ul", { style: "list-style:none;padding:0" });
    B.checkliste.forEach(function (c, i) {
      var inp = h("input", { type: "checkbox", id: "bc" + i });
      inp.checked = !!(S.besuch && S.besuch["c" + i]);
      inp.addEventListener("change", function () { S.besuch = S.besuch || {}; S.besuch["c" + i] = inp.checked; save(); });
      ul.appendChild(h("li", { class: "opt" }, inp, h("label", { for: "bc" + i, style: "flex:1;cursor:pointer" }, h("span", { html: fmt(c.text) }), " ", c.link ? h("a", { href: c.link, text: "(nachlesen)" }) : null)));
    });
    root.appendChild(ul);
    root.appendChild(h("h2", { text: "Fragen, die du vor Ort stellen kannst" }));
    root.appendChild(h("ol", null, B.fragen.map(function (f) { return h("li", { html: fmt(f) }); })));
    if (B.tipp) root.appendChild(h("div", { class: "hinweis", html: fmt(B.tipp) }));
    if (B.quellen) {
      root.appendChild(h("h3", { text: "Quellen" }));
      root.appendChild(h("ul", null, B.quellen.map(function (q) { return h("li", null, h("a", { href: q.url, target: "_blank", rel: "noopener noreferrer", text: q.titel })); })));
    }
    root.appendChild(h("div", { class: "row no-print" }, h("button", { type: "button", class: "btn", text: "Seite drucken / als PDF speichern", onclick: function () { window.print(); } })));
    mount(root);
  }

  function viewNotFound() {
    setTitle("Nicht gefunden");
    mount(h("div", null, h("h1", { text: "Seite nicht gefunden" }), h("a", { class: "btn", href: "#/", text: "Zur Startseite" })));
  }

  /* ---------- Router ---------- */
  function route() {
    var hash = (location.hash || "#/").replace(/^#/, "");
    var p = hash.split("/").filter(Boolean);
    var navKey = "home";
    if (!p.length) viewHome();
    else if (p[0] === "m") { navKey = "home"; viewModule(parseInt(p[1], 10), p[2], p[3]); }
    else if (p[0] === "glossar") { navKey = "glossar"; viewGlossar(); }
    else if (p[0] === "ergebnis") { navKey = "ergebnis"; viewErgebnis(); }
    else if (p[0] === "sichern") { navKey = "sichern"; viewSichern(); }
    else if (p[0] === "gesamtquiz") { navKey = "home"; viewGesamt(); }
    else if (p[0] === "besuch") { navKey = "home"; viewBesuch(); }
    else viewNotFound();
    Array.prototype.forEach.call(document.querySelectorAll("nav.main a"), function (a) {
      if (a.getAttribute("data-nav") === navKey) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("hashchange", route);
  route();
})();
