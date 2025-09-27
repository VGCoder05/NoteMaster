function TaskRowUI({
  task,
  isSelected,
  isHovered,
  isOverdue,
  showConfirmDelete,
  statusColors,
  formattedDate,
  onSelect,
  onComplete,
  onEdit,
  onDelete,
  onMouseEnter,
  onMouseLeave
}) {
  return (
    <tr
      className={`border-b border-border-light dark:border-border-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors ${
        task.completed ? 'opacity-60' : ''
      } ${isSelected ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <td className="px-6 py-4">
        <input
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          aria-label={`Select ${task.name}`}
        />
      </td>
      
      <td className={`px-6 py-4 font-medium ${task.completed ? 'line-through' : ''}`}>
        <div className="flex items-center gap-2">
          {task.completed && (
            <span className="material-symbols-outlined text-green-500 text-sm">
              check_circle
            </span>
          )}
          <span>{task.name}</span>
          {isOverdue && (
            <span className="material-symbols-outlined text-red-500 text-sm" title="Overdue">
              warning
            </span>
          )}
        </div>
      </td>
      
      <td className="hidden px-6 py-4 sm:table-cell">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[task.statusColor]}`}>
          {task.status}
        </span>
      </td>
      
      <td className="hidden px-6 py-4 md:table-cell">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[task.priorityColor]}`}>
          {task.priority}
        </span>
      </td>
      
      <td className={`hidden px-6 py-4 lg:table-cell ${isOverdue ? 'text-red-500' : 'text-subtle-light dark:text-subtle-dark'}`}>
        {formattedDate}
      </td>
      
      <td className="px-6 py-4 text-right">
        <div className={`flex justify-end gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
          {!task.completed && (
            <button 
              onClick={onComplete}
              className="p-1 hover:text-green-500 transition-colors"
              aria-label="Mark task as complete"
              title="Mark as complete"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
            </button>
          )}
          
          <button 
            onClick={onEdit}
            className="p-1 hover:text-primary transition-colors"
            aria-label="Edit task"
            title="Edit task"
          >
            <span className="material-symbols-outlined text-base">edit</span>
          </button>
          
          <button 
            onClick={onDelete}
            className={`p-1 transition-colors ${showConfirmDelete ? 'text-red-500 bg-red-500/10 rounded' : 'hover:text-red-500'}`}
            aria-label="Delete task"
            title={showConfirmDelete ? "Click again to confirm" : "Delete task"}
          >
            <span className="material-symbols-outlined text-base">
              {showConfirmDelete ? 'delete_forever' : 'delete'}
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TaskRowUI;