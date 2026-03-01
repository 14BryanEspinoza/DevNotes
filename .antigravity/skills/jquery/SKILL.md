---
name: jquery
description: Reglas de uso de jQuery 4.0.0 - cuándo usar y cuándo evitar
---

# jQuery 4.0.0 - Reglas de Uso

jQuery es una herramienta valiosa **solo en contextos específicos**. No debe usarse por defecto.

---

## 1. Cuándo USAR jQuery (vale la pena)

| Caso                                | Ejemplo                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| **AJAX legacy**                     | APIs antiguas que requieren manejo complejo de XMLHttpRequest |
| **Eventos delegados profundos**     | Elementos dinámicos que aparecen/desaparecen frecuentemente   |
| **Plugins sin alternativa vanilla** | Plugins legacy que no tienen equivalente moderno              |
| **Compatibilidad legacy**           | Proyectos que ya usan jQuery masivamente                      |

### Ejemplo válido

```javascript
// Evento delegado para elementos dinámicos
$(document).on("click", ".dynamic-element", function () {
  // Manejo de click en elementos que se crean después
});
```

---

## 2. Cuándo NO USAR jQuery (usar vanilla JS)

| En lugar de...                    | Usar...                                 |
| --------------------------------- | --------------------------------------- |
| `$('#id')`                        | `document.getElementById('id')`         |
| `$('.class')`                     | `document.querySelectorAll('.class')`   |
| `$('.class').on('click', fn)`     | `element.addEventListener('click', fn)` |
| `$('.class').hide()`              | `element.classList.add('hidden')`       |
| `$('.class').attr('data-x', val)` | `element.dataset.x = val`               |
| `$.ajax()`                        | `fetch()`                               |

### Ejemplo - NO usar jQuery para esto

```javascript
// ❌ Malo - usar jQuery para selección básica
$("#button").click(function () {
  $("#output").text("Hello");
});

// ✅ Bueno - vanilla JS
document.getElementById("button").addEventListener("click", () => {
  document.getElementById("output").textContent = "Hello";
});
```

---

## 3. Restricciones

- ❌ **NO eliminar jQuery** si ya está en uso en el proyecto (salvo refactor planificado y aprobado)
- ❌ No usar jQuery para selección básica (ya hay `querySelector`)
- ❌ No usar jQuery para animaciones simples (usar CSS transitions)
- ❌ No usar jQuery para AJAX nuevo (usar `fetch`)

---

## 4. Versión Recomendada

**jQuery 4.0.0** (lanzada enero 2026)

```bash
pnpm add jquery
```

---

## 5. Integración con Build

### esbuild

```javascript
// bundling con esbuild - incluir jQuery global
esbuild src/js/main.js --bundle --outfile=dist/js/bundle.js --format=iife --global-name=jQuery
```

### HTML

- Agregar los script en el head

```html
<script src="https://code.jquery.com/jquery-4.0.0.min.js" defer></script>
<!-- o desde node_modules -->
<script src="node_modules/jquery/dist/jquery.min.js" defer></script>
```

---

Última actualización: febrero 2026
