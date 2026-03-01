// Importa las funciones
import { initEditor } from './editor.js';
import { initNotesUI } from './notes-ui.js';
import { getState, subscribe, createNote, deleteNote } from './store.js';

// Inicializa los iconos de Lucide
lucide.createIcons();

// Referencias del drawer
let drawer;
let backdrop;
let menuBtn;
let closeBtn;
let deleteBtnMobile;
let exportBtnMobile;
let newNoteBtnMobile;

// Inicializa el drawer
function initDrawer() {
  drawer = document.getElementById('mobile-drawer');
  backdrop = document.getElementById('drawer-backdrop');
  menuBtn = document.getElementById('btn-menu');
  closeBtn = document.getElementById('btn-close-drawer');
  deleteBtnMobile = document.getElementById('btn-delete-note-mobile');
  exportBtnMobile = document.getElementById('btn-export-html-mobile');
  newNoteBtnMobile = document.getElementById('btn-new-note-mobile');

  // Verifica que los elementos existan
  if (!drawer || !backdrop || !menuBtn) {
    return;
  }

  // Eventos del drawer
  menuBtn.addEventListener('click', toggleDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Botones de acción en mobile
  newNoteBtnMobile?.addEventListener('click', () => {
    createNote();
    closeDrawer();
  });

  deleteBtnMobile?.addEventListener('click', () => {
    const { activeNoteId } = getState();
    if (activeNoteId && confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      deleteNote(activeNoteId);
      closeDrawer();
    }
  });

  exportBtnMobile?.addEventListener('click', () => {
    const btn = document.getElementById('btn-export-html');
    btn?.click();
    closeDrawer();
  });

  // Subscribe para sincronizar estado de botones
  subscribe(updateMobileButtons);
}

// Funciones del drawer
function toggleDrawer() {
  // Obtiene el estado del drawer
  const isOpen = drawer.classList.contains('open');

  // Cierra el drawer si está abierto
  if (isOpen) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

// Abre el drawer
function openDrawer() {
  drawer.classList.remove('hidden');
  drawer.classList.add('open');
  backdrop.classList.add('open');
  drawer.querySelector('.drawer-panel')?.classList.add('open');
  document.body.classList.add('drawer-open');
  menuBtn?.setAttribute('aria-expanded', 'true');
  lucide.createIcons();
}

// Cierra el drawer
function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
  drawer.querySelector('.drawer-panel')?.classList.remove('open');
  document.body.classList.remove('drawer-open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  setTimeout(() => {
    drawer.classList.add('hidden');
  }, 300);
}

// Actualiza los botones del drawer
function updateMobileButtons() {
  const { activeNoteId } = getState();
  const hasActiveNote = !!activeNoteId;

  // Deshabilita los botones si no hay una nota activa
  if (deleteBtnMobile) {
    deleteBtnMobile.disabled = !hasActiveNote;
  }

  // Deshabilita el botón de exportación si no hay una nota activa
  if (exportBtnMobile) {
    exportBtnMobile.disabled = !hasActiveNote;
  }
}

// Inicializa la aplicación
document.addEventListener('DOMContentLoaded', () => {
  initDrawer();
  initNotesUI();
  initEditor();
  updateMobileButtons();
});
