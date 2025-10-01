import { useState } from 'react';
import TaskFiltersUI from './TaskFiltersUI';

function TaskFilters({ filters, onChange, onClose }) {
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

  const handleClear = () => {
    const clearedFilters = { status: 'all', priority: 'all' };
    setTempFilters(clearedFilters);
    onChange(clearedFilters);
  };

  const getActiveCount = () => {
    return Object.values(tempFilters).filter(v => v !== 'all').length;
  };

  return (
    <TaskFiltersUI
      tempFilters={tempFilters}
      statusOptions={statusOptions}
      priorityOptions={priorityOptions}
      activeCount={getActiveCount()}
      onFilterChange={handleFilterChange}
      onApply={handleApply}
      onClear={handleClear}
      onClose={onClose}
    />
  );
}

export default TaskFilters;