import React, { useState } from 'react';
import { Edit, Trash2, Check, Calendar } from 'lucide-react';
import TodoForm from './TodoForm';
import { PRIORITY_LEVELS, formatDate, isOverdue } from '../utils/todoUtils';

// TodoItem component
const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH: return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case PRIORITY_LEVELS.MEDIUM: return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case PRIORITY_LEVELS.LOW: return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const handleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = (formData) => {
    onUpdate(todo.id, formData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow-sm">
        <TodoForm
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          initialData={todo}
        />
      </div>
    );
  }

  return (
    <div className={`border-l-4 ${getPriorityColor(todo.priority)} p-4 rounded-lg shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleComplete}
          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 dark:text-white ${
                todo.completed ? 'line-through opacity-60' : ''
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-gray-600 dark:text-gray-400 mt-1 ${
                  todo.completed ? 'line-through opacity-60' : ''
                }`}>
                  {todo.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                title="Edit todo"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                title="Delete todo"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                todo.priority === PRIORITY_LEVELS.HIGH ? 'bg-red-500' :
                todo.priority === PRIORITY_LEVELS.MEDIUM ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              {todo.priority.toLowerCase()} priority
            </span>
            
            {todo.dueDate && (
              <span className={`flex items-center gap-1 ${
                isOverdue(todo.dueDate) && !todo.completed ? 'text-red-500 font-semibold' : ''
              }`}>
                <Calendar size={12} />
                {formatDate(todo.dueDate)}
                {isOverdue(todo.dueDate) && !todo.completed && ' (Overdue)'}
              </span>
            )}
            
            <span>Created {formatDate(todo.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
