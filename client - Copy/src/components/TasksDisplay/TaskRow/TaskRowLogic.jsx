import { useState } from 'react';
import TaskRowUI from './TaskRowUI';

function TaskRow({
  task,
  isSelected,
  isHovered,
  statusColors,
  onSelect,
  onComplete,
  onEdit,
  onDelete,
  onMouseEnter,
  onMouseLeave
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleComplete = (e) => {
    e.stopPropagation();
    onComplete();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (showConfirmDelete) {
      onDelete();
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowConfirmDelete(false), 3000);
    }
  };

  const handleSelect = (e) => {
    onSelect();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays <= 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString();
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && !task.completed;
  };

  return (
    <TaskRowUI
      task={task}
      isSelected={isSelected}
      isHovered={isHovered}
      isOverdue={isOverdue()}
      showConfirmDelete={showConfirmDelete}
      statusColors={statusColors}
      formattedDate={formatDate(task.dueDate)}
      onSelect={handleSelect}
      onComplete={handleComplete}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default TaskRow;