import Button from "../../common/Button";

function FilterModalUI({
  tempFilters,
  statusOptions,
  priorityOptions,
  activeFilterCount,
  onFilterChange,
  onApply,
  onClearAll,
  onCancel,
  onClose
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface-light dark:bg-surface-dark rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Filter Tasks</h3>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-3">
              Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label key={status.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={tempFilters.status === status.value}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className="mr-3 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{status.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-3">
              Priority
            </label>
            <div className="space-y-2">
              {priorityOptions.map((priority) => (
                <label key={priority.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={priority.value}
                    checked={tempFilters.priority === priority.value}
                    onChange={(e) => onFilterChange('priority', e.target.value)}
                    className="mr-3 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{priority.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between gap-2 mt-6">
          <Button variant="ghost" onClick={onClearAll}>
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModalUI;