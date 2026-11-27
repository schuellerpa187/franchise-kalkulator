const TYPES = [
  { id: 't1', c: '#10B981', bg: '#ECFDF5', tag: 'Typ 1', name: 'Der Einsteiger',
    desc: 'Hat erst vor kurzem angefangen, kaum Erfahrung. Macht gute Arbeit.',
    facts: ['Noch kein eigener Kundenstamm', 'Kein oder wenig Marketing', 'Hoher Bedarf an Fällen und Begleitung'],
    m: { Erfahrung: 1, Qualität: 4, Marketing: 1, Infrastruktur: 1, 'Abhängigkeit RC': 5 } },
  { id: 't2', c: '#2563EB', bg: '#EFF6FF', tag: 'Typ 2', name: 'Der Etablierte',
    desc: '5 bis 15 Jahre Erfahrung, hat Online-Marketing verstanden, oft mit Team und/oder eigenem Standort mit Hebebühne. Macht gute Arbeit.',
    facts: ['Eigene Leads, eigene Marke', 'Kapazität durch Team', 'Braucht uns am wenigsten'],
    m: { Erfahrung: 5, Qualität: 4, Marketing: 5, Infrastruktur: 5, 'Abhängigkeit RC': 1 } },
  { id: 't3', c: '#F59E0B', bg: '#FFFBEB', tag: 'Typ 3', name: 'Der Auffüller',
    desc: 'Irgendwo dazwischen. Nutzt Repaircheck vor allem, um Flauten zu füllen und etwas dazuzuverdienen. Macht gute Arbeit.',
    facts: ['Schwankende Verfügbarkeit', 'Eigenes Grundgeschäft', 'Will flexibel bleiben, wenig Verpflichtung'],
    m: { Erfahrung: 3, Qualität: 4, Marketing: 2, Infrastruktur: 3, 'Abhängigkeit RC': 3 } },
  { id: 't4', c: '#EF4444', bg: '#FEF2F2', tag: 'Typ 4', name: 'Qualität ausbaufähig',
    desc: 'Qualifiziert, macht aber keine gute Arbeit. Bekommt gelegentlich Fälle, ist im Ranking weit unten.',
    facts: ['Formal qualifiziert', 'Mehr Nacharbeit und Reklamationen', 'Wenig Fälle durch Ranking'],
    m: { Erfahrung: 3, Qualität: 1, Marketing: 2, Infrastruktur: 2, 'Abhängigkeit RC': 3 } },
];
const KERN = { id: 'kern', c: '#1F2937', bg: '#FEF3C7' };
const ROWS = [
  { id: 'motiv', name: 'Motivation', hint: 'Warum ist er bei uns? Was will er erreichen?' },
  { id: 'partner_einst', name: 'Partner-Einstufung', hint: 'Wie stufen wir ihn ein? Kriterien, Level, Score' },
  { id: 'kunden_einst', name: 'Kunden-Einstufung', hint: 'Welche Kunden und Fälle passen zu ihm?' },
  { id: 'bedarf', name: 'Was braucht er von uns?', hint: 'Fälle, Kalkulation, Marketing, Software, Begleitung …' },
  { id: 'wert', name: 'Was bringt er uns?', hint: 'Abdeckung, Qualität, Kapazität, Marke, Umsatz …' },
  { id: 'risiko', name: 'Risiko / Aufwand', hint: 'Qualität, Abwanderung, Betreuungsaufwand, Verfügbarkeit' },
  { id: 'preis', name: 'Bezahlung & Konditionen', hint: 'Fixum, pro Fall, Provision, Abo, Staffel?' },
  { id: 'faelle', name: 'Fallzuteilung & Ranking', hint: 'Wie viele Fälle, nach welchen Regeln?' },
  { id: 'pfad', name: 'Entwicklungspfad', hint: 'Wohin soll er sich entwickeln? Auf- oder Abstieg?' },
  { id: 'fragen', name: 'Offene Fragen', hint: '' },
];
const MODEL = [
  { id: 'm_kern', name: 'Gemeinsamer Kern', hint: 'Was gilt für jeden Partner, egal welcher Typ? (Standards, Pflichten, Basisleistung)' },
  { id: 'm_stufen', name: 'Stufen / Module', hint: 'Was kann man dazubuchen oder sich erarbeiten? (z. B. Kalkulation, Standort, Marketing)' },
  { id: 'm_preis', name: 'Preislogik', hint: 'Wie verdienen wir und der Partner, je Stufe?' },
  { id: 'm_qualitaet', name: 'Qualitätsregeln & Ranking', hint: 'Wie steigt man auf, wann bekommt man weniger Fälle, wann ist Schluss?' },
  { id: 'm_mapping', name: 'Typ → Einstieg', hint: 'Wo steigt welcher Typ ein, wo soll er in 12 Monaten sein?' },
  { id: 'm_offen', name: 'Entscheidungen & nächste Schritte', hint: 'Wer macht was bis wann?' },
];

const TRACKS = [
  {
    id: 'kunden', name: 'Kunden-Track', c: '#7C3AED', cbg: '#F5F3FF',
    sub: 'SV zahlt RC für Services',
    dir: '→ Geld: SV → RC',
    tiers: [
      { id: 'basic',     name: 'Basic',     hint: 'Erste Interaktion, einzelne Services on demand.' },
      { id: 'growth',    name: 'Growth',    hint: 'Wachstumspaket: Backoffice, Außenauftritt, Kalkulation.' },
      { id: 'franchise', name: 'Franchise', hint: 'Exklusives Gebiet, Revenue-Share + Fixum, Vertrieb an Werkstätten.' },
      { id: 'enterprise',name: 'Enterprise',hint: 'Sehr viele eigene Fälle, Services at scale.' },
    ],
    seed: {
      basic:     ['Einzelne Services on demand', 'Kalkulation-as-a-service', 'Besichtigung-as-a-service'],
      growth:    ['€500/m für Infrastruktur & Außenauftritt', 'Backoffice inklusive', '3 Besichtigungsaufträge inkl. (3 Monate zugesichert)', 'Partner Acceleration Programme'],
      franchise: ['Exklusives Gebiet gesichert', 'Revenue-Share + €500/m', 'RC macht Vertrieb an Werkstätten'],
      enterprise:['Variable Services je nach Bedarf', 'Viele eigene Fälle – RC füllt Kapazitäten auf'],
    },
  },
  {
    id: 'partner', name: 'Partner-Track', c: '#059669', cbg: '#ECFDF5',
    sub: 'RC schickt Fälle, SV führt aus',
    dir: '→ Geld: RC → SV',
    tiers: [
      { id: 'basic',    name: 'Basic',    hint: 'Gelegentliche Fälle, niedriges Ranking. Qualität noch unklar.' },
      { id: 'standort', name: 'Standort', hint: 'Feste Standortabdeckung, regelmäßige Fallzuweisung.' },
      { id: 'etabliert',name: 'Etabliert',hint: 'Ausgewählt. Beste Qualität. Mind. 10 Fälle/Monat.' },
    ],
    seed: {
      basic:    ['Gelegentliche Fälle', 'Qualität noch nicht bewertet', 'Niedriges Ranking → wenig Fälle'],
      standort: ['5–10 Fälle/Monat', 'Feste Gebietsabdeckung', 'Zuverlässige Verfügbarkeit'],
      etabliert:['Mind. 10 Fälle/Monat', 'Beste Qualitätsbewertung', 'Kalkuliert & besichtigt für RC', 'Ausgewählt durch RC'],
    },
  },
];
const TRACK_EXTRAS = [
  { id: 'geldfluss', name: 'Geldfluss', hint: 'In welche Richtung fließt Geld zwischen RC und SV?',
    seed: ['Kunden zahlen RC für Services (Typ 1, 3, 4)', 'RC vergütet Etablierte Partner pro Fall (Typ 2)', 'Kunden-Umsatz finanziert Partner-Vergütung'] },
  { id: 'pfad', name: 'Entwicklungspfad', hint: 'Wie wird ein Kunde langfristig zum Partner?',
    seed: ['Einsteiger (Basic/Growth) → RC-Support → Partner Standort → Partner Etabliert', 'Schwelle noch zu definieren (X Fälle/Monat + Y Qualitätsscore)', 'Typ 3 kann dauerhaft beide Tracks nutzen (dual, unabhängig)'] },
  { id: 'personas', name: 'Personas → Tracks', hint: 'Welche Persona passt zu welchem Track und Tier?',
    seed: ['Typ 1 (Einsteiger) → Kunden Basic / Growth / Franchise', 'Typ 2 (Etablierter) → Partner Etabliert', 'Typ 3 (Auffüller) → Kunden Growth/Enterprise + Partner Standort (dual)', 'Typ 4 (Qualität ausbaufähig) → Kunden Basic'] },
];

/* ================= Speicher (lokal oder live) ================= */
const STORE = 'rc-partnermodelle-canvas-v2';
const cfg = window.CANVAS_CONFIG || {};
const board = (location.hash.match(/b=([a-f0-9]{16,})/) || [])[1];
const LIVE = !!(board && cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase);
let items = {};
let sb, channel;
const statusEl = document.getElementById('saved');
function status(text, cls) { statusEl.textContent = text; statusEl.className = 'saved ' + (cls || ''); }

function saveLocal() {
  if (LIVE) return;
  try { localStorage.setItem(STORE, JSON.stringify(items)); status('Nur lokal, nicht geteilt! Live-Link mit #b= öffnen', 'err'); }
  catch { status('Nicht gespeichert, bitte exportieren', 'err'); }
}
const timers = {};
function put(key, value, delay = 0) {
  if (value === null) delete items[key]; else items[key] = value;
  if (!LIVE) { saveLocal(); return; }
  clearTimeout(timers[key]);
  timers[key] = setTimeout(async () => {
    const v = key in items ? items[key] : null;
    channel.send({ type: 'broadcast', event: 'put', payload: { key, value: v } });
    const { error } = await sb.rpc('canvas_put', { p_board: board, p_key: key, p_value: v });
    if (error) status('Speichern fehlgeschlagen', 'err');
  }, delay);
}
const get = (key, def) => (key in items ? items[key] : def);
const uid = () => Math.random().toString(36).slice(2, 10);
const typeById = id => TYPES.find(t => t.id === id) || KERN;
const pname = t => get(`persona:${t.id}:name`, t.name);

/* ================= Persona-Karten ================= */
function renderPersonas() {
  const wrap = document.getElementById('personas');
  wrap.innerHTML = '';
  TYPES.forEach(t => {
    const card = document.createElement('article');
    card.className = 'persona';
    card.style.setProperty('--c', t.c);
    card.innerHTML = `<div class="tag">${t.tag}</div>
      <h2 contenteditable="true" data-f="name"></h2>
      <p class="desc" contenteditable="true" data-f="desc"></p>
      <div class="meters"></div>
      <ul class="facts" contenteditable="true" data-f="facts"></ul>`;
    const nameEl = card.querySelector('[data-f=name]');
    const descEl = card.querySelector('[data-f=desc]');
    const factsEl = card.querySelector('[data-f=facts]');
    nameEl.textContent = pname(t);
    descEl.textContent = get(`persona:${t.id}:desc`, t.desc);
    get(`persona:${t.id}:facts`, t.facts).forEach(f => { const li = document.createElement('li'); li.textContent = f; factsEl.appendChild(li); });
    nameEl.addEventListener('input', () => { put(`persona:${t.id}:name`, nameEl.textContent, 400); renderHeads(); });
    descEl.addEventListener('input', () => put(`persona:${t.id}:desc`, descEl.textContent, 400));
    factsEl.addEventListener('input', () => put(`persona:${t.id}:facts`, [...factsEl.querySelectorAll('li')].map(li => li.textContent), 400));
    const meters = card.querySelector('.meters');
    Object.entries(t.m).forEach(([label, def]) => {
      const key = `meter:${t.id}:${label}`;
      const val = get(key, def);
      const row = document.createElement('div');
      row.className = 'meter';
      row.innerHTML = `<span>${label}</span><div class="dots">${[1,2,3,4,5].map(i => `<span data-i="${i}" class="${i <= val ? 'on' : ''}" title="${i}/5"></span>`).join('')}</div>`;
      row.querySelectorAll('.dots span').forEach(d => d.addEventListener('click', () => { put(key, +d.dataset.i); renderPersonas(); }));
      meters.appendChild(row);
    });
    wrap.appendChild(card);
  });
}
function renderHeads() {
  const heads = document.querySelectorAll('#canvas .colhead:not(.kern)');
  TYPES.forEach((t, i) => heads[i] && (heads[i].textContent = `${t.tag}: ${pname(t)}`));
  document.getElementById('legend').innerHTML = TYPES.map(t => `<span style="--c:${t.c}"></span>`).join('') + `<span style="--c:${KERN.c}">Kern / gemeinsam</span>`;
  document.querySelectorAll('#legend span').forEach((s, i) => { if (TYPES[i]) s.textContent = `${TYPES[i].tag}: ${pname(TYPES[i])}`; });
}

/* ================= Notizen ================= */
function notesIn(cell) {
  return Object.entries(items).filter(([k, v]) => k.startsWith('note:') && v.cell === cell)
    .map(([k, v]) => ({ id: k.slice(5), ...v })).sort((a, b) => a.pos - b.pos);
}
function makeNote(n) {
  const t = typeById(n.origin);
  const el = document.createElement('div');
  el.className = 'note'; el.draggable = true; el.dataset.id = n.id;
  el.style.setProperty('--c', t.c); el.style.setProperty('--bg', t.bg);
  el.innerHTML = `<span class="txt" contenteditable="true"></span><button class="del" title="Löschen">×</button><button class="vote"></button>`;
  const txt = el.querySelector('.txt');
  txt.textContent = n.text;
  const key = 'note:' + n.id;
  txt.addEventListener('input', () => put(key, { ...items[key], text: txt.textContent }, 400));
  const vote = el.querySelector('.vote');
  const votes = n.votes || 0;
  vote.textContent = '● ' + votes; vote.classList.toggle('has', votes > 0);
  vote.title = 'Klick: +1 · Shift+Klick: -1';
  vote.addEventListener('click', e => {
    const cur = items[key]; put(key, { ...cur, votes: Math.max(0, (cur.votes || 0) + (e.shiftKey ? -1 : 1)) });
    refreshCells([cur.cell]);
  });
  el.querySelector('.del').addEventListener('click', () => {
    if ((items[key].text || '').trim() && !confirm('Notiz löschen?')) return;
    const cell = items[key].cell; put(key, null); refreshCells([cell]);
  });
  el.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', n.id); el.classList.add('dragging'); });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  return el;
}
const cells = {};
function registerCell(cell, key, origin) {
  cell.dataset.key = key; cell.dataset.origin = origin; cells[key] = cell;
  cell.addEventListener('dragover', e => { e.preventDefault(); cell.classList.add('over'); });
  cell.addEventListener('dragleave', () => cell.classList.remove('over'));
  cell.addEventListener('drop', e => {
    e.preventDefault(); cell.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain'); const nk = 'note:' + id;
    if (!items[nk]) return;
    const from = items[nk].cell;
    const others = notesIn(key).filter(n => n.id !== id);
    const els = [...cell.querySelectorAll('.note:not(.dragging)')];
    let idx = els.findIndex(el => e.clientY < el.getBoundingClientRect().top + el.offsetHeight / 2);
    if (idx < 0) idx = others.length;
    const before = others[idx - 1]?.pos ?? 0, after = others[idx]?.pos ?? before + 2;
    put(nk, { ...items[nk], cell: key, pos: (before + after) / 2 });
    refreshCells([from, key]);
  });
  renderCell(cell);
}
function renderCell(cell) {
  const key = cell.dataset.key;
  cell.innerHTML = '';
  notesIn(key).forEach(n => cell.appendChild(makeNote(n)));
  const add = document.createElement('button');
  add.className = 'add'; add.textContent = '+ Notiz';
  add.addEventListener('click', () => {
    const list = notesIn(key); const id = uid();
    put('note:' + id, { cell: key, origin: cell.dataset.origin, text: '', votes: 0, pos: (list.at(-1)?.pos ?? 0) + 1 });
    renderCell(cell);
    cell.querySelector(`.note[data-id="${id}"] .txt`).focus();
  });
  cell.appendChild(add);
}
// Neu zeichnen, ohne dem Tippenden den Cursor wegzunehmen
function refreshCells(keys) {
  const a = document.activeElement;
  const noteId = a?.closest?.('.note')?.dataset.id;
  let off = 0;
  if (noteId) { const s = getSelection(); off = s.rangeCount ? s.getRangeAt(0).startOffset : 0; }
  [...new Set(keys)].forEach(k => cells[k] && renderCell(cells[k]));
  if (noteId) {
    const t = document.querySelector(`.note[data-id="${noteId}"] .txt`);
    if (t && t !== a) {
      t.focus();
      const node = t.firstChild || t; const r = document.createRange();
      r.setStart(node, Math.min(off, node.length ?? 0)); r.collapse(true);
      getSelection().removeAllRanges(); getSelection().addRange(r);
    }
  }
}

/* ================= Raster ================= */
function renderCanvas() {
  const g = document.getElementById('canvas');
  g.innerHTML = '<div></div>';
  TYPES.forEach(t => { const h = document.createElement('div'); h.className = 'colhead'; h.style.setProperty('--c', t.c); g.appendChild(h); });
  const kh = document.createElement('div'); kh.className = 'colhead kern'; kh.textContent = 'Für alle (Kern)'; g.appendChild(kh);
  ROWS.forEach(r => {
    const rh = document.createElement('div'); rh.className = 'rowhead';
    rh.innerHTML = `${r.name}${r.hint ? `<small>${r.hint}</small>` : ''}`; g.appendChild(rh);
    [...TYPES, KERN].forEach(t => {
      const c = document.createElement('div'); c.className = 'cell' + (t === KERN ? ' kern' : '');
      g.appendChild(c); registerCell(c, `${r.id}:${t.id}`, t.id);
    });
  });
  const m = document.getElementById('model'); m.innerHTML = '';
  MODEL.forEach((b, i) => {
    const el = document.createElement('div');
    el.className = 'block' + (i === MODEL.length - 1 ? ' wide' : '');
    el.innerHTML = `<h4>${b.name}</h4><p>${b.hint}</p><div class="cell kern"></div>`;
    m.appendChild(el); registerCell(el.querySelector('.cell'), b.id, 'kern');
  });
  renderHeads();
}
/* ================= Geldfluss-Diagramm ================= */
function renderGeldfluss() {
  const wrap = document.getElementById('geldfluss-diagram');
  if (!wrap) return;
  wrap.innerHTML = `
<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto 1.5rem;font-family:Inter,sans-serif">
  <defs>
    <marker id="gf-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker>
    <marker id="gf-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#059669"/></marker>
    <marker id="gf-o" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#D97706"/></marker>
  </defs>

  <!-- Kunden label -->
  <text x="75" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#6B7280" letter-spacing=".08em">KUNDEN</text>
  <!-- RC label -->
  <text x="380" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#2563EB" letter-spacing=".08em">REPAIRCHECK</text>
  <!-- Partner label -->
  <text x="685" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#6B7280" letter-spacing=".08em">PARTNER</text>

  <!-- Typ 1 -->
  <rect x="10" y="20" width="130" height="40" rx="7" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
  <text x="75" y="37" text-anchor="middle" font-size="12" font-weight="700" fill="#065F46">Typ 1</text>
  <text x="75" y="52" text-anchor="middle" font-size="10" fill="#6B7280">Der Einsteiger</text>

  <!-- Typ 4 -->
  <rect x="10" y="95" width="130" height="40" rx="7" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5"/>
  <text x="75" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="#991B1B">Typ 4</text>
  <text x="75" y="127" text-anchor="middle" font-size="10" fill="#6B7280">Qual. ausbaufähig</text>

  <!-- Typ 3 (Kunde) -->
  <rect x="10" y="170" width="130" height="48" rx="7" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="75" y="188" text-anchor="middle" font-size="12" font-weight="700" fill="#92400E">Typ 3</text>
  <text x="75" y="203" text-anchor="middle" font-size="10" fill="#6B7280">als Kunde</text>
  <text x="75" y="214" text-anchor="middle" font-size="9" fill="#D97706">zahlt für Services</text>

  <!-- RC box -->
  <rect x="295" y="72" width="170" height="90" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
  <text x="380" y="110" text-anchor="middle" font-size="13" font-weight="700" fill="#1E40AF">Repaircheck</text>
  <text x="380" y="128" text-anchor="middle" font-size="10" fill="#6B7280">nimmt Servicegebühren ein</text>
  <text x="380" y="143" text-anchor="middle" font-size="10" fill="#6B7280">vergütet Partner pro Fall</text>

  <!-- Typ 2 -->
  <rect x="620" y="34" width="130" height="48" rx="7" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
  <text x="685" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="#065F46">Typ 2</text>
  <text x="685" y="67" text-anchor="middle" font-size="10" fill="#6B7280">Der Etablierte</text>
  <text x="685" y="78" text-anchor="middle" font-size="9" fill="#059669">erhält € pro Fall</text>

  <!-- Typ 3 (Partner) -->
  <rect x="620" y="152" width="130" height="48" rx="7" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="685" y="170" text-anchor="middle" font-size="12" font-weight="700" fill="#92400E">Typ 3</text>
  <text x="685" y="185" text-anchor="middle" font-size="10" fill="#6B7280">als Partner</text>
  <text x="685" y="196" text-anchor="middle" font-size="9" fill="#D97706">erhält € pro Fall</text>

  <!-- Arrows: Kunden → RC -->
  <path d="M140,40 C210,40 230,100 293,105" stroke="#9CA3AF" stroke-width="1.5" fill="none" marker-end="url(#gf-a)"/>
  <text x="215" y="62" text-anchor="middle" font-size="9" fill="#9CA3AF">€</text>

  <path d="M140,115 L292,117" stroke="#9CA3AF" stroke-width="1.5" fill="none" marker-end="url(#gf-a)"/>
  <text x="215" y="109" text-anchor="middle" font-size="9" fill="#9CA3AF">€</text>

  <path d="M140,194 C210,194 230,145 293,132" stroke="#D97706" stroke-width="1.5" fill="none" stroke-dasharray="5,3" marker-end="url(#gf-o)"/>
  <text x="215" y="186" text-anchor="middle" font-size="9" fill="#D97706">€</text>

  <!-- Arrows: RC → Partner -->
  <path d="M465,100 C530,100 560,65 618,62" stroke="#059669" stroke-width="2" fill="none" marker-end="url(#gf-g)"/>
  <text x="543" y="72" text-anchor="middle" font-size="9" fill="#059669">€ pro Fall</text>

  <path d="M465,140 C530,140 560,170 618,172" stroke="#D97706" stroke-width="1.5" fill="none" stroke-dasharray="5,3" marker-end="url(#gf-o)"/>
  <text x="543" y="168" text-anchor="middle" font-size="9" fill="#D97706">€ pro Fall</text>
</svg>
<p style="text-align:center;font-size:.75rem;color:#9CA3AF;margin:0 0 1.5rem">Gestrichelt = Typ 3 ist gleichzeitig Kunde (zahlt RC) und Partner (erhält Fallvergütung)</p>`;
}

/* ================= Track-Modell (Tab 2) ================= */
function renderTracks() {
  renderGeldfluss();
  const wrap = document.getElementById('tracks');
  if (!wrap) return;
  wrap.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'tracks-grid';

  TRACKS.forEach(track => {
    const col = document.createElement('div');
    col.className = 'track-col';
    col.style.setProperty('--tc', track.c);
    col.style.setProperty('--tc-bg', track.cbg);

    const head = document.createElement('div');
    head.className = 'track-head';
    head.innerHTML = `<div class="track-name">${track.name}</div><div class="track-dir">${track.dir}</div><p class="track-sub">${track.sub}</p>`;
    col.appendChild(head);

    track.tiers.forEach(tier => {
      const tierEl = document.createElement('div');
      tierEl.className = 'tier-card';
      tierEl.innerHTML = `<div class="tier-head"><span class="tier-badge">${tier.name}</span><span class="tier-hint">${tier.hint}</span></div>`;
      const cellEl = document.createElement('div');
      cellEl.className = 'cell tier-cell';
      tierEl.appendChild(cellEl);
      col.appendChild(tierEl);
      registerCell(cellEl, `track:${track.id}:${tier.id}`, 'kern');
    });

    grid.appendChild(col);
  });

  wrap.appendChild(grid);

  const extras = document.createElement('div');
  extras.className = 'track-extras';

  TRACK_EXTRAS.forEach(extra => {
    const el = document.createElement('div');
    el.className = 'extra-block';
    el.innerHTML = `<h4>${extra.name}</h4><p class="extra-hint">${extra.hint}</p>`;
    const cellEl = document.createElement('div');
    cellEl.className = 'cell kern';
    el.appendChild(cellEl);
    extras.appendChild(el);
    registerCell(cellEl, `track:${extra.id}`, 'kern');
  });

  wrap.appendChild(extras);
}

function seedTracks() {
  const all = [
    ...TRACKS.flatMap(tr => tr.tiers.map(ti => ({ key: `track:${tr.id}:${ti.id}`, seed: tr.seed?.[ti.id] }))),
    ...TRACK_EXTRAS.map(e => ({ key: `track:${e.id}`, seed: e.seed })),
  ];
  all.forEach(({ key, seed }) => {
    if (!seed) return;
    const hasNotes = Object.values(items).some(v => v && typeof v === 'object' && v.cell === key);
    if (!hasNotes) seed.forEach((text, i) => put('note:' + uid(), { cell: key, origin: 'kern', text, votes: 0, pos: i + 1 }));
  });
}

function renderTexts() {
  document.querySelectorAll('header [data-key]').forEach(el => {
    const k = 'text:' + el.dataset.key;
    if (k in items && document.activeElement !== el) el.textContent = items[k];
  });
}
document.querySelectorAll('header [data-key]').forEach(el =>
  el.addEventListener('input', () => put('text:' + el.dataset.key, el.textContent, 400)));

/* ================= Eingehende Änderungen ================= */
function applyRemote(key, value) {
  const old = items[key];
  if (value === null) delete items[key]; else items[key] = value;
  if (key.startsWith('note:')) {
    const el = document.querySelector(`.note[data-id="${key.slice(5)}"]`);
    if (el && value && old && old.cell === value.cell && old.pos === value.pos) {
      const txt = el.querySelector('.txt');
      if (document.activeElement !== txt) txt.textContent = value.text;
      const v = el.querySelector('.vote'); v.textContent = '● ' + (value.votes || 0); v.classList.toggle('has', (value.votes || 0) > 0);
    } else refreshCells([old?.cell, value?.cell].filter(Boolean));
  } else if (key.startsWith('persona:') || key.startsWith('meter:')) {
    if (!document.activeElement?.closest?.('#personas')) renderPersonas();
    renderHeads();
  } else if (key.startsWith('text:')) renderTexts();
}

/* ================= Toolbar ================= */
document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ version: 2, items }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `partnermodelle-canvas-${new Date().toISOString().slice(0, 10)}.json`; a.click();
});
document.getElementById('importFile').addEventListener('change', async e => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (!data.items) throw new Error();
    if (!confirm('Import ersetzt nichts, sondern fügt die Einträge aus der Datei hinzu bzw. überschreibt gleiche. Fortfahren?')) return;
    Object.entries(data.items).forEach(([k, v]) => put(k, v));
    renderAll();
  } catch { alert('Die Datei konnte nicht gelesen werden.'); }
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm(LIVE ? 'Alle Notizen für ALLE Teilnehmer löschen? Vorher am besten exportieren.' : 'Alle Notizen und Änderungen löschen? Vorher am besten exportieren.')) return;
  Object.keys(items).forEach(k => put(k, null));
  renderAll();
});

function renderAll() { renderPersonas(); renderCanvas(); renderTexts(); renderTracks(); }

/* ================= Tab-Switching ================= */
document.getElementById('tabNav')?.addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
});

/* ================= Start ================= */
(async function init() {
  if (!LIVE) {
    try { items = JSON.parse(localStorage.getItem(STORE)) || {}; } catch { items = {}; }
    seedTracks();
    renderAll();
    status('Nur lokal, nicht geteilt! Live-Link mit #b= öffnen', 'err');
    return;
  }
  status('Verbinde …');
  sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  const { data, error } = await sb.rpc('canvas_load', { p_board: board });
  if (error) { status('Board nicht gefunden', 'err'); renderAll(); return; }
  data.forEach(r => { items[r.key] = r.value; });
  seedTracks();
  renderAll();
  channel = sb.channel('canvas-' + board, { config: { broadcast: { self: false }, presence: { key: uid() } } });
  channel
    .on('broadcast', { event: 'put' }, ({ payload }) => applyRemote(payload.key, payload.value))
    .on('presence', { event: 'sync' }, () => {
      const n = Object.keys(channel.presenceState()).length;
      status(`Live · ${n} ${n === 1 ? 'Person' : 'Personen'} online`, 'live');
    })
    .subscribe(async s => {
      if (s === 'SUBSCRIBED') { await channel.track({ at: Date.now() }); }
      else if (s === 'CHANNEL_ERROR' || s === 'TIMED_OUT') status('Live-Verbindung unterbrochen', 'err');
    });
})();
