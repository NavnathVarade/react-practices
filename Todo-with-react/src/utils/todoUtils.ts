// Types and Interfaces
export const FILTER_TYPES = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export const PRIORITY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

// Utility Functions
export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
};

// Storage Utilities
export const STORAGE_KEY = 'professional-todo-app';

export const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { todos: [], preferences: { darkMode: false } };
  } catch (error) {
    console.error('Error loading from storage:', error);
    return { todos: [], preferences: { darkMode: false } };
  }
};

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

// Reducer for Todo State Management
export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'UPDATE_TODO':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, ...action.updates } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};
