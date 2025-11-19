/* main.js — Interactivity for TOC, collapsible code, and theme toggle */

// ===== Smooth scroll for TOC links =====
document.querySelectorAll('.toc a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Scroll spy: highlight current section =====
const sections = document.querySelectorAll('article section[id]');
const tocLinks = document.querySelectorAll('.toc a');

function onScrollSpy() {
  let current = sections[0] ? sections[0].id : '';
  const offset = window.innerHeight * 0.25; // Trigger earlier
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top - offset <= 0) current = sec.id;
  });
  tocLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScrollSpy, { passive: true });
onScrollSpy();

// ===== Collapsible code blocks =====
const collapsibles = document.querySelectorAll('[data-collapsible]');
collapsibles.forEach(block => {
  block.addEventListener('click', () => block.classList.toggle('collapsed'));
});

// ===== Toggle all code blocks button =====
const toggleCodeBtn = document.getElementById('toggleCode');
if (toggleCodeBtn) {
  let collapsed = true; // start collapsed
  toggleCodeBtn.addEventListener('click', () => {
    collapsed = !collapsed;
    collapsibles.forEach(block => block.classList.toggle('collapsed', collapsed));
  });
}

// ===== Light/Dark theme toggle =====
const toggleTheme = document.getElementById('toggleTheme');
if (toggleTheme) {
  let light = false;
  toggleTheme.addEventListener('click', () => {
    light = !light;
    if (light) {
      // Light mode styles
      document.body.style.background = 'linear-gradient(180deg,#fbfbff,#f0f4ff)';
      document.body.style.color = '#021026';
      toggleTheme.textContent = 'Dark Mode';
    } else {
      // Dark mode styles
      document.body.style.background = 'linear-gradient(180deg,#05060a,#080812)';
      document.body.style.color = '#e6eef8';
      toggleTheme.textContent = 'Light Mode';
    }
  });
}

// ===== Ensure all collapsible code blocks are collapsed on page load =====
window.addEventListener('load', () => {
  collapsibles.forEach(block => block.classList.add('collapsed'));
});
