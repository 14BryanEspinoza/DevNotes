// Importa las funciones
import { initEditor } from './editor.js';
import { initNotesUI } from './notes-ui.js';

// Inicializa la aplicación
document.addEventListener('DOMContentLoaded', () => {
  initNotesUI();
  initEditor();
});
