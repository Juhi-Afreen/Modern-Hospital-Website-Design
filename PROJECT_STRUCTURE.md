# Project Structure

This document outlines the file and folder organization of the Hospitalia project.

```
Modern Hospital Website Design/
├── 📄 index.html           # Main HTML structure and content
├── 📁 css/
│   └── styles.css          # Custom CSS overrides and animation definitions
├── 📁 js/
│   ├── config.js           # Tailwind CSS configuration and theme extension
│   └── main.js             # Core logic: animations, UI interactions, event listeners
├── 📁 assets/
│   └── images/             # Directory for storing local images (currently empty)
└── 📁 components/          # Placeholder for reusable HTML snippets or modules
```

## Detailed Descriptions

### `index.html`

The skeleton of the website. It imports:

- **Tailwind CSS** (CDN)
- **Google Fonts** (Plus Jakarta Sans)
- **Lucide Icons**
- **GSAP** & **ScrollTrigger**
- Local CSS (`styles.css`) and JS (`config.js`, `main.js`)

### `css/styles.css`

Contains styles that couldn't be handled by Tailwind utilities alone, such as:

- Custom `@keyframes` (ripple-wave, float, float-slow).
- Glassmorphism effects (`.glass-card`).
- Complex layout hacks like sticky service cards.

### `js/config.js`

Extends the default Tailwind theme to include custom colors (`primary`, `teal`) and shadows.

### `js/main.js`

Handles:

- **Icon Initialization**: `lucide.createIcons()`
- **Scroll Animations**: `IntersectionObserver` logic for reveal effects.
- **GSAP Timelines**: Sticky stacking cards and process bar animations.
- **UI Logic**: Mobile menu toggling and FAQ accordion behavior.

### `components/`

Intended for future scalability. You can break down `index.html` into smaller HTML partials (e.g., `navbar.html`, `footer.html`) if you introduce a build step or server-side includes.
