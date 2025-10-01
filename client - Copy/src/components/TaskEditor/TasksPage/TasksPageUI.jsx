import SearchBar from '../../common/SearchBar/DesktopSearchLogic';
import Button from "../../common/Button";
import TasksTable from '../TasksTable/TasksTableLogic';
import TaskFilters from '../TaskFilters/TaskFiltersLogic';
import { Link } from 'react-router-dom';

function TasksPageUI({
  searchQuery,
  setSearchQuery,
  selectedTasks,
  setSelectedTasks,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  filteredTasks,
  activeFilterCount,
  onNewTask,
  onBulkComplete,
  onBulkDelete
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold">
              All Tasks
              <span className="ml-2 text-lg text-subtle-light dark:text-subtle-dark">
                ({filteredTasks.length})
              </span>
            </h2>
            
            <Link to="/taskEditor">
              <Button variant="primary" icon="add_task" onClick={onNewTask}>
                New Task
              </Button>
            </Link>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-xs">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search tasks..."
              />
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <Button 
                variant="secondary" 
                icon="filter_list"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary text-white text-xs px-1.5 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <Button variant="secondary" icon="sort">
                Sort
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <TaskFilters
              filters={filters}
              onChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          )}

          <TasksTable 
            tasks={filteredTasks}
            selectedTasks={selectedTasks}
            onSelectionChange={setSelectedTasks}
          />

          {/* Bulk Actions Bar */}
          {selectedTasks.length > 0 && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg p-4 flex items-center gap-4 border border-border-light dark:border-border-dark">
              <span className="text-sm font-medium">
                {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
              </span>
              <button 
                onClick={onBulkComplete}
                className="text-sm font-medium text-green-500 hover:underline"
              >
                Mark Complete
              </button>
              <button 
                onClick={onBulkDelete}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TasksPageUI;