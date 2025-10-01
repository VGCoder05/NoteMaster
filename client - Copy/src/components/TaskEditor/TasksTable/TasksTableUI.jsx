import TaskRow from "../TaskRow/TaskRowLogic";

function TasksTableUI({
  tasks,
  selectedTasks,
  allSelected,
  hoveredRow,
  statusColors,
  onSelectAll,
  onSelectTask,
  onTaskAction,
  onRowHover
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#eaeaea] dark:bg-[#615e5e] border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-3 md:px-6 py-4 font-medium">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  aria-label="Select all tasks"
                />
              </th>
              <th className="px-3 md:px-6 py-4 font-medium">Task Name</th>
              <th className="hidden px-3 md:px-6 py-4 font-medium sm:table-cell">Status</th>
              <th className="hidden px-3 md:px-6 py-4 font-medium md:table-cell">Priority</th>
              <th className="hidden px-3 md:px-6 py-4 font-medium lg:table-cell">Due Date</th>
              <th className="px-3 md:px-6 py-4 font-medium text-right">Actions</th>
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
                onAction={(action) => onTaskAction(action, task.id)}
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