/* Guardian Angel · Student Portal — app */
(() => {
  'use strict';

  const D = window.GA_DATA;
  const KEY = 'ga-portal-v1';

  /* ---------------------------------------------------------------- state */
  const blank = () => ({
    name: '', joined: null, done: {}, seen: [], quiz: null, signoff: null,
    sim: {}, tickets: [], scenarios: [], unanswered: [], vars: {}, sit: 'preforeclosure'
  });
  let S = blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(blank(), JSON.parse(raw));
  } catch (e) { /* storage blocked: run in memory */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* -------------------------------------------------------------- helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad = (n) => String(n).padStart(2, '0');
  const fmtDate = (iso, opts = { month: 'short', day: 'numeric', year: 'numeric' }) =>
    new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('en-US', opts);
  const daysSince = (iso) => iso ? Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 864e5)) : 0;

  const ICONS = {
    home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
    roof: '<ellipse cx="12" cy="5" rx="3.6" ry="1.1"/><path d="M3 17 12 9.5l9 7.5"/><path d="M8 17l4-3.2 4 3.2"/>',
    book: '<path d="M5 4.5h10.5A3.5 3.5 0 0 1 19 8v12H8.5A3.5 3.5 0 0 1 5 16.5z"/><path d="M5 16.5A3.5 3.5 0 0 1 8.5 13H19"/>',
    chat: '<path d="M4 5.5h16v10.5H10l-6 4.5z"/><path d="M8.5 10.5h7"/>',
    shield: '<path d="M12 3.2 19.5 6v5.6c0 4.4-3.2 8-7.5 9.2-4.3-1.2-7.5-4.8-7.5-9.2V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".6" class="ic-fill"/>',
    buoy: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.6"/><path d="m6 6 3.4 3.4M14.6 14.6 18 18M18 6l-3.4 3.4M9.4 14.6 6 18"/>',
    loop: '<path d="M4.5 12a7.5 7.5 0 0 1 13-5.1"/><path d="M19.5 12a7.5 7.5 0 0 1-13 5.1"/><path d="M17.8 3.5v3.7h-3.7M6.2 20.5v-3.7h3.7"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    moon: '<path d="M19.5 14.2A7.8 7.8 0 1 1 9.8 4.5a6.2 6.2 0 0 0 9.7 9.7z"/>',
    pin: '<path d="M9 3.5h6l-1.2 5.6 3.2 3.2H7l3.2-3.2z"/><path d="M12 12.3v8.2"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    play: '<path d="M7.5 4.8v14.4L19 12z" class="ic-fill"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    send: '<path d="M4.5 12 19.5 5l-4.6 14.5-3.1-5.9z"/><path d="m11.8 13.6 7.7-8.6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    chev: '<path d="m7 10 5 5 5-5"/>',
    flip: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18.3 3.5v3.4h-3.4"/>',
    alert: '<path d="M12 4 21 19.5H3z"/><path d="M12 10v4.2M12 17v.01"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',
    file: '<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4M9 12.5h6M9 16h6"/>',
    shuffle: '<path d="M4 7h3.5c4.5 0 4.5 10 9 10H20M4 17h3.5c1.6 0 2.6-1.3 3.4-3M15.6 10c.8-1.7 1.8-3 3.4-3H20"/><path d="m17.5 4.5 2.5 2.5-2.5 2.5M17.5 14.5l2.5 2.5-2.5 2.5"/>'
  };
  const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  const LOGO = (cls = '') => `<svg class="mark ${cls}" viewBox="0 0 200 200" aria-hidden="true">
      <ellipse class="mark-halo" cx="100" cy="52" rx="30" ry="8" fill="none" stroke="#E8B931" stroke-width="6"/>
      <path d="M22,140 L100,76 L178,140" fill="none" stroke="#2F6DB5" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M60,140 L100,108 L140,140" fill="none" stroke="#E8B931" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  let toastTimer;
  function toast(msg, ic = 'check') {
    const t = $('#toast');
    if (!t) return;
    t.innerHTML = icon(ic) + `<span>${esc(msg)}</span>`;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) {}
      ta.remove();
      return ok;
    }
  }

  /* ------------------------------------------------------------------ time */
  function zoneNow(tz, date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: 'numeric', minute: '2-digit', hourCycle: 'h23',
      timeZoneName: 'short', weekday: 'short', month: 'short', day: 'numeric'
    }).formatToParts(date);
    const get = (t) => (parts.find((p) => p.type === t) || {}).value;
    const h = +get('hour') % 24;
    return { h, m: +get('minute'), abbr: get('timeZoneName'), wd: get('weekday'), md: `${get('month')} ${get('day')}` };
  }
  const fmt12 = (h, m) => `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
  const hourLabel = (h) => (h === 0 ? '12 AM' : h === 12 ? 'noon' : h < 12 ? `${h} AM` : `${h - 12} PM`);
  function windowStatus(h, m) {
    const t = h + m / 60, { start, end } = D.window;
    if (t >= start && t < end) return { open: true, mins: Math.round((end - t) * 60) };
    const until = t < start ? start - t : 24 - t + start;
    return { open: false, mins: Math.round(until * 60) };
  }
  const dur = (mins) => { const h = Math.floor(mins / 60), m = mins % 60; return h ? `${h}h ${pad(m)}m` : `${m}m`; };
  const windowText = `${hourLabel(D.window.start)} – ${hourLabel(D.window.end)}`;

  function dialSVG(h, m, home) {
    const r2 = (n) => Math.round(n * 100) / 100;
    const pt = (hr, r) => {
      const a = (hr / 24) * Math.PI * 2 + Math.PI;
      return [r2(50 + r * Math.sin(a)), r2(50 - r * Math.cos(a))];
    };
    let ticks = '';
    for (let i = 0; i < 24; i++) {
      const major = i % 6 === 0;
      const [x1, y1] = pt(i, major ? 33 : 35.5), [x2, y2] = pt(i, 39);
      ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="tick${major ? ' major' : ''}"/>`;
    }
    let arc = '';
    if (!home) {
      const [sx, sy] = pt(D.window.start, 44), [ex, ey] = pt(D.window.end, 44);
      const large = D.window.end - D.window.start > 12 ? 1 : 0;
      arc = `<path d="M${sx} ${sy} A44 44 0 ${large} 1 ${ex} ${ey}" class="dial-window"/>`;
    }
    const [lx0, ly0] = pt(0, 25), [lx12, ly12] = pt(12, 25);
    const [hx, hy] = pt(h + m / 60, 30);
    return `<svg viewBox="0 0 100 100" class="dial-svg" aria-hidden="true">${arc}${ticks}
      <text x="${lx12}" y="${ly12}" class="dial-lbl">12</text><text x="${lx0}" y="${ly0}" class="dial-lbl">0</text>
      <line x1="50" y1="50" x2="${hx}" y2="${hy}" class="dial-hand"/>
      <circle cx="${hx}" cy="${hy}" r="3.2" class="dial-tip"/><circle cx="50" cy="50" r="4.2" class="dial-hub"/></svg>`;
  }

  function dialHTML(z, home) {
    return `<div class="dial${home ? ' is-home' : ''}" data-tz="${z.tz}" data-home="${home ? 1 : ''}">
      <div class="dial-face"><div class="dial-inner"></div></div>
      <div class="dial-meta">
        <span class="dial-city">${esc(z.name)}<small></small></span>
        <span class="dial-time mono">--:--</span>
        <span class="dial-status">${esc(z.note || z.city)}</span>
      </div>
    </div>`;
  }

  function updateClocks() {
    const now = new Date();
    $$('.dial').forEach((el) => {
      const home = !!el.dataset.home;
      const z = zoneNow(el.dataset.tz, now);
      $('.dial-inner', el).innerHTML = dialSVG(z.h, z.m, home);
      $('.dial-time', el).textContent = fmt12(z.h, z.m);
      $('.dial-city small', el).textContent = z.abbr || '';
      const st = $('.dial-status', el);
      if (home) { st.textContent = `${z.wd} ${z.md}`; return; }
      const w = windowStatus(z.h, z.m);
      el.classList.toggle('is-closed', !w.open);
      st.className = 'dial-status ' + (w.open ? 'open' : 'closed');
      st.textContent = w.open ? `Open · ${dur(w.mins)} left` : `Closed · opens in ${dur(w.mins)}`;
    });

    const states = D.zones.map((z) => { const t = zoneNow(z.tz, now); return { z, t, w: windowStatus(t.h, t.m) }; });
    const open = states.filter((s) => s.w.open);
    const sentence = $('#windowSentence');
    if (sentence) {
      let txt;
      if (open.length === states.length) txt = `The texting window is open in every US time zone right now. Eastern closes in ${dur(states[0].w.mins)}.`;
      else if (!open.length) {
        const soon = states.slice().sort((a, b) => a.w.mins - b.w.mins)[0];
        txt = `Every US time zone is outside the permitted window. ${soon.z.name} opens first, in ${dur(soon.w.mins)}. Good time for training.`;
      } else {
        const closed = states.filter((s) => !s.w.open).map((s) => s.z.name);
        txt = `The texting window is open in ${open.length} of ${states.length} US time zones. Still closed: ${closed.join(', ')}.`;
      }
      sentence.textContent = txt;
    }
    const ist = $('#istLine');
    if (ist) {
      const k = zoneNow(D.home.tz, now);
      ist.textContent = `${now.toLocaleDateString('en-US', { timeZone: D.home.tz, weekday: 'long', month: 'long', day: 'numeric' })} · ${fmt12(k.h, k.m)} IST`;
    }
    const tc = $('#topClock');
    if (tc) {
      const e = states[0];
      tc.innerHTML = `<b>${fmt12(e.t.h, e.t.m)}</b><small>New York · <span class="${e.w.open ? 'is-open' : 'is-closed'}">${e.w.open ? 'texting open' : 'texting closed'}</span></small>`;
      tc.title = `Eastern time · texting window ${windowText}, seller time`;
    }
  }

  /* --------------------------------------------------------------- linting */
  const LINT = [
    // compliance: any of these fails a practice attempt
    { kind: 'bad', re: /\$\s?\d[\d,.]*(\s?(k|m|grand|thousand|million)\b)?|\b\d{2,3}\s?k\b|\b\d{1,3},\d{3}\b|\b\d+\s?(grand|thousand|million)\b/i, msg: 'Quotes a price or figure. No figures or valuations.' },
    { kind: 'bad', re: /\b(close|closing)\s+(in|within|by)\s+(\d+|a|one|two|three|seven|ten)\b|\bguarantee/i, msg: 'Promises a closing date or an outcome.' },
    { kind: 'bad', re: /\b(we|i)\s*(can|could|will|'ll)\s+(\w+\s+){0,3}(stop|avoid|prevent|halt|save you from)\s+(the\s+|your\s+)?(foreclosure|auction|bankruptcy|lien)/i, msg: 'Promises an outcome on a legal matter.' },
    { kind: 'bad', re: /\b(act now|hurry|limited time|today only|before it'?s too late|won'?t last|last chance|don'?t miss|(offer|deal) (expires?|ends))\b/i, msg: 'Invents urgency or pressure.' },
    { kind: 'bad', re: /\b(you should|you could|you'?ll want to|i'?d|i would|i recommend|i suggest|my advice|best to|better to)\s+(\w+\s+){0,4}(file|declare|refinanc\w*|apply|claim|contest|appeal|skip|stop paying)\b/i, msg: 'Gives legal, tax or financial advice. Pass it upward.' },
    { kind: 'bad', re: /\b(i'?m|i am|we'?re|we are)\s+(also\s+)?(local|from (your|the) (area|neighborhood)|right (down the street|around the corner)|nearby|your neighbou?r)/i, msg: 'Pretends to be local.' },
    { kind: 'bad', re: /\b(whatsapp|telegram|instagram|facebook|dm me|my (cell|personal|own) (number|phone)|text me (on|at))\b/i, msg: 'Moves contact off the system.' },
    { kind: 'bad', re: /\b(send|share|give|provide)\s+(us\s+|me\s+)?(your\s+)?(bank|account number|ssn|social security|a deposit|money|a fee)/i, msg: 'Asks for money or financial details.' },
    // tone and US English
    { kind: 'warn', re: /\bkindly\b/i, hit: 'kindly', msg: '“Kindly” reads formal. Say “please”, or just ask.' },
    { kind: 'warn', re: /\bdo the needful\b/i, hit: 'do the needful', msg: 'Say exactly what you need instead.' },
    { kind: 'warn', re: /\brevert(s|ed|ing)?\b/i, hit: 'revert', msg: 'In the US “revert” means go back. Use “get back to you” or “reply”.' },
    { kind: 'warn', re: /\bprepone\b/i, msg: 'Not used in the US. Say “move up”.' },
    { kind: 'warn', re: /\bgood name\b/i, msg: 'Just ask “what’s your name?”' },
    { kind: 'warn', re: /\bintimate (you|me|us)\b/i, msg: 'Use “let you know”.' },
    { kind: 'warn', re: /\bupdation\b/i, msg: 'Use “update”.' },
    { kind: 'warn', re: /\b(dear sir|dear madam|respected sir|respected madam)\b/i, msg: 'Use the seller’s name, not sir or madam.' },
    { kind: 'warn', re: /\bat the earliest\b/i, msg: 'Sounds stiff. Try “when you get a chance”.' },
    { kind: 'warn', re: /\b(colour|favour|neighbour|honour|labour|behaviour|flavour)s?\b/i, msg: 'American spelling drops the u: color, favor, neighbor.' },
    { kind: 'warn', re: /\b(reali|organi|apologi|recogni|finali|priori|minimi|utili)s(e|ed|es|ing)\b/i, msg: 'Use -ize: realize, organize, apologize.' },
    { kind: 'warn', re: /\b(centre|metre|theatre)s?\b/i, msg: 'American spelling: center, meter.' },
    { kind: 'warn', re: /\bcheque\b/i, msg: 'American spelling: check.' },
    { kind: 'warn', re: /\bprogramme\b/i, msg: 'American spelling: program.' },
    { kind: 'warn', re: /\b(lakhs?|crores?)\b/i, msg: 'Use dollars, thousands and millions.' },
    { kind: 'warn', re: /₹|\bRs\.?\s?\d|\bINR\b/i, msg: 'Prices are in dollars.' },
    { kind: 'warn', re: /\b(sq\.?\s?m|square met(re|er)s?)\b/i, msg: 'Areas are in square feet.' },
    { kind: 'warn', re: /\b(1[3-9]|2\d|3[01])[\/.-](0?[1-9]|1[0-2])[\/.-]\d{2,4}\b/, msg: 'Day-first date. US dates are month first: 10/21/2026.' },
    { kind: 'warn', re: /\b(you'?re wrong|that'?s not true|you don'?t understand|actually,? you)\b/i, msg: 'Sounds like arguing. Acknowledge, don’t correct.' }
  ];
  function lint(text) {
    const out = [];
    LINT.forEach((r) => {
      const all = text.match(new RegExp(r.re.source, r.re.flags + 'g'));
      if (all) out.push({ kind: r.kind, hit: [...new Set(all.map((h) => h.trim()))].join(', '), msg: r.msg });
    });
    return out;
  }
  function structure(text) {
    const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 1);
    return {
      sentences: sentences.length,
      questions: (text.match(/\?/g) || []).length,
      placeholders: (text.match(/\[(name|city|area|website)\]/gi) || []),
      shouty: (text.match(/!/g) || []).length > 1,
      first: sentences[0] || ''
    };
  }

  /* ---------------------------------------------------------------- search */
  const STOP = new Set('a an the to of and or is are am i me my we our you your it its do does did can could should would will what when where who how if in on at for with be this that there then than as about from by not no yes so just get seller sellers says said tell told their them they he she his her ask asks asked want wants'.split(' '));
  const SYN = { price: ['offer', 'value', 'worth', 'number'], offer: ['price', 'number'], pay: ['offer', 'price'], worth: ['offer', 'price', 'value'], text: ['message', 'reply'], hours: ['time', 'permitted', 'window'], night: ['hours', 'permitted', 'window'], stop: ['opt', 'unsubscribe', 'remove'], lawyer: ['attorney', 'legal'], attorney: ['lawyer', 'legal'], died: ['passed', 'probate', 'inherited'], dead: ['passed', 'probate'], scam: ['legit', 'trust'], call: ['phone'], whatsapp: ['personal', 'phone', 'app'] };
  const tokens = (q) => q.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));

  const INDEX = [
    ...D.sections.map((s) => ({ type: 'Section', title: `${s.num} ${s.title}`, text: s.short, route: s.id })),
    ...D.faq.map((f) => ({ type: 'FAQ', title: f.q, text: f.a, keys: f.keys, route: f.route, anchor: f.anchor })),
    ...D.glossary.map((g) => ({ type: 'Glossary', title: g.term, text: g.meaning, route: 'basics', anchor: 'term-' + slug(g.term) })),
    ...D.replies.map((r) => ({ type: 'Reply', title: r.says, text: (r.reply || r.noReply) + ' Next: ' + r.next, keys: r.keys, route: 'playbook', anchor: 'reply-' + r.id })),
    ...D.rules.map((r) => ({ type: 'Rule', title: r.rule, text: r.means, route: 'compliance', anchor: 'rule-' + slug(r.rule) })),
    ...D.neverDo.map((n, i) => ({ type: 'Never do', title: n, text: `Never do #${pad(i + 1)}`, route: 'compliance', anchor: 'never' })),
    ...D.situations.map((s) => ({ type: 'Situation', title: s.name, text: `${s.mind}. Helps: ${s.helps}. Avoid: ${s.avoid}.`, route: 'basics', anchor: 'situations', sit: s.id })),
    ...D.escalation.student.map((x) => ({ type: 'Escalation', title: x, text: 'Student decides', route: 'support', anchor: 'escalation' })),
    ...D.escalation.lead.map((x) => ({ type: 'Escalation', title: x, text: 'Team lead decides', route: 'support', anchor: 'escalation' })),
    ...D.escalation.management.map((x) => ({ type: 'Escalation', title: x, text: 'Management decides', route: 'support', anchor: 'escalation' })),
    ...D.personas.map((p) => ({ type: 'Simulator', title: p.name, text: p.tests, route: 'training', anchor: 'simulator', persona: p.id }))
  ].map((d) => ({ ...d, _t: d.title.toLowerCase(), _x: (d.text + ' ' + (d.keys || '')).toLowerCase() }));

  function search(q, { expand = false, limit = 8 } = {}) {
    const ql = q.trim().toLowerCase();
    if (!ql) return [];
    let toks = tokens(ql);
    if (expand) toks = [...new Set(toks.flatMap((t) => [t, ...(SYN[t] || [])]))];
    if (!toks.length) toks = [ql];
    return INDEX.map((d) => {
      let s = 0;
      if (d._t === ql) s += 30;
      else if (d._t.startsWith(ql)) s += 16;
      else if (d._t.includes(ql)) s += 10;
      toks.forEach((t) => {
        const re = new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        if (re.test(d._t)) s += 3; else if (d._t.includes(t)) s += 1.5;
        if (re.test(d._x)) s += 1.2;
      });
      if (d.type === 'FAQ') s *= 1.15;
      return { d, s };
    }).filter((r) => r.s > 0).sort((a, b) => b.s - a.s).slice(0, limit);
  }

  const hl = (text, q) => {
    const safe = esc(text);
    const toks = tokens(q).filter((t) => t.length > 2);
    if (!toks.length) return safe;
    const re = new RegExp('(' + toks.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  };

  /* ------------------------------------------------------------- progress */
  function moduleStatus() {
    const simPassed = D.personas.filter((p) => S.sim[p.id] && S.sim[p.id].pass).length;
    return D.modules.map((m) => {
      let state = 'todo', label = 'Not started';
      switch (m.id) {
        case 'm-company': if (S.done.company) { state = 'done'; label = 'Complete'; } break;
        case 'm-basics': if (S.done.basics) { state = 'done'; label = 'Complete'; } break;
        case 'm-situations': {
          const n = S.seen.length;
          if (n >= D.situations.length) { state = 'done'; label = 'Complete'; }
          else if (n) { state = 'progress'; label = `${n} of ${D.situations.length} read`; }
          break;
        }
        case 'm-playbook': if (S.done.playbook) { state = 'done'; label = 'Sent for marking'; } break;
        case 'm-compliance':
          if (S.quiz && S.quiz.pass && S.signoff) { state = 'done'; label = 'Passed · 100%'; }
          else if (S.signoff || S.quiz) { state = 'progress'; label = S.signoff ? 'Signed · test pending' : 'Test pending sign off'; }
          break;
        case 'm-practice':
          if (simPassed === D.personas.length) { state = 'done'; label = 'All personas passed'; }
          else if (simPassed) { state = 'progress'; label = `${simPassed} of ${D.personas.length} passed`; }
          break;
      }
      return { ...m, state, label };
    });
  }
  const certified = () => moduleStatus().every((m) => m.state === 'done');

  function ring(pct, label) {
    const C = 2 * Math.PI * 40;
    return `<div class="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" class="ring-track"/>
      <circle cx="50" cy="50" r="40" class="bar" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${(C * (1 - pct / 100)).toFixed(2)}"/></svg>
      <div class="ring-label"><span>${label ?? pct + '<small>%</small>'}</span></div></div>`;
  }

  /* ================================================================ VIEWS */

  function head(sec) {
    const done = !!S.done[sec.id];
    return `<header class="page-head">
      <span class="emboss" aria-hidden="true">${sec.num}</span>
      <div>
        <p class="eyebrow"><span class="eyebrow-num">${sec.num}</span>${esc(sec.kicker)}</p>
        <h1>${esc(sec.title)}</h1>
        <p class="lede"><strong>${esc(sec.lead)}</strong> ${esc(sec.intro)}</p>
      </div>
      <button class="btn complete-btn${done ? ' is-done' : ''}" data-action="complete" data-id="${sec.id}">${icon('check')}<span>${done ? 'Section complete' : 'Mark section complete'}</span></button>
    </header>`;
  }
  const sub = (title, p, num, tools = '') => `<div class="sub-head"><h2>${num ? `<span class="tick-num">${num}</span>` : ''}${title}</h2>${p ? `<p>${p}</p>` : ''}${tools ? `<div class="sub-tools">${tools}</div>` : ''}</div>`;

  /* ---------------------------------------------------------- dashboard */
  function pageDashboard() {
    const k = zoneNow(D.home.tz);
    const greet = k.h < 5 ? 'Working late' : k.h < 12 ? 'Good morning' : k.h < 17 ? 'Good afternoon' : 'Good evening';
    const mods = moduleStatus();
    const doneN = mods.filter((m) => m.state === 'done').length;
    const pct = Math.round((doneN / mods.length) * 100);
    const next = D.sections.find((s) => !S.done[s.id]);
    const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);
    const daily = D.replies.filter((r) => r.reply)[day % D.replies.filter((r) => r.reply).length];

    return `
    <header class="dash-head">
      <div>
        <p class="eyebrow" id="istLine">&nbsp;</p>
        <h1 class="dash-title">${greet}, <span class="serif">${esc(S.name)}</span>.</h1>
        <p class="lede" id="windowSentence">&nbsp;</p>
      </div>
      <div class="ring-card raised">
        ${ring(pct)}
        <div class="ring-copy"><b>${doneN} of ${mods.length} modules</b><span>${certified() ? 'Ready for supervised access' : 'toward supervised access'}</span><br>
        <a class="btn btn-sm" href="#/training">${icon('target')}Training</a></div>
      </div>
    </header>

    <div class="grid-2">
      <section class="card">
        <div class="card-head"><div><h2>Announcements</h2><p>Policy changes, new replies and rule updates land here first.</p></div></div>
        <ul class="notes">${D.announcements.map((a) => `<li><time>${fmtDate(a.date)}</time><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p></li>`).join('')}</ul>
      </section>
      <section class="card scenario-card">
        <div class="card-head"><div><h2>Today’s scenario</h2><p>One short scenario a day. Think of your reply, then flip.</p></div></div>
        ${flipCard(daily)}
      </section>
    </div>

    <section class="card pinned mt" id="pinned">
      <div class="pinned-head">
        <span class="pin">${icon('pin')}</span>
        <span class="grow"><h3>Never do this</h3><p>Pinned for every student. Signed before live access.</p></span>
      </div>
      <div class="pinned-body">
        <ol class="never-mini">${D.neverDo.map((n, i) => `<li><span>${pad(i + 1)}</span>${esc(n)}</li>`).join('')}</ol>
      </div>
    </section>

    <section class="card clocks-card mt" id="clocks">
      <div class="card-head">
        <div><h2>Seller local time</h2><p>Check the seller’s clock before every message. The gold arc is the permitted window: ${windowText} in their time zone.</p></div>
        <span class="counsel-note" title="${esc(D.window.note)}">${icon('info')}Window set by counsel</span>
      </div>
      <div class="dials">${D.zones.map((z) => dialHTML(z)).join('')}${dialHTML(D.home, true)}</div>
      <div class="converter">
        <div class="well">
          <label class="label" for="istInput">IST converter</label>
          <input class="field" type="datetime-local" id="istInput">
          <p class="muted" style="font-size:12.5px;margin-top:10px">Pick a time in India to see what it is for the seller.</p>
        </div>
        <div class="conv-list" id="convList"></div>
      </div>
    </section>

    <div class="grid-2 mt">
      <section class="card">
        <div class="card-head"><div><h2>Your path</h2><p>${next ? `Up next: <b>${next.num} ${esc(next.title)}</b>` : 'Every section is marked complete.'}</p></div></div>
        <ol class="sec-list">${D.sections.map((s) => `<li class="${next && next.id === s.id ? 'is-next' : ''}"><a href="#/${s.id}">
          <span class="n">${s.num}</span><span class="t">${esc(s.title)}<small>${esc(s.short)}</small></span>
          <span class="s">${S.done[s.id] ? icon('check') : ''}</span></a></li>`).join('')}</ol>
      </section>
      <section class="card">
        <div class="card-head"><div><h2>Access levels</h2><p>You earn live access in stages.</p></div><a class="btn btn-sm" href="#/training" data-anchor="levels">Details</a></div>
        <ol class="lv-list">${D.levels.map((l, i) => `<li class="lv${i === 0 ? ' is-current' : ''}">
          <span class="lv-n">${i + 1}</span>
          <div class="lv-body">
            <div class="lv-top"><b>${esc(l.name)}</b>${i === 0 ? '<em>Your level</em>' : ''}</div>
            <p>${esc(l.access)}</p>
            ${i === 0 ? `<small>To move up: ${esc(l.up.toLowerCase())}.</small>` : ''}
          </div></li>`).join('')}</ol>
        <p class="ladder-note">A compliance breach at the independent level sends a student back to supervised work for a fixed period.</p>
      </section>
    </div>

`;
  }

  function flipCard(r) {
    return `<button class="flip" data-action="flip" aria-label="Flip card">
      <div class="flip-inner">
        <div class="flip-face"><span class="eyebrow">Seller says</span><q>${esc(r.says)}</q><span class="hint">${icon('flip')}Tap to see the approved reply</span></div>
        <div class="flip-face flip-back"><span class="eyebrow">Approved reply</span><p>${esc(r.reply || r.noReply)}</p><span class="eyebrow" style="margin-top:6px">Next step</span><p>${esc(r.next)}</p></div>
      </div></button>`;
  }

  function mountDashboard(v) {
    const inp = $('#istInput', v);
    const k = new Intl.DateTimeFormat('en-CA', { timeZone: D.home.tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const g = (t) => (k.find((p) => p.type === t) || {}).value;
    inp.value = `${g('year')}-${g('month')}-${g('day')}T${pad(+g('hour') % 24)}:${g('minute')}`;
    const conv = () => {
      const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(inp.value);
      if (!m) return;
      const utc = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) - 330 * 60000;
      const d = new Date(utc);
      $('#convList', v).innerHTML = D.zones.map((z) => {
        const t = zoneNow(z.tz, d), w = windowStatus(t.h, t.m);
        return `<div class="conv-item"><small>${esc(z.name)} · ${t.wd}</small><b>${fmt12(t.h, t.m)}</b><span class="st ${w.open ? 'open' : 'closed'}">${w.open ? 'Inside window' : 'Outside window'}</span></div>`;
      }).join('');
    };
    inp.addEventListener('input', conv);
    conv();
  }

  /* ---------------------------------------------------------- 01 company */
  function pageCompany(sec) {
    return head(sec) + `
    <section class="block">
      <div class="card video-card">
        <div class="video-frame">
          ${LOGO('frame-mark')}
          <button class="play" data-action="toast" data-msg="The founder recording appears here once it’s uploaded." aria-label="Play founder welcome video">${icon('play')}</button>
          <div class="video-meta"><span class="chip">5 min</span><span>Recorded once · reused for every intake</span></div>
        </div>
        <div class="video-copy">
          <p class="eyebrow">Founder welcome video</p>
          <h2>Start here, <span class="serif">before anything else.</span></h2>
          <p>A five minute recording that replaces the live introduction management would otherwise repeat for each new group.</p>
          <ul class="ticks">
            <li>${icon('check')}Who Guardian Angel is</li>
            <li>${icon('check')}Why the firm works with distressed properties</li>
            <li>${icon('check')}What good work from a student looks like</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="block">
      ${sub('Where properties come from', 'Guardian Angel identifies distressed residential properties across the United States through these signals, then buys, renovates and resells them. You are the first person the owner speaks to, so your replies decide how many conversations become deals.')}
      <div class="signal-row">${D.signals.map((s, i) => `<span class="signal"><span>${pad(i + 1)}</span>${esc(s)}</span>`).join('')}</div>
    </section>

    <section class="block">
      ${sub('How a deal moves', 'The full path a property takes, with your stages marked. Knowing what happens after a conversation is handed over helps you collect the right details the first time.')}
      <div class="track" aria-hidden="true">${D.pipeline.map((p, i) => `<div class="track-node${p.you ? ' is-you' : ''}"><i>${pad(i + 1)}</i>${esc(p.stage)}</div>`).join('')}</div>
      <ol class="pipeline">${D.pipeline.map((p, i) => `<li class="stage${p.you ? ' is-you' : ''}">
        <span class="stage-n">${pad(i + 1)}</span>${p.you ? '<span class="chip is-gold you-tag">Your stage</span>' : ''}
        <h3>${esc(p.stage)}</h3><p>${esc(p.what)}</p><span class="who">${esc(p.who)}</span></li>`).join('')}</ol>
    </section>

    <section class="block">
      ${sub('Why owners sell to Guardian Angel', 'Explain the value of a direct sale in terms of the owner’s problem.')}
      <div class="value-grid">${D.ownerValue.map((v, i) => `<div class="value"><span class="vn">${pad(i + 1)}</span><b>${esc(v.gets)}</b><p>${esc(v.means)}</p></div>`).join('')}</div>
      <div class="callout">${icon('alert')}<p>Describe how the process generally works. <b>Never promise a price, a closing date or an outcome.</b></p></div>
    </section>`;
  }

  /* ----------------------------------------------------------- 02 basics */
  function pageBasics(sec) {
    return head(sec) + `
    <section class="block" id="glossary">
      ${sub('Glossary', `Sixteen terms you will see in seller conversations. Also searchable from every page with <kbd>${isMac ? '⌘' : 'Ctrl'} K</kbd>.`)}
      <div class="toolbar">
        <div class="search-field">${icon('search')}<input class="field" id="glossQ" placeholder="Filter terms, e.g. lien, escrow, probate" autocomplete="off"></div>
        <span class="count" id="glossCount">${D.glossary.length} terms</span>
      </div>
      <div class="glossary" id="glossList"></div>
    </section>

    <section class="block">
      ${sub('Working with the US', 'Write the way an American neighbor would. Short, plain, and on their clock.')}
      <div class="us-grid">${D.usRules.map((r, i) => `<div class="us-tile"><span class="n">${pad(i + 1)}</span><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></div>`).join('')}</div>
      <div class="checker">
        <div>
          <label class="label" for="phraseIn">Phrase check</label>
          <textarea class="field" id="phraseIn" placeholder="Paste a draft reply. It flags Indian English phrases, British spellings, rupees, metric areas, day-first dates and red-line wording."></textarea>
          <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
            <button class="btn btn-sm" data-action="phrase-sample">Try an example</button>
            <button class="btn btn-sm btn-ghost" data-action="phrase-clear">Clear</button>
          </div>
        </div>
        <div class="checker-out" id="phraseOut"></div>
      </div>
    </section>

    <section class="block" id="situations">
      ${sub('Seller situations', 'Each type of distress comes with a different state of mind. Read all seven to complete the Seller situations module.')}
      <div class="seg" role="tablist">${D.situations.map((s) => `<button role="tab" data-action="sit" data-id="${s.id}" class="${S.sit === s.id ? 'active' : ''}${S.seen.includes(s.id) ? ' is-seen' : ''}">${esc(s.name)}<span class="seen"></span></button>`).join('')}</div>
      <div id="sitPanel"></div>
    </section>`;
  }

  function renderGlossary(q = '') {
    const list = $('#glossList');
    if (!list) return;
    const ql = q.trim().toLowerCase();
    const items = D.glossary.filter((g) => !ql || g.term.toLowerCase().includes(ql) || g.meaning.toLowerCase().includes(ql));
    $('#glossCount').textContent = `${items.length} of ${D.glossary.length} terms`;
    const mark = (t) => ql ? esc(t).replace(new RegExp('(' + ql.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>') : esc(t);
    list.innerHTML = items.length
      ? items.map((g) => `<div class="term" id="term-${slug(g.term)}"><h3>${mark(g.term)}</h3><p>${mark(g.meaning)}</p></div>`).join('')
      : `<div class="empty" style="grid-column:1/-1">No term matches “${esc(q)}”. Try the handbook assistant in 06 Self serve support.</div>`;
  }

  function renderSituation() {
    const s = D.situations.find((x) => x.id === S.sit) || D.situations[0];
    if (!S.seen.includes(s.id)) { S.seen.push(s.id); save(); }
    $$('.seg button').forEach((b) => {
      b.classList.toggle('active', b.dataset.id === s.id);
      b.classList.toggle('is-seen', S.seen.includes(b.dataset.id));
      b.setAttribute('aria-selected', b.dataset.id === s.id);
    });
    const p = $('#sitPanel');
    if (!p) return;
    const n = S.seen.length;
    p.innerHTML = `<div class="sit-panel">
      <p class="eyebrow">Situation ${pad(D.situations.indexOf(s) + 1)} of ${pad(D.situations.length)}</p>
      <h3 style="margin-top:8px">${esc(s.name)}</h3>
      <div class="sit-cols">
        <div class="sit-col mind"><span class="label"><i></i>State of mind</span><p>${esc(s.mind)}</p></div>
        <div class="sit-col helps"><span class="label"><i></i>What helps</span><p>${esc(s.helps)}</p></div>
        <div class="sit-col avoid"><span class="label"><i></i>What to avoid</span><p>${esc(s.avoid)}</p></div>
      </div>
      <div class="sit-progress"><span>${n >= D.situations.length ? 'All seven read. Seller situations module complete.' : `${n} of ${D.situations.length} read`}</span>
      <span class="dots">${D.situations.map((x) => `<i class="${S.seen.includes(x.id) ? 'on' : ''}"></i>`).join('')}</span></div>
    </div>`;
  }

  function renderPhrase() {
    const inp = $('#phraseIn'), out = $('#phraseOut');
    if (!inp || !out) return;
    const t = inp.value.trim();
    if (!t) { out.innerHTML = `<h3>${icon('file')}Results</h3><p class="muted" style="font-size:14px">Nothing to check yet.</p>`; return; }
    const f = lint(t), st = structure(t);
    const extra = [];
    if (st.sentences > 3) extra.push({ kind: 'warn', hit: `${st.sentences} sentences`, msg: 'Keep it to two or three sentences.' });
    if (st.questions > 1) extra.push({ kind: 'warn', hit: `${st.questions} questions`, msg: 'One question at a time.' });
    st.placeholders.forEach((p) => extra.push({ kind: 'warn', hit: p, msg: 'Fill in the placeholder before sending.' }));
    const all = [...f.filter((x) => x.kind === 'bad'), ...f.filter((x) => x.kind === 'warn'), ...extra];
    out.innerHTML = `<h3>${icon('file')}${all.length ? `${all.length} thing${all.length > 1 ? 's' : ''} to fix` : 'Reads naturally'}</h3>` + (all.length
      ? `<ul class="flags">${all.map((x) => `<li class="is-${x.kind}"><code>${esc(x.hit)}</code><span>${esc(x.msg)}</span></li>`).join('')}</ul>`
      : `<p class="clean">${icon('check')}No phrasing issues found. Still read it once as the seller would.</p>`);
  }

  function mountBasics(v) {
    renderGlossary();
    renderSituation();
    renderPhrase();
    $('#glossQ', v).addEventListener('input', (e) => renderGlossary(e.target.value));
    $('#phraseIn', v).addEventListener('input', renderPhrase);
  }

  /* --------------------------------------------------------- 03 playbook */
  function pagePlaybook(sec) {
    return head(sec) + `
    <section class="block">
      ${sub('How we write', 'Five principles behind every approved reply.')}
      <div class="principles">${D.principles.map((p, i) => `<div class="principle"><span class="n">${pad(i + 1)}</span><h3>${esc(p.p)}</h3><p>${esc(p.how)}</p></div>`).join('')}</div>
      <div class="cadence" id="cadence">${D.cadence.map((c) => `<div><b>${esc(c.k)}</b><span>${esc(c.v)}</span></div>`).join('')}</div>
    </section>

    <section class="block" id="library">
      ${sub('Response library', 'Searchable by keyword. Each reply is a starting point and is adjusted to the seller. Never paste the same reply twice.')}
      <div class="personalize">
        <div class="personalize-head"><b>Fill the placeholders</b><span>Stays in this browser</span></div>
        ${['Name', 'City', 'Area', 'website'].map((k) => `<div><label class="label" for="var-${k}">[${k}]</label><input class="field" id="var-${k}" data-var="${k}" value="${esc(S.vars[k] || '')}" placeholder="${k === 'website' ? 'approved URL' : k === 'Name' ? 'Seller’s first name' : k}"></div>`).join('')}
      </div>
      <div class="toolbar">
        <div class="search-field">${icon('search')}<input class="field" id="replyQ" placeholder="What did the seller say? e.g. price, scam, passed away" autocomplete="off"></div>
        <span class="count" id="replyCount"></span>
      </div>
      <div class="replies" id="replyList"></div>
    </section>

    <section class="block">
      ${sub('Better and worse', 'Real comparisons teach judgement faster than rules.')}
      <div class="bw">${D.betterWorse.map((b) => `<div class="bw-item">
        <p class="bw-seller">“${esc(b.seller)}”</p>
        <div class="bw-cols">
          <div class="bw-col worse"><span class="label">${icon('x')}Worse</span><p>“${esc(b.worse)}”</p></div>
          <div class="bw-col better"><span class="label">${icon('check')}Better</span><p>${b.better ? `“${esc(b.better)}”` : `<em>${esc(b.betterNote)}</em>`}</p></div>
        </div>
        <p class="bw-why">${esc(b.why)}</p></div>`).join('')}</div>
    </section>

    <section class="block">
      ${sub('Transcripts', 'Two collections of anonymised conversations. Students are never named.')}
      <div class="transcripts">
        <div class="tx"><h3>${icon('check')}Became deals</h3><p>Conversations that became deals, annotated at the points where the student’s reply moved things forward.</p><span class="chip chip-flat">Opens once the first transcripts are approved</span></div>
        <div class="tx"><h3>${icon('alert')}Went wrong</h3><p>Conversations that went wrong, each with the reply that should have been sent.</p><span class="chip chip-flat">Opens once the first transcripts are approved</span></div>
      </div>
    </section>`;
  }

  function fillReply(text, raw) {
    return text.replace(/\[(Name|City|Area|website)\]/g, (m, k) => {
      const v = (S.vars[k] || '').trim();
      if (raw) return v || m;
      return v ? `<span class="filled">${esc(v)}</span>` : `<span class="ph">${m}</span>`;
    });
  }

  function renderReplies(q = '') {
    const list = $('#replyList');
    if (!list) return;
    const ql = q.trim().toLowerCase();
    const toks = tokens(ql);
    const items = D.replies.filter((r) => {
      if (!ql) return true;
      const hay = `${r.says} ${r.reply} ${r.next} ${r.keys}`.toLowerCase();
      return hay.includes(ql) || (toks.length && toks.some((t) => hay.includes(t)));
    });
    $('#replyCount').textContent = `${items.length} of ${D.replies.length} replies`;
    list.innerHTML = items.length ? items.map((r) => `<article class="reply" id="reply-${r.id}">
        <div><span class="reply-label">Seller says</span><div class="bubble in">${esc(r.says)}</div></div>
        <div><span class="reply-label">Reply</span>${r.reply
          ? `<div class="bubble out">${fillReply(esc(r.reply))}</div>`
          : `<div class="bubble out none">${esc(r.noReply)}</div>`}</div>
        <div><span class="reply-label">Next step</span><p class="reply-next">${esc(r.next)}</p>
          <div class="reply-meta"><small>v${D.version} · reviewed ${fmtDate(D.reviewed)}</small>
          ${r.reply ? `<button class="btn btn-sm" data-action="copy-reply" data-id="${r.id}">${icon('copy')}Copy</button>` : ''}</div></div>
      </article>`).join('')
      : `<div class="empty">No approved reply matches that. Ask your team lead, then <a href="#/feedback" data-anchor="submit">submit it as a new scenario</a>.</div>`;
  }

  function mountPlaybook(v) {
    renderReplies();
    $('#replyQ', v).addEventListener('input', (e) => renderReplies(e.target.value));
    $$('[data-var]', v).forEach((inp) => inp.addEventListener('input', () => {
      S.vars[inp.dataset.var] = inp.value; save();
      renderReplies($('#replyQ', v).value);
    }));
  }

  /* ------------------------------------------------------- 04 compliance */
  let quizAns = {};
  let quizShown = false;

  function pageCompliance(sec) {
    return head(sec) + `
    <section class="block">
      <div class="law-strip">
        <div class="law"><b>TCPA</b><span>Telephone Consumer Protection Act. Federal rules on texting consumers.</span></div>
        <div class="law"><b>DNC</b><span>The National Do Not Call Registry applies alongside the TCPA.</span></div>
        <div class="law gold"><b>State law</b><span>State texting laws are often stricter than the federal rules.</span></div>
      </div>
      <div class="callout is-red">${icon('alert')}<p>Breaches carry <b>penalties per message</b>. US counsel approves this section before launch and whenever the rules change.</p></div>
    </section>

    <section class="block" id="rules">
      ${sub('The rules', 'Eight rules, no exceptions.')}
      <div class="rules">${D.rules.map((r, i) => `<div class="rule" id="rule-${slug(r.rule)}"><span class="rn">R${i + 1}</span><h3>${esc(r.rule)}</h3><p>${esc(r.means)}</p></div>`).join('')}</div>
    </section>

    <section class="block" id="never">
      ${sub('Never do this', 'Students sign this list before they receive live access, and it stays pinned at the top of the dashboard.')}
      <div class="never-wrap">
        <ol class="never">${D.neverDo.map((n, i) => `<li><span class="nn">${pad(i + 1)}</span>${esc(n)}</li>`).join('')}</ol>
        <aside class="signoff" id="signoff">${signoffHTML()}</aside>
      </div>
    </section>

    <section class="block" id="test">
      ${sub('Compliance test', 'Eight questions. The pass mark is 100 percent.', null, S.quiz && S.quiz.pass ? '<span class="chip is-open"><span class="dot"></span>Passed</span>' : '')}
      <div class="quiz" id="quiz"></div>
    </section>`;
  }

  function signoffHTML() {
    if (S.signoff) {
      return `<h3>Signed</h3><div class="signed" style="margin-top:16px"><span class="sig">${esc(S.signoff.name)}</span>
        <small>Signed ${fmtDate(S.signoff.date.slice(0, 10))}. The list stays pinned on your dashboard.</small></div>
        <p style="font-size:13px;color:var(--muted);margin-top:18px">You also sign a non disclosure agreement and an acceptable use policy during onboarding. A breach leads to retraining or removal of access depending on its seriousness.</p>`;
    }
    return `<h3>Sign the list</h3><p>Every student signs before live access. A breach leads to retraining or removal of access depending on its seriousness.</p>
      <form data-form="signoff">
        <label class="check"><input type="checkbox" required><span class="box">${icon('check')}</span><span style="font-size:14px">I have read all ten and will follow them without exception.</span></label>
        <div><label class="label" for="sigName">Type your full name</label><input class="field" id="sigName" required autocomplete="name" placeholder="${esc(S.name)}"></div>
        <button class="btn btn-primary" type="submit">${icon('check')}Sign</button>
      </form>`;
  }

  function renderQuiz() {
    const box = $('#quiz');
    if (!box) return;
    const letters = 'ABCD';
    box.innerHTML = D.quiz.map((q, i) => {
      const a = quizAns[i];
      return `<div class="q"><h3><span class="qn">Q${i + 1}</span>${esc(q.q)}</h3>
        <div class="opts">${q.options.map((o, j) => {
          let cls = a === j ? ' sel' : '';
          if (quizShown) { if (j === q.a) cls = ' right'; else if (a === j) cls = ' wrong'; }
          return `<button class="opt${cls}" data-action="quiz-pick" data-q="${i}" data-o="${j}" ${quizShown ? 'disabled' : ''}><span class="ol">${letters[j]}</span><span>${esc(o)}</span></button>`;
        }).join('')}</div>
        ${quizShown && a !== q.a ? `<p class="q-why">${icon('info')}<span>${esc(q.why)}</span></p>` : ''}</div>`;
    }).join('') + quizFoot();
  }

  function quizFoot() {
    const answered = Object.keys(quizAns).length;
    if (!quizShown) {
      return `<div class="quiz-foot"><span>${answered} of ${D.quiz.length} answered${S.quiz ? ` · last attempt ${S.quiz.score}/${D.quiz.length}` : ''}</span>
        <button class="btn btn-primary" data-action="quiz-submit" ${answered < D.quiz.length ? 'disabled' : ''}>Submit test</button></div>`;
    }
    const score = D.quiz.filter((q, i) => quizAns[i] === q.a).length;
    const pass = score === D.quiz.length;
    return `<div class="quiz-foot"><div><span class="score ${pass ? 'pass' : 'fail'}">${score}/${D.quiz.length}</span>
      <p style="margin-top:6px;font-size:14px;color:var(--ink-2)">${pass ? (S.signoff ? 'Passed. The compliance module is complete.' : 'Passed. Sign the Never do list above to complete the module.') : 'The pass mark is 100%. Read the notes on the missed questions, then retake.'}</p></div>
      <button class="btn" data-action="quiz-retake">${icon('loop')}${pass ? 'Take again' : 'Retake'}</button></div>`;
  }

  function mountCompliance() { quizAns = {}; quizShown = false; renderQuiz(); }

  /* --------------------------------------------------------- 05 training */
  let sim = null;
  const newSim = (pid) => ({ pid, turn: 0, replies: [], log: [], noReply: false, ended: false, next: '', result: null });

  function pageTraining(sec) {
    const mods = moduleStatus();
    const chip = (m) => m.state === 'done' ? `<span class="chip is-open"><span class="dot"></span>${esc(m.label)}</span>`
      : m.state === 'progress' ? `<span class="chip is-gold"><span class="dot"></span>${esc(m.label)}</span>`
      : `<span class="chip chip-flat">${esc(m.label)}</span>`;
    return head(sec) + `
    <section class="block" id="modules">
      ${sub('Modules and tests', 'About five and a half hours, self paced. Work through them in order.')}
      <div class="module-head"><span></span><span>Module</span><span>Format</span><span>Time</span><span class="pm">Pass mark</span><span>Status</span></div>
      <div class="modules">${mods.map((m, i) => `<a class="module" href="#/${m.route}"${m.anchor ? ` data-anchor="${m.anchor}"` : ''}>
        <span class="n">${pad(i + 1)}</span><b>${esc(m.name)}</b><span class="c">${esc(m.format)}</span><span class="t">${esc(m.time)}</span><span class="c pm">${esc(m.pass)}</span>${chip(m)}</a>`).join('')}</div>
    </section>

    <section class="block" id="levels">
      ${sub('Access levels', 'A compliance breach at the independent level returns the student to supervised work for a fixed period.')}
      <div class="levels">${D.levels.map((l, i) => `<div class="lvl${i === 0 ? ' is-current' : ''}">
        <span class="ln">Level ${i + 1}${i === 0 ? ' · you are here' : ''}</span><h3>${esc(l.name)}</h3>
        <span class="label">Access</span><p>${esc(l.access)}</p><span class="spacer"></span>
        <span class="label">To move up</span><p>${esc(l.up)}</p></div>`).join('')}</div>
    </section>

    <section class="block" id="simulator">
      ${sub('Practice simulator', 'Text with a seller who plays a set persona. Each attempt is scored on tone, accuracy, compliance, information gathered and the next step chosen. Any compliance breach fails the attempt.')}
      <div class="sim">
        <div class="personas">${D.personas.map((p) => `<button class="persona${sim && sim.pid === p.id ? ' active' : ''}" data-action="sim-pick" data-id="${p.id}">
          <b>${esc(p.name)}</b>${S.sim[p.id] ? `<span class="badge${S.sim[p.id].pass ? ' pass' : ''}">${S.sim[p.id].best}</span>` : ''}<small>${esc(p.tests)}</small></button>`).join('')}</div>
        <div id="simStage"></div>
      </div>
    </section>

    <section class="block" id="flashcards">
      ${sub('Objection flashcards', 'After certification you keep skills current with flashcards, a short scenario each day and a refresher quiz whenever the playbook or rules change.', null, `<button class="btn btn-sm" data-action="shuffle">${icon('shuffle')}Shuffle</button>`)}
      <div class="flashcards" id="cards"></div>
    </section>`;
  }

  function renderCards() {
    const c = $('#cards');
    if (!c) return;
    const pool = D.replies.slice().sort(() => Math.random() - 0.5).slice(0, 4);
    c.innerHTML = pool.map(flipCard).join('');
  }

  function renderSim() {
    const stage = $('#simStage');
    if (!stage) return;
    $$('.persona').forEach((b) => b.classList.toggle('active', !!sim && b.dataset.id === sim.pid));
    if (!sim) sim = newSim(D.personas[0].id);
    const p = D.personas.find((x) => x.id === sim.pid);
    const t = zoneNow(p.tz), w = windowStatus(t.h, t.m);
    if (!sim.log.length) sim.log.push({ from: 'in', text: p.turns[0] });
    const awaitingReply = !sim.ended && !sim.noReply;
    const initials = p.seller.split(' ')[0].slice(0, 1);

    stage.innerHTML = `<div class="phone">
      <div class="phone-top"><span class="phone-av">${esc(initials)}</span><span class="who"><b>${esc(p.seller)}</b><small>${esc(p.name)} · their time ${fmt12(t.h, t.m)} ${t.abbr || ''}</small></span>
        <span class="chip ${w.open ? 'is-open' : 'is-closed'}"><span class="dot"></span>${w.open ? 'In window' : 'Outside window'}</span></div>
      <div class="chat" id="chat">${sim.log.map((m) => m.from === 'sys' ? `<span class="sys">${esc(m.text)}</span>` : `<div class="bubble ${m.from}">${esc(m.text)}</div>`).join('')}</div>
      ${awaitingReply ? `<div class="composer"><textarea class="field" id="simIn" rows="1" placeholder="Write your reply. Two or three sentences."></textarea>
        <button class="send" data-action="sim-send" aria-label="Send reply">${icon('send')}</button></div>` : ''}
      <div class="sim-actions">
        <select class="field" id="simNext" aria-label="Next step"><option value="">Choose the next step…</option>${D.nextSteps.map((s) => `<option value="${s.id}"${sim.next === s.id ? ' selected' : ''}>${esc(s.label)}</option>`).join('')}</select>
        ${awaitingReply ? `<button class="btn" data-action="sim-noreply">${icon('x')}Don’t reply</button>` : `<button class="btn" data-action="sim-reset">${icon('loop')}Restart</button>`}
        <button class="btn btn-primary" data-action="sim-score" ${sim.ended || sim.noReply ? '' : 'disabled'}>Score attempt</button>
      </div>
      <p class="sim-hint">${icon('info')}<span>Practice mode: the seller follows a script and your reply is checked against the playbook and red lines in this browser. The AI seller connects here.</span></p>
    </div>
    ${sim.result ? scorecardHTML(sim.result) : ''}`;

    const chat = $('#chat', stage);
    chat.scrollTop = chat.scrollHeight;
    const inp = $('#simIn', stage);
    if (inp) {
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); simSend(); } });
      inp.addEventListener('input', () => { inp.style.height = 'auto'; inp.style.height = Math.min(inp.scrollHeight, 160) + 'px'; });
    }
    $('#simNext', stage).addEventListener('change', (e) => { sim.next = e.target.value; });
  }

  function simSend() {
    const inp = $('#simIn');
    if (!inp) return;
    const text = inp.value.trim();
    if (!text) { inp.focus(); return; }
    const p = D.personas.find((x) => x.id === sim.pid);
    sim.replies.push(text);
    sim.log.push({ from: 'out', text });
    sim.turn++;
    if (p.hostile) {
      sim.log.push({ from: 'sys', text: 'Reply sent after an opt out.' });
      sim.ended = true;
    } else if (sim.turn < p.turns.length) {
      sim.log.push({ from: 'in', text: p.turns[sim.turn] });
    } else {
      sim.ended = true;
      sim.log.push({ from: 'sys', text: 'Seller is waiting. Choose the next step, then score the attempt.' });
    }
    renderSim();
    const n = $('#simIn'); if (n) n.focus();
  }

  function scoreSim() {
    const p = D.personas.find((x) => x.id === sim.pid);
    const fb = [];
    let tone = 100, accuracy = 100, compliance = 100, info = 0;
    const all = sim.replies.join(' ');

    if (p.hostile) {
      if (sim.replies.length) {
        compliance = 0; tone = 40;
        fb.push({ k: 'bad', t: 'You replied after a clear opt out. Never do #01.' });
        lint(all).filter((f) => f.kind === 'bad').forEach((f) => fb.push({ k: 'bad', t: `${f.msg} (“${f.hit}”)` }));
      }
      else { info = 100; fb.push({ k: 'good', t: 'No reply. The opt out is processed.' }); }
    } else if (!sim.replies.length) {
      info = 0; tone = 60;
      fb.push({ k: 'warn', t: 'This seller was still talking. Silence here loses a real conversation.' });
    } else {
      const flags = lint(all);
      flags.filter((f) => f.kind === 'bad').forEach((f) => { compliance = 0; fb.push({ k: 'bad', t: `${f.msg} (“${f.hit}”)` }); });
      flags.filter((f) => f.kind === 'warn').forEach((f) => { tone -= 12; fb.push({ k: 'warn', t: `${f.msg} (“${f.hit}”)` }); });

      sim.replies.forEach((r, i) => {
        const st = structure(r);
        const max = p.maxSentences || 3;
        if (st.sentences > max) { accuracy -= 15; fb.push({ k: 'warn', t: `Reply ${i + 1} runs ${st.sentences} sentences. Keep it to ${max === 2 ? 'two' : 'two or three'}.` }); }
        if (st.questions > 1) { accuracy -= 10; fb.push({ k: 'warn', t: `Reply ${i + 1} asks ${st.questions} questions. One at a time.` }); }
        if (st.placeholders.length) { accuracy -= 25; fb.push({ k: 'bad', t: `Reply ${i + 1} still has ${st.placeholders.join(', ')} in it.` }); }
        if (st.shouty) { tone -= 8; fb.push({ k: 'warn', t: 'Too many exclamation marks. Calm reads as trustworthy.' }); }
      });
      const ack = /\b(thanks|thank you|sorry|understood|understand|fair|appreciate|no problem|of course|totally|got it|i hear you|makes sense|good question)\b/i;
      if (!ack.test(structure(sim.replies[0]).first)) { tone -= 18; fb.push({ k: 'warn', t: 'Acknowledge what they said before moving on.' }); }
      else fb.push({ k: 'good', t: 'Acknowledged the seller first.' });

      (p.avoid || []).forEach((a) => { if (a.re.test(all)) { tone -= 25; fb.push({ k: 'bad', t: a.msg }); } });
      const hit = p.signals.filter((s) => s.re.test(all));
      info = p.signals.length ? Math.round((hit.length / p.signals.length) * 100) : 100;
      p.signals.forEach((s) => fb.push(s.re.test(all) ? { k: 'good', t: s.ok } : { k: 'warn', t: s.miss }));
    }

    const t = zoneNow(p.tz), w = windowStatus(t.h, t.m);
    if (sim.replies.length && !w.open) fb.push({ k: 'warn', t: `It’s ${fmt12(t.h, t.m)} for this seller, outside the permitted window. On the live system this reply waits until ${hourLabel(D.window.start)} their time.` });

    const correct = D.nextSteps.find((s) => s.id === p.next);
    const next = sim.next === p.next ? 100 : 0;
    if (!sim.next) fb.push({ k: 'warn', t: `No next step chosen. Here it’s: ${correct.label.toLowerCase()}.` });
    else if (next) fb.push({ k: 'good', t: `Right next step: ${correct.label.toLowerCase()}.` });
    else fb.push({ k: 'bad', t: `Next step should be: ${correct.label.toLowerCase()}.` });

    const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
    const m = { Tone: clamp(tone), Accuracy: clamp(accuracy), Compliance: clamp(compliance), 'Info gathered': clamp(info), 'Next step': clamp(next) };
    const avg = Math.round(Object.values(m).reduce((a, b) => a + b, 0) / 5);
    const pass = m.Compliance === 100 && avg >= 75;
    const order = { bad: 0, warn: 1, good: 2 };
    fb.sort((a, b) => order[a.k] - order[b.k]);

    const prev = S.sim[p.id];
    S.sim[p.id] = { best: Math.max(avg, prev ? prev.best : 0), pass: pass || !!(prev && prev.pass) };
    save();
    sim.result = { m, avg, pass, fb, breach: m.Compliance < 100 };
    renderSim();
    const btn = $(`.persona[data-id="${p.id}"]`);
    if (btn) {
      let b = $('.badge', btn);
      if (!b) { b = document.createElement('span'); btn.insertBefore(b, $('small', btn)); }
      b.className = 'badge' + (S.sim[p.id].pass ? ' pass' : '');
      b.textContent = S.sim[p.id].best;
    }
    const sc = $('.scorecard'); if (sc) sc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function scorecardHTML(r) {
    const cls = (v) => (v >= 80 ? 'good' : v >= 50 ? 'mid' : 'bad');
    return `<div class="scorecard">
      <div class="scorecard-head"><span class="verdict ${r.pass ? 'pass' : 'fail'}">${r.pass ? 'Passed' : r.breach ? 'Failed · compliance breach' : 'Not yet'} · ${r.avg}</span>
        <span class="muted" style="font-size:13px">Pass: no compliance breach and an average of 75 or more</span></div>
      <div class="metrics">${Object.entries(r.m).map(([k, v]) => `<div class="metric ${cls(v)}"><small>${k}</small><b>${v}</b><div class="meter"><i style="width:${v}%"></i></div></div>`).join('')}</div>
      <ul class="flags feedback-list">${r.fb.map((f) => `<li class="is-${f.k === 'good' ? 'good' : f.k}">${f.k === 'good' ? icon('check') : f.k === 'bad' ? '<code>fix</code>' : '<code>tip</code>'}<span>${esc(f.t)}</span></li>`).join('')}</ul>
    </div>`;
  }

  function mountTraining() { renderSim(); renderCards(); }

  /* ---------------------------------------------------------- 06 support */
  function pageSupport(sec) {
    const day = daysSince(S.joined) + 1;
    return head(sec) + `
    <section class="block">
      ${sub('Five layers', 'Start at the top. Most questions never get past layer two.')}
      <div class="layers">${D.layers.map((l) => `<div class="layer"><span class="ln">${l.n}</span><b>${esc(l.where)}</b><p>${esc(l.what)}</p></div>`).join('')}</div>
    </section>

    <section class="block" id="assistant">
      ${sub('Handbook assistant', 'Answers only from approved portal content, links each answer to the page it came from, and says plainly when a question needs a team lead. Questions it can’t answer are logged and become new FAQ entries.')}
      <div class="card assistant">
        <form class="ask-row" data-form="ask">
          <div class="search-field">${icon('search')}<input class="field" id="askQ" placeholder="Ask anything, e.g. can I text at 8pm?" autocomplete="off"></div>
          <button class="btn btn-primary" type="submit">Ask</button>
        </form>
        <div class="suggest">${['A seller wants a phone call', 'How many follow ups?', 'What is escrow?', 'Seller says their dad died', 'Can I use WhatsApp?'].map((s) => `<button class="chip" data-action="ask-suggest">${esc(s)}</button>`).join('')}</div>
        <div class="answers" id="answers"></div>
      </div>
    </section>

    <section class="block" id="escalation">
      ${sub('Escalation guide', 'Who decides what. If it’s in the left column, it’s yours.')}
      <div class="esc">
        <div class="esc-col student"><h3><i></i>Student decides</h3><ul>${D.escalation.student.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="esc-col lead"><h3><i></i>Team lead decides</h3><ul>${D.escalation.lead.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="esc-col mgmt"><h3><i></i>Management decides</h3><ul>${D.escalation.management.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
    </section>

    <section class="block" id="buddies">
      <div class="grid-2">
        <div class="card">
          <div class="buddy">
            <div class="buddy-days"><div><b>${Math.min(day, 14)}</b><small>of 14 days</small></div></div>
            <div><h2>Team leads and buddies</h2><p style="margin-top:8px;color:var(--ink-2);font-size:14.5px">Team leads are experienced students and your first line of human support. They hold a short daily check in with their group. ${day <= 14 ? 'You’re in your buddy period: lean on your buddy first.' : 'Your buddy period is over. Your team lead is your first stop.'}</p></div>
          </div>
        </div>
        <div class="card">
          <h2>Fixed contact points</h2>
          <p style="margin-top:8px;color:var(--ink-2);font-size:14.5px">Management holds one weekly office hour, with questions submitted in advance, as the only live contact. Policy changes, new replies and rule updates are posted on the announcements board, and a dated changelog records every edit to the playbook.</p>
          <ul class="list-plain mt">${D.changelog.map((c) => `<li><div class="top"><b>v${esc(c.v)}</b><small>${fmtDate(c.date)}</small></div><p>${esc(c.note)}</p></li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="block" id="tickets">
      ${sub('Ticket form', 'Layer four. For system problems, logistics, and anything your team lead can’t resolve. Office hour questions go here too.')}
      <div class="grid-2">
        <form class="card form-grid" data-form="ticket">
          <div><span class="label">Category</span><div class="cats">${D.ticketCategories.map((c, i) => `<label><input type="radio" name="cat" value="${esc(c)}" ${i === 0 ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}</div></div>
          <div><label class="label" for="tSubj">Subject</label><input class="field" id="tSubj" name="subj" required placeholder="One line"></div>
          <div><label class="label" for="tBody">Details</label><textarea class="field" id="tBody" name="body" required placeholder="What happened, what you expected, and when. Don’t paste seller data."></textarea></div>
          <button class="btn btn-primary" type="submit" style="justify-self:start">${icon('send')}Submit ticket</button>
        </form>
        <div class="card"><h2>Your tickets</h2><div id="ticketList" class="mt"></div></div>
      </div>
    </section>`;
  }

  function renderTickets() {
    const el = $('#ticketList');
    if (!el) return;
    el.innerHTML = S.tickets.length
      ? `<ul class="list-plain">${S.tickets.slice().reverse().map((t) => `<li><div class="top"><b>${esc(t.subj)}</b><small>${esc(t.id)}</small></div><p>${esc(t.cat)} · ${fmtDate(t.date.slice(0, 10))}</p><span class="chip is-gold" style="justify-self:start;margin-top:6px"><span class="dot"></span>Open</span></li>`).join('')}</ul>`
      : '<p class="empty">No tickets yet.</p>';
  }

  function answer(q) {
    const box = $('#answers');
    if (!box) return;
    const res = search(q, { expand: true, limit: 3 });
    const strong = res.filter((r) => r.s >= 3);
    const sec = (id) => { const s = D.sections.find((x) => x.id === id); return s ? `${s.num} ${s.title}` : 'Dashboard'; };
    if (!strong.length) {
      box.innerHTML = `<div class="answer none"><h4>This one needs a team lead.</h4><p>Nothing in the approved portal content answers “${esc(q)}”. Ask your team lead. Logging it helps it become an FAQ entry.</p>
        <button class="btn btn-sm" data-action="log-q" data-q="${esc(q)}">${icon('file')}Log it for the FAQ</button></div>`;
      return;
    }
    box.innerHTML = strong.map(({ d }) => `<div class="answer"><span class="eyebrow"><span>${esc(d.type)}</span><span>${esc(sec(d.route))}</span></span>
      <h4>${hl(d.title, q)}</h4><p>${hl(d.text, q)}</p>
      <a href="#/${d.route}" data-anchor="${d.anchor || ''}" ${d.sit ? `data-sit="${d.sit}"` : ''}${d.persona ? ` data-persona="${d.persona}"` : ''}>Open source ${icon('arrow')}</a></div>`).join('');
  }

  function mountSupport() { renderTickets(); }

  /* --------------------------------------------------------- 07 feedback */
  function pageFeedback(sec) {
    const day = daysSince(S.joined);
    const opens = S.joined ? new Date(new Date(S.joined).getTime() + 30 * 864e5) : null;
    return head(sec) + `
    <section class="block">
      ${sub('Adding a new scenario', 'From one student’s inbox to everyone’s library in five steps.')}
      <ol class="steps">${D.scenarioSteps.map((s, i) => `<li class="step"><span class="sn">${i + 1}</span><p>${esc(s.what)}</p><span class="who">${esc(s.who)}</span></li>`).join('')}</ol>
    </section>

    <section class="block" id="submit">
      ${sub('Submit a scenario', 'Met a seller message the library doesn’t cover? Step one starts here.')}
      <div class="grid-2">
        <form class="card form-grid" data-form="scenario">
          <div><label class="label" for="scMsg">What the seller said</label><textarea class="field" id="scMsg" name="msg" required placeholder="Paraphrase it. Leave out names, numbers and addresses."></textarea></div>
          <div><label class="label" for="scSit">Situation</label><select class="field" id="scSit" name="sit"><option value="">Not sure</option>${D.situations.map((s) => `<option>${esc(s.name)}</option>`).join('')}</select></div>
          <div><label class="label" for="scDraft">What you replied, or would reply</label><textarea class="field" id="scDraft" name="draft" placeholder="Optional. A team lead drafts the approved version."></textarea></div>
          <button class="btn btn-primary" type="submit" style="justify-self:start">${icon('send')}Submit to team lead</button>
        </form>
        <div class="card"><h2>Your submissions</h2><div id="scList" class="mt"></div></div>
      </div>
    </section>

    <section class="block">
      ${sub('What feeds the portal', 'Every playbook entry and rule carries a version number and a last reviewed date. Retired replies are archived rather than deleted, and compliance content is reviewed on a fixed schedule and whenever regulations change.')}
      <div class="feeds">${D.feeds.map((f) => `<div class="feed"><b>${esc(f.source)}</b>${icon('arrow')}<span>${esc(f.improves)}</span></div>`).join('')}</div>
    </section>

    <section class="block">
      <div class="grid-2">
        <div class="card survey">
          ${ring(Math.min(100, Math.round((day / 30) * 100)), `${Math.min(day, 30)}<small>/30</small>`)}
          <div><h2>First month survey</h2><p style="margin-top:6px;color:var(--ink-2);font-size:14.5px">${day >= 30 ? 'Your survey is open.' : `Opens ${opens ? fmtDate(opens.toISOString().slice(0, 10)) : 'on day 30'}.`} Three questions:</p>
          <ol>${D.survey.map((q) => `<li>${esc(q)}</li>`).join('')}</ol></div>
        </div>
        <div class="card"><h2>Questions you logged</h2><p style="margin-top:6px;color:var(--ink-2);font-size:14.5px">From the handbook assistant. These become new FAQ entries.</p><div id="uqList" class="mt"></div></div>
      </div>
    </section>`;
  }

  function renderScenarios() {
    const el = $('#scList');
    if (el) {
      el.innerHTML = S.scenarios.length
        ? `<ul class="list-plain">${S.scenarios.slice().reverse().map((s) => `<li><div class="top"><b>“${esc(s.msg.length > 90 ? s.msg.slice(0, 90) + '…' : s.msg)}”</b></div><p>${esc(s.sit || 'Situation not set')} · ${fmtDate(s.date.slice(0, 10))}</p>
          <div class="dots" style="margin-top:8px" title="Step 1 of 5">${D.scenarioSteps.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div><small>Step 1 of 5 · waiting for a team lead draft</small></li>`).join('')}</ul>`
        : '<p class="empty">Nothing submitted yet.</p>';
    }
    const uq = $('#uqList');
    if (uq) {
      uq.innerHTML = S.unanswered.length
        ? `<ul class="list-plain">${S.unanswered.slice().reverse().map((u) => `<li><div class="top"><b>${esc(u.q)}</b><small>${fmtDate(u.date.slice(0, 10))}</small></div></li>`).join('')}</ul>`
        : '<p class="empty">None yet. Ask the assistant in 06 Self serve support.</p>';
    }
  }

  /* ---------------------------------------------------------- sign in */
  function signIn() {
    const mins = D.modules.reduce((a, m) => a + parseInt(m.time, 10), 0);
    const hrs = (mins / 60).toFixed(1).replace('.0', '');
    const steps = [
      ['Founder welcome video', '5 min'],
      ['Company and mission', '30 min'],
      ['US real estate basics', '60 min']
    ];
    return `<div class="login" id="app">
      <section class="login-hero">
        <div class="login-hero-top">
          <span class="login-brand"><span class="login-brand-badge">${LOGO()}</span><span><b>Guardian Angel</b><small>Acquisitions · Student Portal</small></span></span>
        </div>
        <div class="login-copy">
          <h1>The first voice a <em>seller</em> hears.</h1>
          <p>Students are the first people a property owner speaks to, so the quality of their replies decides how many conversations become deals.</p>
          <dl class="login-stats">
            <div><dt>7</dt><dd>sections</dd></div>
            <div><dt>${hrs} hrs</dt><dd>self paced</dd></div>
            <div><dt>4</dt><dd>access levels</dd></div>
          </dl>
        </div>
      </section>

      <section class="login-panel">
        <div class="login-panel-top">
          <button class="theme-switch" data-action="theme" aria-label="Toggle dark mode"><span class="knob">${icon('sun', 'ic-sun')}${icon('moon', 'ic-moon')}</span></button>
        </div>
        <div class="login-form">
          <p class="eyebrow">Outreach associate onboarding</p>
          <h2>Start your training</h2>
          <p class="login-lede">Enter your first name to begin. Your progress saves in this browser, so you can pick up where you left off.</p>
          <form data-form="signin">
            <label class="label" for="nm">First name</label>
            <input class="field" id="nm" name="name" required autocomplete="given-name" placeholder="e.g. Priya" maxlength="40">
            <button class="btn btn-primary" type="submit"><span>Continue</span>${icon('arrow')}</button>
          </form>
          <div class="login-steps">
            <span class="label">First up</span>
            <ol>${steps.map(([t, m], i) => `<li><span class="n">${pad(i + 1)}</span><span>${t}</span><span class="m">${m}</span></li>`).join('')}</ol>
          </div>
        </div>
        <div class="login-foot"><span>Guardian Angel Acquisitions</span></div>
      </section>
    </div>`;
  }

  /* ============================================================== SHELL */
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const ROUTES = { dashboard: pageDashboard, company: pageCompany, basics: pageBasics, playbook: pagePlaybook, compliance: pageCompliance, training: pageTraining, support: pageSupport, feedback: pageFeedback };
  const MOUNTS = { dashboard: mountDashboard, basics: mountBasics, playbook: mountPlaybook, compliance: mountCompliance, training: mountTraining, support: mountSupport, feedback: renderScenarios };

  function shell() {
    const mods = moduleStatus();
    const doneN = mods.filter((m) => m.state === 'done').length;
    return `<div class="app" id="app">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#/dashboard"><span class="brand-badge">${LOGO()}</span><span class="brand-text"><b>Guardian Angel</b><small>Student Portal</small></span></a>
        <nav class="nav" aria-label="Sections">
          <a class="nav-item" data-route="dashboard" href="#/dashboard"><span class="nav-num">${icon('home')}</span><span>Dashboard</span><span class="nav-check"></span></a>
          <span class="nav-caption">Onboarding</span>
          ${D.sections.map((s) => `<a class="nav-item" data-route="${s.id}" href="#/${s.id}"><span class="nav-num">${s.num}</span><span>${esc(s.nav)}</span><span class="nav-check">${icon('check')}</span></a>`).join('')}
        </nav>
        <div class="side-foot">
          <div class="level-mini" id="levelMini">
            <div class="row"><b>Trainee</b><span class="chip chip-flat">L1</span></div>
            <small>Portal only · ${doneN} of ${mods.length} modules done</small>
            <div class="meter"><i style="width:${Math.round((doneN / mods.length) * 100)}%"></i></div>
          </div>
          <div class="side-links"><span>Signed in as ${esc(S.name)}</span><button data-action="signout">Sign out</button></div>
        </div>
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="icon-btn menu-btn" data-action="menu" aria-label="Open menu">${icon('menu')}</button>
          <button class="search-pill" data-action="palette" aria-label="Search">${icon('search')}<span>Search glossary, replies, rules…</span><kbd>${isMac ? '⌘' : 'Ctrl'} K</kbd></button>
          <span class="top-spacer"></span>
          <a class="top-clock" id="topClock" href="#/dashboard" data-anchor="clocks"></a>
          <button class="theme-switch" data-action="theme" aria-label="Toggle dark mode"><span class="knob">${icon('sun', 'ic-sun')}${icon('moon', 'ic-moon')}</span></button>
          <span class="avatar" title="${esc(S.name)}">${esc((S.name[0] || '?').toUpperCase())}</span>
        </header>
        <main class="view" id="view"></main>
      </div>
      <div class="scrim" data-action="menu-close"></div>
    </div>
    <div class="palette" id="palette" hidden>
      <div class="palette-box raised-lg" role="dialog" aria-label="Search the portal">
        <div class="palette-input">${icon('search')}<input id="palQ" placeholder="Search glossary, replies, rules, situations…" autocomplete="off"><kbd>Esc</kbd></div>
        <ul class="palette-list" id="palList"></ul>
      </div>
    </div>`;
  }

  let pending = null;

  function route() {
    const r = (location.hash.replace(/^#\/?/, '').split(/[?#]/)[0]) || 'dashboard';
    return ROUTES[r] ? r : 'dashboard';
  }

  function renderView({ keepScroll = false } = {}) {
    const r = route();
    const view = $('#view');
    if (!view) return;
    const y = window.scrollY;
    const sec = D.sections.find((s) => s.id === r);
    view.innerHTML = ROUTES[r](sec);
    if (!keepScroll) { view.classList.remove('enter'); void view.offsetWidth; view.classList.add('enter'); }
    $$('.nav-item').forEach((a) => {
      a.classList.toggle('active', a.dataset.route === r);
      a.classList.toggle('done', !!S.done[a.dataset.route]);
      if (a.dataset.route === r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (MOUNTS[r]) MOUNTS[r](view);
    updateClocks();
    refreshLevel();
    document.title = (sec ? `${sec.num} ${sec.title}` : 'Dashboard') + ' · Guardian Angel Student Portal';
    document.getElementById('app').classList.remove('nav-open');

    if (pending) {
      const id = pending; pending = null;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); flash(el); }
      });
    } else if (keepScroll) window.scrollTo(0, y);
    else window.scrollTo({ top: 0 });
  }

  function flash(el) {
    const sel = '.term,.reply,.rule,.card,.sit-panel,.signoff,.phone';
    const target = el.matches(sel) ? el : el.querySelector(sel);
    if (!target) return;
    target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash');
  }

  function refreshLevel() {
    const el = $('#levelMini');
    if (!el) return;
    const mods = moduleStatus(), doneN = mods.filter((m) => m.state === 'done').length;
    $('small', el).textContent = `Portal only · ${doneN} of ${mods.length} modules done`;
    $('.meter i', el).style.width = Math.round((doneN / mods.length) * 100) + '%';
  }

  function go(r, anchor, extra = {}) {
    if (extra.sit) S.sit = extra.sit;
    if (extra.persona) sim = newSim(extra.persona);
    pending = anchor || null;
    const target = '#/' + r;
    if (location.hash === target) renderView(); else location.hash = target;
  }

  function render() {
    const root = $('#root');
    if (!S.name) {
      root.innerHTML = signIn();
      updateClocks();
      syncThemeClass();
      setTimeout(() => { const n = $('#nm'); if (n) n.focus(); }, 50);
      return;
    }
    root.innerHTML = shell() + '<div class="toast" id="toast" role="status"></div>';
    syncThemeClass();
    renderView();
  }

  /* ------------------------------------------------------------- theme */
  function currentTheme() {
    // White is the default; dark only when the student switches it on.
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function syncThemeClass() { const a = $('#app'); if (a) a.classList.toggle('is-dark', currentTheme() === 'dark'); }

  /* ----------------------------------------------------------- palette */
  let palSel = 0, palRes = [];
  function openPalette() {
    const p = $('#palette');
    if (!p) return;
    p.hidden = false;
    const q = $('#palQ'); q.value = ''; renderPalette(''); q.focus();
  }
  function closePalette() { const p = $('#palette'); if (p) p.hidden = true; }
  function renderPalette(q) {
    palRes = q.trim() ? search(q).map((r) => r.d) : INDEX.filter((d) => d.type === 'Section' || d.type === 'FAQ').slice(0, 9);
    palSel = 0;
    const list = $('#palList');
    list.innerHTML = palRes.length
      ? palRes.map((d, i) => `<li class="${i === 0 ? 'sel' : ''}" data-i="${i}"><span class="ty">${esc(d.type)}</span><span><span class="ti">${hl(d.title, q)}</span><span class="tx">${esc(d.text)}</span></span></li>`).join('')
      : `<li class="palette-empty" style="display:block">Nothing found. Try the handbook assistant in 06.</li>`;
  }
  function palMove(dir) {
    const items = $$('#palList li[data-i]');
    if (!items.length) return;
    palSel = (palSel + dir + items.length) % items.length;
    items.forEach((li, i) => li.classList.toggle('sel', i === palSel));
    items[palSel].scrollIntoView({ block: 'nearest' });
  }
  function palPick(i) {
    const d = palRes[i];
    if (!d) return;
    closePalette();
    go(d.route, d.anchor, { sit: d.sit, persona: d.persona });
  }

  /* ------------------------------------------------------------ events */
  document.addEventListener('click', async (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (link && (link.dataset.anchor || link.dataset.sit || link.dataset.persona)) {
      e.preventDefault();
      go(link.getAttribute('href').slice(2), link.dataset.anchor, { sit: link.dataset.sit, persona: link.dataset.persona });
      return;
    }
    const palItem = e.target.closest('#palList li[data-i]');
    if (palItem) { palPick(+palItem.dataset.i); return; }
    if (e.target.id === 'palette') { closePalette(); return; }

    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.dataset.action;

    switch (a) {
      case 'complete': {
        const id = el.dataset.id;
        S.done[id] = !S.done[id]; save();
        el.classList.toggle('is-done', S.done[id]);
        $('span', el).textContent = S.done[id] ? 'Section complete' : 'Mark section complete';
        const nav = $(`.nav-item[data-route="${id}"]`); if (nav) nav.classList.toggle('done', S.done[id]);
        refreshLevel();
        if (S.done[id]) {
          const nxt = D.sections[D.sections.findIndex((s) => s.id === id) + 1];
          toast(nxt ? `Nice. Next up: ${nxt.num} ${nxt.title}` : 'All seven sections complete.');
        }
        break;
      }
      case 'theme': {
        const t = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', t);
        try { localStorage.setItem('ga-theme', t); } catch (err) {}
        syncThemeClass();
        break;
      }
      case 'palette': openPalette(); break;
      case 'menu': $('#app').classList.add('nav-open'); break;
      case 'menu-close': $('#app').classList.remove('nav-open'); break;
      case 'toast': toast(el.dataset.msg, 'info'); break;
      case 'flip': el.classList.toggle('flipped'); break;
      case 'shuffle': renderCards(); break;
      case 'sit': S.sit = el.dataset.id; save(); renderSituation(); break;
      case 'phrase-sample':
        $('#phraseIn').value = 'Dear Sir, kindly revert at the earliest so we can do the needful. We will organise a visit on 25/10/2026 and can realise a fast sale. Our offer is around $150k!';
        renderPhrase();
        break;
      case 'phrase-clear': $('#phraseIn').value = ''; renderPhrase(); break;
      case 'copy-reply': {
        const r = D.replies.find((x) => x.id === el.dataset.id);
        const txt = fillReply(r.reply, true);
        const ok = await copyText(txt);
        toast(ok ? (/\[(Name|City|Area|website)\]/.test(txt) ? 'Copied. Fill the placeholders before sending.' : 'Copied. Adjust it to the seller’s words.') : 'Couldn’t copy. Select the text instead.', ok ? 'check' : 'alert');
        break;
      }
      case 'quiz-pick': quizAns[+el.dataset.q] = +el.dataset.o; renderQuiz(); break;
      case 'quiz-submit': {
        quizShown = true;
        const score = D.quiz.filter((q, i) => quizAns[i] === q.a).length;
        const pass = score === D.quiz.length;
        S.quiz = { score, pass: pass || !!(S.quiz && S.quiz.pass), date: new Date().toISOString() };
        save(); renderQuiz(); refreshLevel();
        const foot = $('.quiz-foot'); if (foot) foot.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
      case 'quiz-retake': quizAns = {}; quizShown = false; renderQuiz(); $('#test').scrollIntoView({ behavior: 'smooth' }); break;
      case 'sim-pick': sim = newSim(el.dataset.id); renderSim(); if (window.innerWidth < 1020) $('#simStage').scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      case 'sim-send': simSend(); break;
      case 'sim-noreply': {
        sim.noReply = true; sim.ended = true;
        const p = D.personas.find((x) => x.id === sim.pid);
        sim.log.push({ from: 'sys', text: p.hostile ? 'No reply sent. Opt out processed by the system.' : 'You chose not to reply.' });
        renderSim();
        break;
      }
      case 'sim-score': scoreSim(); break;
      case 'sim-reset': sim = newSim(sim.pid); renderSim(); break;
      case 'ask-suggest': $('#askQ').value = el.textContent; answer(el.textContent); break;
      case 'log-q': {
        S.unanswered.push({ q: el.dataset.q, date: new Date().toISOString() }); save();
        el.disabled = true; el.innerHTML = icon('check') + 'Logged';
        toast('Logged. It feeds the next FAQ update.');
        break;
      }
      case 'signout': S.name = ''; save(); location.hash = ''; render(); break;
    }
  });

  document.addEventListener('submit', (e) => {
    const f = e.target.closest('[data-form]');
    if (!f) return;
    e.preventDefault();
    const kind = f.dataset.form;
    const fd = new FormData(f);
    if (kind === 'signin') {
      const n = String(fd.get('name') || '').trim();
      if (!n) return;
      S.name = n.split(/\s+/)[0].slice(0, 1).toUpperCase() + n.split(/\s+/)[0].slice(1);
      if (!S.joined) S.joined = new Date().toISOString();
      save();
      if (!location.hash) location.hash = '#/dashboard';
      render();
    } else if (kind === 'signoff') {
      const n = $('#sigName').value.trim();
      if (!n) return;
      S.signoff = { name: n, date: new Date().toISOString() }; save();
      $('#signoff').innerHTML = signoffHTML();
      refreshLevel();
      toast('Signed. The list stays pinned on your dashboard.');
    } else if (kind === 'ask') {
      const q = $('#askQ').value.trim();
      if (q) answer(q);
    } else if (kind === 'ticket') {
      const t = { id: 'GA-' + Math.random().toString(36).slice(2, 7).toUpperCase(), cat: fd.get('cat'), subj: String(fd.get('subj')).trim(), body: String(fd.get('body')).trim(), date: new Date().toISOString() };
      S.tickets.push(t); save(); f.reset(); renderTickets();
      toast(`Ticket ${t.id} logged under ${t.cat}.`);
    } else if (kind === 'scenario') {
      S.scenarios.push({ msg: String(fd.get('msg')).trim(), sit: fd.get('sit'), draft: String(fd.get('draft') || '').trim(), date: new Date().toISOString() });
      save(); f.reset(); renderScenarios();
      toast('Submitted. A team lead drafts the reply next.');
    }
  });

  document.addEventListener('keydown', (e) => {
    const pal = $('#palette');
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (pal && !pal.hidden) closePalette(); else openPalette();
      return;
    }
    if (e.key === '/' && !typing && pal && pal.hidden) { e.preventDefault(); openPalette(); return; }
    if (pal && !pal.hidden) {
      if (e.key === 'Escape') { closePalette(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); palMove(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); palMove(-1); }
      if (e.key === 'Enter') { e.preventDefault(); palPick(palSel); }
      return;
    }
    if (e.key === 'Escape') { const a = $('#app'); if (a) a.classList.remove('nav-open'); }
  });

  document.addEventListener('input', (e) => { if (e.target.id === 'palQ') renderPalette(e.target.value); });

  window.addEventListener('hashchange', () => { if (S.name) renderView(); });
  setInterval(updateClocks, 20000);

  render();
})();
