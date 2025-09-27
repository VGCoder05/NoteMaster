import { useState } from 'react';
import TaskRowUI from './TaskRowUI';

function TaskRowComponent({
  task,
  isSelected,
  isHovered,
  statusColors,
  onSelect,
  onAction,
  onMouseEnter,
  onMouseLeave
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAction = (action) => {
    if (action === 'delete') {
      if (showDeleteConfirm) {
        onAction(action);
        setShowDeleteConfirm(false);
      } else {
        setShowDeleteConfirm(true);
        // Auto-hide after 3 seconds
        setTimeout(() => setShowDeleteConfirm(false), 3000);
      }
    } else {
      onAction(action);
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
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
      showDeleteConfirm={showDeleteConfirm}
      statusColors={statusColors}
      formattedDueDate={formatDueDate(task.dueDate)}
      onSelect={onSelect}
      onAction={handleAction}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default TaskRowComponent;