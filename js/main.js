/* ============================================================
   TVC Fashion House Sdn. Bhd. — interactions
   lenis smooth scroll · nav · menu · reveals · counters · parallax
   ============================================================ */

import Lenis from 'lenis';

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- smooth scrolling (Lenis) ---------- */
  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /* ---------- floating nav: shadow after leaving the very top ---------- */
  const nav = document.getElementById('nav-shell');
  const onScroll = () => nav.classList.toggle('nav-scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile slide-in menu ---------- */
  const burger = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');

  function setMenu(open) {
    panel.classList.toggle('translate-x-full', !open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('overflow-hidden', open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }

  burger.addEventListener('click', () => setMenu(true));
  if (menuClose) menuClose.addEventListener('click', () => setMenu(false));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- products dropdown (desktop nav) ---------- */
  const dd = document.querySelector('[data-dropdown]');
  if (dd) {
    const btn = dd.querySelector('[data-dropdown-btn]');
    const menu = dd.querySelector('[data-dropdown-menu]');
    const icon = dd.querySelector('[data-dropdown-icon]');

    const setOpen = (open) => {
      menu.classList.toggle('invisible', !open);
      menu.classList.toggle('opacity-0', !open);
      menu.classList.toggle('translate-y-2', !open);
      if (icon) icon.style.transform = open ? 'rotate(180deg)' : '';
      btn.setAttribute('aria-expanded', String(open));
    };

    // click always opens (never toggles, so it can't fight the hover state)
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(true);
    });
    dd.addEventListener('mouseenter', () => setOpen(true));
    dd.addEventListener('mouseleave', () => setOpen(false));
    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) setOpen(false);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- smooth anchor navigation (after menu so it restarts first) ---------- */
  if (lenis) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const target = href.length > 1 ? document.querySelector(href) : null;
        if (href === '#top' || href === '#') {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.4 });
        } else if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -70, duration: 1.3 });
        }
      });
    });
  }

  /* ---------- route line: freeze under reduced motion ---------- */
  document.querySelectorAll('svg[data-smil]').forEach((svg) => {
    if (reduced && typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
  });

  /* ---------- scroll reveals ---------- */
  const revealEls = document.querySelectorAll('[data-reveal], .img-reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');

  const runCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    if (reduced) {
      el.textContent = target;
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!reduced && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- subtle parallax on banner images ---------- */
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!reduced && parallaxEls.length) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax || '0.15');
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${(-progress * speed * 100).toFixed(2)}%) scale(1.18)`;
      });
      ticking = false;
    };
    const onScrollPara = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScrollPara, { passive: true });
    update();
  }

  /* ---------- active nav link ---------- */
  const links = Array.from(document.querySelectorAll('[data-nav-link]'));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => {
              l.classList.toggle(
                'nav-link--active',
                l.getAttribute('href') === '#' + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => sio.observe(s));
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
