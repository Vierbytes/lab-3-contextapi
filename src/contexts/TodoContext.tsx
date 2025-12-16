/**
 * TodoContext - Manages Todo Items State
 *
 * This context provides todo state and actions to all components.
 * I'm using useReducer instead of useState because:
 * - Multiple related state updates (add, toggle, delete, edit)
 * - Complex state logic with different action types
 * - Better for testing and debugging
 *
 * Key learning points:
 * - Context API for global state management
 * - useReducer for complex state logic
 * - TypeScript for type safety
 * - localStorage integration for persistence
 */

import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * Todo Item Interface
 *
 * Defines the shape of a single todo item
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

/**
 * Action Types
 *
 * I'm using a discriminated union for type-safe actions.
 * Each action has a 'type' property and optional payload.
 */
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; newText: string } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

/**
 * Context Value Interface
 *
 * Defines what the context provides to consumers
 */
interface TodoContextValue {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  clearCompleted: () => void;
}

/**
 * Reducer Function
 *
 * This is the heart of our state management.
 * It takes the current state and an action, and returns new state.
 *
 * I learned that reducers must be pure functions:
 * - No side effects
 * - Same input always produces same output
 * - Don't mutate state - return new objects
 */
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      // Create a new todo and add it to the array
      return [
        ...state,
        {
          id: Date.now().toString(), // Simple ID generation
          text: action.payload,
          completed: false,
        },
      ];

    case 'TOGGLE_TODO':
      // Toggle the completed status of a specific todo
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'DELETE_TODO':
      // Remove a todo by filtering it out
      return state.filter(todo => todo.id !== action.payload);

    case 'EDIT_TODO':
      // Update the text of a specific todo
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );

    case 'CLEAR_COMPLETED':
      // Remove all completed todos
      return state.filter(todo => !todo.completed);

    case 'LOAD_TODOS':
      // Load todos from localStorage
      return action.payload;

    default:
      // TypeScript ensures we handle all action types
      return state;
  }
}

/**
 * Create Context
 *
 * The initial value is undefined - components must use the provider.
 * This pattern helps catch errors when context is used outside provider.
 */
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

/**
 * Provider Props
 */
interface TodoProviderProps {
  children: ReactNode;
}

/**
 * TodoProvider Component
 *
 * This component wraps the app and provides todo state to all children.
 * It handles:
 * - State management with useReducer
 * - Loading from localStorage on mount
 * - Saving to localStorage on changes
 */
export function TodoProvider({ children }: TodoProviderProps) {
  /**
   * Initialize state with useReducer
   *
   * I'm starting with an empty array.
   * The actual todos will be loaded from localStorage in useEffect.
   */
  const [todos, dispatch] = useReducer(todoReducer, []);

  /**
   * Effect: Load todos from localStorage on mount
   *
   * This runs once when the component mounts.
   * It checks localStorage and loads any saved todos.
   */
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        dispatch({ type: 'LOAD_TODOS', payload: parsedTodos });
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
    }
  }, []); // Empty dependency array = run once on mount

  /**
   * Effect: Save todos to localStorage whenever they change
   *
   * This runs whenever the todos array changes.
   * I'm saving the entire array as a JSON string.
   */
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todos]); // Re-run when todos change

  /**
   * Action Functions
   *
   * These wrap the dispatch calls in friendly function names.
   * Components call these instead of dispatching directly.
   */
  const addTodo = (text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text.trim() });
    }
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const editTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { id, newText: newText.trim() } });
    }
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  /**
   * Context Value
   *
   * This is what components will receive when they use the context.
   * I'm providing both state (todos) and actions.
   */
  const value: TodoContextValue = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

/**
 * Custom Hook: useTodoContext
 *
 * This hook makes it easy to consume the context.
 * It also includes error handling for when it's used outside the provider.
 *
 * Usage in components:
 * const { todos, addTodo, toggleTodo } = useTodoContext();
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTodoContext() {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
}
