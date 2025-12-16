/**
 * ThemeContext - Manages Theme State (Light/Dark Mode)
 *
 * This context provides theme state and a toggle function.
 * The theme is persisted to localStorage so it persists across sessions.
 *
 * Key learning points:
 * - Simple context with useState
 * - localStorage persistence for user preferences
 * - Type-safe theme values
 */

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * Theme Type
 *
 * Only two valid values: 'light' or 'dark'
 */
export type ThemeType = 'light' | 'dark';

/**
 * Context Value Interface
 */
interface ThemeContextValue {
  theme: ThemeType;
  toggleTheme: () => void;
}

/**
 * Create Context
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider Component
 *
 * Manages theme state with localStorage persistence.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  /**
   * State: Current theme
   *
   * I'm using lazy initialization to load from localStorage.
   * This prevents the flash of wrong theme on page load.
   */
  const [theme, setTheme] = useState<ThemeType>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
    // Default to light theme
    return 'light';
  });

  /**
   * Effect: Save theme to localStorage whenever it changes
   *
   * I'm also applying the theme to the document root element
   * so CSS can use it with a data attribute.
   */
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
      // Apply theme to document root for CSS styling
      document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }, [theme]);

  /**
   * Toggle Theme Function
   *
   * Switches between light and dark themes.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Context Value
   */
  const value: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom Hook: useThemeContext
 *
 * Makes it easy to consume the theme context.
 *
 * Usage in components:
 * const { theme, toggleTheme } = useThemeContext();
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
