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
  renderNotesToContainer('notes-list');
  renderNotesToContainer('notes-list-mobile');
}

function renderNotesToContainer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { notes, activeNoteId } = getState();

  if (notes.length === 0) {
    container.innerHTML = `
      <p class="text-purple-300/50 text-sm p-3">No hay notas</p>
    `;
    return;
  }

  container.innerHTML = notes
    .map(
      (note) => `
      <button
        class="note-item w-full text-left transition-all ${
          note.id === activeNoteId ? 'active' : ''
        }"
        data-note-id="${note.id}"
        aria-pressed="${note.id === activeNoteId}"
      >
        <div class="font-medium text-sm truncate text-white">
          ${getTitlePreview(note)}
        </div>
        <div class="text-xs text-purple-300/60 mt-1">
          ${formatDate(note.updatedAt)}
        </div>
      </button>
    `
    )
    .join('');

  container.querySelectorAll('.note-item').forEach((item) => {
    item.addEventListener('click', () => {
      const noteId = item.dataset.noteId;
      setActiveNote(noteId);

      // Cerrar drawer si existe y estamos en mobile
      const drawer = document.getElementById('mobile-drawer');
      if (drawer && !drawer.classList.contains('hidden')) {
        drawer.classList.remove('open');
        drawer.querySelector('.drawer-panel')?.classList.remove('open');
        document.getElementById('drawer-backdrop')?.classList.remove('open');
        document.body.classList.remove('drawer-open');
        drawer.classList.add('hidden');
      }
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
