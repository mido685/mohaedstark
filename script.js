/**
 * STARK AI — Portfolio JavaScript
 * Cursor glow · Navbar scroll · Smooth reveal · Tech bars · Counter · Form
 */

/* ══════════════════════════════════════════════════
   1. CURSOR GLOW
══════════════════════════════════════════════════ */
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ══════════════════════════════════════════════════
   2. NAVBAR — scroll style + hamburger
══════════════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.children[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  hamburger.children[1].style.opacity   = isOpen ? '0' : '1';
  hamburger.children[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.children[0].style.transform = '';
    hamburger.children[1].style.opacity   = '1';
    hamburger.children[2].style.transform = '';
  });
});

/* ══════════════════════════════════════════════════
   3. SMOOTH SCROLL helper
══════════════════════════════════════════════════ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ══════════════════════════════════════════════════
   4. INTERSECTION OBSERVER — reveal elements
══════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════════════
   5. TECH BAR FILL — animate on visible
══════════════════════════════════════════════════ */
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.tech-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 300);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const techSection = document.getElementById('tech');
if (techSection) techObserver.observe(techSection);

/* ══════════════════════════════════════════════════
   6. HERO STAT COUNTER
══════════════════════════════════════════════════ */
function animateCounter(el, target, duration = 1800) {
  let start   = 0;
  const step  = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(el => {
        animateCounter(el, parseInt(el.getAttribute('data-target'), 10));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/* ══════════════════════════════════════════════════
   7. ACTIVE NAV LINK on scroll
══════════════════════════════════════════════════ */
const sections   = document.querySelectorAll('section[id]');
const allLinks   = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ══════════════════════════════════════════════════
   8. CONTACT FORM — simulated submit
══════════════════════════════════════════════════ */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn  = contactForm.querySelector('button[type="submit"]');
  const orig = btn.querySelector('.btn-text').textContent;

  btn.querySelector('.btn-text').textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.querySelector('.btn-text').textContent = orig;
    btn.disabled = false;
    formSuccess.style.display = 'block';
    contactForm.reset();

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1400);
});

/* ══════════════════════════════════════════════════
   9. PROJECT CARDS — neon tilt on mouse move
══════════════════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    const tiltX  = y * 6;
    const tiltY  = -x * 6;

    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Move glow
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top  = (e.clientY - rect.top)  + 'px';
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ══════════════════════════════════════════════════
   10. ARCHITECTURE NODES — pulse on hover
══════════════════════════════════════════════════ */
document.querySelectorAll('.arch-node').forEach(node => {
  node.addEventListener('mouseenter', () => {
    const icon = node.querySelector('.node-icon');
    if (icon) {
      icon.style.borderColor  = 'rgba(0,162,255,0.5)';
      icon.style.boxShadow    = '0 0 24px rgba(0,162,255,0.3)';
      icon.style.transform    = 'scale(1.1)';
    }
  });

  node.addEventListener('mouseleave', () => {
    const icon = node.querySelector('.node-icon');
    if (icon) {
      icon.style.borderColor  = '';
      icon.style.boxShadow    = '';
      icon.style.transform    = '';
    }
  });
});

/* ══════════════════════════════════════════════════
   11. TERMINAL — typing effect refresh
══════════════════════════════════════════════════ */
const terminalLines = document.querySelectorAll('#terminalBody .terminal-line');

function revealTerminal() {
  terminalLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-8px)';
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      line.style.opacity  = '1';
      line.style.transform = 'translateX(0)';
    }, i * 120);
  });
}

const terminalObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) revealTerminal();
}, { threshold: 0.5 });

const termCard = document.querySelector('.terminal-card');
if (termCard) terminalObserver.observe(termCard);

/* ══════════════════════════════════════════════════
   12. FOCUS CARDS stagger on about section visible
══════════════════════════════════════════════════ */
const focusCards = document.querySelectorAll('.focus-card');

const focusObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    focusCards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0)';
      }, i * 80);
    });
    focusObserver.disconnect();
  }
}, { threshold: 0.2 });

const aboutSection = document.getElementById('about');
if (aboutSection) focusObserver.observe(aboutSection);

/* ══════════════════════════════════════════════════
   13. ACTIVE LINK STYLE via CSS class
══════════════════════════════════════════════════ */
// Inject active style
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--neon) !important;
  }
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

/* ══════════════════════════════════════════════════
   14. FOOTER year auto-update
══════════════════════════════════════════════════ */
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  const yr = new Date().getFullYear();
  yearEl.textContent = yearEl.textContent.replace(/\d{4}/, yr);
}

/* ══════════════════════════════════════════════════
   15. DEMO / DASHBOARD buttons — ripple effect
══════════════════════════════════════════════════ */
document.querySelectorAll('.btn-neon, .btn-dashboard').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple   = document.createElement('span');
    const rect     = btn.getBoundingClientRect();
    const size     = Math.max(rect.width, rect.height);
    const x        = e.clientX - rect.left - size / 2;
    const y        = e.clientY - rect.top  - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      left: ${x}px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.5s ease-out forwards;
      pointer-events: none;
    `;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

console.log('%c STARK AI %c Intelligent Systems & AI Engineering ', 
  'background:#00a2ff;color:#000;font-weight:900;padding:4px 8px;font-family:monospace',
  'background:#070d14;color:#00a2ff;padding:4px 8px;font-family:monospace');
