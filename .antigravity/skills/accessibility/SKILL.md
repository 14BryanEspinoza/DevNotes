---
name: accessibility
description: Reglas de accesibilidad - nivel AA, ARIA, keyboard navigation, contraste
---

# Accesibilidad - Nivel AA Mínimo

La accesibilidad no es opcional. Todo código debe cumplir nivel AA (WCAG 2.1).

---

## 1. Contraste de Color

| Elemento                         | Ratio mínimo |
| -------------------------------- | ------------ |
| Texto normal                     | **4.5:1**    |
| Texto grande (18pt+ / 14pt bold) | **3:1**      |
| Componentes UI                   | **3:1**      |

```css
/* ✅ Bueno - contraste suficiente */
.text-primary {
  color: #e2e8f0; /* sobre fondo #0f172a = 13:1 */
}

/* ❌ Malo - contraste bajo */
.text-bad {
  color: #94a3b8; /* sobre #1e293b = 3.8:1 - borderline */
}
```

---

## 2. HTML Semántico

```html
<!-- ✅ Bueno - HTML semántico -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título</h1>
    <p>Contenido...</p>
  </article>
</main>

<footer>
  <p>&copy; 2026</p>
</footer>

<!-- ❌ Malo - divitis -->
<div class="header">
  <div class="nav">
    <div class="item">Home</div>
  </div>
</div>
```

---

## 3. Imágenes - Atributos alt

```html
<!-- ✅ Bueno - alt descriptivo -->
<img src="user-avatar.jpg" alt="Foto de perfil de Juan Pérez" />

<!-- ✅ Bueno - alt vacío para decorativas -->
<img src="decorative-line.svg" alt="" />

<!-- ❌ Malo - alt genérico -->
<img src="image.jpg" alt="imagen" />
```

---

## 4. Labels Asociados

```html
<!-- ✅ Bueno - label explícito -->
<label for="email">Email:</label>
<input type="email" id="email" name="email" />

<!-- ✅ Bueno - label implícito -->
<label>
  Nombre:
  <input type="text" name="name" />
</label>

<!-- ❌ Malo - sin label -->
<input type="text" placeholder="Nombre" />
```

---

## 5. Focus Visible

```css
/* ✅ Bueno - focus visible */
*:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Con Tailwind */
<button class="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
  Click me
</button>
```

---

## 6. Keyboard Navigation

### Orden lógico (tabindex)

```html
<!-- ✅ Bueno - orden natural -->
<button>Primero</button>
<input />
<button>Segundo</button>

<!-- ❌ Malo - tabindex altera orden -->
<button tabindex="3">Tercero</button>
<button tabindex="1">Primero</button>
<button tabindex="2">Segundo</button>
```

### Skip Links

```html
<body>
  <a href="#main" class="skip-link">Saltar al contenido principal</a>
  <!-- ... -->
  <main id="main">
</body>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## 7. ARIA - Solo Cuando Sea Necesario

**Regla:** Si HTML nativo funciona, no usar ARIA.

| Cuándo usar ARIA | Ejemplo                                             |
| ---------------- | --------------------------------------------------- |
| Custom widgets   | `role="tablist"`, `role="tab"`, `aria-selected`     |
| Live regions     | `aria-live="polite"` para actualizaciones dinámicas |
| Estados          | `aria-expanded`, `aria-checked`, `aria-disabled`    |
| Labels faltantes | `aria-label="Cerrar diálogo"`                       |

```html
<!-- ✅ Bueno - ARIA cuando es necesario -->
<button aria-label="Cerrar diálogo" aria-describedby="dialog-desc">
  <span aria-hidden="true">&times;</span>
</button>

<!-- ❌ Malo - ARIA redundante -->
<div role="button" tabindex="0">Click me</div>
<!-- Mejor: <button>Click me</button> -->
```

---

## 8. Testing

### Herramientas

- **Lighthouse** (Chrome DevTools) - Audits → Accessibility
- **axe DevTools** - Extensión de navegador
- **WAVE** - Evaluador de accesibilidad web

### Checklist rápido

- [ ] Contraste ≥4.5:1
- [ ] Todos los inputs tienen labels
- [ ] Imágenes tienen alt descriptivo
- [ ] Focus visible en todo
- [ ] Orden de tab logical
- [ ] ARIA solo cuando es necesario

---

## 9. Prohibiciones

- ❌ No usar `tabindex` > 0
- ❌ No usar role="button" en `<a>` sin href
- ❌ No usar `aria-label` como única solución (preferir label visible)
- ❌ No ignorar advertencias de Lighthouse accessibility

---

Última actualización: febrero 2026
