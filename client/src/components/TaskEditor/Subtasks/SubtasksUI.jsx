function SubtasksUI({
  subtasks,
  newSubtask,
  editingId,
  completionStats,
  onNewSubtaskChange,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask,
  onStartEditing,
  onKeyPress
}) {
  return (
    <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Subtasks</h3>
        {subtasks.length > 0 && (
          <span className="text-sm text-subtle-light dark:text-subtle-dark">
            {completionStats.completed} of {completionStats.total} completed
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-3 group">
            <input
              checked={subtask.completed}
              onChange={() => onToggleSubtask(subtask.id)}
              className="h-5 w-5 rounded text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer border-subtle-light/50 dark:border-subtle-dark/50 bg-background-light dark:bg-surface-dark"
              type="checkbox"
            />
            
            {editingId === subtask.id ? (
              <input
                autoFocus
                defaultValue={subtask.text}
                onBlur={(e) => onEditSubtask(subtask.id, e.target.value)}
                onKeyPress={(e) => onKeyPress(e, onEditSubtask, subtask.id, e.target.value)}
                className="flex-1 bg-transparent border-0 border-b border-primary focus:ring-0 focus:border-primary text-sm"
              />
            ) : (
              <span
                onClick={() => onStartEditing(subtask.id)}
                className={`flex-1 cursor-pointer text-sm ${
                  subtask.completed 
                    ? 'line-through text-subtle-light dark:text-subtle-dark' 
                    : ''
                }`}
              >
                {subtask.text}
              </span>
            )}
            
            <button
              onClick={() => onDeleteSubtask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 text-subtle-light dark:text-subtle-dark hover:text-red-500 transition-all"
              aria-label="Delete subtask"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        ))}

        {/* Add new subtask */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border-light dark:border-border-dark">
          <div className="h-5 w-5 rounded border-2 border-dashed border-subtle-light/50 dark:border-subtle-dark/50" />
          <input
            className="flex-1 bg-transparent border-0 border-b border-border-light dark:border-border-dark focus:ring-0 focus:border-primary placeholder-subtle-light dark:placeholder-subtle-dark text-sm"
            placeholder="Add new subtask..."
            type="text"
            value={newSubtask}
            onChange={(e) => onNewSubtaskChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e, onAddSubtask)}
          />
        </div>

        <button
          onClick={onAddSubtask}
          disabled={!newSubtask.trim()}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Subtask
        </button>
      </div>
    </div>
  );
}

export default SubtasksUI;