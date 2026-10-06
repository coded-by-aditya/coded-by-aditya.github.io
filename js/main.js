'use strict';

/* ── Scroll reveal ───────────────────────────────────── */
function initReveal() {
  window.__reveal = true;
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    document.documentElement.classList.add('no-reveal');
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── Top bar border once the page scrolls ────────────── */
function initTopbar() {
  const bar = document.querySelector('.topbar');
  if (!bar) return;
  const update = () => bar.classList.toggle('scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ── Highlight the nav link for the section in view ──── */
function initScrollSpy() {
  const links = document.querySelectorAll('.topnav a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const sections = Array.from(links)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach(s => obs.observe(s));
}

/* ── Light / dark toggle ─────────────────────────────── */
function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const current = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  const sync = () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', `Switch to ${next} mode`);
    btn.title = `Switch to ${next} mode`;
  };

  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-anim');
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (_) {}
    sync();
    setTimeout(() => root.classList.remove('theme-anim'), 350);
  });
  sync();
}

/* ── Email links: also copy the address ──────────────── */
// mailto: does nothing for visitors without a mail app set up (common with
// webmail), so copy the address too and say so.
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (_) {}
  ta.remove();
  return ok;
}

function initEmailLinks() {
  const links = document.querySelectorAll('a[href^="mailto:"]');
  if (!links.length) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  let timer;

  links.forEach(a => {
    a.addEventListener('click', () => {
      const email = a.getAttribute('href').replace(/^mailto:/, '');
      copyText(email).then(ok => {
        if (!ok) return;
        toast.textContent = `Email address copied: ${email}`;
        toast.classList.add('show');
        clearTimeout(timer);
        timer = setTimeout(() => toast.classList.remove('show'), 3200);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initTopbar();
  initScrollSpy();
  initThemeToggle();
  initEmailLinks();

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
