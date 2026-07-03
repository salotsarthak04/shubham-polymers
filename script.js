/* =============================================
   SHUBHAM POLYMERS — JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. NAVBAR — scroll effect & active link tracking
  ----------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) currentSection = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  /* -----------------------------------------------
     2. HAMBURGER MENU
  ----------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* -----------------------------------------------
     3. SCROLL REVEAL
  ----------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.08}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* -----------------------------------------------
     4. COUNTER ANIMATION (handles decimals + suffixes)
  ----------------------------------------------- */
  function animateCounter(el, target, duration = 1800) {
    const decimals  = parseInt(el.dataset.decimals || '0');
    const suffix    = el.dataset.suffix || '';
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = eased * target;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  }


  // --- Achievements stats ---
  const achieveNums = document.querySelectorAll('.achieve-num[data-target]');
  const achieveSection = document.getElementById('achievements');
  let achieveDone = false;

  const achieveObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !achieveDone) {
      achieveDone = true;
      achieveNums.forEach((el, i) => {
        // Stagger each card's counter start slightly
        setTimeout(() => {
          animateCounter(el, parseFloat(el.dataset.target));
        }, i * 120);
      });
    }
  }, { threshold: 0.3 });
  if (achieveSection) achieveObserver.observe(achieveSection);

  // Infrastructure stats
  const infraStatNums = document.querySelectorAll('.infra-stat-num[data-target]');
  const infraStatsSection = document.getElementById('infra-stats');
  let infraStatsDone = false;

  const infraStatsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !infraStatsDone) {
      infraStatsDone = true;
      infraStatNums.forEach(el => {
        animateCounter(el, parseFloat(el.dataset.target));
      });
    }
  }, { threshold: 0.4 });
  if (infraStatsSection) infraStatsObserver.observe(infraStatsSection);

  /* -----------------------------------------------
     5. CONTACT FORM
  ----------------------------------------------- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!name || !email) {
        // Shake effect on empty fields
        [document.getElementById('name'), document.getElementById('email')].forEach(input => {
          if (!input.value.trim()) {
            input.style.borderColor = '#c0392b';
            input.style.animation = 'shake .4s ease';
            setTimeout(() => {
              input.style.animation = '';
              input.style.borderColor = '';
            }, 500);
          }
        });
        return;
      }

      // Simulate sending
      const btn = document.getElementById('form-submit-btn');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Send Enquiry →';
        btn.disabled = false;
        form.reset();
        successMsg.classList.add('visible');
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
      }, 1500);
    });
  }

  /* -----------------------------------------------
     6. SMOOTH NAV LINK SCROLL
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* -----------------------------------------------
     7. PRODUCT CARD TILT EFFECT
  ----------------------------------------------- */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 4;
      const tiltY = ((x - cx) / cx) * -4;
      card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* -----------------------------------------------
     8. APP TAB SWITCHING LOGIC
  ----------------------------------------------- */
  const appTabs = document.querySelectorAll('.app-tab');
  const appTabContents = document.querySelectorAll('.app-tab-content');

  appTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      appTabs.forEach(t => t.classList.remove('active'));
      // Remove active from all contents
      appTabContents.forEach(c => c.classList.remove('active'));

      // Add active to clicked tab
      tab.classList.add('active');
      // Add active to corresponding content
      const targetId = 'tab-' + tab.dataset.tab;
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* -----------------------------------------------
     9. ACTIVE NAV STYLE INJECTION
  ----------------------------------------------- */
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active { color: var(--red) !important; font-weight: 600; }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  /* -----------------------------------------------
     10. LOGO FALLBACK (if image fails)
  ----------------------------------------------- */
  const logoImg = document.getElementById('logo-image');
  if (logoImg) {
    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
    });
  }

  /* -----------------------------------------------
     11. GRANULE PARALLAX ON SCROLL — desktop only
  ----------------------------------------------- */
  const heroImg = document.getElementById('hero-img');
  window.addEventListener('scroll', () => {
    if (heroImg && window.innerWidth > 768) {
      const y = window.scrollY * 0.08;
      heroImg.style.transform = `perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(${y}px)`;
    }
  }, { passive: true });

});
