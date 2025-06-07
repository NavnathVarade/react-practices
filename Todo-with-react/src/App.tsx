import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon, Check } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import useTodos from './hooks/useTodos';
import { FILTER_TYPES } from './utils/todoUtils';

// Main App Component
const TodoApp = () => {
  const { todos, preferences, addTodo, updateTodo, deleteTodo, clearCompleted, toggleDarkMode } = useTodos();
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized filtered todos for performance
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchLower) ||
        todo.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case FILTER_TYPES.ACTIVE:
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case FILTER_TYPES.COMPLETED:
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    // Sort by priority (High -> Medium -> Low) and then by creation date
    return filtered.sort((a, b) => {
      const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [todos, activeFilter, searchTerm]);

  const todoCounts = useMemo(() => ({
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }), [todos]);

  const hasCompletedTodos = todoCounts.completed > 0;

  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  return (
    <div className={`min-h-screen transition-colors ${preferences.darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Todo App
              </h1>
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title={`Switch to ${preferences.darkMode ? 'light' : 'dark'} mode`}
              >
                {preferences.darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your life with style and efficiency
            </p>
          </div>

          {/* Todo Form */}
          <TodoForm onSubmit={addTodo} />

          {/* Stats & Filters */}
          {todos.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {todoCounts.total} total • {todoCounts.active} active • {todoCounts.completed} completed
                </div>
                {hasCompletedTodos && (
                  <button
                    onClick={clearCompleted}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Clear Completed
                  </button>
                )}
              </div>

              <FilterBar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                todoCounts={todoCounts}
              />
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-4">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <Check size={48} className="mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {todos.length === 0 
                    ? "No todos yet" 
                    : searchTerm 
                      ? "No todos match your search" 
                      : "No todos in this category"
                  }
                </h3>
                <p className="text-gray-400 dark:text-gray-600">
                  {todos.length === 0 
                    ? "Add your first todo above to get started!" 
                    : searchTerm 
                      ? "Try adjusting your search terms" 
                      : "Try switching to a different filter"
                  }
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Built with React, Tailwind CSS, and ❤️</p>
            <p className="text-sm mt-2">
              Data persisted locally • {todos.length} {todos.length === 1 ? 'todo' : 'todos'} stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

