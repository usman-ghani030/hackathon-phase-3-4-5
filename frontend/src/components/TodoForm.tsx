'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '../services/api';
import Notification from './Notification';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (todo: Omit<Todo, 'id' | 'created_at' | 'updated_at' | 'user_id'> | Partial<Todo>) => void;
  onCancel?: () => void;
  onAddSuccess?: () => void; // Callback for successful addition
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel, onAddSuccess }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(todo?.priority || 'medium');
  const [tags, setTags] = useState(todo?.tags || '');
  const [dueDate, setDueDate] = useState(todo?.due_date || '');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Sync state with todo prop when it changes (for editing)
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setPriority(todo.priority || 'medium');
      setTags(todo.tags || '');
      setDueDate(todo.due_date || '');
    } else {
      // Reset form when todo is null (adding new todo)
      setTitle('');
      setDescription('');
      setPriority('medium');
      setTags('');
      setDueDate('');
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call the original onSubmit function
    onSubmit({
      title,
      description,
      priority,
      tags,
      due_date: dueDate || undefined,
      completed: todo?.completed || false, // Keep existing completion status if editing
    });

    // Reset the form after submission (both for adding and updating)
    resetForm();

    // Show success message based on whether we're adding or updating
    if (!todo) {
      setNotificationMessage('Todo added successfully');
      // Call the success callback if provided (only for new todos)
      if (onAddSuccess) {
        onAddSuccess();
      }
    } else {
      setNotificationMessage('Todo updated successfully');
    }

    setShowNotification(true);

    // If onCancel is provided (meaning we're in edit mode), call it to clear editing state
    if (onCancel && todo) {
      onCancel(); // This will clear the editing state in the parent component
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setTags('');
    setDueDate('');
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
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              required
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 bg-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate.split('T')[0]} // Format date for input
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              placeholder="work, personal, urgent..."
            />
            <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 resize-vertical"
            rows={3}
            placeholder="Add details..."
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {todo ? 'Update Todo' : 'Add Todo'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;