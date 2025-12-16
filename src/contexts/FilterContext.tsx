/**
 * FilterContext - Manages Todo Filter State
 *
 * This context provides filter state to control which todos are displayed.
 * It's simpler than TodoContext because it only manages a single value.
 *
 * Key learning points:
 * - Simple context with useState (no need for useReducer here)
 * - Type-safe filter values with TypeScript
 * - Clean custom hook pattern
 */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Filter Type
 *
 * I'm using a union type to restrict values to these three options.
 * This prevents typos and makes the code more maintainable.
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Context Value Interface
 */
interface FilterContextValue {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

/**
 * Create Context
 */
const FilterContext = createContext<FilterContextValue | undefined>(undefined);

/**
 * Provider Props
 */
interface FilterProviderProps {
  children: ReactNode;
}

/**
 * FilterProvider Component
 *
 * This is a simple provider that manages the current filter state.
 * No localStorage needed here - filter resets on page reload.
 */
export function FilterProvider({ children }: FilterProviderProps) {
  /**
   * State: Current filter
   *
   * I'm using useState because this is simple state with one value.
   * Starting with 'all' to show all todos by default.
   */
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * Context Value
   */
  const value: FilterContextValue = {
    filter,
    setFilter,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

/**
 * Custom Hook: useFilterContext
 *
 * Makes it easy to consume the filter context.
 *
 * Usage in components:
 * const { filter, setFilter } = useFilterContext();
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useFilterContext() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }

  return context;
}
