import Button from '../../components/common/Button';
import TasksTable from '../../components/TasksDisplay/TasksTable/TasksTableLogic';
import FilterModal from '../../components/TasksDisplay/FilterModal/FilterModalLogic';
import SortModal from '../../components/TasksDisplay/SortModal/SortModalLogic';
import SearchBar from '../../components/common/SearchBar/DesktopSearchLogic'; // ✅
import { Link } from 'react-router-dom';

function TasksDisplayUI({
// Data to display
  filteredAndSortedTasks, // (data) The computed list of tasks to pass to the TasksTable.

  // UI State & Setters
  selectedTasks,          // (state) The list of selected task IDs, passed to TasksTable.
  setSelectedTasks,       // (setter) The handler to update selections, passed to TasksTable.
  showFilter,             // (state) Controls the visibility of the FilterModal.
  setShowFilter,          // (setter) Used by the Filter button and Modal to toggle visibility.
  showSort,               // (state) Controls the visibility of the SortModal.
  setShowSort,            // (setter) Used by the Sort button and Modal to toggle visibility.
  
  // Filter & Sort State
  filters,                // (state) The current filter values, passed to FilterModal.
  setFilters,             // (setter) The update handler for filters, passed to FilterModal.
  sortBy,                 // (state) The current sort values, passed to SortModal.
  setSortBy,              // (setter) The update handler for sorting, passed to SortModal.

  // Additional props (as implied by usage in original code)
  activeFilterCount,      // (data) A derived number to display on the filter button badge.
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

            <Link to="/taskEditor">
              <Button variant="primary" icon="add_task" >
                New Task
              </Button>
            </Link>
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
            tasks={filteredAndSortedTasks} // (data) The list of tasks the table should render.
            selectedTasks={selectedTasks}    // (state) Which rows should be marked as selected.
            onSelectionChange={setSelectedTasks} // (setter) The callback for when the user changes selections.
          />
        </div>
      </main>

      {/* Modals */}
      <FilterModal
        isOpen={showFilter}            // (state) Determines if the modal is visible.
        onClose={() => setShowFilter(false)} // (handler) A function to close the modal.
        filters={filters}              // (state) The current filter values to populate the modal's form.
        onChange={setFilters}          // (setter) The function the modal calls to update the filters.
      />

      <SortModal
        isOpen={showSort}              // (state) Determines if the modal is visible.
        onClose={() => setShowSort(false)}   // (handler) A function to close the modal.
        sortBy={sortBy}                // (state) The current sort values to populate the modal's form.
        onChange={setSortBy}           // (setter) The function the modal calls to update the sort order.
      />
    </div>
  );
}

export default TasksDisplayUI;
