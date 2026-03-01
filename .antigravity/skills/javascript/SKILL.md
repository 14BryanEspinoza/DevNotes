---
name: javascript
description: Reglas de JavaScript vanilla ES6+ - programación defensiva, módulos, DOM
---

# JavaScript Vanilla ES6+ - Reglas

JavaScript vanilla ES6+ es el enfoque preferido. Solo usar jQuery cuando aporte valor real.

---

## 1. APIs Preferidas

| En lugar de... | Usar...                                    |
| -------------- | ------------------------------------------ |
| `var`          | `const` (por defecto), `let` (si reasigna) |
| `function`     | Arrow functions cuando corresponda         |
| Callbacks      | `async/await` + `Promise`                  |
| `$.ajax`       | `fetch`                                    |
| `for` loops    | `forEach`, `map`, `filter`, `reduce`       |
| Strings concat | Template literals `` `hello ${name}` ``    |

---

## 2. Selección DOM

```javascript
// Selección simple
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');

// Por ID (más rápido)
const el = document.getElementById('my-id');

// Con dataset
element.dataset.property = 'value';
const value = element.dataset.property;
```

---

## 3. Eventos

```javascript
// Event listener simple
element.addEventListener('click', (event) => {
  console.log(event.target);
});

// Evento con opciones
element.addEventListener('click', handler, { once: true, passive: true });

// Remover listener
element.removeEventListener('click', handler);
```

---

## 4. Módulos ES (ESM)

### Estructura de archivos

```text
src/
├── js/
│   ├── main.js        # Entry point
│   ├── editor.js     # Lógica del editor
│   └── utils.js      # Funciones helper
```

### Export/Import

```javascript
// editor.js
export function initEditor() {
  // ...
}

export const EDITOR_CONFIG = {
  maxLength: 10000,
};

// main.js
import { initEditor } from './editor.js';

document.addEventListener('DOMContentLoaded', () => {
  initEditor();
});
```

### Configuración en HTML

- Agregar siempre en el head

```html
<script src="dist/js/bundle.js" type="module" defer></script>
```

### Build con esbuild

```json
{
  "dev:js": "esbuild src/js/main.js --bundle --outfile=dist/js/bundle.js --format=esm --platform=browser --watch",
  "build:js": "esbuild src/js/main.js --bundle --outfile=dist/js/bundle.js --format=esm --platform=browser --minify"
}
```

---

## 5. Programación Defensiva

```javascript
// Validar inputs
function processData(data) {
  if (!data || typeof data !== 'object') {
    console.error('Invalid data');
    return null;
  }
  // procesar...
}

// Optional chaining
const value = obj?.nested?.property;
const arr = data?.items?.[0];

// Nullish coalescing
const name = user.name ?? 'Anonymous';

// Validar fetch
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}
```

---

## 6. Prohibiciones

- ❌ **NO usar**: React, Vue, Svelte, Angular
- ❌ **NO usar**: TypeScript
- ❌ No usar `var`
- ❌ No dejar `console.log`, `debugger` en código final
- ❌ No usar jQuery para selección básica

---

## 7. Convenciones de Código

Cargar skill `conventions` para reglas específicas:

- 2 espacios indentación
- Comillas simples
- Punto y coma obligatorio
- Nombres descriptivos en inglés

---

Última actualización: febrero 2026
