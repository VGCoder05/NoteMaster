import Button from "../../common/Button";

function SortModalUI({
  tempSortBy,
  sortOptions,
  onSortChange,
  onApply,
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
      <div className="relative bg-surface-light dark:bg-surface-dark rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Sort Tasks</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-3">
              Sort By
            </label>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.field} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sortField"
                    value={option.field}
                    checked={tempSortBy.field === option.field}
                    onChange={(e) => onSortChange('field', e.target.value)}
                    className="mr-3 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-3">
              Order
            </label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sortDirection"
                  value="asc"
                  checked={tempSortBy.direction === 'asc'}
                  onChange={(e) => onSortChange('direction', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  Ascending
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sortDirection"
                  value="desc"
                  checked={tempSortBy.direction === 'desc'}
                  onChange={(e) => onSortChange('direction', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">arrow_downward</span>
                  Descending
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onApply}>
            Apply Sort
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SortModalUI;