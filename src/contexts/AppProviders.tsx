/**
 * AppProviders - Wrapper Component for All Context Providers
 *
 * This component wraps all context providers in one place.
 * This keeps the main App.tsx clean and makes it easy to see
 * all the contexts being used in the application.
 *
 * Key learning points:
 * - Provider composition pattern
 * - Clean separation of concerns
 * - Single place to manage all providers
 */

import type { ReactNode } from 'react';
import { TodoProvider } from './TodoContext';
import { FilterProvider } from './FilterContext';
import { ThemeProvider } from './ThemeContext';

/**
 * Props Interface
 */
interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders Component
 *
 * Wraps the application with all necessary providers.
 * The order matters - components can only access contexts
 * from providers above them in the tree.
 *
 * I'm wrapping in this order:
 * 1. ThemeProvider - outermost (theme applies to everything)
 * 2. TodoProvider - middle (manages todo data)
 * 3. FilterProvider - innermost (depends on todo data)
 *
 * Though in this case, the order doesn't matter much since
 * the contexts are independent. But it's good practice to
 * put the most "global" context (theme) on the outside.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}
