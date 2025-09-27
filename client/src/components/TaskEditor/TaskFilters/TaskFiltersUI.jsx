import Button from "../../common/Button";


function TaskFiltersUI({
  tempFilters,
  statusOptions,
  priorityOptions,
  activeCount,
  onFilterChange,
  onApply,
  onClear,
  onClose
}) {
  return (
    <div className="mb-6 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
              {activeCount} active
            </span>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary/10 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2">
            Status
          </label>
          <select
            value={tempFilters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2">
            Priority
          </label>
          <select
            value={tempFilters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onClear}>
          Clear All
        </Button>
        <Button variant="primary" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default TaskFiltersUI;