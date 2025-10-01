function TaskStatusDetailsUI({
  dueDate,
  priority,
  assignee,
  assignees,
  priorityOptions,
  currentAssignee,
  currentPriority,
  showAssigneeDropdown,
  dueDateStatus,
  onDueDateChange,
  onPriorityChange,
  onAssigneeSelect,
  onToggleAssigneeDropdown,
  onCloseAssigneeDropdown
}) {
  const getPriorityColorClasses = (color) => {
    const colors = {
      green: 'bg-green-500/20 text-green-500',
      amber: 'bg-amber-500/20 text-amber-500',
      red: 'bg-red-500/20 text-red-500',
      purple: 'bg-purple-500/20 text-purple-500',
    };
    return colors[color] || colors.amber;
  };

  const getStatusIndicator = (status) => {
    const indicators = {
      online: 'bg-green-500',
      offline: 'bg-gray-500',
      away: 'bg-amber-500',
    };
    return indicators[status] || 'bg-gray-500';
  };

  return (
    <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
      <h3 className="text-lg font-semibold mb-4">Status & Details</h3>
      <div className="space-y-4">
        {/* Due Date */}
        <div>
          <label
            className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2"
            htmlFor="due-date"
          >
            Due Date
          </label>
          <div className="relative">
            <input
              className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark pointer-events-none">
              calendar_today
            </span>
          </div>
          {dueDateStatus && (
            <p className={`text-xs mt-1 font-medium ${
              dueDateStatus.color === 'red' ? 'text-red-500' :
              dueDateStatus.color === 'amber' ? 'text-amber-500' :
              dueDateStatus.color === 'blue' ? 'text-blue-500' :
              'text-green-500'
            }`}>
              {dueDateStatus.text}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label
            className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2"
            htmlFor="priority"
          >
            Priority
          </label>
          <div className="relative">
            <select
              className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
              id="priority"
              value={priority}
              onChange={(e) => onPriorityChange(e.target.value)}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark pointer-events-none">
              expand_more
            </span>
          </div>
          {currentPriority && (
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getPriorityColorClasses(currentPriority.color)}`}>
                <span className="material-symbols-outlined text-xs">
                  {currentPriority.value === 'Urgent' ? 'priority_high' : 'flag'}
                </span>
                {currentPriority.label} Priority
              </span>
            </div>
          )}
        </div>

        {/* Assignee */}
        <div className="relative">
          <label
            className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2"
            htmlFor="assignee"
          >
            Assign to
          </label>
          <button
            onClick={onToggleAssigneeDropdown}
            className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {currentAssignee?.avatar ? (
                <div className="relative">
                  <div
                    className="h-6 w-6 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${currentAssignee.avatar}')` }}
                  />
                  {currentAssignee.status && (
                    <div className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-white ${getStatusIndicator(currentAssignee.status)}`} />
                  )}
                </div>
              ) : currentAssignee?.name !== 'Unassigned' ? (
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {currentAssignee?.name?.charAt(0)}
                  </span>
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-subtle-light/20 dark:bg-subtle-dark/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs text-subtle-light dark:text-subtle-dark">
                    person
                  </span>
                </div>
              )}
              <span>{currentAssignee?.name || 'Select assignee'}</span>
            </div>
            <span className="material-symbols-outlined text-subtle-light dark:text-subtle-dark">
              expand_more
            </span>
          </button>

          {/* Assignee Dropdown */}
          {showAssigneeDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={onCloseAssigneeDropdown}
              />
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {assignees.map((assigneeOption) => (
                  <button
                    key={assigneeOption.name}
                    onClick={() => onAssigneeSelect(assigneeOption)}
                    className="w-full px-3 py-2 text-left hover:bg-primary/10 transition-colors flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {assigneeOption.avatar ? (
                      <div className="relative">
                        <div
                          className="h-8 w-8 rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${assigneeOption.avatar}')` }}
                        />
                        {assigneeOption.status && (
                          <div className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white ${getStatusIndicator(assigneeOption.status)}`} />
                        )}
                      </div>
                    ) : assigneeOption.name !== 'Unassigned' ? (
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {assigneeOption.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-subtle-light/20 dark:bg-subtle-dark/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-subtle-light dark:text-subtle-dark">
                          person
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{assigneeOption.name}</p>
                      {assigneeOption.email && (
                        <p className="text-xs text-subtle-light dark:text-subtle-dark">{assigneeOption.email}</p>
                      )}
                    </div>
                    {assigneeOption.name === assignee && (
                      <span className="material-symbols-outlined text-primary text-sm">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskStatusDetailsUI;