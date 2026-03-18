/* ============================================
   HELP HIVE — Main JavaScript
   ============================================ */

// --- Mobile nav toggle ---
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// --- Active nav link highlight ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// --- Animate counters on scroll ---
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
    }
  }, 16);
}

const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counterEls.forEach(el => observer.observe(el));
}

// --- Donate amount buttons ---
const amountBtns = document.querySelectorAll('.amount-btn');
const customInput = document.getElementById('custom-amount');
amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (customInput) customInput.value = '';
  });
});
if (customInput) {
  customInput.addEventListener('input', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
  });
}

// --- Form placeholder submit ---
document.querySelectorAll('form[data-placeholder]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = form.querySelector('.form-success');
    if (msg) {
      msg.style.display = 'block';
      form.reset();
      amountBtns.forEach(b => b.classList.remove('active'));
      setTimeout(() => { msg.style.display = 'none'; }, 5000);
    }
  });
});

// --- Smooth reveal on scroll ---
const revealEls = document.querySelectorAll('.drive-card, .involve-card, .quote-card, .metric-card, .event-item');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });
}
