/* ── STATE ─────────────────────────────────────────────────── */
let currentFilter   = 'todas';
let currentRecipeId = null;
let favorites       = JSON.parse(localStorage.getItem('don-eladio-favs')    || '[]');
let ratings         = JSON.parse(localStorage.getItem('don-eladio-ratings') || '{}');
let customRecipes   = JSON.parse(localStorage.getItem('don-eladio-custom')  || '[]');
let deferredInstallPrompt = null;

/* ── ELEMENTS ──────────────────────────────────────────────── */
const grid          = document.getElementById('recipeGrid');
const loader        = document.getElementById('loader');
const modalOverlay  = document.getElementById('modalOverlay');
const searchInput   = document.getElementById('searchInput');
const toast         = document.getElementById('toast');
const fabFav        = document.getElementById('fabFav');
const fabBadge      = document.getElementById('fabBadge');
const favPanel      = document.getElementById('favPanel');
const favList       = document.getElementById('favList');
const offlineBanner = document.getElementById('offlineBanner');
const modalForm     = document.getElementById('modalFormOverlay');
const recipeForm    = document.getElementById('recipeForm');

/* ── INIT ──────────────────────────────────────────────────── */
customRecipes.forEach(r => { if (!RECIPES.find(x => x.id === r.id)) RECIPES.push(r); });

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 1000);
  renderGrid(RECIPES);
  updateFabBadge();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
  const updateBanner = () => offlineBanner.classList.toggle('show', !navigator.onLine);
  window.addEventListener('online', updateBanner);
  window.addEventListener('offline', updateBanner);
  updateBanner();
});

/* ── RENDER GRID ───────────────────────────────────────────── */
function renderGrid(recipes) {
  grid.innerHTML = '';
  if (!recipes.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem">Sin resultados 🌵</p>';
    return;
  }
  recipes.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="card-emoji-wrap">${r.emoji}</div>
      <div class="card-body">
        <span class="card-cat">${r.category}</span>
        <h2 class="card-title">${r.title}</h2>
        <div class="card-meta">
          <span>${r.time}</span>
          <span>${r.difficulty}</span>
        </div>
        ${favorites.includes(r.id) ? '<span class="card-fav">❤ Favorita</span>' : ''}
        ${ratings[r.id] ? `<span class="card-fav" style="color:var(--accent2)">${'★'.repeat(ratings[r.id])}${'☆'.repeat(5 - ratings[r.id])}</span>` : ''}
      </div>`;
    card.addEventListener('click', () => openModal(r.id));
    grid.appendChild(card);
  });
}

/* ── FILTER & SEARCH ───────────────────────────────────────── */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.cat;
    applyFilters();
  });
});
searchInput.addEventListener('input', applyFilters);

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  let results = currentFilter === 'todas' ? RECIPES : RECIPES.filter(r => r.category === currentFilter);
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

  document.getElementById('modalEmoji').textContent     = r.emoji;
  document.getElementById('modalCat').textContent       = r.category;
  document.getElementById('modalTitle').textContent     = r.title;
  document.getElementById('modalTime').textContent      = ` ${r.time}`;
  document.getElementById('modalServings').textContent  = ` ${r.servings}`;
  document.getElementById('modalDiff').textContent      = ` ${r.difficulty}`;
  document.getElementById('modalIngredients').innerHTML = r.ingredients.map(i => `<li>${i}</li>`).join('');
  document.getElementById('modalSteps').innerHTML       = r.steps.map(s => `<li>${s}</li>`).join('');

  updateFavBtn();
  renderRating(id);
  setupRatingEvents(id);
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentRecipeId = null;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
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
    showToast('Guardada en favoritas');
  }
  localStorage.setItem('don-eladio-favs', JSON.stringify(favorites));
  updateFavBtn();
  updateFabBadge();
  applyFilters();
});

function updateFavBtn() {
  const btn = document.getElementById('favBtn');
  const isFav = favorites.includes(currentRecipeId);
  btn.textContent = isFav ? 'En favoritas' : '♡ Guardar favorita';
  btn.classList.toggle('saved', isFav);
}

function updateFabBadge() {
  fabBadge.textContent = favorites.length;
  fabBadge.style.display = favorites.length ? 'flex' : 'none';
}

fabFav.addEventListener('click', () => { renderFavPanel(); favPanel.classList.add('open'); });
document.getElementById('favPanelClose').addEventListener('click', () => favPanel.classList.remove('open'));

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
    li.innerHTML = `<span class="fav-emoji"></span> ${r.title}`;
    li.addEventListener('click', () => { favPanel.classList.remove('open'); openModal(r.id); });
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

/* ── PWA INSTALL ────────────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('installPrompt').style.display = 'block';
});
document.getElementById('installBtn').addEventListener('click', () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(({ outcome }) => {
    if (outcome === 'accepted') showToast('App instalada!');
    deferredInstallPrompt = null;
    document.getElementById('installPrompt').style.display = 'none';
  });
});
window.addEventListener('appinstalled', () => showToast('✅ App instalada correctamente'));

/* ── ADD RECIPE ─────────────────────────────────────────────── */
document.getElementById('fabAdd').addEventListener('click', () => modalForm.classList.add('open'));
document.getElementById('formClose').addEventListener('click', () => modalForm.classList.remove('open'));
modalForm.addEventListener('click', e => { if (e.target === modalForm) modalForm.classList.remove('open'); });

recipeForm.addEventListener('submit', e => {
  e.preventDefault();
  const newRecipe = {
    id:         Date.now(),
    title:      document.getElementById('formTitle').value.trim(),
    category:   document.getElementById('formCategory').value,
    emoji:      document.getElementById('formEmoji').value || '🍽️',
    time:       document.getElementById('formTime').value || 'Sin especificar',
    servings:   document.getElementById('formServings').value || '—',
    difficulty: document.getElementById('formDifficulty').value,
    ingredients: document.getElementById('formIngredients').value.split(/\n|,/).map(s => s.trim()).filter(Boolean),
    steps:       document.getElementById('formSteps').value.split(/\n|\.\s+/).map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
  };
  customRecipes.push(newRecipe);
  localStorage.setItem('don-eladio-custom', JSON.stringify(customRecipes));
  RECIPES.push(newRecipe);
  renderGrid(RECIPES);
  modalForm.classList.remove('open');
  recipeForm.reset();
  showToast('✅ Receta agregada con éxito');
});

/* ── RATING ─────────────────────────────────────────────────── */
const RATING_LABELS = ['Sin calificación', 'Malo 😕', 'Regular 😐', 'Bueno 😊', 'Muy bueno 😋', 'Excelente 🤩'];

function renderRating(id) {
  const val = ratings[id] || 0;
  document.querySelectorAll('#starsDisplay .star').forEach((s, i) => {
    s.classList.toggle('active', i < val);
    s.classList.remove('hovered');
  });
  document.getElementById('ratingLabel').textContent = RATING_LABELS[val];
}

function setupRatingEvents(id) {
  const stars = document.querySelectorAll('#starsDisplay .star');
  const label = document.getElementById('ratingLabel');
  stars.forEach(star => {
    star.onmouseenter = () => {
      const v = +star.dataset.val;
      stars.forEach((s, i) => s.classList.toggle('hovered', i < v));
      label.textContent = RATING_LABELS[v];
    };
    star.onmouseleave = () => { stars.forEach(s => s.classList.remove('hovered')); renderRating(id); };
    star.onclick = () => {
      const v = +star.dataset.val;
      ratings[id] = ratings[id] === v ? 0 : v;
      localStorage.setItem('don-eladio-ratings', JSON.stringify(ratings));
      renderRating(id);
      showToast(ratings[id] ? `⭐ ${ratings[id]} estrella${ratings[id] > 1 ? 's' : ''}` : 'Calificación eliminada');
    };
  });
}
