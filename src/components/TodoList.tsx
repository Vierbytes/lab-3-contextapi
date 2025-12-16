/**
 * TodoList Component
 *
 * Displays a filtered list of todos.
 * This component demonstrates:
 * - Using multiple contexts
 * - useMemo for performance optimization
 * - Conditional rendering
 *
 * The filtering logic combines:
 * - TodoContext (provides the todos)
 * - FilterContext (provides the current filter)
 */

import { useMemo } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import { useFilterContext } from '../contexts/FilterContext';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList() {
  /**
   * Context: Get todos from TodoContext
   */
  const { todos, clearCompleted } = useTodoContext();

  /**
   * Context: Get current filter from FilterContext
   */
  const { filter } = useFilterContext();

  /**
   * Filtered Todos - Optimized with useMemo
   *
   * I'm using useMemo to avoid re-filtering on every render.
   * The filtered array is only recalculated when todos or filter changes.
   *
   * This is an optimization technique - without it, the filtering
   * would happen on every render (even when unrelated state changes).
   */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        // Show only incomplete todos
        return todos.filter(todo => !todo.completed);
      case 'completed':
        // Show only completed todos
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        // Show all todos
        return todos;
    }
  }, [todos, filter]); // Recompute when todos or filter changes

  /**
   * Count completed todos
   *
   * Used to show/hide the "Clear Completed" button
   */
  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  /**
   * Count active todos
   *
   * Shows how many todos are left to complete
   */
  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  /**
   * Handle Clear Completed
   */
  const handleClearCompleted = () => {
    clearCompleted();
  };

  return (
    <div className="todo-list-container">
      {/* Todo List */}
      {filteredTodos.length > 0 ? (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          {todos.length === 0 ? (
            <p>No todos yet. Add one above to get started!</p>
          ) : (
            <p>No {filter} todos.</p>
          )}
        </div>
      )}

      {/* Footer with counts and clear button */}
      {todos.length > 0 && (
        <div className="todo-footer">
          <span className="todo-count">
            {activeCount} {activeCount === 1 ? 'item' : 'items'} left
          </span>

          {completedCount > 0 && (
            <button
              onClick={handleClearCompleted}
              className="clear-completed-button"
            >
              Clear completed ({completedCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoList;
