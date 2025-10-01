import Navbar from '../../components/TasksDisplay/Navbar/NavbarLogic';
import SearchBar from '../../components/common/SearchBar/SearchBarLogic';
import Button from '../../components/common/Button';
import TasksTable from '../../components/TasksDisplay/TasksTable/TasksTableLogic';
import FilterModal from '../../components/TasksDisplay/FilterModal/FilterModalLogic';
import SortModal from '../../components/TasksDisplay/SortModal/SortModalLogic';
import MobileSearch from '../../components/TasksDisplay/MobileSearch/MobileSearchLogic';

function TasksDisplayUI({
  searchQuery,
  setSearchQuery,
  selectedTasks,
  setSelectedTasks,
  showFilter,
  setShowFilter,
  showSort,
  setShowSort,
  showMobileSearch,
  setShowMobileSearch,
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
      <Navbar onSearchClick={() => setShowMobileSearch(true)} />
      
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
            <div className="hidden sm:block w-full sm:max-w-xs">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search tasks..."
              />
            </div>
            
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
          
          {selectedTasks.length > 0 && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg p-4 flex items-center gap-4 border border-border-light dark:border-border-dark">
              <span className="text-sm font-medium">
                {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
              </span>
              <button 
                onClick={onMarkComplete}
                className="text-sm font-medium text-primary hover:underline"
              >
                Mark as Complete
              </button>
              <button 
                onClick={onDeleteSelected}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
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
      
      <MobileSearch 
        isOpen={showMobileSearch}
        onClose={() => setShowMobileSearch(false)}
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}

export default TasksDisplayUI;