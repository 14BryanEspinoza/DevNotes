---
name: conventions
description: Convenciones de código - indentación, comillas, semi, linting, formatting
---

# Convenciones de Código

Reglas de estilo obligatorias para todo el código del proyecto.

---

## 1. Reglas Base

| Regla            | Valor                                       |
| ---------------- | ------------------------------------------- |
| **Indentación**  | 2 espacios                                  |
| **Comillas**     | Simples `'`                                 |
| **Punto y coma** | Obligatorio `;`                             |
| **Variables**    | `const` por defecto, `let` solo si reasigna |

---

## 2. ESLint Configuration

### Formato Flat Config (ESLint 9+)

```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },
];
```

### package.json - ESLint

```json
{
  "scripts": {
    "lint": "eslint src/js/",
    "lint:fix": "eslint src/js/ --fix"
  }
}
```

---

## 3. Prettier Configuration

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5",
  "endOfLine": "lf",
  "arrowParens": "always"
}
```

### package.json - Prettier

```json
{
  "scripts": {
    "format": "prettier --write src/",
    "format:check": "prettier --check src/"
  }
}
```

---

## 4. Nomenclatura

### Variables y Funciones

```javascript
// ✅ Bueno - camelCase descriptivo
const userName = 'John';
const getUserData = async () => {};

// ❌ Malo - nombres cortos/crípticos
const u = 'John';
const get = async () => {};
```

### Constantes

```javascript
// ✅ Bueno - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// ✅ Bueno - const con objeto inmutable
const CONFIG = Object.freeze({
  timeout: 5000,
});
```

### Clases

```javascript
// ✅ Bueno - PascalCase
class UserService {}
class ModalComponent {}
```

### Archivos

```javascript
// ✅ Bueno - kebab-case
// editor.js
// user-service.js
// main.js
```

---

## 5. Ejemplos de Código

### Funciones

```javascript
// ✅ Bueno
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

// ✅ Bueno - arrow function
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// ❌ Malo - una línea muy larga
const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

### Objetos

```javascript
// ✅ Bueno
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
};

// ✅ Bueno - multilínea para objetos grandes
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  permissions: ['read', 'write', 'delete'],
};
```

### Arrays

```javascript
// ✅ Bueno
const numbers = [1, 2, 3, 4, 5];

// ✅ Bueno - multilínea
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];
```

### Condicionales

```javascript
// ✅ Bueno
if (isActive) {
  startAnimation();
}

// ✅ Bueno - ternario simple
const label = isActive ? 'Active' : 'Inactive';

// ❌ Malo - anidación profunda
if (a) {
  if (b) {
    if (c) {
      doSomething();
    }
  }
}

// ✅ Bueno - flatten
if (!a || !b || !c) {
  return;
}
doSomething();
```

---

## 6. Comentarios

**Regla:** Comentar solo lo no obvio (el "por qué", no el "qué").

```javascript
// ✅ Bueno - explica el contexto
// Retry needed because API has intermittent 503 errors
await retryRequest();

// ❌ Malo - explica lo obvious
// Increment counter by 1
counter++;

// ❌ Malo - código comentado
// const oldCode = value;
```

---

## 7. Prohibiciones

- ❌ No dejar `console.log` en código final
- ❌ No dejar `debugger` en código final
- ❌ No dejar código comentado muerto
- ❌ No usar `var`
- ❌ No usar comillas dobles (`"`) en strings (excepto cuando sea necesario)
- ❌ No violar indentación de 2 espacios

---

## 8. Git Hooks (Opcional)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"]
  }
}
```

---

Última actualización: febrero 2026
