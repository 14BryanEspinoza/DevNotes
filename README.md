# DevNotes

Aplicación web para gestionar notas con formato Markdown. Creada con un enfoque minimalista y moderno, utilizando tecnologías web fundamentales.

## Características

- **Crear Notas:** Nueva nota con un clic
- **Editor Markdown:** Escribe en Markdown con previsualización en tiempo real
- **Exportar HTML:** Descarga tus notas como archivos HTML independientes
- **Persistencia Local:** Tus notas se guardan automáticamente en localStorage
- **Diseño Responsivo:** Funciona en escritorio y dispositivos móviles
- **Interfaz Moderna:** Glassmorphism con gradientes y efectos de vidrio
- **Accesible:** Soporte completo de teclado y ARIA

## Tecnologías

| Categoría       | Tecnología       |
| --------------- | ---------------- |
| HTML            | HTML5 semántico  |
| CSS             | Tailwind CSS v4+ |
| JavaScript      | Vanilla ES6+     |
| Markdown        | Marked           |
| Icons           | Lucide           |
| Build           | esbuild          |
| Package Manager | pnpm             |

## Estructura del Proyecto

```text
DevNotes/
├── index.html              # Punto de entrada
├── package.json            # Dependencias y scripts
├── pnpm-lock.yaml          # Lockfile de pnpm
├── eslint.config.mjs       # Configuración de ESLint
├── .prettierrc             # Configuración de Prettier
├── src/
│   ├── css/
│   │   └── styles.css      # Estilos con Tailwind
│   ├── js/
│   │   ├── main.js         # Inicialización de la app
│   │   ├── editor.js       # Lógica del editor y preview
│   │   ├── notes-ui.js     # Renderizado de notas
│   │   └── store.js        # Gestión de estado y localStorage
│   └── assets/
│       ├── icon.png        # Favicon
│       └── preview.png     # Preview para Open Graph
└── dist/                   # Archivos compilados
    ├── css/
    │   └── styles.css      # CSS minificado
    ├── js/
    │   └── bundle.js       # JS minificado
    └── index.html          # HTML minificado
```

## Instalación

```bash
# Instalar dependencias
pnpm install
```

## Scripts Disponibles

| Comando          | Descripción                      |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Inicia el servidor de desarrollo |
| `pnpm dev:css`   | Compila CSS en modo watch        |
| `pnpm dev:js`    | Compila JS en modo watch         |
| `pnpm build`     | Compila para producción          |
| `pnpm build:css` | Compila CSS minificado           |
| `pnpm build:js`  | Compila JS minificado            |
| `pnpm lint`      | Ejecuta ESLint                   |
| `pnpm format`    | Formatea código con Prettier     |

## Desarrollo

```bash
# Iniciar modo desarrollo
pnpm dev
```

Esto ejecutará en paralelo el watcher de CSS y JS. Los cambios se compilarán automáticamente.

## Producción

```bash
# Compilar archivos para producción
pnpm build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 📸 Vista previa

![Vista previa de DevNotes](assets/preview.png)

---

## 🔗 Enlace del proyecto

- **Sitio en vivo**: [Ver Proyecto](https://devnotes14bz.vercel.app/)

## 📊 Estado del proyecto

- [x] Diseño Glassmorphism
- [x] Lógica modular
- [x] Persistencia local

**Próximos pasos**:

- [ ] Agregar más funcionalidades

### Desarrollado por Bryan Espinoza - 2026
