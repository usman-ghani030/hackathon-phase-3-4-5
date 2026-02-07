'use client';

import React from 'react';
import { Todo } from '../services/api';
import Notification from './Notification';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onDeleteSuccess?: () => void; // Callback for successful deletion
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete, onDeleteSuccess }) => {
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed;

  const handleDelete = () => {
    // Call the original delete function
    onDelete(todo.id);

    // Show success notification
    setNotificationMessage('Todo deleted successfully');
    setShowNotification(true);

    // Call the success callback if provided
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type="success"
          onClose={handleNotificationClose}
        />
      )}
      <div className={`p-5 rounded-xl border transition-all duration-300 ${
        todo.completed
          ? 'bg-gray-50 border-gray-200 shadow-sm hover:shadow-md'
          : isOverdue
            ? 'bg-red-50 border-red-200 shadow-sm hover:shadow-md'
            : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
      } hover:border-gray-300 group`}>
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            aria-label={todo.completed ? `Mark "${todo.title}" as incomplete` : `Mark "${todo.title}" as complete`}
          />

          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {todo.title}
              </h3>

              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  todo.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : todo.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {todo.priority}
                </span>

                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onEdit(todo)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    title="Edit todo"
                    aria-label={`Edit todo: ${todo.title}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    onClick={handleDelete}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    title="Delete todo"
                    aria-label={`Delete todo: ${todo.title}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {todo.description && (
              <p className={`mt-2 text-gray-600 break-words max-w-full ${
                todo.completed ? 'text-gray-400' : ''
              }`}>
                {todo.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {todo.tags && (
                <div className="flex flex-wrap gap-1">
                  {todo.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {todo.due_date && (
                <div className={`text-xs px-2 py-1 rounded-full ${
                  isOverdue
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  Due: {formatDate(todo.due_date)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;