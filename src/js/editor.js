// Importa la librería marked
import { marked } from 'marked';

// Configura marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Inicializa el editor
export function initEditor() {
  // Obtiene el textarea
  const textarea = document.getElementById('editor-textarea');
  const preview = document.getElementById('editor-preview');

  // Si no encuentra el textarea o el preview, muestra un error
  if (!textarea || !preview) {
    console.error('Editor elements not found');
    return;
  }

  // Función para actualizar el preview
  const updatePreview = (markdown) => {
    if (!markdown.trim()) {
      preview.innerHTML =
        '<p class="text-text-disabled italic">La vista previa aparecerá aquí...</p>';
      return;
    }
    const html = marked.parse(markdown);
    preview.innerHTML = html;
  };

  // Agrega un event listener para el input
  textarea.addEventListener('input', (e) => {
    updatePreview(e.target.value);
  });
}
