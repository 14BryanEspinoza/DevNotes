---
name: css
description: Reglas CSS generales - mobile-first, transiciones, animaciones, responsive
---

# CSS - Reglas Generales

Estas reglas complementan Tailwind CSS y cubren CSS puro cuando sea necesario.

---

## 1. Mobile-First (Obligatorio)

### En Tailwind (recomendado)

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Mobile: full → Tablet: 50% → Desktop: 33% -->
</div>
```

### En CSS puro

```css
/* Mobile (base) */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet+ */
@media (min-width: 768px) {
  .container {
    width: 50%;
    padding: 2rem;
  }
}

/* Desktop+ */
@media (min-width: 1024px) {
  .container {
    width: 33%;
  }
}
```

---

## 2. Transiciones y Animaciones

### Preferir CSS sobre JS

```css
/* ✅ Bueno - transición CSS */
.button {
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.button:hover {
  background-color: #818cf8;
}

.button:active {
  transform: scale(0.98);
}
```

```javascript
// ❌ Malo - animaciones con JS
element.style.transition = "all 0.3s";
element.addEventListener("mouseover", () => {
  // Evitar esto
});
```

### Animaciones con `@keyframes`

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease forwards;
}
```

---

## 3. Touch Targets (Accesibilidad)

```css
/* ✅ Mínimo 44x44px para touch */
button,
a.btn,
input[type="checkbox"],
input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1rem;
}
```

---

## 4. Evitar Hover-Only

```css
/* ❌ Malo - no funciona en mobile */
.button:hover {
  background-color: blue;
}

/* ✅ Bueno - funciona en todos los dispositivos */
.button {
  background-color: blue;
}

.button:hover,
.button:focus {
  background-color: darkblue;
}
```

---

## 5. BEM (Solo si es necesario)

BEM es **opcional** y solo cuando utility-first genera markup ilegible.

```css
/* Ejemplo BEM */
.card {
}
.card__header {
}
.card__body {
}
.card--featured {
}
.card--featured__title {
}
```

Con Tailwind:

```html
<!-- Preferir esto -->
<div class="card card--featured">
  <div class="card__header">...</div>
</div>

<!-- BEM solo si hay conflicto real -->
```

---

## 6. Scroll Behavior

```css
/* Scroll suave */
html {
  scroll-behavior: smooth;
}

/* Para elementos específicos */
.scrollable {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

---

## 7. Evitar Reflows/Repaints

```css
/* ✅ Transform y opacity no causan reflow */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}

/* ❌ Cambios que causan reflow */
.element {
  width: 100px; /* reflow */
  left: 50px; /* reflow */
}
```

---

## 8. Variables CSS

```css
:root {
  --color-primary: #6366f1;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}

.element {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

---

## 9. Prohibiciones

- ❌ No usar hover-only para funcionalidades esenciales
- ❌ No usar JS para animaciones simples (usar CSS)
- ❌ No mezclar Bootstrap con Tailwind sin justificación

---

Última actualización: febrero 2026
