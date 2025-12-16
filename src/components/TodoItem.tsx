/**
 * TodoItem Component
 *
 * Displays a single todo item with actions.
 * This component demonstrates:
 * - Context consumption
 * - Conditional rendering
 * - Edit mode with local state
 *
 * Features:
 * - Toggle completion
 * - Delete todo
 * - Edit todo text (double-click to edit)
 */

import { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import type { Todo } from '../contexts/TodoContext';
import './TodoItem.css';

/**
 * Props Interface
 */
interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  /**
   * Local State: Edit mode
   *
   * This tracks whether the todo is currently being edited.
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Local State: Edit text
   *
   * Temporary state for the edited text.
   */
  const [editText, setEditText] = useState(todo.text);

  /**
   * Context: Get action functions
   */
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();

  /**
   * Handle Toggle
   *
   * Marks the todo as complete/incomplete.
   */
  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  /**
   * Handle Delete
   *
   * Removes the todo.
   */
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  /**
   * Handle Edit Start
   *
   * Enters edit mode when user double-clicks the todo text.
   */
  const handleEditStart = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  /**
   * Handle Edit Save
   *
   * Saves the edited text and exits edit mode.
   */
  const handleEditSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    } else {
      // If text is empty, cancel edit
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  /**
   * Handle Edit Cancel
   *
   * Exits edit mode without saving.
   */
  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  /**
   * Handle Edit Key Down
   *
   * Handles keyboard shortcuts in edit mode:
   * - Enter: Save
   * - Escape: Cancel
   */
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  /**
   * Render
   */
  if (isEditing) {
    // Edit mode - show input
    return (
      <li className="todo-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={handleEditKeyDown}
          className="todo-edit-input"
          autoFocus
        />
      </li>
    );
  }

  // View mode - show todo
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        <span
          onDoubleClick={handleEditStart}
          className="todo-text"
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="delete-button"
        aria-label="Delete todo"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
