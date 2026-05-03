/* ────────────────────────────────────────────────────
   PORTFOLIO – JavaScript
──────────────────────────────────────────────────── */

// ── Year in footer ────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll state ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu toggle ────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Typed tagline effect ──────────────────────────────
const taglines = [
  'Full-Stack Developer',
  'Machine Learning Engineer',
  'Open-Source Contributor',
  'Problem Solver',
];

let tlIndex   = 0;
let charIndex = 0;
let deleting  = false;
const taglineEl = document.getElementById('typed-tagline');

function typeEffect() {
  const current = taglines[tlIndex];

  if (deleting) {
    taglineEl.textContent = current.slice(0, charIndex--);
  } else {
    taglineEl.textContent = current.slice(0, charIndex++);
  }

  let delay = deleting ? 50 : 90;

  if (!deleting && charIndex > current.length) {
    delay    = 1800;
    deleting = true;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    tlIndex  = (tlIndex + 1) % taglines.length;
    delay    = 400;
  }

  setTimeout(typeEffect, delay);
}

// Start after hero animation completes
setTimeout(typeEffect, 1000);

// ── Intersection Observer – fade-in cards ─────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards for a cascade effect
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Active nav link on scroll ────────────────────────
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
