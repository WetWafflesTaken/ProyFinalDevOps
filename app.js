/* ── STATE ─────────────────────────────────────────────────── */
let currentFilter = 'todas';
let currentRecipeId = null;
let favorites = JSON.parse(localStorage.getItem('don-eladio-favs') || '[]');
let deferredInstallPrompt = null;
/* ── ELEMENTS ──────────────────────────────────────────────── */
const grid          = document.getElementById('recipeGrid');
const loader        = document.getElementById('loader');
const modalOverlay  = document.getElementById('modalOverlay');
const modalClose    = document.getElementById('modalClose');
const searchInput   = document.getElementById('searchInput');
const toast         = document.getElementById('toast');
const fabFav        = document.getElementById('fabFav');
const fabBadge      = document.getElementById('fabBadge');
const favPanel      = document.getElementById('favPanel');
const favPanelClose = document.getElementById('favPanelClose');
const favList       = document.getElementById('favList');
const offlineBanner = document.getElementById('offlineBanner');
const installPrompt = document.getElementById('installPrompt');
const installBtn    = document.getElementById('installBtn');
/* ── INIT ──────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 1000);
  renderGrid(RECIPES);
  updateFabBadge();
  setupServiceWorker();
  setupOnlineStatus();
});
/* ── RENDER GRID ───────────────────────────────────────────── */
function renderGrid(recipes) {
  grid.innerHTML = '';
  if (!recipes.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem">Sin resultados 🌵</p>';
    return;
  }
  recipes.forEach((r, i) => {
    const isFav = favorites.includes(r.id);
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="card-emoji-wrap">${r.emoji}</div>
      <div class="card-body">
        <span class="card-cat">${r.category}</span>
        <h2 class="card-title">${r.title}</h2>
        <div class="card-meta">
          <span>⏱ ${r.time}</span>
          <span>⭐ ${r.difficulty}</span>
        </div>
        ${isFav ? '<span class="card-fav">❤ Favorita</span>' : ''}
      </div>`;
    card.addEventListener('click', () => openModal(r.id));
    grid.appendChild(card);
  });
}
/* ── FILTER ────────────────────────────────────────────────── */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.cat;
    applyFilters();
  });
});
/* ── SEARCH ────────────────────────────────────────────────── */
searchInput.addEventListener('input', applyFilters);
function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  let results = RECIPES;
  if (currentFilter !== 'todas') results = results.filter(r => r.category === currentFilter);
  if (q) results = results.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q) ||
    r.ingredients.some(i => i.toLowerCase().includes(q))
  );
  renderGrid(results);
}
/* ── MODAL ─────────────────────────────────────────────────── */
function openModal(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return;
  currentRecipeId = id;

  document.getElementById('modalEmoji').textContent        = r.emoji;
  document.getElementById('modalCat').textContent          = r.category;
  document.getElementById('modalTitle').textContent        = r.title;
  document.getElementById('modalTime').textContent         = `⏱ ${r.time}`;
  document.getElementById('modalServings').textContent     = `🍽 ${r.servings}`;
  document.getElementById('modalDiff').textContent         = `⭐ ${r.difficulty}`;

  const ingList = document.getElementById('modalIngredients');
  ingList.innerHTML = r.ingredients.map(i => `<li>${i}</li>`).join('');

  const stepList = document.getElementById('modalSteps');
  stepList.innerHTML = r.steps.map(s => `<li>${s}</li>`).join('');

  updateFavBtn();
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentRecipeId = null;
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
/* ── FAVORITES ─────────────────────────────────────────────── */
document.getElementById('favBtn').addEventListener('click', () => {
  if (!currentRecipeId) return;
  if (favorites.includes(currentRecipeId)) {
    favorites = favorites.filter(id => id !== currentRecipeId);
    showToast('Eliminada de favoritas');
  } else {
    favorites.push(currentRecipeId);
    showToast('❤ Guardada en favoritas');
  }
  localStorage.setItem('don-eladio-favs', JSON.stringify(favorites));
  updateFavBtn();
  updateFabBadge();
  applyFilters();
});
function updateFavBtn() {
  const btn = document.getElementById('favBtn');
  if (favorites.includes(currentRecipeId)) {
    btn.textContent = '❤ En favoritas';
    btn.classList.add('saved');
  } else {
    btn.textContent = '♡ Guardar favorita';
    btn.classList.remove('saved');
  }
}
function updateFabBadge() {
  fabBadge.textContent = favorites.length;
  fabBadge.style.display = favorites.length ? 'flex' : 'none';
}
/* FAB → open panel */
fabFav.addEventListener('click', () => {
  renderFavPanel();
  favPanel.classList.add('open');
});
favPanelClose.addEventListener('click', () => favPanel.classList.remove('open'));
function renderFavPanel() {
  favList.innerHTML = '';
  if (!favorites.length) {
    favList.innerHTML = '<li style="color:var(--text-muted);padding:.8rem">Aún no tienes favoritas.</li>';
    return;
  }
  favorites.forEach(id => {
    const r = RECIPES.find(x => x.id === id);
    if (!r) return;
    const li = document.createElement('li');
    li.innerHTML = `<span class="fav-emoji">${r.emoji}</span> ${r.title}`;
    li.addEventListener('click', () => {
      favPanel.classList.remove('open');
      openModal(r.id);
    });
    favList.appendChild(li);
  });
}
/* ── TOAST ─────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}
/* ── OFFLINE STATUS ─────────────────────────────────────────── */
function setupOnlineStatus() {
  function update() {
    offlineBanner.classList.toggle('show', !navigator.onLine);
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}
/* ── SERVICE WORKER ─────────────────────────────────────────── */
function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('SW registrado:', reg.scope);
    }).catch(err => {
      console.warn('SW error:', err);
    });
  }
}
/* ── PWA INSTALL PROMPT ─────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  installPrompt.style.display = 'block';
});
installBtn.addEventListener('click', () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') showToast('📲 App instalada!');
    deferredInstallPrompt = null;
    installPrompt.style.display = 'none';
  });
});
window.addEventListener('appinstalled', () => {
  showToast('✅ App instalada correctamente');
});
