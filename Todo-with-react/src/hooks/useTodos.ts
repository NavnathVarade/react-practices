import { useReducer, useState, useEffect } from 'react';
import { todoReducer, loadFromStorage, saveToStorage, generateId, PRIORITY_LEVELS, STORAGE_KEY } from '../utils/todoUtils';

// useTodos custom hook
const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [preferences, setPreferences] = useState({ darkMode: false });

  useEffect(() => {
    const data = loadFromStorage();
    dispatch({ type: 'LOAD_TODOS', payload: data.todos });
    setPreferences(data.preferences);
  }, []);

  useEffect(() => {
    saveToStorage({ todos, preferences });
  }, [todos, preferences]);

  const addTodo = (todoData) => {
    const newTodo = {
      id: generateId(),
      title: todoData.title.trim(),
      description: todoData.description?.trim() || '',
      completed: false,
      priority: todoData.priority || PRIORITY_LEVELS.MEDIUM,
      dueDate: todoData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id, updates) => {
    dispatch({ 
      type: 'UPDATE_TODO', 
      id, 
      updates: { ...updates, updatedAt: new Date().toISOString() }
    });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const toggleDarkMode = () => {
    setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return {
    todos,
    preferences,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    toggleDarkMode
  };
};

export default useTodos;

