/**
 * TodoInput Component
 *
 * An input field for adding new todos.
 * This component demonstrates consuming context with the custom hook.
 *
 * Features:
 * - Controlled input with local state
 * - Form submission handling
 * - Clears input after adding
 */

import { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import './TodoInput.css';

function TodoInput() {
  /**
   * Local State: Input value
   *
   * I'm using local state for the input because this is
   * temporary UI state that doesn't need to be global.
   */
  const [inputValue, setInputValue] = useState('');

  /**
   * Context: Get addTodo function
   *
   * This is where the Context API shines - I can access
   * the addTodo function from anywhere in the component tree!
   */
  const { addTodo } = useTodoContext();

  /**
   * Handle Form Submission
   *
   * Adds the todo and clears the input.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue(''); // Clear input after adding
    }
  };

  /**
   * Handle Input Change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="What needs to be done?"
        className="todo-input"
        autoFocus
      />
      <button type="submit" className="add-button">
        Add Todo
      </button>
    </form>
  );
}

export default TodoInput;
