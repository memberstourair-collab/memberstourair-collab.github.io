/* 킹링고 입문 · 킹한자 — 공통 학습 엔진
 * DOM + Web Speech + HTML5 canvas. APP_DATA만 바꾸면 두 앱이 함께 동작합니다.
 */
(function (global) {
  "use strict";

  var D = global.APP_DATA;
  var KEY = D.storageKey;

  /* ---------- 날짜·계산 ---------- */
  function pad2(n) { return n < 10 ? "0" + n : String(n); }
  function dateKey(d) {
    var x = d || new Date();
    return x.getFullYear() + "-" + pad2(x.getMonth() + 1) + "-" + pad2(x.getDate());
  }
  function parseKey(k) {
    var p = String(k || "").split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0, 0);
  }
  function addDays(k, n) {
    var d = parseKey(k);
    d.setDate(d.getDate() + n);
    return dateKey(d);
  }
  function diffDays(a, b) {
    if (!a || !b) return null;
    return Math.round((parseKey(b).getTime() - parseKey(a).getTime()) / 86400000);
  }
  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function percent(a, b) { return b ? clamp(Math.round((a / b) * 100), 0, 100) : 0; }

  /* ---------- 저장 ---------- */
  var state = null;
  function defaults() {
    return {
      version: 2,
      lang: D.courses[0].code,
      level: (D.levels && D.levels[0] && D.levels[0].id) || null,
      goal: D.defaultGoal || null,
      unit: 1,
      xp: 0,
      daily: {},
      streak: { count: 0, best: 0, last: null },
      progress: {},
      mastered: {},
      prefs: { sound: true, slow: false, guide: true, gridMode: "ta", pen: { width: 9, color: "#1f2937" }, letter: 0, char: 0, tone: -1 }
    };
  }
  function isObj(v) { return v && typeof v === "object" && !Array.isArray(v); }
  function normalize(st) {
    var d = defaults();
    if (!isObj(st)) st = d;
    var codes = D.courses.map(function (c) { return c.code; });
    if (codes.indexOf(st.lang) < 0) st.lang = d.lang;
    var lids = (D.levels || []).map(function (l) { return l.id; });
    if (lids.length) {
      if (lids.indexOf(st.level) < 0) st.level = lids[0];
      if (lids.indexOf(st.goal) < 0) st.goal = lids.indexOf(D.defaultGoal) >= 0 ? D.defaultGoal : lids[0];
      var lus = courseOf(st.lang).units.filter(function (u) { return u.levelId === st.level; });
      st.unit = clamp(Math.floor(Number(st.unit) || 1), 1, Math.max(1, lus.length));
    } else {
      st.level = null;
      st.goal = null;
      var us = courseOf(st.lang).units;
      st.unit = clamp(Math.floor(Number(st.unit) || 1), 1, us.length);
    }
    st.xp = Math.max(0, Math.floor(Number(st.xp) || 0));
    if (!isObj(st.streak)) st.streak = d.streak;
    st.streak.count = Math.max(0, Math.floor(Number(st.streak.count) || 0));
    st.streak.best = Math.max(0, Math.floor(Number(st.streak.best) || 0));
    if (typeof st.streak.last !== "string") st.streak.last = null;
    if (!isObj(st.progress)) st.progress = {};
    if (!isObj(st.mastered)) st.mastered = {};
    if (!isObj(st.daily)) st.daily = {};
    if (!isObj(st.prefs)) st.prefs = d.prefs;
    if (typeof st.prefs.sound !== "boolean") st.prefs.sound = true;
    if (typeof st.prefs.slow !== "boolean") st.prefs.slow = false;
    if (typeof st.prefs.guide !== "boolean") st.prefs.guide = true;
    if (!isObj(st.prefs.pen)) st.prefs.pen = d.prefs.pen;
    st.prefs.pen.width = clamp(Math.floor(Number(st.prefs.pen.width) || 9), 2, 24);
    if (typeof st.prefs.pen.color !== "string") st.prefs.pen.color = d.prefs.pen.color;
    st.prefs.letter = Math.max(0, Math.floor(Number(st.prefs.letter) || 0));
    st.prefs.char = Math.max(0, Math.floor(Number(st.prefs.char) || 0));
    st.prefs.tone = Math.max(-1, Math.floor(isFinite(Number(st.prefs.tone)) ? Number(st.prefs.tone) : -1));
    if (st.prefs.gridMode !== "mi") st.prefs.gridMode = "ta";
    Object.keys(st.daily).forEach(function (k) {
      var v = Number(st.daily[k]);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || !isFinite(v) || v <= 0) delete st.daily[k];
      else st.daily[k] = Math.floor(v);
    });
    var cutoff = addDays(dateKey(), -120);
    Object.keys(st.daily).forEach(function (k) { if (k < cutoff) delete st.daily[k]; });
    return st;
  }
  function load() {
    var st = null;
    try {
      var raw = global.localStorage ? global.localStorage.getItem(KEY) : null;
      if (raw) st = JSON.parse(raw);
    } catch (e) { st = null; }
    state = normalize(st || defaults());
    return state;
  }
  function get() { if (!state) load(); return state; }
  function save() {
    try {
      if (global.localStorage) global.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* 저장 공간이 없어도 동작 */ }
  }

  /* ---------- 코스·단원 ---------- */
  function courseOf(code) {
    for (var i = 0; i < D.courses.length; i++) {
      if (D.courses[i].code === code) return D.courses[i];
    }
    return D.courses[0];
  }
  function course() { return courseOf(get().lang); }
  function levels() { return D.levels || []; }
  function levelOf(id) {
    var ls = levels();
    for (var i = 0; i < ls.length; i++) { if (ls[i].id === id) return ls[i]; }
    return ls[0] || null;
  }
  function levelUnits(lid) {
    var id = lid || get().level;
    return course().units.filter(function (u) { return u.levelId === id; });
  }
  function levelItems(lid) {
    var out = [];
    levelUnits(lid).forEach(function (u) { u.items.forEach(function (it) { out.push(it); }); });
    return out;
  }
  function unitOf(no) {
    var us = levelUnits();
    return us[clamp(Math.floor(Number(no) || 1), 1, us.length) - 1];
  }
  function unit() { return unitOf(get().unit); }
  function levelStats(lid) {
    var lv = levelOf(lid) || {};
    var us = levelUnits(lid);
    var chars = 0, mastered = 0, doneUnits = 0;
    us.forEach(function (u) {
      chars += u.items.length;
      var p = get().progress[u.id];
      if (p && p.learned) doneUnits += 1;
      u.items.forEach(function (it) { if (get().mastered[it.id]) mastered += 1; });
    });
    return {
      id: lv.id, label: lv.label, units: us.length, doneUnits: doneUnits,
      chars: chars, mastered: mastered,
      pct: percent(doneUnits, us.length), charPct: percent(mastered, chars)
    };
  }
  function overallStats() {
    var chars = 0, mastered = 0, doneUnits = 0, units = 0;
    levels().forEach(function (lv) {
      if (lv.id === "words") return;
      var s = levelStats(lv.id);
      chars += s.chars; mastered += s.mastered; doneUnits += s.doneUnits; units += s.units;
    });
    return { chars: chars, mastered: mastered, doneUnits: doneUnits, units: units };
  }
  function resumeUnit(lid) {
    var us = levelUnits(lid);
    for (var i = 0; i < us.length; i++) {
      var p = get().progress[us[i].id];
      if (!(p && p.learned)) return i + 1;
    }
    return 1;
  }
  function pickLevel(lid, opts) {
    if (!lid || lid === get().level) { if (opts && opts.tab) { UI.tab = opts.tab; } render(); return; }
    get().level = lid;
    get().unit = resumeUnit(lid);
    UI.cardIdx = 0;
    UI.quiz = null;
    UI.flipped = false;
    if (opts && opts.tab) UI.tab = opts.tab;
    save();
    render();
  }
  function allItems(c) {
    var out = [];
    (c || course()).units.forEach(function (u) {
      u.items.forEach(function (it) { out.push(it); });
    });
    return out;
  }
  function learnedCount() {
    return course().units.filter(function (u) { return !!(get().progress[u.id] && get().progress[u.id].learned); }).length;
  }
  function markLearned(unitId) {
    var st = get();
    if (!isObj(st.progress[unitId])) st.progress[unitId] = {};
    if (st.progress[unitId].learned) return false;
    st.progress[unitId].learned = true;
    save();
    return true;
  }
  function isMastered(id) { return !!get().mastered[id]; }
  function markMastered(id, on) {
    var st = get();
    if (on === false) delete st.mastered[id];
    else st.mastered[id] = true;
    save();
  }
  function masteredCount(c) {
    var lid = typeof c === "string" ? c : get().level;
    return levelStats(lid).mastered;
  }
  function addXp(n) {
    var amount = Math.max(0, Math.floor(Number(n) || 0));
    if (!amount) return;
    var st = get();
    var today = dateKey();
    st.xp += amount;
    st.daily[today] = (st.daily[today] || 0) + amount;
    if (st.streak.last !== today) {
      var gap = st.streak.last ? diffDays(st.streak.last, today) : null;
      st.streak.count = gap === 1 ? st.streak.count + 1 : 1;
      st.streak.last = today;
      if (st.streak.count > st.streak.best) st.streak.best = st.streak.count;
    }
    save();
  }
  function streakInfo() {
    var st = get();
    var gap = st.streak.last ? diffDays(st.streak.last, dateKey()) : null;
    return {
      count: gap === 0 || gap === 1 ? st.streak.count : 0,
      best: st.streak.best,
      activeToday: gap === 0
    };
  }
  function todayXp() { return get().daily[dateKey()] || 0; }

  /* ---------- 소리 ---------- */
  var speechOk = !!(global.speechSynthesis && global.SpeechSynthesisUtterance);
  function speak(text, rate, locale) {
    if (!speechOk || !text) return false;
    try {
      global.speechSynthesis.cancel();
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = locale || course().locale;
      u.rate = rate || 0.9;
      global.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }
  function speakItem(it, slow) {
    var text = D.mode === "hanja" ? (it.read || it.text) : it.text;
    var rate = slow ? (course().rate && course().rate.slow) || 0.6 : (course().rate && course().rate.normal) || 0.9;
    return speak(text, rate, D.mode === "hanja" ? "ko-KR" : course().locale);
  }

  /* ---------- DOM ---------- */
  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === null || typeof v === "undefined" || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = String(v);
        else if (k === "html") node.innerHTML = v;
        else if (k === "on") {
          Object.keys(v).forEach(function (ev) { node.addEventListener(ev, v[ev]); });
        } else if (k === "style") node.setAttribute("style", v);
        else if (k === "dataset") {
          Object.keys(v).forEach(function (dk) { node.setAttribute("data-" + dk, String(v[dk])); });
        } else node.setAttribute(k, v === true ? "" : String(v));
      });
    }
    appendChildren(node, children);
    return node;
  }
  function appendChildren(node, children) {
    if (children === null || typeof children === "undefined" || children === false) return;
    if (Array.isArray(children)) { children.forEach(function (c) { appendChildren(node, c); }); return; }
    if (typeof children === "string" || typeof children === "number") {
      node.appendChild(document.createTextNode(String(children)));
      return;
    }
    node.appendChild(children);
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function ico(name) {
    var paths = {
      speaker: '<path d="M4 10v4h3.5L13 18V6L7.5 10H4Z"/><path d="M16.5 9a4 4 0 0 1 0 6"/><path d="M19 6.5a8 8 0 0 1 0 11"/>',
      slow: '<path d="M4 17h9a4 4 0 0 0 0-8H8"/><path d="M4 13h7"/><path d="M17 7l3-3"/>',
      check: '<path d="M5 12.5 10 17l9-10"/>',
      home: '<path d="M4 11 12 4l8 7"/><path d="M6.5 9.5V20h11V9.5"/><path d="M10 20v-5h4v5"/>',
      pen: '<path d="M4 20l4-1 10-10-3-3L5 16l-1 4Z"/><path d="M14 6l3 3"/>',
      cards: '<rect x="3.5" y="6.5" width="12" height="14" rx="2.5"/><path d="M8 4.2h9.5A2.5 2.5 0 0 1 20 6.7V16"/>',
      quiz: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1 .9-1 1.6"/><path d="M12 17h.01"/>',
      flame: '<path d="M12 3s5 4.2 5 8.4A5 5 0 0 1 7 11.4C7 7.2 12 3 12 3Z"/>',
      bolt: '<path d="M13 3 5 14h5l-1 7 8-11h-5l1-7Z"/>',
      undo: '<path d="M9 7 5 11l4 4"/><path d="M5 11h8a5 5 0 0 1 0 10"/>',
      trash: '<path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M7 7l1 12h8l1-12"/>',
      back: '<path d="M15 5l-7 7 7 7"/>',
      chevron: '<path d="M9 5l7 7-7 7"/>',
      grid: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16"/><path d="M4 12h16"/>',
      steps: '<path d="M4 19h4v-4h4v-4h4V7h4"/><path d="M4 19v-2"/>',
      target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.6"/>',
      star: '<path d="M12 4l2.3 5.2 5.7.5-4.3 3.8 1.3 5.5L12 16.2 6.9 19l1.3-5.5L4 9.7l5.7-.5L12 4Z"/>'
    };
    return el("span", { class: "ico", html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || "") + "</svg>" });
  }
  function button(label, onClick, cls) {
    return el("button", { class: "btn " + (cls || ""), type: "button", on: { click: onClick } }, [label]);
  }

  /* ---------- 쓰기 연습장 ---------- */
  var PAD_STROKES = {};
  function mountPad(host, glyph, mode) {
    var prefs = get().prefs;
    var strokes = PAD_STROKES[glyph] || (PAD_STROKES[glyph] = []);
    var pen = { width: prefs.pen.width, color: prefs.pen.color };
    var guide = prefs.guide !== false;
    var drawing = false;
    var ctx = null;
    var canvas = el("canvas", { class: "pad-canvas", "aria-label": "따라 쓰기 연습장" });
    var wrap = el("div", { class: "pad" }, [canvas]);

    function dpr() { return Math.min(global.devicePixelRatio || 1, 3); }
    function size() {
      var w = (canvas.clientWidth || canvas.offsetWidth || 0);
      return w > 0 ? w : 320;
    }
    function resize() {
      var s = size();
      var px = Math.round(s * dpr());
      if (canvas.width !== px || canvas.height !== px) {
        canvas.width = px;
        canvas.height = px;
      }
      redraw();
    }
    function drawGrid(c, s) {
      c.save();
      c.strokeStyle = mode === "hanja" ? "rgba(239,68,68,0.35)" : "rgba(37,99,235,0.3)";
      c.lineWidth = 1 * dpr();
      c.setLineDash([6 * dpr(), 5 * dpr()]);
      c.strokeRect(0.5, 0.5, s - 1, s - 1);
      if (mode === "hanja") {
        c.beginPath();
        c.moveTo(s / 2, 0); c.lineTo(s / 2, s);
        c.moveTo(0, s / 2); c.lineTo(s, s / 2);
        if (prefs.gridMode === "mi") {
          c.moveTo(0, 0); c.lineTo(s, s);
          c.moveTo(s, 0); c.lineTo(0, s);
        }
        c.stroke();
      } else {
        c.beginPath();
        c.moveTo(s / 2, 0); c.lineTo(s / 2, s);
        c.moveTo(0, s * 0.5); c.lineTo(s, s * 0.5);
        c.moveTo(0, s * 0.75); c.lineTo(s, s * 0.75);
        c.stroke();
      }
      c.restore();
    }
    function drawGuide(c, s) {
      if (!guide) return;
      c.save();
      c.globalAlpha = 0.14;
      c.fillStyle = "#111827";
      c.textAlign = "center";
      c.textBaseline = "middle";
      var fs = s * (String(glyph).length > 2 ? 0.5 : 0.72);
      c.font = "600 " + fs + "px 'Noto Sans CJK KR','Hiragino Sans','Yu Gothic',system-ui,sans-serif";
      c.fillText(String(glyph), s / 2, s / 2 + fs * 0.02);
      c.restore();
    }
    function strokePath(c, pts) {
      if (!pts.length) return;
      c.beginPath();
      c.lineCap = "round";
      c.lineJoin = "round";
      c.lineWidth = pen.width * dpr();
      c.strokeStyle = pen.color;
      c.moveTo(pts[0].x * dpr(), pts[0].y * dpr());
      if (pts.length === 1) {
        c.lineTo(pts[0].x * dpr() + 0.1, pts[0].y * dpr() + 0.1);
      } else {
        for (var i = 1; i < pts.length - 1; i++) {
          var mx = (pts[i].x + pts[i + 1].x) / 2;
          var my = (pts[i].y + pts[i + 1].y) / 2;
          c.quadraticCurveTo(pts[i].x * dpr(), pts[i].y * dpr(), mx * dpr(), my * dpr());
        }
        var last = pts[pts.length - 1];
        c.lineTo(last.x * dpr(), last.y * dpr());
      }
      c.stroke();
    }
    function redraw() {
      if (!canvas.getContext) return;
      var c = canvas.getContext("2d");
      if (!c) return;
      ctx = c;
      var s = canvas.width / dpr();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(c, s);
      drawGuide(c, s);
      var saved = pen.width; var savedColor = pen.color;
      strokes.forEach(function (pts) {
        pen.width = pts.width || saved; pen.color = pts.color || savedColor;
        strokePath(c, pts.points || pts);
      });
      pen.width = saved; pen.color = savedColor;
    }
    function point(e) {
      var rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { left: 0, top: 0, width: size(), height: size() };
      var x = (e.clientX || 0) - rect.left;
      var y = (e.clientY || 0) - rect.top;
      var s = size();
      return { x: clamp(x, 0, s), y: clamp(y, 0, s) };
    }
    function down(e) {
      if (e.preventDefault) e.preventDefault();
      drawing = true;
      current = { points: [point(e)], width: pen.width, color: pen.color };
      strokes.push(current);
      redraw();
    }
    var current = null;
    function move(e) {
      if (!drawing || !current) return;
      if (e.preventDefault) e.preventDefault();
      var events = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
      if (events && events.length) {
        events.forEach(function (ev) { current.points.push(point(ev)); });
      } else {
        current.points.push(point(e));
      }
      redraw();
    }
    function up(e) {
      if (!drawing) return;
      drawing = false;
      current = null;
      if (e && e.preventDefault) e.preventDefault();
      save();
    }
    if (canvas.addEventListener) {
      canvas.addEventListener("pointerdown", down);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", up);
      canvas.addEventListener("pointerleave", up);
      canvas.addEventListener("pointercancel", up);
    }
    if (global.addEventListener) global.addEventListener("resize", resize);

    var widths = [
      { v: 4, label: "얇게" },
      { v: 9, label: "보통" },
      { v: 16, label: "굵게" }
    ];
    var colors = ["#1f2937", "#2563eb", "#dc2626", "#16a34a"];
    var widthBtns = [];
    var colorBtns = [];
    function pickWidth(v) {
      pen.width = v;
      get().prefs.pen.width = v; save();
      widthBtns.forEach(function (b, i) { b.classList.toggle("is-active", widths[i].v === v); });
    }
    function pickColor(col) {
      pen.color = col;
      get().prefs.pen.color = col; save();
      colorBtns.forEach(function (b, i) { b.classList.toggle("is-active", colors[i] === col); });
    }
    var widthRow = el("div", { class: "pad-row" }, [
      el("span", { class: "pad-label", text: "펜 굵기" }),
      el("div", { class: "pad-btns" }, widths.map(function (w) {
        var b = el("button", {
          class: "chip-btn" + (pen.width === w.v ? " is-active" : ""), type: "button",
          on: { click: function () { pickWidth(w.v); } }
        }, [w.label]);
        widthBtns.push(b);
        return b;
      }))
    ]);
    var colorRow = el("div", { class: "pad-row" }, [
      el("span", { class: "pad-label", text: "펜 색" }),
      el("div", { class: "pad-btns" }, colors.map(function (col) {
        var b = el("button", {
          class: "swatch" + (pen.color === col ? " is-active" : ""), type: "button",
          "aria-label": "펜 색 " + col, style: "background:" + col,
          on: { click: function () { pickColor(col); } }
        });
        colorBtns.push(b);
        return b;
      }))
    ]);
    var guideBtn = el("button", {
      class: "btn btn-ghost btn-small" + (guide ? " is-active" : ""), type: "button",
      on: {
        click: function () {
          guide = !guide;
          get().prefs.guide = guide; save();
          guideBtn.classList.toggle("is-active", guide);
          redraw();
        }
      }
    }, [ico("grid"), guide ? "안내 보기" : "안내 숨김"]);
    var gridLabel = el("span", { text: get().prefs.gridMode === "mi" ? "격자 米자" : "격자 田자" });
    var gridBtn = mode === "hanja" ? el("button", {
      class: "btn btn-ghost btn-small", type: "button",
      on: {
        click: function () {
          get().prefs.gridMode = get().prefs.gridMode === "mi" ? "ta" : "mi";
          save();
          gridLabel.textContent = get().prefs.gridMode === "mi" ? "격자 米자" : "격자 田자";
          redraw();
        }
      }
    }, [ico("grid"), gridLabel]) : null;
    var actions = el("div", { class: "pad-row" }, [
      el("button", {
        class: "btn btn-ghost btn-small", type: "button",
        on: { click: function () { if (strokes.length) { strokes.pop(); redraw(); } } }
      }, [ico("undo"), "되돌리기"]),
      el("button", {
        class: "btn btn-ghost btn-small", type: "button",
        on: { click: function () { strokes.length = 0; PAD_STROKES[glyph] = strokes; redraw(); } }
      }, [ico("trash"), "모두 지우기"]),
      guideBtn,
      gridBtn
    ]);

    wrap.appendChild(el("div", { class: "pad-tools" }, [widthRow, colorRow, actions]));
    wrap.appendChild(el("p", { class: "pad-hint", text: "손가락으로 따라 써 보세요. 글자를 바꾸면 그 글자의 연습장이 따로 저장돼요." }));
    host.appendChild(wrap);
    resize();
    // 처음 붙일 때는 너비가 아직 0일 수 있어, 다음 프레임과 크기 변화에서 다시 맞춥니다.
    if (global.requestAnimationFrame) global.requestAnimationFrame(resize);
    if (global.setTimeout) global.setTimeout(resize, 120);
    if (global.ResizeObserver) {
      try { new global.ResizeObserver(resize).observe(canvas); } catch (e) { /* noop */ }
    }
    return wrap;
  }

  /* ---------- 화면 ---------- */
  var UI = { tab: "today", flipped: false, cardIdx: 0, quiz: null, letter: 0 };
  var roots = { top: null, main: null, tab: null };

  function header() {
    var st = streakInfo();
    return el("div", { class: "top-row" }, [
      el("div", { class: "brand" }, [
        el("span", { class: "brand-mark", text: D.mark }),
        el("span", { class: "brand-name", text: D.name })
      ]),
      el("div", { class: "chips" }, [
        el("span", { class: "chip chip-flame" }, [ico("flame"), el("b", { text: st.count > 0 ? st.count + "일" : "시작" })]),
        el("span", { class: "chip chip-xp" }, [ico("bolt"), el("b", { text: String(get().xp) })])
      ])
    ]);
  }
  function courseSeg() {
    if (D.courses.length < 2) return null;
    return el("div", { class: "seg", role: "tablist", "aria-label": "학습 언어" }, D.courses.map(function (c) {
      var active = c.code === get().lang;
      return el("button", {
        class: "seg-btn" + (active ? " is-active" : ""), type: "button", role: "tab",
        "aria-selected": active ? "true" : "false",
        on: {
          click: function () {
            if (c.code === get().lang) return;
            get().lang = c.code;
            get().unit = 1;
            UI.cardIdx = 0;
            UI.quiz = null;
            save();
            render();
          }
        }
      }, [el("span", { class: "seg-flag", text: c.flag }), el("span", { text: c.name })]);
    }));
  }
  function levelChips() {
    if (levels().length < 2) return null;
    return el("div", { class: "levels", role: "tablist", "aria-label": "급수 단계 선택" }, levels().map(function (lv) {
      var s = levelStats(lv.id);
      var active = lv.id === get().level;
      var isGoal = lv.id === get().goal;
      return el("button", {
        class: "lv" + (active ? " is-active" : "") + (s.doneUnits >= s.units ? " is-full" : ""), type: "button",
        role: "tab", "aria-selected": active ? "true" : "false",
        "aria-label": lv.label + " " + s.doneUnits + "/" + s.units + "과",
        on: { click: function () { pickLevel(lv.id, { tab: "today" }); } }
      }, [
        el("span", { class: "lv-top" }, [
          el("span", { class: "lv-name", text: lv.label }),
          isGoal ? el("span", { class: "lv-goal", text: "목표" }) : null
        ]),
        el("span", { class: "lv-bar" }, [el("i", { style: "width:" + s.pct + "%" })]),
        el("span", { class: "lv-count", text: s.doneUnits + "/" + s.units })
      ]);
    }));
  }
  function countLabel(lv, n) { return n + (lv && lv.id === "words" ? "개" : "자"); }
  function stepBar() {
    var lv = levelOf(get().level);
    if (!lv) return null;
    var s = levelStats(lv.id);
    return el("div", { class: "step" }, [
      el("div", { class: "step-top" }, [
        el("span", { class: "step-label", text: lv.label + " 단계 · " + countLabel(lv, s.chars) + " 중 " + s.mastered + (lv.id === "words" ? "개" : "자") + " 외움" }),
        el("span", { class: "step-pct", text: s.pct + "%" })
      ]),
      el("div", { class: "step-bar", role: "progressbar", "aria-valuenow": String(s.pct), "aria-valuemin": "0", "aria-valuemax": "100" }, [
        el("i", { style: "width:" + s.pct + "%" })
      ]),
      el("p", { class: "step-note", text: s.doneUnits + "/" + s.units + "과 완료 · " + (lv.exam || "") })
    ]);
  }
  function levelDoneBanner() {
    var lv = levelOf(get().level);
    if (!lv) return null;
    var s = levelStats(lv.id);
    if (s.doneUnits < s.units) return null;
    var ls = levels();
    var idx = ls.indexOf(lv);
    var next = ls[idx + 1] || null;
    return el("div", { class: "level-done" }, [
      el("p", { class: "level-done-title", text: "🎉 " + lv.label + " 단계를 다 봤어요!" }),
      el("p", { class: "level-done-desc", text: next ? (next.label + " 단계로 넘어가 볼까요?") : "모든 단계를 마쳤어요. 카드로 복습해 보세요." }),
      next ? el("button", {
        class: "btn btn-primary btn-wide", type: "button",
        on: { click: function () { pickLevel(next.id, { tab: "today" }); } }
      }, [next.label + " 단계 시작하기"]) : null
    ]);
  }
  function renderTop() {
    var top = roots.top;
    if (!top) return;
    clear(top);
    top.appendChild(header());
    var seg = courseSeg();
    if (seg) top.appendChild(el("div", { class: "top-row top-row-2" }, [seg]));
    var lv = levelChips();
    if (lv) top.appendChild(el("div", { class: "top-row top-row-2" }, [lv]));
  }
  function renderTab() {
    var tab = roots.tab;
    if (!tab) return;
    clear(tab);
    D.tabs.forEach(function (t) {
      var active = UI.tab === t.id;
      tab.appendChild(el("button", {
        class: "tab" + (active ? " is-active" : ""), type: "button",
        "aria-label": t.label, "aria-current": active ? "page" : "false",
        on: { click: function () { UI.tab = t.id; UI.flipped = false; render(); } }
      }, [el("span", { class: "tab-ico" }, [ico(t.icon)]), el("span", { class: "tab-label", text: t.label })]));
    });
  }
  function unitPills(onPick) {
    return el("div", { class: "pills", role: "group", "aria-label": "단원 선택" }, levelUnits().map(function (u) {
      var active = u.no === get().unit;
      var done = !!(get().progress[u.id] && get().progress[u.id].learned);
      return el("button", {
        class: "pill" + (active ? " is-active" : "") + (done ? " is-done" : ""), type: "button",
        "aria-pressed": active ? "true" : "false",
        "aria-label": u.no + "과 " + u.goal,
        on: { click: function () { get().unit = u.no; save(); UI.cardIdx = 0; UI.quiz = null; render(); } }
      }, [el("span", { class: "pill-num", text: done ? "✓" : String(u.no) }), el("span", { class: "pill-char", text: u.items[0].text })]);
    }));
  }
  function audioRow(it) {
    return el("div", { class: "audio-row" }, [
      el("button", { class: "btn btn-blue btn-small", type: "button", on: { click: function () { speakItem(it, false); } } }, [ico("speaker"), "듣기"]),
      el("button", { class: "btn btn-ghost btn-small", type: "button", on: { click: function () { speakItem(it, true); } } }, [ico("slow"), "천천히"])
    ]);
  }

  /* 오늘 */
  function viewToday() {
    var u = unit();
    var us = levelUnits();
    var wrap = el("div", { class: "view" });
    wrap.appendChild(el("div", { class: "day-head" }, [
      el("p", { class: "eyebrow", text: u.stage + " · " + u.no + "과 / " + us.length + "과" }),
      el("h1", { class: "day-title", text: u.title }),
      el("p", { class: "day-goal", text: u.goal })
    ]));
    wrap.appendChild(stepBar());
    wrap.appendChild(unitPills());

    var listWrap = el("div", { class: "items" });
    u.items.forEach(function (it, i) {
      if (D.mode === "hanja") {
        listWrap.appendChild(el("section", { class: "item-card hanja-card" }, [
          el("div", { class: "hanja-top" }, [
            el("span", { class: "hanja-char", text: it.text }),
            el("div", { class: "hanja-meta" }, [
              el("p", { class: "hanja-read", text: it.read }),
              (it.ko && it.ko !== it.hun) ? el("p", { class: "hanja-ko", text: it.ko }) : null,
              el("p", { class: "hanja-sub" }, [
                el("span", { text: "부수 " + it.radical + " · 총 " + it.strokes + "획" })
              ])
            ])
          ]),
          (it.ex && it.ex.length) ? el("div", { class: "ex-row" }, it.ex.map(function (w) { return el("span", { class: "ex-chip", text: w }); })) : null,
          it.tip ? el("p", { class: "item-tip", text: it.tip }) : null,
          audioRow(it)
        ]));
      } else {
        listWrap.appendChild(el("section", { class: "item-card" }, [
          el("p", { class: "item-index", text: (i + 1) + " / " + u.items.length }),
          el("p", { class: "target", lang: get().lang, text: it.text }),
          it.read ? el("p", { class: "read-line", text: it.read }) : null,
          el("p", { class: "ko-line", text: it.ko }),
          el("p", { class: "item-tip", text: it.tip }),
          audioRow(it)
        ]));
      }
    });
    wrap.appendChild(listWrap);

    var done = !!(get().progress[u.id] && get().progress[u.id].learned);
    var nextUnit = u.no < us.length ? u.no + 1 : null;
    wrap.appendChild(el("button", {
      class: "btn btn-primary btn-wide",
      type: "button",
      "aria-disabled": done ? "true" : "false",
      on: {
        click: function () {
          if (done) { UI.tab = "cards"; UI.flipped = false; UI.cardIdx = 0; render(); return; }
          var earned = markLearned(u.id);
          if (earned) addXp(10);
          render();
        }
      }
    }, [done ? "카드로 복습하기" : "이 과 다 봤어요 · +10 XP"]));
    if (done && nextUnit) {
      wrap.appendChild(el("button", {
        class: "btn btn-ghost btn-wide btn-next", type: "button",
        on: { click: function () { get().unit = nextUnit; UI.cardIdx = 0; UI.quiz = null; save(); render(); } }
      }, ["다음 과로 ", ico("chevron")]));
    }
    var banner = levelDoneBanner();
    if (banner) wrap.appendChild(banner);
    wrap.appendChild(el("p", { class: "foot-note", text: "한 글자씩 소리 내어 읽고, 따라 쓰기에서 손으로 익혀 보세요. 훈음은 한국어문회 대표 훈음 기준이에요." }));
    if (D.otherApps && D.otherApps.length) {
      wrap.appendChild(el("div", { class: "section-head" }, [el("h2", { class: "group-title", text: "함께 쓰는 앱" })]));
      wrap.appendChild(el("div", { class: "app-links" }, D.otherApps.map(function (a) {
        return el("a", { class: "app-link", href: a.href }, [
          el("span", { class: "app-link-name", text: a.name }),
          el("span", { class: "app-link-desc", text: a.desc })
        ]);
      })));
    }
    return wrap;
  }

  /* 읽기·쓰기 (입문) */
  function lettersOf(c) {
    var out = [];
    ((D.writing && D.writing[c.code]) || { groups: [] }).groups.forEach(function (g) {
      g.letters.forEach(function (l) { out.push(l); });
    });
    return out;
  }
  function viewWriteBeginner() {
    var c = course();
    var letters = lettersOf(c);
    var tones = (D.writing[c.code] || {}).tones || [];
    var idx = clamp(get().prefs.letter, 0, Math.max(0, letters.length - 1));
    var cur = letters[idx] || { ch: "A", name: "", sound: "", ex: "" };
    var tone = tones[get().prefs.tone] || null;
    var glyph = tone ? tone.ex : cur.ch;
    var wrap = el("div", { class: "view" });
    wrap.appendChild(el("div", { class: "day-head" }, [
      el("p", { class: "eyebrow", text: c.name + " 읽기·쓰기" }),
      el("h1", { class: "day-title", text: "글자와 소리를 먼저 익혀요" }),
      el("p", { class: "day-goal", text: c.writingGoal })
    ]));

    var groups = (D.writing[c.code] || { groups: [] }).groups;
    var grid = el("div", { class: "letter-groups" });
    groups.forEach(function (g) {
      var box = el("section", { class: "letter-group" }, [
        el("h2", { class: "group-title", text: g.title }),
        el("div", { class: "letter-grid" }, g.letters.map(function (l) {
          var active = l.ch === cur.ch;
          var i = letters.indexOf(l);
          return el("button", {
            class: "letter" + (active ? " is-active" : ""), type: "button",
            "aria-pressed": active ? "true" : "false",
            on: {
              click: function () {
                get().prefs.letter = i; get().prefs.tone = -1; save(); UI.letter = i; render();
              }
            }
          }, [el("span", { class: "letter-ch", text: l.ch }), el("span", { class: "letter-name", text: l.name })]);
        }))
      ]);
      grid.appendChild(box);
    });
    wrap.appendChild(grid);

    var padHost = el("div", { class: "pad-host" });
    wrap.appendChild(el("section", { class: "focus-card" }, [
      el("div", { class: "focus-head" }, [
        el("span", { class: "focus-ch", text: tone ? tone.mark : cur.ch }),
        el("div", { class: "focus-meta" }, [
          el("p", { class: "focus-read", text: tone ? tone.name : cur.name + " · " + cur.sound }),
          el("p", { class: "focus-ko", text: tone ? tone.ex + " (" + tone.ko + ") · " + tone.tip : cur.ex }),
          el("button", {
            class: "btn btn-blue btn-small", type: "button",
            on: {
              click: function () {
                var say = tone ? tone.ex : cur.ex.replace(/\(.*$/, "").trim();
                speak(say, 0.85, c.locale);
              }
            }
          }, [ico("speaker"), tone ? "성조 듣기" : "예시 듣기"])
        ])
      ]),
      padHost
    ]));
    mountPad(padHost, glyph, "letter");

    if (tones.length) {
      var toneWrap = el("section", { class: "card tones" }, [
        el("h2", { class: "group-title", text: "성조 6가지 · 눌러서 따라 써 보세요" }),
        el("div", { class: "tone-grid" }, tones.map(function (t, i) {
          var active = get().prefs.tone === i;
          return el("button", {
            class: "tone" + (active ? " is-active" : ""), type: "button",
            "aria-pressed": active ? "true" : "false",
            on: {
              click: function () {
                get().prefs.tone = active ? -1 : i;
                save();
                if (!active) speak(t.ex, 0.8, c.locale);
                render();
              }
            }
          }, [
            el("span", { class: "tone-mark", text: t.mark }),
            el("span", { class: "tone-name", text: t.name }),
            el("span", { class: "tone-ex", text: t.ex + " · " + t.ko })
          ]);
        }))
      ]);
      wrap.appendChild(toneWrap);
    }

    if ((D.writing[c.code].rules || []).length) {
      var rules = el("section", { class: "card rules" }, [
        el("h2", { class: "group-title", text: "발음 규칙" })
      ]);
      D.writing[c.code].rules.forEach(function (r) {
        rules.appendChild(el("div", { class: "rule" }, [
          el("p", { class: "rule-title", text: r.title }),
          el("p", { class: "rule-body", text: r.body })
        ]));
      });
      wrap.appendChild(rules);
    }
    return wrap;
  }

  /* 급수 */
  function viewLevels() {
    var wrap = el("div", { class: "view" });
    var all = overallStats();
    wrap.appendChild(el("div", { class: "day-head" }, [
      el("p", { class: "eyebrow", text: "한국어문회 배정한자" }),
      el("h1", { class: "day-title", text: "급수별 단계" }),
      el("p", { class: "day-goal", text: "8급 50자 + 7급 100자 + 6급 150자 = 300자" })
    ]));
    wrap.appendChild(el("div", { class: "total-card" }, [
      el("div", { class: "step-top" }, [
        el("span", { class: "step-label", text: "전체 진도 · 외운 한자 " + all.mastered + " / " + all.chars + "자" }),
        el("span", { class: "step-pct", text: percent(all.mastered, all.chars) + "%" })
      ]),
      el("div", { class: "step-bar" }, [el("i", { style: "width:" + percent(all.mastered, all.chars) + "%" })]),
      el("p", { class: "step-note", text: all.doneUnits + "/" + all.units + "과 완료" })
    ]));

    wrap.appendChild(el("div", { class: "goal-row" }, [
      el("span", { class: "pad-label", text: "목표 급수" }),
      el("div", { class: "goal-seg" }, levels().filter(function (lv) { return lv.id !== "words"; }).map(function (lv) {
        var on = lv.id === get().goal;
        return el("button", {
          class: "goal-btn" + (on ? " is-active" : ""), type: "button",
          "aria-pressed": on ? "true" : "false",
          on: { click: function () { get().goal = lv.id; save(); render(); } }
        }, [lv.label]);
      }))
    ]));

    var list = el("div", { class: "level-list" });
    levels().forEach(function (lv) {
      var s = levelStats(lv.id);
      var active = lv.id === get().level;
      var isGoal = lv.id === get().goal;
      list.appendChild(el("section", { class: "level-card" + (active ? " is-active" : "") + (isGoal ? " is-goal" : "") }, [
        el("div", { class: "level-card-top" }, [
          el("span", { class: "level-emoji", text: lv.emoji }),
          el("div", { class: "level-head" }, [
            el("p", { class: "level-name" }, [
              el("span", { text: lv.label }),
              isGoal ? el("span", { class: "stage-tag tag-goal", text: "목표" }) : null
            ]),
            el("p", { class: "level-note", text: lv.note })
          ])
        ]),
        el("div", { class: "step-top" }, [
          el("span", { class: "step-label", text: countLabel(lv, lv.count) + " · " + s.doneUnits + "/" + s.units + "과" }),
          el("span", { class: "step-pct", text: s.pct + "%" })
        ]),
        el("div", { class: "step-bar" }, [el("i", { style: "width:" + s.pct + "%" })]),
        el("div", { class: "level-actions" }, [
          el("button", {
            class: "btn " + (isGoal ? "btn-primary" : "btn-ghost") + " btn-small", type: "button",
            on: { click: function () { pickLevel(lv.id, { tab: "today" }); } }
          }, [s.doneUnits === 0 ? lv.label + " 시작하기" : (s.doneUnits >= s.units ? "복습하기" : "이어서 학습")]),
          el("span", { class: "level-exam", text: lv.exam === "보너스" ? "" : lv.exam })
        ])
      ]));
    });
    wrap.appendChild(list);
    wrap.appendChild(el("p", { class: "foot-note", text: "급수와 대표 훈음은 한국어문회 배정한자 기준이에요. 7급은 7급Ⅱ 50자와 7급 50자, 6급은 6급Ⅱ 75자와 6급 75자로 나뉘어 있어요." }));
    return wrap;
  }

  /* 따라 쓰기 (한자) */
  function viewWriteHanja() {
    var u = unit();
    var idx = clamp(get().prefs.char, 0, u.items.length - 1);
    var cur = u.items[idx];
    var wrap = el("div", { class: "view" });
    wrap.appendChild(el("div", { class: "day-head" }, [
      el("p", { class: "eyebrow", text: "따라 쓰기 · " + u.stage + " " + u.no + "과" }),
      el("h1", { class: "day-title", text: cur.read + " (" + cur.ko + ")" }),
      el("p", { class: "day-goal", text: u.goal + " · 부수 " + cur.radical + " · 총 " + cur.strokes + "획" })
    ]));
    wrap.appendChild(unitPills());
    wrap.appendChild(el("div", { class: "char-chips" }, u.items.map(function (it, i) {
      return el("button", {
        class: "char-chip" + (i === idx ? " is-active" : ""), type: "button",
        on: { click: function () { get().prefs.char = i; save(); render(); } }
      }, [it.text]);
    })));

    var padHost = el("div", { class: "pad-host" });
    wrap.appendChild(el("section", { class: "focus-card" }, [
      el("div", { class: "focus-head" }, [
        el("span", { class: "focus-ch hanja", text: cur.text }),
        el("div", { class: "focus-meta" }, [
          el("p", { class: "focus-read", text: cur.read }),
          el("p", { class: "focus-ko", text: (cur.ko && cur.ko !== cur.hun ? cur.ko + " · " : "") + "부수 " + cur.radical + " · 총 " + cur.strokes + "획" }),
          el("div", { class: "ex-row" }, (cur.ex || []).map(function (w) { return el("span", { class: "ex-chip", text: w }); })),
          el("button", {
            class: "btn btn-blue btn-small", type: "button",
            on: { click: function () { speak(cur.read, 0.8, "ko-KR"); } }
          }, [ico("speaker"), "훈·음 듣기"])
        ])
      ]),
      el("p", { class: "item-tip", text: cur.tip }),
      padHost
    ]));
    mountPad(padHost, cur.text, "hanja");
    return wrap;
  }

  /* 카드 */
  function viewCards() {
    var u = unit();
    var idx = clamp(UI.cardIdx, 0, u.items.length - 1);
    var it = u.items[idx];
    var wrap = el("div", { class: "view" });
    wrap.appendChild(el("div", { class: "day-head" }, [
      el("p", { class: "eyebrow", text: u.stage + " " + u.no + "과 · " + u.title }),
      el("h1", { class: "day-title", text: "카드를 뒤집어 익혀요" }),
      el("p", { class: "day-goal", text: (idx + 1) + " / " + u.items.length + " · 외운 " + u.items.filter(function (x) { return isMastered(x.id); }).length + "개" })
    ]));

    var front, back;
    if (D.mode === "hanja") {
      front = [
        el("span", { class: "card-tag", text: "훈·음" }),
        el("p", { class: "card-main", text: it.read }),
        el("div", { class: "ex-row" }, (it.ex || []).map(function (w) { return el("span", { class: "ex-chip", text: w }); })),
        el("span", { class: "card-hint", text: "탭해서 한자 보기" })
      ];
      back = [
        el("span", { class: "card-tag", text: "漢字" }),
        el("p", { class: "card-char", text: it.text }),
        el("p", { class: "card-sub", text: it.read + (it.ko && it.ko !== it.hun ? " · " + it.ko : "") + " · " + it.strokes + "획" }),
        el("span", { class: "card-hint", text: "탭하면 훈·음으로" })
      ];
    } else {
      front = [
        el("span", { class: "card-tag", text: "한국어 뜻" }),
        el("p", { class: "card-main", text: it.ko }),
        el("span", { class: "card-hint", text: "탭해서 문장 보기" })
      ];
      back = [
        el("span", { class: "card-tag", text: course().native }),
        el("p", { class: "card-target", lang: get().lang, text: it.text }),
        it.read ? el("p", { class: "read-line", text: it.read }) : null,
        el("span", { class: "card-hint", text: "탭하면 뜻으로" })
      ];
    }
    var card = el("div", { class: "flash" + (UI.flipped ? " is-flipped" : ""), role: "button", tabindex: "0", "aria-label": "카드 뒤집기" }, [
      el("div", { class: "flash-inner" }, [
        el("div", { class: "face face-front" }, front),
        el("div", { class: "face face-back" }, back)
      ])
    ]);
    card.addEventListener("click", function () {
      UI.flipped = !UI.flipped;
      if (card.classList && card.classList.toggle) card.classList.toggle("is-flipped");
    });
    wrap.appendChild(card);
    wrap.appendChild(el("p", { class: "foot-note", text: D.mode === "hanja" ? "훈과 음을 먼저 떠올리고 한자를 확인해 보세요." : "뜻을 보고 문장을 떠올려 보세요." }));
    wrap.appendChild(el("div", { class: "flash-actions" }, [
      el("button", {
        class: "btn btn-ghost", type: "button",
        on: { click: function () { UI.cardIdx = (idx + 1) % u.items.length; UI.flipped = false; render(); } }
      }, ["아직 몰라요"]),
      el("button", {
        class: "btn btn-primary", type: "button",
        on: {
          click: function () {
            markMastered(it.id, true);
            UI.cardIdx = (idx + 1) % u.items.length;
            UI.flipped = false;
            render();
          }
        }
      }, ["외웠어요 ✓"])
    ]));
    wrap.appendChild(el("div", { class: "flash-nav" }, [
      el("button", { class: "btn btn-ghost btn-small", type: "button", on: { click: function () { UI.cardIdx = (idx - 1 + u.items.length) % u.items.length; UI.flipped = false; render(); } } }, [ico("back"), "이전"]),
      el("span", { class: "count", text: (idx + 1) + " / " + u.items.length }),
      el("button", { class: "btn btn-ghost btn-small", type: "button", on: { click: function () { UI.cardIdx = (idx + 1) % u.items.length; UI.flipped = false; render(); } } }, ["다음", ico("chevron")])
    ]));
    return wrap;
  }

  /* 퀴즈 */
  function optionsFor(target, pool, field) {
    var wrong = shuffle(pool.filter(function (x) { return x.id !== target.id && x[field] !== target[field]; })).slice(0, 3);
    var opts = wrong.map(function (x) { return { text: x[field], correct: false }; });
    opts.push({ text: target[field], correct: true });
    return shuffle(opts);
  }
  function startQuiz() {
    var u = unit();
    var pool = levelItems();
    if (pool.length < 4) pool = allItems();
    var field = D.mode === "hanja" ? "read" : "ko";
    var qs = shuffle(u.items).map(function (it) {
      return { item: it, options: optionsFor(it, pool, field), answered: false, picked: null, correct: null };
    });
    UI.quiz = { qs: qs, idx: 0, correct: 0, total: 0, done: false };
  }
  function viewQuiz() {
    var u = unit();
    if (!UI.quiz || UI.quiz.unitId !== u.id) {
      startQuiz();
      UI.quiz.unitId = u.id;
    }
    var q = UI.quiz;
    var wrap = el("div", { class: "view" });
    wrap.appendChild(el("div", { class: "day-head" }, [
      el("p", { class: "eyebrow", text: "퀴즈 · " + u.stage + " " + u.no + "과" }),
      el("h1", { class: "day-title", text: q.done ? "결과" : (D.mode === "hanja" ? "훈과 음을 골라 보세요" : "뜻을 골라 보세요") }),
      el("p", { class: "day-goal", text: q.done ? q.correct + " / " + q.total + " 문제를 맞혔어요" : (q.idx + 1) + " / " + q.qs.length })
    ]));

    if (q.done) {
      wrap.appendChild(el("div", { class: "result-card" }, [
        el("p", { class: "result-score", text: Math.round((q.correct / Math.max(1, q.total)) * 100) + "%" }),
        el("p", { class: "result-copy", text: q.correct === q.total ? "완벽해요! 이 단원을 다 익혔어요 🎉" : "좋아요. 틀린 문제는 카드로 다시 익혀 보세요." })
      ]));
      wrap.appendChild(el("div", { class: "flash-actions" }, [
        el("button", { class: "btn btn-ghost", type: "button", on: { click: function () { UI.quiz = null; render(); } } }, ["다시 풀기"]),
        el("button", {
          class: "btn btn-primary", type: "button",
          on: { click: function () { get().unit = Math.min(levelUnits().length, u.no + 1); UI.quiz = null; UI.tab = "today"; save(); render(); } }
        }, ["다음 과"])
      ]));
      return wrap;
    }

    var cur = q.qs[q.idx];
    var it = cur.item;
    var prompt = el("section", { class: "quiz-card" });
    if (D.mode === "hanja") {
      prompt.appendChild(el("p", { class: "quiz-char", text: it.text }));
      prompt.appendChild(el("button", {
        class: "btn btn-blue btn-small", type: "button",
        on: { click: function () { speak(it.read, 0.8, "ko-KR"); } }
      }, [ico("speaker"), "훈·음 듣기"]));
      prompt.appendChild(el("p", { class: "quiz-q", text: "이 한자의 훈과 음은?" }));
    } else {
      prompt.appendChild(el("button", {
        class: "play-btn", type: "button", "aria-label": "문장 듣기",
        on: { click: function () { speakItem(it, false); } }
      }, [ico("speaker")]));
      prompt.appendChild(el("p", { class: "quiz-target", lang: get().lang, text: it.text }));
      if (it.read) prompt.appendChild(el("p", { class: "read-line", text: it.read }));
      prompt.appendChild(el("p", { class: "quiz-q", text: "무슨 뜻일까요?" }));
    }
    wrap.appendChild(prompt);

    var opts = el("div", { class: "options" }, cur.options.map(function (o) {
      return el("button", {
        class: "option" + (cur.answered ? " is-locked" : "") + (cur.answered && o.correct ? " is-correct" : "") + (cur.answered && cur.correct === false && cur.picked === o.text ? " is-wrong" : ""), type: "button",
        on: {
          click: function () {
            if (cur.answered) return;
            cur.answered = true;
            cur.picked = o.text;
            cur.correct = !!o.correct;
            q.total += 1;
            if (o.correct) { q.correct += 1; addXp(2); }
            render();
          }
        }
      }, [el("span", { class: "option-text", text: o.text }), cur.answered && o.correct ? ico("check") : null]);
    }));
    wrap.appendChild(opts);

    if (cur.answered) {
      wrap.appendChild(el("div", { class: "banner " + (cur.correct ? "good" : "bad") }, [
        cur.correct ? "정답이에요! +2 XP" : "아쉬워요. 정답을 확인해 보세요."
      ]));
      wrap.appendChild(el("p", { class: "reveal", lang: get().lang, text: it.text + " · " + it.read + (D.mode === "hanja" ? " · " + it.ko : "") }));
      wrap.appendChild(el("button", {
        class: "btn btn-primary btn-wide", type: "button",
        on: {
          click: function () {
            if (q.idx + 1 >= q.qs.length) { q.done = true; }
            else { q.idx += 1; }
            render();
          }
        }
      }, [q.idx + 1 >= q.qs.length ? "결과 보기" : "다음 문제"]));
    } else {
      wrap.appendChild(el("p", { class: "foot-note", text: "보기 하나를 고르면 바로 정답을 확인해요." }));
    }
    return wrap;
  }

  /* ---------- 렌더 ---------- */
  function render() {
    if (!roots.main) return;
    renderTop();
    renderTab();
    clear(roots.main);
    var node;
    if (UI.tab === "write") node = D.mode === "hanja" ? viewWriteHanja() : viewWriteBeginner();
    else if (UI.tab === "levels") node = viewLevels();
    else if (UI.tab === "cards") node = viewCards();
    else if (UI.tab === "quiz") node = viewQuiz();
    else node = viewToday();
    roots.main.appendChild(node);
    if (roots.main.scrollTop !== undefined) roots.main.scrollTop = 0;
    if (global.scrollTo) { try { global.scrollTo(0, 0); } catch (e) { /* noop */ } }
  }

  function registerServiceWorker() {
    if (!global.navigator || !global.navigator.serviceWorker) return;
    try {
      var proto = global.location ? global.location.protocol : "";
      if (proto !== "https:" && proto !== "http:") return;
      global.navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(function () { /* 오프라인 캐시는 없어도 동작 */ });
    } catch (e) { /* noop */ }
  }

  function boot() {
    load();
    roots.top = document.getElementById("topbar");
    roots.main = document.getElementById("main");
    roots.tab = document.getElementById("tabbar");
    if (roots.tab) roots.tab.setAttribute("aria-label", "주요 메뉴");
    render();
    registerServiceWorker();
  }

  global.KingApp = {
    boot: boot, render: render, get: get, save: save,
    course: course, unit: unit, addXp: addXp, speak: speak,
    markLearned: markLearned, markMastered: markMastered, isMastered: isMastered,
    __ui: UI, __data: D
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
