import { useState } from 'react';
import FilterModalUI from './FilterModalUI';

function FilterModal({ isOpen, onClose, filters, onChange }) {
  const [tempFilters, setTempFilters] = useState(filters);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Not Started', label: 'Not Started' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' },
  ];

  const handleFilterChange = (field, value) => {
    setTempFilters({ ...tempFilters, [field]: value });
  };

  const handleApply = () => {
    onChange(tempFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = { status: 'all', priority: 'all', dateRange: 'all' };
    setTempFilters(clearedFilters);
    onChange(clearedFilters);
  };

  const handleCancel = () => {
    setTempFilters(filters); // Reset to original filters
    onClose();
  };

  const getActiveFilterCount = () => {
    return Object.values(tempFilters).filter(v => v !== 'all').length;
  };

  if (!isOpen) return null;

  return (
    <FilterModalUI
      tempFilters={tempFilters}
      statusOptions={statusOptions}
      priorityOptions={priorityOptions}
      activeFilterCount={getActiveFilterCount()}
      onFilterChange={handleFilterChange}
      onApply={handleApply}
      onClearAll={handleClearAll}
      onCancel={handleCancel}
      onClose={onClose}
    />
  );
}

export default FilterModal;