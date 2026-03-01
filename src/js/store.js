// LLave del localStorage
const STORAGE_KEY = 'devnotes_data';

// Estado por defecto
const defaultState = {
  notes: [],
  activeNoteId: null,
};

// Estado global
let state = loadFromStorage();
const listeners = new Set();

// Genera un ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Carga datos del localStorage
function loadFromStorage() {
  try {
    // Obtenemos los datos del localStorage
    const data = localStorage.getItem(STORAGE_KEY);

    // Si hay datos, los parseamos y retornamos
    if (data) {
      return JSON.parse(data);
    }

    // Si hay un error, retornamos el estado por defecto
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }

  // Si no hay datos, retornamos el estado por defecto
  return defaultState;
}

// Guarda datos en el localStorage
function saveToStorage(state) {
  try {
    // Guardamos los datos en el localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Si hay un error, lo mostramos en la consola
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

// Obtiene el estado actual
function getState() {
  return state;
}

// Actualiza el estado
function setState(newState) {
  // Actualizamos el estado
  state = { ...state, ...newState };

  // Guardamos el estado en el localStorage
  saveToStorage(state);

  // Notificamos a los suscriptores
  listeners.forEach((fn) => fn(state));
}

// Suscribe a los cambios
function subscribe(fn) {
  // Agregamos el suscriptor
  listeners.add(fn);

  // Retornamos una función para desuscribirse
  return () => listeners.delete(fn);
}

// Crea una nueva nota
function createNote() {
  const newNote = {
    id: generateId(),
    title: '',
    content: '',
    updatedAt: Date.now(),
  };

  // Actualizamos el estado
  setState({
    notes: [newNote, ...state.notes],
    activeNoteId: newNote.id,
  });

  // Retornamos la nueva nota
  return newNote;
}

// Actualiza una nota
function updateNote(id, updates) {
  // Obtenemos la nota a actualizar
  const notes = state.notes.map((note) => {
    if (note.id === id) {
      // Retornamos la nota actualizada
      return { ...note, ...updates, updatedAt: Date.now() };
    }

    // Retornamos la nota original
    return note;
  });

  // Actualizamos el estado
  setState({ notes });
}

// Elimina una nota
function deleteNote(id) {
  // Obtenemos las notas restantes
  const notes = state.notes.filter((note) => note.id !== id);

  // Obtenemos el ID de la nota activa
  let activeNoteId = state.activeNoteId;

  // Si la nota activa es la que se eliminó, se selecciona la siguiente
  if (activeNoteId === id) {
    activeNoteId = notes.length > 0 ? notes[0].id : null;
  }

  // Actualizamos el estado
  setState({ notes, activeNoteId });
}

// Activa una nota
function setActiveNote(id) {
  // Si la nota existe, actualizamos el estado
  if (state.notes.some((n) => n.id === id)) {
    setState({ activeNoteId: id });
  }
}

// Obtiene la nota activa
function getActiveNote() {
  // Si no hay una nota activa, retornamos null
  if (!state.activeNoteId) {
    return null;
  }

  // Retornamos la nota activa
  return state.notes.find((n) => n.id === state.activeNoteId) || null;
}

// Exportamos las funciones
export { getState, subscribe, createNote, updateNote, deleteNote, setActiveNote, getActiveNote };
