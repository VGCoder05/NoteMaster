import Button from '../../components/common/Button';
import TasksTable from '../../components/TasksDisplay/TasksTable/TasksTableLogic';
import FilterModal from '../../components/TasksDisplay/FilterModal/FilterModalLogic';
import SortModal from '../../components/TasksDisplay/SortModal/SortModalLogic';
import SearchBar from '../../components/common/SearchBar/DesktopSearchLogic'; // ✅

function TasksDisplayUI({
  selectedTasks,
  setSelectedTasks,
  showFilter,
  setShowFilter,
  showSort,
  setShowSort,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  filteredAndSortedTasks,
  onNewTask,
  onMarkComplete,
  onDeleteSelected,
  activeFilterCount
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold">
              All Tasks
              <span className="ml-2 text-lg text-subtle-light dark:text-subtle-dark">
                ({filteredAndSortedTasks.length})
              </span>
            </h2>
            <Button variant="primary" icon="add_task" onClick={onNewTask}>
              New Task
            </Button>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar />

            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                icon="filter_list"
                onClick={() => setShowFilter(true)}
              >
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary text-white text-xs px-1.5 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <Button 
                variant="secondary" 
                icon="sort"
                onClick={() => setShowSort(true)}
              >
                Sort
              </Button>
            </div>
          </div>

          <TasksTable 
            tasks={filteredAndSortedTasks}
            selectedTasks={selectedTasks}
            onSelectionChange={setSelectedTasks}
          />
        </div>
      </main>

      {/* Modals */}
      <FilterModal 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        onChange={setFilters}
      />
      
      <SortModal 
        isOpen={showSort}
        onClose={() => setShowSort(false)}
        sortBy={sortBy}
        onChange={setSortBy}
      />
    </div>
  );
}

export default TasksDisplayUI;
