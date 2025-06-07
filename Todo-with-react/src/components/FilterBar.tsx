import { Search, Filter } from 'lucide-react';
import { FILTER_TYPES } from '../utils/todoUtils';

// FilterBar component
const FilterBar = ({ activeFilter, onFilterChange, searchTerm, onSearchChange, todoCounts }) => {
  const filters = [
    { key: FILTER_TYPES.ALL, label: 'All', count: todoCounts.total },
    { key: FILTER_TYPES.ACTIVE, label: 'Active', count: todoCounts.active },
    { key: FILTER_TYPES.COMPLETED, label: 'Completed', count: todoCounts.completed }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Filter size={16} />
            {filter.label}
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeFilter === filter.key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
 