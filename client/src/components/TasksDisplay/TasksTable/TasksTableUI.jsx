import TaskRow from '../TaskRow/TaskRowLogic';

function TasksTableUI({
  tasks,
  selectedTasks,
  allSelected,
  hoveredRow,
  statusColors,
  onSelectAll,
  onSelectTask,
  onTaskComplete,
  onTaskEdit,
  onTaskDelete,
  onRowHover
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#eaeaea] dark:bg-[#615e5e] [&>th]px-6 [&>th]py-4 border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="font-medium">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  aria-label="Select all tasks"
                />
              </th>
              <th className="font-medium">Task Name</th>
              <th className="hidden font-medium sm:table-cell">Status</th>
              <th className="hidden font-medium md:table-cell">Priority</th>
              <th className="hidden font-medium lg:table-cell">Due Date</th>
              <th className="font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                isSelected={selectedTasks.includes(task.id)}
                isHovered={hoveredRow === task.id}
                statusColors={statusColors}
                onSelect={() => onSelectTask(task.id)}
                onComplete={() => onTaskComplete(task.id)}
                onEdit={() => onTaskEdit(task.id)}
                onDelete={() => onTaskDelete(task.id)}
                onMouseEnter={() => onRowHover(task.id)}
                onMouseLeave={() => onRowHover(null)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-4xl text-subtle-light dark:text-subtle-dark mb-4 block">
            task_alt
          </span>
          <p className="text-subtle-light dark:text-subtle-dark">
            No tasks found. Create your first task to get started.
          </p>
        </div>
      )}
    </div>
  );
}

export default TasksTableUI;