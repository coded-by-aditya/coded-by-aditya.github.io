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
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const current = () => root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');

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
  if (mq.addEventListener) mq.addEventListener('change', sync);
  sync();
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initTopbar();
  initScrollSpy();
  initThemeToggle();

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
