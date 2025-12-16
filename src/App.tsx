/**
 * App Component - Main Todo Application
 *
 * This is the root component that ties everything together.
 * All components can access the contexts because they're wrapped
 * by AppProviders in main.tsx.
 *
 * Layout:
 * - Header with theme toggle
 * - Todo input
 * - Filter buttons
 * - Todo list
 */

import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterButtons from './components/FilterButtons'
import ThemeToggleButton from './components/ThemeToggleButton'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>Todo App</h1>
        <ThemeToggleButton />
      </header>

      {/* Main Content */}
      <main className="app-main">
        <TodoInput />
        <FilterButtons />
        <TodoList />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Lab 3 - Context API Implementation</p>
        <p className="hint">Double-click a todo to edit it</p>
      </footer>
    </div>
  )
}

export default App
