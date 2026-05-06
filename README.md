# 🍗 Recetas Don Eladio

> Recetas tradicionales mexicanas — Progressive Web App con Frontend + Backend

![Version](https://img.shields.io/badge/versión-1.0.0-orange)
![PWA](https://img.shields.io/badge/PWA-✓-blueviolet)
![License](https://img.shields.io/badge/licencia-MIT-green)

## 📖 Descripción
**Recetas Don Eladio** es una PWA de cocina tradicional mexicana con diseño editorial oscuro, filtros por categoría, búsqueda, favoritas persistentes y funcionamiento offline.

## ✨ Características
- 6+ recetas con ingredientes y pasos detallados
- Filtrado por Carnes / Aves / Salsas
- Búsqueda por nombre o ingrediente
- Favoritas guardadas en localStorage
- Modo offline con Service Worker
- Instalable como app nativa
- API REST con Node.js + Express

## 🏗 Estructura
```
recetas-don-eladio/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── recipes.js
│   ├── sw.js
│   ├── manifest.json
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── server.js
├── package.json
└── README.md
```

## 🚀 Instalación

```bash
git clone https://github.com/TU_USUARIO/recetas-don-eladio.git
cd recetas-don-eladio
npm install
npm start
# Visita http://localhost:3000
```

## 🌐 API Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servidor |
| GET | `/api/recipes` | Todas las recetas |
| GET | `/api/recipes?category=carnes` | Filtrar |
| GET | `/api/recipes?q=pollo` | Buscar |
| GET | `/api/recipes/:id` | Por ID |
| GET | `/api/categories` | Categorías |

## ☁️ Despliegue en Render
1. Crea cuenta en render.com
2. Nuevo → Web Service → conecta tu repo de GitHub
3. Build Command: `npm install` / Start Command: `npm start`
4. Deploy y obtén tu URL pública

## 🛠 Tecnologías
- Frontend: HTML5, CSS3, Vanilla JS
- Backend: Node.js, Express 4
- PWA: Service Worker + Web App Manifest
- Tipografía: Playfair Display, Crimson Pro

## 📄 Licencia
MIT © 2025 Recetas Don Eladio
