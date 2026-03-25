/* ===================================================
   SANSKRITI SETU — CORE APPLICATION JAVASCRIPT
   Quiz Engine, Progress Tracking, Toast, Badges
   =================================================== */

/* ===================================================
   TOAST NOTIFICATION SYSTEM
   =================================================== */
function showToast(message, type = 'info', duration = 4000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-size:1.1rem;">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span style="flex:1;">${message}</span>
    <span onclick="this.parentElement.remove()" style="cursor:pointer;opacity:0.7;font-size:0.9rem;">✕</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentElement) { toast.classList.add('hide'); setTimeout(() => toast.remove(), 300); } }, duration);
}

/* ===================================================
   PROGRESS & STAR TRACKING (localStorage)
   =================================================== */

/**
 * Save module quiz score and update totals
 * @param {string} moduleKey - e.g. 'festivals'
 * @param {number} score - 0-5 score from quiz
 */
function saveModuleProgress(moduleKey, score) {
  const progress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
  const wasCompleted = (progress[moduleKey] || 0) >= 3;

  progress[moduleKey] = Math.max(progress[moduleKey] || 0, score);
  localStorage.setItem('moduleProgress', JSON.stringify(progress));

  const totalStars = Object.values(progress).reduce((sum, s) => sum + s, 0);
  localStorage.setItem('totalStars', totalStars.toString());

  const starEl = document.getElementById('starsCount');
  if (starEl) starEl.textContent = totalStars;

  const passed = score >= 3;

  if (passed && !wasCompleted) {
    awardBadge(moduleKey);
    showToast(`🌟 Congratulations! You earned a badge for ${moduleKey}!`, 'success', 5000);
  } else if (passed) {
    showToast(`⭐ You scored ${score} stars! Great job!`, 'success');
  } else {
    showToast(`💪 You scored ${score}. Try again to earn your badge!`, 'info');
  }
}

/* ===================================================
   BADGE SYSTEM
   =================================================== */
const BADGE_DEFINITIONS = {
  festivals:  { icon: '🪔', name: 'Festival Champion' },
  dance:      { icon: '💃', name: 'Dance Artist' },
  stories:    { icon: '📖', name: 'Story Master' },
  yoga:       { icon: '🧘', name: 'Yoga Champion' },
  food:       { icon: '🍛', name: 'Food Explorer' },
  music:      { icon: '🎵', name: 'Music Maestro' },
  languages:  { icon: '🔤', name: 'Language Star' },
  nature:     { icon: '🌿', name: 'Nature Guardian' }
};

function awardBadge(moduleKey) {
  const badges = JSON.parse(localStorage.getItem('badges') || '[]');
  const exists = badges.find(b => b.key === moduleKey);
  if (!exists) {
    const def = BADGE_DEFINITIONS[moduleKey];
    if (def) {
      badges.push({ key: moduleKey, ...def, earnedAt: new Date().toISOString() });
      localStorage.setItem('badges', JSON.stringify(badges));
    }
  }
}

/* ===================================================
   MOBILE MENU TOGGLE
   =================================================== */
function toggleMenu() {
  const nav = document.getElementById('navMenu');
  const actions = document.getElementById('navActions');
  if (nav) nav.classList.toggle('open');
  if (actions) actions.classList.toggle('open');
}

/* ===================================================
   SCROLL REVEAL ANIMATION
   =================================================== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-fadeInUp').forEach(el => {
    if (!el.style.opacity) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    }
  });
}

/* ===================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   =================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===================================================
   RIPPLE EFFECT ON BUTTONS
   =================================================== */
function addRippleEffect() {
  document.querySelectorAll('.btn, .module-card, .portal-card').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;border-radius:50%;
        background:rgba(255,255,255,0.3);transform:scale(0);
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        animation:ripple 0.6s ease;pointer-events:none;
      `;
      const style = document.createElement('style');
      style.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0;}}';
      document.head.appendChild(style);
      if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ===================================================
   STAR COUNTER UPDATE
   =================================================== */
function updateGlobalStarCount() {
  const stars = parseInt(localStorage.getItem('totalStars') || '0');
  document.querySelectorAll('#starsCount, #progressStars').forEach(el => {
    el.textContent = stars;
  });
}

/* ===================================================
   CONFETTI CELEBRATION (lightweight CSS version)
   =================================================== */
function celebrate() {
  const colors = ['#FF6B35', '#F59E0B', '#EC4899', '#0D9488', '#8B5CF6'];
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;
      width:${Math.random() * 12 + 6}px;
      height:${Math.random() * 12 + 6}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:50%;
      top:${Math.random() * 40}%;
      left:${Math.random() * 100}%;
      z-index:99999;
      pointer-events:none;
      animation:confettiFall 1.5s ease forwards;
      animation-delay:${Math.random() * 0.5}s;
    `;
    const style = document.getElementById('confettiStyle') || document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = '@keyframes confettiFall{to{transform:translateY(100vh) rotate(720deg);opacity:0;}}';
    document.head.appendChild(style);
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 2000);
  }
}

/* ===================================================
   ACTIVE NAV LINK HIGHLIGHT
   =================================================== */
function setActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.split('?')[0];
    if (currentPath.endsWith(linkPath) || (linkPath === 'index.html' && currentPath.endsWith('/'))) {
      link.classList.add('active');
    }
  });
}

/* ===================================================
   KEYBOARD ACCESSIBILITY
   =================================================== */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
    const toast = document.querySelector('.toast');
    if (toast) toast.remove();
  }
});

/* ===================================================
   TEACHER PORTAL: Handle Mobile Sidebar
   =================================================== */
function initTeacherMobile() {
  if (window.location.pathname.includes('teacher')) {
    const menuBtn = document.getElementById('menuToggleBtn');
    if (menuBtn && window.innerWidth < 768) {
      menuBtn.style.display = 'flex';
    }
    window.addEventListener('resize', () => {
      if (menuBtn) menuBtn.style.display = window.innerWidth < 768 ? 'flex' : 'none';
    });
  }
}

/* ===================================================
   CLASS LEVEL CONTENT FILTERING
   =================================================== */
function getAgeLevel() {
  const cls = localStorage.getItem('selectedClass') || 'nursery';
  return { nursery: 1, kg: 2, class1: 3, class2: 4 }[cls] || 1;
}

/* ===================================================
   INITIALIZE ALL ON DOM READY
   =================================================== */
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  addRippleEffect();
  updateGlobalStarCount();
  setActiveNav();
  initTeacherMobile();

  // Show welcome toast on first visit
  const isFirstVisit = !localStorage.getItem('visited');
  if (isFirstVisit && !window.location.pathname.includes('modules/')) {
    localStorage.setItem('visited', '1');
    setTimeout(() => showToast('🙏 Namaste! Welcome to Sanskriti Setu! 🇮🇳', 'info', 5000), 1000);
  }
});

/* ===================================================
   PAGE TRANSITION EFFECT
   =================================================== */
window.addEventListener('beforeunload', function() {
  document.body.style.opacity = '0.8';
  document.body.style.transition = 'opacity 0.2s';
});

document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
