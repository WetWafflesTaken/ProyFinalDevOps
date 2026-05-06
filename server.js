// ============================================================
// RECETAS DON ELADIO — Backend (Node.js + Express)
// ============================================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Serve static frontend ──────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── In-memory recipe data (same as recipes.js) ─────────────
const recipes = [
  {
    id: 1,
    title: "Pollo Rostizado al Sazonador",
    category: "aves",
    emoji: "🍗",
    time: "1h 15min",
    servings: "4–6 porciones",
    difficulty: "Fácil",
    ingredients: [
      "1 pollo entero (aprox. 1.5 kg)",
      "3 cdas de sazonador Don Eladio",
      "2 cdas de mayonesa (opcional)",
      "Aceite vegetal c/s",
      "Sal y pimienta al gusto"
    ],
    steps: [
      "Precalienta el horno a 150 °C.",
      "Lava y seca muy bien el pollo entero.",
      "Frota con sazonador y aceite por toda la superficie.",
      "Opcional: mezcla sazonador con mayonesa y unta el pollo.",
      "Hornea 45 min, gira y hornea 20–30 min más.",
      "Reposa 10 min antes de servir."
    ]
  },
  {
    id: 2,
    title: "Carne de Cerdo con Chile Morita",
    category: "carnes",
    emoji: "🥩",
    time: "50min",
    servings: "4 porciones",
    difficulty: "Media",
    ingredients: [
      "750 g de carne de cerdo en cubos",
      "1 papa grande en cubos",
      "4 tomatillos",
      "2½ tazas de agua",
      "1 sobre de Salsa de Chile Morita"
    ],
    steps: [
      "Dora la carne en aceite o manteca.",
      "Agrega las papas y dora un poco.",
      "Licúa los tomatillos con el agua.",
      "Agrega lo licuado y el sobre de salsa.",
      "Cocina 20–25 min hasta suavizar.",
      "Sirve con frijoles."
    ]
  },
  {
    id: 3,
    title: "Salsa Roja de Chile de Árbol",
    category: "salsas",
    emoji: "🌶️",
    time: "20min",
    servings: "1 taza aprox.",
    difficulty: "Fácil",
    ingredients: [
      "8 chiles de árbol secos",
      "3 jitomates medianos",
      "2 dientes de ajo",
      "¼ de cebolla blanca",
      "Sal"
    ],
    steps: [
      "Asa jitomates, cebolla y ajo en comal.",
      "Tuesta los chiles 30 segundos.",
      "Hidrata chiles en agua caliente 10 min.",
      "Licúa todo con agua de remojo.",
      "Fríe la salsa 5 min y ajusta sal."
    ]
  },
  {
    id: 4,
    title: "Costillas de Cerdo a la BBQ Ranch",
    category: "carnes",
    emoji: "🍖",
    time: "2h 30min",
    servings: "4 porciones",
    difficulty: "Media",
    ingredients: [
      "1 kg de costillas baby back",
      "4 cdas de salsa BBQ",
      "2 cdas de sazonador ranch",
      "1 cda de azúcar morena",
      "1 cdita de paprika ahumada"
    ],
    steps: [
      "Mezcla especias y forma el dry rub.",
      "Cubre las costillas y marina 1 hora.",
      "Hornea envueltas en aluminio a 160 °C por 2 h.",
      "Barniza con BBQ y hornea a 200 °C 15–20 min.",
      "Reposa y sirve."
    ]
  },
  {
    id: 5,
    title: "Pechugas al Ajillo con Hierbas",
    category: "aves",
    emoji: "🍳",
    time: "30min",
    servings: "2 porciones",
    difficulty: "Fácil",
    ingredients: [
      "2 pechugas de pollo",
      "5 dientes de ajo",
      "2 cdas de mantequilla",
      "Romero y tomillo frescos",
      "Jugo de ½ limón"
    ],
    steps: [
      "Aplana las pechugas y sazona.",
      "Dora en mantequilla y aceite 5–6 min por lado.",
      "Agrega ajo y hierbas, baña el pollo 2 min.",
      "Exprime limón, reposa 5 min y sirve."
    ]
  },
  {
    id: 6,
    title: "Salsa Verde Cruda",
    category: "salsas",
    emoji: "🥬",
    time: "10min",
    servings: "1½ tazas",
    difficulty: "Muy fácil",
    ingredients: [
      "500 g de tomatillos",
      "2–4 chiles serranos",
      "½ cebolla",
      "2 dientes de ajo",
      "Cilantro y sal"
    ],
    steps: [
      "Pela los tomatillos y corta todo.",
      "Licúa en crudo hasta la textura deseada.",
      "Ajusta sal. Opcional: agrega aguacate."
    ]
  }
];

// ── API ROUTES ─────────────────────────────────────────────

// GET /api/recipes — all recipes, optional ?category=
app.get('/api/recipes', (req, res) => {
  const { category, q } = req.query;
  let result = [...recipes];

  if (category && category !== 'todas') {
    result = result.filter(r => r.category === category);
  }
  if (q) {
    const query = q.toLowerCase();
    result = result.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.ingredients.some(i => i.toLowerCase().includes(query))
    );
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/recipes/:id — single recipe
app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ success: false, message: 'Receta no encontrada' });
  res.json({ success: true, data: recipe });
});

// GET /api/categories
app.get('/api/categories', (req, res) => {
  const cats = [...new Set(recipes.map(r => r.category))];
  res.json({ success: true, data: cats });
});

// ── HEALTH CHECK ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Recetas Don Eladio API funcionando 🍗', timestamp: new Date() });
});

// ── FALLBACK → serve index.html ────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── START ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🫕  Recetas Don Eladio API corriendo en http://localhost:${PORT}`);
  console.log(`   Endpoints disponibles:`);
  console.log(`   GET /api/recipes`);
  console.log(`   GET /api/recipes/:id`);
  console.log(`   GET /api/categories`);
  console.log(`   GET /api/health\n`);
});

module.exports = app;
