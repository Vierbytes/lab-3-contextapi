/**
 * ThemeToggleButton Component
 *
 * A button to toggle between light and dark themes.
 * This component demonstrates consuming ThemeContext.
 *
 * Features:
 * - Toggle theme with visual icon
 * - Shows current theme
 */

import { FaMoon, FaSun } from 'react-icons/fa';
import { useThemeContext } from '../contexts/ThemeContext';
import './ThemeToggleButton.css';

function ThemeToggleButton() {
  /**
   * Context: Get theme state and toggle function
   */
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Current theme: ${theme}`}
    >
      {theme === 'light' ? <FaMoon className="theme-icon" /> : <FaSun className="theme-icon" />}
      <span className="theme-text">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  );
}

export default ThemeToggleButton;
