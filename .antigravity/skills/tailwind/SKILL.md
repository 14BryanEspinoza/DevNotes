---
name: tailwind
description: Reglas y configuración de Tailwind CSS v4+ (Oxide engine)
---

# Tailwind CSS v4+ - Reglas y Configuración

Tailwind CSS v4+ (Oxide engine) es el estilizador principal por defecto.

---

## 1. Instalación

```bash
pnpm add tailwindcss
```

---

## 2. Configuración CSS-First

### Archivo principal (`styles.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --color-primary: #6366f1;
  --color-primary-hover: #818cf8;
  /* ... otras variables */
}
```

### Build

```bash
# Development
npx @tailwindcss/cli -i ./src/css/styles.css -o ./dist/css/styles.css --watch

# Production
npx @tailwindcss/cli -i ./src/css/styles.css -o ./dist/css/styles.css --minify
```

---

## 3. Directivas Principales

| Directiva               | Uso                                                                              |
| ----------------------- | -------------------------------------------------------------------------------- |
| `@import 'tailwindcss'` | Importa Tailwind (equivale a v3 @tailwind base/components/utilities + preflight) |
| `@theme { ... }`        | Define variables personalizadas, fuentes, colores                                |
| `@utility`              | Crea utilities personalizadas                                                    |
| `@layer`                | Agrega estilos a capas específicas (base, components, utilities)                 |

---

## 4. Reglas de Uso

### Preflight

- **Activado por defecto** (reset moderno)
- Desactivar solo con razón específica justificada

### Personalización

- Usar `@theme` para colores, fuentes, breakpoints
- Usar `@utility` para utilities personalizadas
- Usar `@layer base/components/utilities` para estilos adicionales
- **Evitar `!important`** salvo excepciones justificadas

### Content Detection

- **Automático en v4** → no necesita `content` en configuración manual
- Minimizar configuraciones manuales

### Build con Oxide

- Aprovecha el motor Rust
- HMR casi instantáneo
- Builds 3-5× más rápidos que v3

---

## 5. Ejemplos de Clases

### Mobile-First

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Mobile: full width → Desktop: 50% → Large: 33% -->
</div>
```

### Botón Accesible

```html
<button
  class="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-colors"
>
  Click me
</button>
```

### Input con Estados

```html
<input
  class="w-full p-3 border border-gray-600 bg-gray-800 text-gray-100 rounded-lg focus:outline-2 focus:outline-primary focus:outline-offset-2"
/>
```

---

## 6. Orden de Clases (Obligatorio)

Orden recomendado al escribir clases Tailwind en HTML:

| #   | Categoría             | Clases de ejemplo                                                                                                              |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Layout & Display**  | `flex`, `grid`, `block`, `inline`, `hidden`, `fixed`, `absolute`, `relative`, `sticky`, `z-10`                                 |
| 2   | **Spacing**           | `m-`, `mx-`, `my-`, `mt-`, `mr-`, `mb-`, `ml-`, `p-`, `px-`, `py-`, `pt-`, `pr-`, `pb-`, `pl-`, `gap-`, `space-x-`, `space-y-` |
| 3   | **Sizing**            | `w-`, `h-`, `min-w-`, `max-w-`, `min-h-`, `max-h-`                                                                             |
| 4   | **Colors**            | `bg-`, `text-`, `border-`, `from-`, `to-`, `via-`                                                                              |
| 5   | **Border**            | `border`, `border-t`, `rounded`, `rounded-t`, `rounded-lg`                                                                     |
| 6   | **Shadows & Effects** | `shadow`, `shadow-lg`, `opacity-`, `blur-`, `grayscale-`                                                                       |
| 7   | **Typography**        | `font-`, `text-`, `leading-`, `tracking-`, `underline`, `italic`, `uppercase`                                                  |
| 8   | **Estados**           | `hover:`, `focus:`, `active:`, `disabled:`, `focus-visible:`, `group-hover:`                                                   |

### Ejemplo:

```html
<!-- ✅ Correcto - orden de clases -->
<button
  class="
    flex items-center justify-center      <!-- 1. Layout -->
    px-5 py-2.5                           <!-- 2. Spacing -->
    w-full max-w-md                       <!-- 3. Sizing -->
    bg-primary text-white                  <!-- 4. Colors -->
    border border-transparent rounded-lg   <!-- 5. Border -->
    shadow-md                              <!-- 6. Shadows -->
    font-medium text-sm                   <!-- 7. Typography -->
    hover:bg-primary-hover                 <!-- 8. Estados -->
    focus-visible:outline-2 focus-visible:outline-primary
  "
>
  Click me
</button>
```

---

## 7. Prohibiciones

- ❌ No usar `tailwind.config.js` extensivo (preferir `@theme` en CSS)
- ❌ No mezclar variables de Bootstrap con `@theme` de Tailwind
- ❌ No desactivar preflight sin razón específica

---

Última actualización: febrero 2026
