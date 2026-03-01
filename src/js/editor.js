// Importamos Marked, y las funciones del store
import { marked } from 'marked';
import { getState, subscribe, createNote, updateNote, deleteNote, getActiveNote } from './store.js';

// Opciones para el Marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Variables para los elementos
let titleInput;
let textarea;
let preview;
let deleteBtn;
let exportBtn;
let debounceTimer;

// Función para actualizar la vista previa
function updatePreview(markdown) {
  // Si no hay contenido, mostramos un mensaje
  if (!markdown.trim()) {
    preview.innerHTML =
      '<p class="text-text-disabled italic">La vista previa aparecerá aquí...</p>';
    return;
  }

  // Si hay contenido, lo convertimos a HTML
  const html = marked.parse(markdown);

  // Actualizamos la vista previa
  preview.innerHTML = html;
}

// Carga la nota activa
function loadActiveNote() {
  // Obtenemos la nota activa
  const note = getActiveNote();

  // Si hay una nota activa, la cargamos
  if (note) {
    titleInput.value = note.title || '';
    textarea.value = note.content || '';
    updatePreview(note.content || '');
    deleteBtn.disabled = false;
    exportBtn.disabled = false;
  } else {
    // Si no hay una nota activa, la inicializamos
    titleInput.value = '';
    textarea.value = '';
    preview.innerHTML =
      '<p class="text-text-disabled italic">La vista previa aparecerá aquí...</p>';
    deleteBtn.disabled = true;
    exportBtn.disabled = true;
  }
}

// Maneja el cambio del título
function handleTitleChange(e) {
  // Obtenemos el ID de la nota activa
  const { activeNoteId } = getState();

  // Si no hay una nota activa, retornamos
  if (!activeNoteId) {
    return;
  }

  // Limpiamos el temporizador
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateNote(activeNoteId, { title: e.target.value });
  }, 500);
}

// Maneja el cambio del contenido
function handleContentChange(e) {
  // Obtenemos el ID de la nota activa
  const { activeNoteId } = getState();

  // Si no hay una nota activa, retornamos
  if (!activeNoteId) {
    return;
  }

  // Actualizamos la vista previa
  updatePreview(e.target.value);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateNote(activeNoteId, { content: e.target.value });
  }, 500);
}

// Maneja la eliminación de la nota
function handleDeleteNote() {
  // Obtenemos el ID de la nota activa
  const { activeNoteId } = getState();

  // Si no hay una nota activa, retornamos
  if (!activeNoteId) {
    return;
  }

  // Si el usuario confirma, eliminamos la nota
  if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
    deleteNote(activeNoteId);
  }
}

// Maneja la exportación de la nota a HTML
function handleExportHtml() {
  const note = getActiveNote();
  if (!note) return;

  const title = note.title || 'sin-titulo';
  const safeTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const htmlContent = marked.parse(note.content || '');

  const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${note.title || 'Nota'}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    h1, h2, h3 { margin-top: 1.5em; }
    code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 1em; overflow-x: auto; }
    blockquote { border-left: 4px solid #6366f1; margin: 1em 0; padding-left: 1em; color: #666; }
  </style>
</head>
<body>
  <h1>${note.title || 'Sin título'}</h1>
  ${htmlContent}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeTitle}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// Inicializa el editor
function initEditor() {
  titleInput = document.getElementById('note-title');
  textarea = document.getElementById('editor-textarea');
  preview = document.getElementById('editor-preview');
  deleteBtn = document.getElementById('btn-delete-note');
  exportBtn = document.getElementById('btn-export-html');
  const newNoteBtn = document.getElementById('btn-new-note');

  // Si no hay elementos, retornamos
  if (!titleInput || !textarea || !preview || !deleteBtn || !newNoteBtn || !exportBtn) {
    console.error('Editor elements not found');
    return;
  }

  // Cargamos la nota activa
  loadActiveNote();

  // Agregamos los eventos
  titleInput.addEventListener('input', handleTitleChange);
  textarea.addEventListener('input', handleContentChange);
  deleteBtn.addEventListener('click', handleDeleteNote);
  exportBtn.addEventListener('click', handleExportHtml);
  newNoteBtn.addEventListener('click', () => {
    createNote();
  });

  // Nos suscribimos a los cambios
  subscribe(() => {
    loadActiveNote();
  });
}

// Exportamos la función
export { initEditor };
