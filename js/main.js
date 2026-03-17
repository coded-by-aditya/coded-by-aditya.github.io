'use strict';

/* ── JSON syntax highlighter ────────────────────────── */
function highlightCode(el) {
  if (!el) return;
  const raw = el.textContent;
  // escape first
  let s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight in order: keys, then string values, numbers, booleans, punctuation
  s = s
    // object keys: "key":
    .replace(/"([^"]+)"(\s*):/g, '<span class="k">"$1"</span>$2:')
    // string values after colon (or in arrays at line start with indentation)
    .replace(/:\s*"([^"]*)"/g, (_, v) => `: <span class="s">"${v}"</span>`)
    // standalone strings in arrays
    .replace(/^(\s+)"([^"]+)"(,?)$/gm, (_, ws, v, comma) =>
      `${ws}<span class="s">"${v}"</span>${comma}`)
    // numbers
    .replace(/: (-?\d+\.?\d*)/g, (_, v) => `: <span class="n">${v}</span>`)
    // booleans & null
    .replace(/: (true|false|null)/g, (_, v) => `: <span class="b">${v}</span>`)
    // punctuation
    .replace(/([{}\[\],])/g, '<span class="p">$1</span>');

  el.innerHTML = s;
}

/* Highlight HTTP request blocks */
function highlightHTTP(el) {
  if (!el) return;
  const raw = el.textContent;
  let s = raw
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  s = s
    // first line: METHOD path HTTP/1.1
    .replace(/^(GET|POST|PUT|DELETE|PATCH)(\s+)(\S+)(\s+)(HTTP\/[\d\.]+)/m,
      '<span class="ht">$1</span>$2<span class="s">$3</span>$4<span class="p">$5</span>')
    // header lines: Key: value
    .replace(/^([A-Za-z-]+)(:\s*)(.+)$/gm,
      '<span class="hk">$1</span>$2<span class="hv">$3</span>');

  el.innerHTML = s;
}

/* ── Copy to clipboard ───────────────────────────────── */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('.code-pre');
      const text = pre ? pre.textContent : '';
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      });
    });
  });
}

/* ── Active nav on scroll ────────────────────────────── */
function initScrollSpy() {
  const links = document.querySelectorAll('.nav-lnk[href^="#"]');
  if (!links.length) return;

  const sections = Array.from(links)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

/* ── Theme toggle ────────────────────────────────────── */
function initThemeToggle() {
  const btn   = document.getElementById('theme-toggle');
  const icon  = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (!btn) return;

  function syncUI() {
    const isLight = document.documentElement.classList.contains('light');
    if (icon)  icon.textContent  = isLight ? '🌙' : '☀️';
    if (label) label.textContent = isLight ? 'Dark mode' : 'Light mode';
  }

  syncUI(); // set correct state on load

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch(_) {}
    syncUI();
  });
}

/* ── Mobile sidebar ──────────────────────────────────── */
function initMobileSidebar() {
  const btn      = document.querySelector('.mob-menu-btn');
  const sidebar  = document.querySelector('.sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');
  const closeBtn = document.querySelector('.mob-close');

  function open()  { sidebar.classList.add('open');  overlay.classList.add('open'); }
  function close() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  btn     && btn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);

  // Close sidebar on nav link click (mobile)
  document.querySelectorAll('.nav-lnk').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 768) close();
    });
  });
}

/* ── Scroll reveal ───────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── Init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Apply syntax highlighting
  document.querySelectorAll('code.json-hl').forEach(highlightCode);
  document.querySelectorAll('code.http-hl').forEach(highlightHTTP);

  initThemeToggle();
  initCopyButtons();
  initScrollSpy();
  initMobileSidebar();
  initScrollReveal();

  // Year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
