# AGENTS.md - Reglas del Proyecto

> **Nota:** Este archivo define las reglas específicas del proyecto. Las reglas globales en `~/.config/opencode/skills/globals/SKILL.md` son referencia adicional, pero este archivo tiene prioridad.

---

## 1. Filosofía Senior (prioridad máxima - orden descendente)

1. **Pragmatismo > purismo**  
   La solución más simple, efectiva y mantenible para **el problema actual** gana.

2. **KISS + YAGNI**  
   Nada de abstracciones, capas extras, utilitarios genéricos ni features especulativas hasta que sean **necesarias y probadas en producción**.

3. **Separation of Concerns / Single Responsibility**  
   Separación estricta:
   - Presentación → HTML semántico + Tailwind
   - Interacción DOM y eventos → jQuery focalizado
   - Lógica de negocio / utils → módulos puros sin tocar DOM

4. **Progressive Enhancement** (obligatorio)  
   El sitio **debe funcionar sin JavaScript** (HTML semántico + CSS usable + formularios nativos).  
   jQuery solo añade mejoras (interactividad, validaciones dinámicas, AJAX, etc.).

5. **Readability > Cleverness**  
   Nombres descriptivos (inglés), estructura plana, evitar nesting profundo (>3 niveles), one-liners complejos o trucos innecesarios.

6. **Defensive Programming**  
   Valida **todo**: inputs, params, fetch responses, null/undefined.  
   Maneja loading, error y empty states. Nunca dejes la UI rota en silencio.

7. **Performance = UX real**  
   Optimiza critical rendering path, minimiza reflows/repaints, lazy loading imágenes, prefiere CSS transitions/animations, evita JS en critical path.  
   Mide con **Lighthouse** y **Web Vitals**.

8. **Mobile-first de verdad**  
   Diseña y prueba **primero** en mobile.  
   Media queries con `min-width`, touch targets ≥44×44 px, scroll behavior suave, evitar hover-only.

9. **Accesibilidad por defecto** (nivel AA mínimo)
   - HTML semántico correcto
   - `alt` descriptivos y útiles
   - `<label>` asociados correctamente
   - Contraste ≥4.5:1 (texto normal)
   - Focus visible y keyboard navigation completa
   - ARIA solo cuando sea **necesario y correcto** (no abuses)

10. **Colaboración**
    - Propón arquitectura/high-level **antes** de código detallado
    - Respeta constraints al 100% → pregunta si hay conflicto
    - Entrega **MVP funcional primero**, luego itera/refactoriza con feedback
    - Si una decisión viola alguna regla → señala la regla, explica por qué y da ≥2 alternativas

---

## 2. Stack Tecnológico

| Categoría       | Tecnología / Versión                | Notas                               |
| --------------- | ----------------------------------- | ----------------------------------- |
| HTML            | HTML5 semántico estricto            | Progressive enhancement obligatorio |
| CSS             | **Tailwind CSS v4+** (Oxide engine) | CSS-first config (@theme)           |
| JavaScript      | Vanilla ES6+ + **jQuery 4.0.0**     | jQuery solo cuando aporte valor     |
| Linter          | ESLint                              | Reglas abajo especificadas          |
| Formatter       | Prettier                            | Reglas abajo especificadas          |
| Package Manager | pnpm                                |                                     |

---

## 3. Estructura de Archivos

```text
/ (raíz)
├── index.html
└── src/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── assets/
        └── (imágenes, fuentes, etc.)
```

- `index.html` vive en la **raíz** del proyecto
- Todos los demás archivos fuente van en `src/`

---

## 4. Convenciones de Código

### Generales

- **Indentación:** 2 espacios
- **Comillas:** simples `'` (single quotes)
- **Punto y coma:** obligatorio
- **Variables:** `const` por defecto, `let` solo si reasignas
- **Nombres:** inglés, descriptivos, camelCase para variables/funciones

### HTML

- HTML5 semántico estricto
- Tailwind utility-first en clases
- Ejemplo de botón:

  ```html
  <button
    class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 transition-colors"
  >
    Click me
  </button>
  ```

### JavaScript / jQuery

- Vanilla ES6+ preferido, jQuery solo para:
  - AJAX legacy
  - Eventos delegados profundos
  - Plugins sin alternativa vanilla
- Separación: lógica de negocio en módulos puros (sin DOM), interacción en handlers separados
- **No dejar** `console.log`, `debugger` ni código comentado muerto en entregas finales
- Comentarios: solo lo no obvio (por qué, no qué)

### CSS (Tailwind)

- Configuración CSS-first con `@import "tailwindcss"; @theme { … }`
- Preflight activado por defecto
- Personalización vía `@theme`, `@utility`, `@layer`
- Evitar `!important` salvo excepciones justificadas

---

## 5. Reglas de Herramientas

### Tailwind CSS v4+

- Versión recomendada: **v4.2+**
- Instalación: `pnpm add tailwindcss`
- Configuración: **CSS-first** → `@import "tailwindcss"; @theme { … }`
- Preflight: activado por defecto (no desactivar sin razón específica)
- Content detection: automático en v4

### jQuery 4.0.0

- Usar **solo cuando aporte valor real**:
  - AJAX legacy
  - Eventos delegados profundos
  - Plugins sin alternativa vanilla
- **No usar** para selección básica (usar `querySelector`)

### ESLint

```json
{
  "semi": ["error", "always"],
  "quotes": ["error", "single"],
  "indent": ["error", 2],
  "no-unused-vars": "error",
  "prefer-const": "error"
}
```

### Prettier

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5",
  "endOfLine": "lf"
}
```

---

## 6. Prohibiciones Explícitas

- **Los agentes NO pueden ejecutar comandos de terminal** - Solo pueden leer, editar, modificar y eliminar archivos. Cualquier comando debe ser ejecutado por el usuario.
- **No sugerir ni usar:** React, Next.js, Vue, Svelte, Angular, CSS modules, styled-components, TypeScript, PostCSS plugins complejos
- **Bootstrap CSS completo:** prohibited por defecto (solo JS si es necesario y justificado)
- **No cambiar package manager** sin preguntar
- **No reestructurar carpetas** del proyecto sin acuerdo previo
- **No eliminar jQuery** si ya está en uso (salvo refactor planificado y aprobado)
- **No proponer dependencias nuevas** sin justificar ROI claro (bundle size, Lighthouse, DX medible)

---

## 7. Accesibilidad (nivel AA mínimo)

- HTML semántico correcto (header, nav, main, footer, article, etc.)
- `alt` descriptivos y útiles en todas las imágenes
- `<label>` correctamente asociados a sus inputs
- Contraste de color ≥4.5:1 para texto normal
- Focus visible y keyboard navigation completa
- ARIA solo cuando sea **necesario y correcto** (no abusar)

---

## 8. Performance

- Optimizar critical rendering path
- Minimizar reflows/repaints
- Lazy loading para imágenes
- Preferir CSS transitions/animations sobre JS
- Evitar JS en critical path
- Medir con **Lighthouse** y **Web Vitals** (no suposiciones)

---

**Versiones recomendadas:**

- jQuery: 4.0.0
- Tailwind CSS: v4.2+ (Oxide engine)

Última actualización: Febrero 2026
