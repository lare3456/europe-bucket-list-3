/* ---------- state ---------- */
const KEY = "europe-bucket-list.v1";
const TOTAL = COUNTRIES.length;
let picked = new Set();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){
      const arr = JSON.parse(raw);
      if(Array.isArray(arr)) picked = new Set(arr.filter(n => COUNTRIES.some(c => c.name === n)));
    }
  }catch(e){ picked = new Set(); }
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify([...picked])); }catch(e){}
}

/* ---------- small helpers ---------- */
const $ = s => document.querySelector(s);
const idOf = i => "card-" + (i + 1);
const pad = n => String(n).padStart(2, "0");
const coordText = ll => ll ? `${Math.abs(ll[0]).toFixed(1)}° ${ll[0] < 0 ? "S" : "N"} · ${Math.abs(ll[1]).toFixed(1)}° ${ll[1] < 0 ? "W" : "E"}` : "";

const STAMP_COLORS = ["#BE4739","#38634A","#E0A32C","#4E7A9C","#7A5068","#8A5A38"];

function stampSVG(i){
  const c = STAMP_COLORS[i % STAMP_COLORS.length];
  return `<svg width="52" height="62" viewBox="0 0 52 62" aria-hidden="true" focusable="false">
    <path d="M3 3h46v56H3z" fill="#F3E6CE" stroke="#22314A" stroke-width="1.2" stroke-dasharray="4 3"/>
    <rect x="8" y="8" width="36" height="34" fill="${c}"/>
    <path d="M8 42l11-14 8 8 7-9 10 15z" fill="#F3E6CE" opacity=".85"/>
    <circle cx="17" cy="17" r="4.5" fill="#F3E6CE" opacity=".9"/>
    <text x="26" y="54" text-anchor="middle" font-family="Special Elite, monospace" font-size="10" fill="#22314A">N° ${pad(i+1)}</text>
  </svg>`;
}
function postmarkSVG(i){
  return `<svg width="86" height="86" viewBox="0 0 86 86" aria-hidden="true" focusable="false" opacity=".8">
    <circle cx="43" cy="43" r="33" fill="none" stroke="#22314A" stroke-width="2"/>
    <circle cx="43" cy="43" r="27" fill="none" stroke="#22314A" stroke-width="1" stroke-dasharray="3 4"/>
    <text x="43" y="36" text-anchor="middle" font-family="Special Elite, monospace" font-size="9" fill="#22314A">EUROPE</text>
    <text x="43" y="52" text-anchor="middle" font-family="Special Elite, monospace" font-size="14" fill="#22314A">${pad(i+1)}/46</text>
    <path d="M6 60q12-8 24 0t24 0t24 0" fill="none" stroke="#22314A" stroke-width="1.5" opacity=".6"/>
  </svg>`;
}
function listStampSVG(){
  return `<svg width="104" height="46" viewBox="0 0 104 46" aria-hidden="true" focusable="false">
    <rect x="2" y="2" width="100" height="42" rx="4" fill="none" stroke="#BE4739" stroke-width="3"/>
    <text x="52" y="30" text-anchor="middle" font-family="Special Elite, monospace" font-size="15" fill="#BE4739" letter-spacing="1">ON MY LIST</text>
  </svg>`;
}
function flightSVG(flip){
  return `<svg class="flight${flip ? " flip" : ""}" viewBox="0 0 520 40" aria-hidden="true" focusable="false">
    <path d="M10 30q130-40 250-12t250-6" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 8"/>
    <g transform="translate(250 14) rotate(6)" fill="currentColor"><path d="M0 0l26 8-26 8 6-8z"/><path d="M6 8h-16" stroke="currentColor" stroke-width="2"/></g>
    <circle cx="10" cy="30" r="3" fill="currentColor"/><circle cx="510" cy="12" r="3" fill="currentColor"/>
  </svg>`;
}

/* ---------- postcards ---------- */
function buildDeck(){
  const deck = $("#deck");
  const frag = document.createDocumentFragment();
  COUNTRIES.forEach((c, i) => {
    const geo = MAP.countries[c.name] || {};
    const art = (SCENES[c.art] || (() => K.sky()))();
    const el = document.createElement("article");
    el.className = "pc" + (i % 2 ? " alt" : "");
    el.id = idOf(i);
    el.dataset.country = c.name;
    el.innerHTML = `
      <div class="pc-art">
        <svg class="scene" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img"
             aria-label="Illustration of ${c.landmark}, ${c.name}">${art}</svg>
        <div class="postmark">${postmarkSVG(i)}</div>
        <div class="pc-stamp">${stampSVG(i)}</div>
        <div class="visited">${listStampSVG()}</div>
      </div>
      <div class="pc-body">
        <p class="greet">Greetings from</p>
        <h3>${c.name}</h3>
        <p class="meta">${coordText(geo.ll)} · ${c.landmark}</p>
        <dl class="facts">
          <div><dt>Languages</dt><dd>${c.languages}</dd></div>
          <div><dt>Population</dt><dd>${c.population}</dd></div>
          <div><dt>Best time</dt><dd>${c.bestTime}</dd></div>
          <div class="knownfor"><dt>Known for</dt><dd>${c.knownFor.map(k => `<span>${k}</span>`).join("")}</dd></div>
        </dl>
        <button class="heart-btn" type="button" aria-pressed="false" data-country="${c.name}">
          <span class="ic" aria-hidden="true">♡</span><span class="lbl">Add to bucket list</span>
        </button>
      </div>`;
    frag.appendChild(el);
    if(i < COUNTRIES.length - 1){
      const sep = document.createElement("div");
      sep.innerHTML = flightSVG(i % 2 === 1);
      sep.style.width = "100%";
      frag.appendChild(sep.firstElementChild);
    }
  });
  deck.appendChild(frag);

  deck.addEventListener("click", e => {
    const btn = e.target.closest(".heart-btn");
    if(btn) toggle(btn.dataset.country, btn);
  });

  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!calm && "IntersectionObserver" in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    document.querySelectorAll(".pc").forEach(el => io.observe(el));
  }else{
    document.querySelectorAll(".pc").forEach(el => el.classList.add("in"));
  }
}

/* ---------- map ---------- */
const MICRO = ["Andorra","Liechtenstein","Luxembourg","Malta","Monaco","San Marino","Vatican City"];

function buildMap(){
  const vb = MAP.viewBox;
  const pad = 18;
  let paths = "", dots = "";
  COUNTRIES.forEach(c => {
    const g = MAP.countries[c.name];
    if(!g) return;
    paths += `<path class="cshape" id="geo-${c.name.replace(/[^a-z]/gi,"")}" d="${g.d}" fill-rule="evenodd"
      role="button" tabindex="0" aria-pressed="false" aria-label="${c.name}" data-country="${c.name}"><title>${c.name}</title></path>`;
    if(MICRO.includes(c.name)){
      dots += `<g data-country="${c.name}" class="micro-dot">
        <circle class="hit" cx="${g.c[0]}" cy="${g.c[1]}" r="17" role="button" tabindex="0" aria-pressed="false" aria-label="${c.name}" data-country="${c.name}"><title>${c.name}</title></circle>
        <circle class="dot" id="dot-${c.name.replace(/[^a-z]/gi,"")}" cx="${g.c[0]}" cy="${g.c[1]}" r="7.5" pointer-events="none"/>
      </g>`;
    }
  });
  $("#mapScroll").innerHTML =
    `<svg id="map" viewBox="${vb[0]-pad} ${vb[1]-pad} ${vb[2]+pad*2} ${vb[3]+pad*2}" role="group"
       aria-label="Map of Europe. Select a country to add it to your bucket list.">
       <rect x="${vb[0]-pad}" y="${vb[1]-pad}" width="${vb[2]+pad*2}" height="${vb[3]+pad*2}" fill="var(--sea)"/>
       ${paths}${dots}</svg>`;

  const map = $("#map"), tip = $("#tip"), frame = map.closest(".map-frame");
  const showTip = (name, x, y) => {
    tip.textContent = name;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
    tip.classList.add("show");
  };
  const hideTip = () => tip.classList.remove("show");

  map.addEventListener("pointermove", e => {
    const t = e.target.closest("[data-country]");
    if(!t) return hideTip();
    const r = frame.getBoundingClientRect();
    showTip(t.dataset.country, e.clientX - r.left, e.clientY - r.top);
  });
  map.addEventListener("pointerleave", hideTip);
  map.addEventListener("click", e => {
    const t = e.target.closest("[data-country]");
    if(t) toggle(t.dataset.country);
  });
  map.addEventListener("keydown", e => {
    if(e.key !== "Enter" && e.key !== " ") return;
    const t = e.target.closest("[data-country]");
    if(t){ e.preventDefault(); toggle(t.dataset.country); }
  });
  map.addEventListener("focusin", e => {
    const t = e.target.closest("[data-country]");
    if(!t) return;
    const r = frame.getBoundingClientRect(), b = t.getBoundingClientRect();
    showTip(t.dataset.country, b.left + b.width / 2 - r.left, b.top - r.top + 8);
  });
  map.addEventListener("focusout", hideTip);

  $("#microRail").innerHTML = MICRO.map(n =>
    `<button class="micro" type="button" aria-pressed="false" data-country="${n}">${n}</button>`).join("");
  $("#microRail").addEventListener("click", e => {
    const b = e.target.closest("button");
    if(b) toggle(b.dataset.country);
  });
}

/* ---------- bucket list ---------- */
function renderList(){
  const body = $("#listBody");
  const chosen = COUNTRIES.map((c, i) => ({ c, i })).filter(o => picked.has(o.c.name));
  if(!chosen.length){
    body.innerHTML = `<div class="empty"><b>Your bucket list is empty!</b>
      <p>Start exploring Europe and heart the places you want to visit.</p></div>`;
  }else{
    body.innerHTML = `<ul class="chips">` + chosen.map(({ c, i }) => `
      <li class="chip">
        <span class="no">${pad(i + 1)}</span>
        <a href="#${idOf(i)}">♥ ${c.name}</a>
        <button type="button" data-country="${c.name}" aria-label="Remove ${c.name} from my bucket list">✕</button>
      </li>`).join("") + `</ul>`;
    body.querySelector(".chips").addEventListener("click", e => {
      const b = e.target.closest("button");
      if(b) toggle(b.dataset.country);
    });
  }
  $("#clearBtn").disabled = !chosen.length;
}

/* ---------- sync every surface ---------- */
const MILESTONES = {
  1: "1 country collected — the trip begins",
  5: "5 / 46 countries collected",
  10: "10 / 46 countries collected",
  25: "25 / 46 — over halfway",
  40: "40 / 46 — nearly the whole continent",
  46: "46 / 46 — Europe complete!"
};
let lastCount = -1;

function sync(announce){
  const n = picked.size;
  $("#tallyNum").textContent = `${n} / ${TOTAL}`;
  $("#heroNum").textContent = n;
  $("#countLine").textContent = `${n} / ${TOTAL} countries`;
  $("#bar").style.width = (n / TOTAL * 100) + "%";

  document.querySelectorAll(".heart-btn").forEach(b => {
    const on = picked.has(b.dataset.country);
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.querySelector(".ic").textContent = on ? "♥" : "♡";
    b.querySelector(".lbl").textContent = on ? "On my bucket list" : "Add to bucket list";
    b.closest(".pc").classList.toggle("picked", on);
  });
  document.querySelectorAll("#map [data-country]").forEach(el => {
    const on = picked.has(el.dataset.country);
    if(el.classList.contains("cshape")) el.classList.toggle("on", on);
    if(el.classList.contains("hit")){
      const dot = el.parentNode.querySelector(".dot");
      if(dot) dot.classList.toggle("on", on);
    }
    if(el.hasAttribute("aria-pressed")) el.setAttribute("aria-pressed", on ? "true" : "false");
  });
  document.querySelectorAll(".micro").forEach(b =>
    b.setAttribute("aria-pressed", picked.has(b.dataset.country) ? "true" : "false"));

  renderList();
  if(announce && n > lastCount && MILESTONES[n]) toast(MILESTONES[n]);
  lastCount = n;
}

let toastTimer;
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function toggle(name, btn){
  if(!COUNTRIES.some(c => c.name === name)) return;
  if(picked.has(name)) picked.delete(name); else picked.add(name);
  save();
  sync(true);
  const b = btn || document.querySelector(`.heart-btn[data-country="${name.replace(/"/g, '\\"')}"]`);
  if(b && picked.has(name)){
    b.classList.remove("pop");
    void b.offsetWidth;
    b.classList.add("pop");
  }
  const heart = $("#tallyHeart");
  heart.animate ? heart.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.5)" }, { transform: "scale(1)" }],
    { duration: 320, easing: "ease-out" }) : null;
}

/* ---------- chrome ---------- */
function wireChrome(){
  const burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.addEventListener("click", e => {
    if(e.target.tagName === "A"){ menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });
  $("#tally").addEventListener("click", () =>
    $("#bucket").scrollIntoView({ behavior: "smooth", block: "start" }));

  const dlg = $("#confirmDlg");
  $("#clearBtn").addEventListener("click", () => {
    if(!picked.size) return;
    if(typeof dlg.showModal === "function") dlg.showModal();
    else if(confirm("Clear every country from your bucket list?")) clearAll();
  });
  $("#confirmNo").addEventListener("click", () => dlg.close());
  $("#confirmYes").addEventListener("click", () => { dlg.close(); clearAll(); });
  function clearAll(){
    picked.clear(); save(); lastCount = 0; sync(false);
    toast("Bucket list cleared — the map is blank again");
  }
}

/* ---------- go ---------- */
load();
buildDeck();
buildMap();
wireChrome();
lastCount = picked.size;
sync(false);
