import Button from "../../components/common/Button";
import Attachments from "../../components/TaskEditor/Attachments/AttachmentsLogic";
import ProgressBar from "../../components/TaskEditor/ProgressBar/ProgressBarLogic";
import Subtasks from "../../components/TaskEditor/Subtasks/SubtasksLogic";
import TaskStatusDetails from "../../components/TaskEditor/TaskStatusDetails/TaskStatusDetailsLogic";

function TaskEditorUI({
  isEditing,
  taskData,
  isSaving,
  hasUnsavedChanges,
  progress,
  completedSubtasks,
  totalSubtasks,
  onSave,
  onCancel,
  onUpdateTaskData,
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <button
                className="inline-flex items-center gap-2 text-sm text-subtle-light dark:text-subtle-dark hover:text-primary mb-2 transition-colors"
                onClick={onCancel}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Tasks
              </button>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold">
                  {isEditing ? "Edit Task" : "Create Task"}
                </h2>
                {hasUnsavedChanges && (
                  <span className="text-xs text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon="save"
                onClick={onSave}
                loading={isSaving}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Task"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Name */}
              <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
                <label
                  className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2"
                  htmlFor="task-name"
                >
                  Task Name *
                </label>
                <input
                  className="w-full h-12 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 text-lg font-semibold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  id="task-name"
                  placeholder="Enter task name..."
                  type="text"
                  value={taskData.name}
                  onChange={(e) => onUpdateTaskData("name", e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
                <label
                  className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2"
                  htmlFor="task-description"
                >
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-vertical"
                  id="task-description"
                  placeholder="Add a detailed description..."
                  rows="6"
                  value={taskData.description}
                  onChange={(e) =>
                    onUpdateTaskData("description", e.target.value)
                  }
                />
              </div>

              {/* Subtasks */}
              <Subtasks
                subtasks={taskData.subtasks}
                onChange={(subtasks) => onUpdateTaskData("subtasks", subtasks)}
              />

              {/* Attachments */}
              <Attachments
                attachments={taskData.attachments}
                onChange={(attachments) =>
                  onUpdateTaskData("attachments", attachments)
                }
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Details */}
              <TaskStatusDetails
                dueDate={taskData.dueDate}
                priority={taskData.priority}
                assignee={taskData.assignee}
                onDueDateChange={(date) => onUpdateTaskData("dueDate", date)}
                onPriorityChange={(priority) =>
                  onUpdateTaskData("priority", priority)
                }
                onAssigneeChange={(assignee) =>
                  onUpdateTaskData("assignee", assignee)
                }
              />

              {/* Progress */}
              <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-semibold mb-4">Progress</h3>
                <ProgressBar progress={progress} />
                <p className="text-sm text-center text-subtle-light dark:text-subtle-dark mt-2">
                  {Math.round(progress)}% Complete ({completedSubtasks} of{" "}
                  {totalSubtasks} subtasks)
                </p>
                <div className="mt-4">
                  <label
                    className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2"
                    htmlFor="completion-status"
                  >
                    Completion Status
                  </label>
                  <select
                    className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    id="completion-status"
                    value={taskData.status}
                    onChange={(e) => onUpdateTaskData("status", e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="flex w-full items-center gap-3 p-2 text-sm font-medium text-subtle-light dark:text-subtle-dark hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-base">
                      content_copy
                    </span>
                    Duplicate Task
                  </button>
                  <button className="flex w-full items-center gap-3 p-2 text-sm font-medium text-subtle-light dark:text-subtle-dark hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-base">
                      share
                    </span>
                    Share Task
                  </button>
                  {isEditing && (
                    <button className="flex w-full items-center gap-3 p-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base">
                        delete
                      </span>
                      Delete Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskEditorUI;
