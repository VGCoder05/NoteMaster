import { useState } from 'react';
import SortModalUI from './SortModalUI';

function SortModal({ isOpen, onClose, sortBy, onChange }) {
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  const sortOptions = [
    { field: 'name', label: 'Task Name' },
    { field: 'dueDate', label: 'Due Date' },
    { field: 'priority', label: 'Priority' },
    { field: 'status', label: 'Status' },
  ];

  const handleSortChange = (field, value) => {
    setTempSortBy({ ...tempSortBy, [field]: value });
  };

  const handleApply = () => {
    onChange(tempSortBy);
    onClose();
  };

  const handleCancel = () => {
    setTempSortBy(sortBy); // Reset to original sort
    onClose();
  };

  if (!isOpen) return null;

  return (
    <SortModalUI
      tempSortBy={tempSortBy}
      sortOptions={sortOptions}
      onSortChange={handleSortChange}
      onApply={handleApply}
      onCancel={handleCancel}
      onClose={onClose}
    />
  );
}

export default SortModal;