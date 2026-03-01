// Importamos las funciones del store
import { getState, subscribe, setActiveNote } from './store.js';

// Formatea una fecha
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const dayMs = 24 * 60 * 60 * 1000;

  // Si la fecha es menor a un día, retornamos la hora
  if (diff < dayMs) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Si la fecha es menor a dos días, retornamos "Ayer"
  if (diff < 2 * dayMs) {
    return 'Ayer';
  }

  // Retornamos la fecha
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
}

// Obtiene el preview del título
function getTitlePreview(note) {
  // Si el título existe, retornamos el título
  if (note.title) {
    return note.title;
  }

  // Si el contenido existe, retornamos el contenido
  const contentPreview = note.content.substring(0, 50).replaceAll('\n', ' ');

  // Retornamos el preview
  return contentPreview || 'Sin título';
}

// Renderiza las notas
function renderNotes() {
  // Obtenemos el contenedor
  const container = document.getElementById('notes-list');

  // Si no existe el contenedor, retornamos
  if (!container) {
    return;
  }

  // Obtenemos el estado
  const { notes, activeNoteId } = getState();

  // Si no hay notas, retornamos
  if (notes.length === 0) {
    container.innerHTML = `
      <p class="text-text-disabled text-sm p-3">No hay notas</p>
    `;
    return;
  }

  // Renderizamos las notas
  container.innerHTML = notes
    .map(
      (note) => `
      <button
        class="note-item w-full text-left p-3 rounded-lg mb-1 transition-colors ${
  note.id === activeNoteId
    ? 'bg-primary text-white'
    : 'text-text-secondary hover:bg-bg-elevated'
}"
        data-note-id="${note.id}"
        aria-pressed="${note.id === activeNoteId}"
      >
        <div class="font-medium text-sm truncate">
          ${getTitlePreview(note)}
        </div>
        <div class="text-xs ${note.id === activeNoteId ? 'text-white/70' : 'text-text-disabled'} mt-1">
          ${formatDate(note.updatedAt)}
        </div>
      </button>
    `
    )
    .join('');

  // Agregamos los eventos
  container.querySelectorAll('.note-item').forEach((item) => {
    item.addEventListener('click', () => {
      // Obtenemos el ID de la nota
      const noteId = item.dataset.noteId;

      // Activamos la nota
      setActiveNote(noteId);
    });
  });
}

// Inicializa la UI
function initNotesUI() {
  renderNotes();

  // Nos suscribimos a los cambios
  subscribe(renderNotes);
}

// Exportamos la función
export { initNotesUI };
