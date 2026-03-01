---
name: performance
description: Reglas de performance - critical path, lazy loading, Web Vitals
---

# Performance - Optimización Real

Performance = UX real. Medir con Lighthouse y Web Vitals, no suposiciones.

---

## 1. Critical Rendering Path

### Optimizar el Above-the-Fold

```html
<!-- ✅ Bueno - CSS crítico enlined -->
<head>
  <style>
    /* Solo estilos críticos para above-the-fold */
    .hero {
      min-height: 100vh;
    }
  </style>
  <link rel="stylesheet" href="styles.css" />
</head>

<!-- ❌ Malo - render-blocking -->
<head>
  <link rel="stylesheet" href="huge-styles.css" />
  <script src="blocking.js"></script>
</head>
```

### Scripts no bloqueantes

```html
<!-- ✅ Bueno - async/defer -->
<script src="app.js" defer></script>

<!-- Carga en paralelo, ejecuta después de HTML -->
```

---

## 2. Lazy Loading

### Imágenes

```html
<!-- ✅ Bueno - lazy loading nativo -->
<img src="image.jpg" loading="lazy" alt="..." />

<!-- ✅ Bueno - eager para above-the-fold -->
<img src="hero.jpg" loading="eager" alt="..." />
```

### Componentes

```javascript
// ❌ Malo - cargar todo al inicio
import { HeavyComponent } from "./heavy";

// ✅ Bueno - code splitting dinámico
const HeavyComponent = () => import("./heavy");
```

---

## 3. Web Vitals - Métricas Clave

| Métrica                             | Objetivo | Qué medir                                      |
| ----------------------------------- | -------- | ---------------------------------------------- |
| **LCP** (Largest Contentful Paint)  | < 2.5s   | Tiempo hasta el elemento más grande es visible |
| **FID** (First Input Delay)         | < 100ms  | Retraso entre primera interacción y respuesta  |
| **CLS** (Cumulative Layout Shift)   | < 0.1    | Estabilidad visual durante carga               |
| **INP** (Interaction to Next Paint) | < 200ms  | Responsividad general                          |

---

## 4. Minimizar Reflows/Repaints

```javascript
// ❌ Malo - múltiples reflows
element.style.width = "100px";
element.style.height = "100px";
element.style.margin = "10px";

// ✅ Bueno - batch cambios
element.style.cssText = "width: 100px; height: 100px; margin: 10px;";

// ✅ Mejor - usar clases CSS
element.classList.add("expanded");
```

```css
/* CSS - usar transform/opacity (no causan reflow) */
.element {
  transform: translateX(50px); /* composited */
  opacity: 0.5; /* composited */
}
```

---

## 5. Imágenes Optimizadas

```html
<!-- ✅ Bueno - formatos modernos + srcset -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." loading="lazy" width="800" height="600" />
</picture>

<!-- ✅ Bueno - dimensiones explícitas para evitar CLS -->
<img src="photo.jpg" width="800" height="600" alt="..." />
```

---

## 6. Font Loading

```css
/* ✅ Good - font-display swap */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap;
}
```

```html
<!-- ✅ preload fuentes críticas -->
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

---

## 7. Debounce/Throttle

```javascript
// ✅ Bueno - throttling para eventos frecuentes
function throttle(fn, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

window.addEventListener("scroll", throttle(handleScroll, 100));
```

---

## 8. Medir con Lighthouse

```text
Chrome DevTools → Lighthouse → Analyze page load
```

### Checklist de resultados

- [ ] LCP < 2.5s
- [ ] TTI (Time to Interactive) < 3.8s
- [ ] CLS < 0.1
- [ ] First Contentful Paint < 1.8s
- [ ] Sin blocking resources

---

## 9. Prohibiciones

- ❌ No dejar imágenes sin dimensiones explícitas
- ❌ No cargar recursos innecesarios al inicio
- ❌ No ignorar warnings de Lighthouse
- ❌ No usar JS para animaciones que CSS puede manejar

---

## 10. Herramientas

- **Lighthouse** - Audits completos
- **WebPageTest** - Análisis detallado
- **Chrome DevTools Performance** - Timeline
- **Bundlephobia** - Tamaño de dependencias

---

Última actualización: febrero 2026
