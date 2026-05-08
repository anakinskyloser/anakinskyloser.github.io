// ===== RANDOM AFFIRMATION ON EVERY PAGE LOAD (NO CACHING) =====
const affirmations = [
  { emoji: '🌸', text: "you're blooming exactly where you're planted" },
  { emoji: '✨', text: "you have magic within you, don't forget it" },
  { emoji: '🫶', text: 'someone out there is glad you exist' },
  { emoji: '🌙', text: 'rest is productive too. be gentle with yourself' },
  { emoji: '🎨', text: 'create without fear. your voice matters' },
  { emoji: '⭐', text: "you're doing better than you think" },
  { emoji: '💖', text: "your heart is soft and that's your strength" },
  { emoji: '🦋', text: "you're becoming who you're meant to be" },
  { emoji: '🌼', text: 'small steps are still progress' },
  { emoji: '🍃', text: "breathe. you've got this." },
  { emoji: '🐌', text: 'slow progress is still progress' },
  { emoji: '🌈', text: 'you are exactly where you need to be' },
  { emoji: '🕯️', text: 'your light matters. keep glowing' },
  { emoji: '🧸', text: 'you are loved and enough, always' },
  { emoji: '☁️', text: 'float through today with ease' },
  { emoji: '🌟', text: 'you are a star, don\'t let anyone dim your light' },
  { emoji: '🍀', text: 'luck is when preparation meets opportunity — you\'re ready' },
];

// Simple function that ALWAYS picks a random affirmation (no localStorage)
function getRandomAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
}

// Show affirmation on load — DIRECT, no caching
document.addEventListener('DOMContentLoaded', () => {
  // Get a fresh random affirmation every time
  const affirmation = getRandomAffirmation();
  
  const emojiEl = document.getElementById('affirmationEmoji');
  const textEl = document.getElementById('affirmationText');
  const overlay = document.getElementById('affirmationOverlay');
  const portfolio = document.getElementById('portfolioContent');

  if (emojiEl) emojiEl.textContent = affirmation.emoji;
  if (textEl) textEl.textContent = affirmation.text;

  const btn = document.getElementById('affirmationBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.style.display = 'none';
        if (portfolio) portfolio.style.display = 'block';
        document.body.style.overflow = 'auto';
        document.body.classList.add('loaded');
      }, 500);
    });
  }

  if (portfolio) portfolio.style.display = 'none';
  document.body.style.overflow = 'hidden';
});

// ===== CUSTOM CURSOR (always on, works immediately) =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  if (cursor) cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousedown', () => {
  if (cursor) cursor.style.transform += ' scale(1.6)';
  if (ring) ring.style.transform += ' scale(0.6)';
});
document.addEventListener('mouseup', () => {
  if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(1.6)', '');
  if (ring) ring.style.transform = ring.style.transform.replace(' scale(0.6)', '');
});

// ===== HEART BUTTON TOGGLE =====
const heartBtn = document.getElementById('heartBtn');
let liked = false;
if (heartBtn) {
  heartBtn.addEventListener('click', () => {
    liked = !liked;
    heartBtn.textContent = liked ? '❤️' : '🤍';
    heartBtn.style.transform = 'scale(1.4)';
    setTimeout(() => (heartBtn.style.transform = ''), 300);
  });
}

// ===== SCROLL-TRIGGERED REVEAL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('[data-observe]').forEach((el) => observer.observe(el));

// ===== GUESTBOOK =====
const COLORS = ['pink', 'sage', 'lavender', 'peach', 'sky'];
const AVATAR_BG = {
  pink: 'linear-gradient(135deg,#f2c4c4,#e8a4a4)',
  sage: 'linear-gradient(135deg,#a8c5b5,#88b0a0)',
  lavender: 'linear-gradient(135deg,#c3b8d8,#a8a0c8)',
  peach: 'linear-gradient(135deg,#f5c9a0,#e8a870)',
  sky: 'linear-gradient(135deg,#a8c8d8,#80b0c8)',
};

// Supabase config
const SB_URL = 'https://kpevnqnnajefeatjzdtp.supabase.co';
const SB_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZXZucW5uYWplZmVhdGp6ZHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzI5MzMsImV4cCI6MjA5Mzc0ODkzM30.FQ11whhlYnO4W6PYo879dhS0-PUrhYxnVvKhoXCJdJo';

let selectedEmoji = '🌸';

// Fix: Emoji picker - make sure every emoji works
document.addEventListener('DOMContentLoaded', () => {
  const emojiOptions = document.querySelectorAll('.emoji-opt');
  
  emojiOptions.forEach((btn) => {
    // Set initial selected state
    if (btn.dataset.emoji === selectedEmoji) {
      btn.classList.add('selected');
    }
    
    // Add click handler to each emoji
    btn.addEventListener('click', () => {
      // Remove selected class from all emojis
      emojiOptions.forEach((b) => b.classList.remove('selected'));
      // Add selected class to clicked emoji
      btn.classList.add('selected');
      // Update the selected emoji value
      selectedEmoji = btn.dataset.emoji;
      console.log('Selected emoji:', selectedEmoji); // For debugging
    });
  });
});

// Char counter
const msgInput = document.getElementById('gb-message');
const charCount = document.getElementById('charCount');
if (msgInput && charCount) {
  msgInput.addEventListener('input', () => {
    const left = 280 - msgInput.value.length;
    charCount.textContent = left + ' left';
    charCount.style.color = left < 40 ? 'var(--blush)' : 'var(--light)';
  });
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function initials(name) {
  return (
    name
      .trim()
      .split(' ')
      .map((w) => w[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2) || '??'
  );
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function renderEntries(entries) {
  const grid = document.getElementById('entriesGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('entryCount');
  if (count) count.textContent = entries.length + (entries.length === 1 ? ' note' : ' notes');

  if (grid) {
    grid.querySelectorAll('.entry-card').forEach((c) => c.remove());
  }

  if (entries.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  entries.forEach((e, i) => {
    const color = e.color || COLORS[Math.floor(Math.random() * COLORS.length)];
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.dataset.color = color;
    card.style.animationDelay = i * 0.07 + 's';
    card.innerHTML = `
      <div class="entry-top">
        <div class="entry-avatar" style="background:${AVATAR_BG[color]}">${initials(e.name)}</div>
        <div class="entry-meta">
          <div class="entry-name">${escHtml(e.name)}</div>
          <div class="entry-date">${formatDate(e.created_at)}</div>
        </div>
        <div class="entry-mood">${e.emoji || '🌸'}</div>
      </div>
      <div class="entry-message">${escHtml(e.message)}</div>
      ${e.from_location ? `<div class="entry-from">📍 ${escHtml(e.from_location)}</div>` : ''}
    `;
    if (grid) grid.appendChild(card);
  });
}

async function loadEntries() {
  try {
    const data = await sbFetch('/rest/v1/guestbook?select=*&order=created_at.desc');
    renderEntries(data || []);
  } catch (err) {
    console.error('Failed to load guestbook:', err);
    renderEntries([]);
  }
}

async function sbFetch(path, options = {}) {
  const res = await fetch(SB_URL + path, {
    ...options,
    headers: {
      apikey: SB_KEY,
      Authorization: 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      Prefer: options.prefer || '',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}

const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const name = document.getElementById('gb-name')?.value.trim();
    const message = document.getElementById('gb-message')?.value.trim();
    const from = document.getElementById('gb-from')?.value.trim();

    if (!name) {
      document.getElementById('gb-name')?.focus();
      showToast('Please enter your name 🌸');
      return;
    }
    if (!message) {
      msgInput?.focus();
      showToast('Please leave a message ✨');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'sending… 🌸';

    try {
      await sbFetch('/rest/v1/guestbook', {
        method: 'POST',
        prefer: 'return=minimal',
        body: JSON.stringify({
          name,
          message,
          from_location: from || null,
          emoji: selectedEmoji,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }),
      });

      // Reset form
      if (document.getElementById('gb-name')) document.getElementById('gb-name').value = '';
      if (document.getElementById('gb-from')) document.getElementById('gb-from').value = '';
      if (msgInput) msgInput.value = '';
      if (charCount) {
        charCount.textContent = '280 left';
        charCount.style.color = 'var(--light)';
      }
      
      // Reset emoji picker to default flower
      selectedEmoji = '🌸';
      document.querySelectorAll('.emoji-opt').forEach((b) => b.classList.remove('selected'));
      document.querySelector('.emoji-opt[data-emoji="🌸"]')?.classList.add('selected');

      showToast('✦ Note added — thank you! 🌸');
      await loadEntries();
    } catch (err) {
      console.error('Failed to submit:', err);
      showToast('something went wrong, try again! 🌷');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Leave a note ✦';
    }
  });
}

// Load entries on page start
loadEntries();

// ===== FLOATING MUSIC PLAYER TOGGLE =====
const floatToggle = document.getElementById('floatToggle');
const floatCard = document.getElementById('floatCard');
let playerOpen = false;
if (floatToggle && floatCard) {
  floatToggle.addEventListener('click', () => {
    playerOpen = !playerOpen;
    floatCard.classList.toggle('open', playerOpen);
    floatToggle.textContent = playerOpen ? '✕' : '🎵';
  });
}

// ===== TIME-OF-DAY THEME =====
(function () {
  const themes = {
    dawn: { hours: [5, 6, 7, 8, 9, 10, 11], emoji: '🌅', label: 'good morning' },
    afternoon: { hours: [12, 13, 14, 15, 16], emoji: '☀️', label: 'good afternoon' },
    dusk: { hours: [17, 18, 19, 20], emoji: '🌇', label: 'golden hour' },
    midnight: { hours: [21, 22, 23, 0, 1, 2, 3, 4], emoji: '🌙', label: 'good night' },
  };

  function getTheme() {
    const h = new Date().getHours();
    for (const [name, t] of Object.entries(themes)) {
      if (t.hours.includes(h)) return { name, ...t };
    }
    return { name: 'afternoon', ...themes.afternoon };
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t.name);
    const badge = document.getElementById('timeBadge');
    if (badge) {
      const emojiSpan = badge.querySelector('.time-badge-emoji');
      const textSpan = badge.querySelector('.time-badge-text');
      if (emojiSpan) emojiSpan.textContent = t.emoji;
      if (textSpan) textSpan.textContent = t.label;
    }
  }

  const initial = getTheme();
  document.documentElement.setAttribute('data-theme', initial.name);

  document.addEventListener('DOMContentLoaded', () => {
    // Check if badge already exists (in case it was added by affirmation code)
    let badge = document.getElementById('timeBadge');
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'time-badge';
      badge.id = 'timeBadge';
      document.body.appendChild(badge);
    }
    badge.innerHTML = `
      <span class="time-badge-dot"></span>
      <span class="time-badge-emoji">${initial.emoji}</span>
      <span class="time-badge-text">${initial.label}</span>
    `;
    setInterval(() => applyTheme(getTheme()), 60 * 1000);
  });
})();
