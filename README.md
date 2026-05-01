# Muddarte – Sitio Web Oficial

Sitio web estático one-page para **Muddarte**, negocio de costura y confección artesanal ubicado en Limón, Costa Rica.

---

## Stack

- HTML5 semántico
- CSS3 (variables de marca, Flexbox, Grid, mobile-first)
- JavaScript vanilla (sin dependencias)
- Tipografías locales: **Fredoka** e **Inter Tight**

---

## Estructura

```
Muddarte/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── gallery/        ← imágenes de la galería
│   └── home/           ← imágenes del hero slider
└── design/
    ├── RGB/            ← logos PNG/JPG
    ├── Fuentes/        ← tipografías TTF
    └── manual.pdf      ← manual de marca
```

---

## Deploy en Netlify
1. Subir el repositorio a GitHub
2. En Netlify: **Add new site → Import an existing project**
3. Conectar el repo de GitHub
4. Configuración de build:
   - **Base directory:** `/` (raíz)
   - **Build command:** *(dejar vacío)*
   - **Publish directory:** `/` (raíz)
5. Click **Deploy site**

Cada push a `main` redespliega el sitio automáticamente.

---

## Desarrollo local

No requiere servidor ni herramientas de build. Abrir directamente:

```bash
open index.html
```

O con cualquier servidor local:

```bash
npx serve .
# o
python3 -m http.server 8000
```

---

## SEO

El sitio está optimizado para búsquedas en Costa Rica:
- Meta title y description configurados
- Un solo `<h1>` por página
- Atributos `alt` en todas las imágenes
- Metadatos Open Graph
- Meta geolocalización (`geo.region: CR-L`)
