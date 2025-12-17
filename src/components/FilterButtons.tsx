/**
 * FilterButtons Component
 *
 * Displays filter buttons to switch between viewing modes.
 * This component demonstrates consuming FilterContext.
 *
 * Features:
 * - Three filter options: All, Active, Completed
 * - Visual indication of active filter
 */

import { useFilterContext } from '../contexts/FilterContext';
import type { FilterType } from '../contexts/FilterContext';
import './FilterButtons.css';

function FilterButtons() {
  /**
   * Context: Get filter state and setter
   */
  const { filter, setFilter } = useFilterContext();

  /**
   * Filter Options
   *
   * I'm defining these in an array to make it easy to map over them.
   */
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`filter-button ${filter === value ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
