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
  } else {
    // Si no hay una nota activa, la inicializamos
    titleInput.value = '';
    textarea.value = '';
    preview.innerHTML =
      '<p class="text-text-disabled italic">La vista previa aparecerá aquí...</p>';
    deleteBtn.disabled = true;
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

// Inicializa el editor
function initEditor() {
  titleInput = document.getElementById('note-title');
  textarea = document.getElementById('editor-textarea');
  preview = document.getElementById('editor-preview');
  deleteBtn = document.getElementById('btn-delete-note');
  const newNoteBtn = document.getElementById('btn-new-note');

  // Si no hay elementos, retornamos
  if (!titleInput || !textarea || !preview || !deleteBtn || !newNoteBtn) {
    console.error('Editor elements not found');
    return;
  }

  // Cargamos la nota activa
  loadActiveNote();

  // Agregamos los eventos
  titleInput.addEventListener('input', handleTitleChange);
  textarea.addEventListener('input', handleContentChange);
  deleteBtn.addEventListener('click', handleDeleteNote);
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
