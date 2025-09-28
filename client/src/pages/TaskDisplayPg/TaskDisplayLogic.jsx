import { useState, useMemo } from "react";
import TasksPageUI from "./TaskDisplayUI";
import { useSearch } from "../../context/SearchContext";

function TasksPage() {
  const { searchQuery } = useSearch(); // ✅ comes from context
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // Filter and sort states
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    dateRange: "all",
  });

  const [sortBy, setSortBy] = useState({
    field: "dueDate",
    direction: "asc",
  });

  const [tasks] = useState([
    { id: 1, name: "Finalize Q1 Report", status: "In Progress", priority: "High", dueDate: "2024-04-15", completed: false },
    { id: 2, name: "Design new landing page", status: "Not Started", priority: "High", dueDate: "2024-04-20", completed: false },
    { id: 3, name: "Onboard new marketing intern", status: "Completed", priority: "Medium", dueDate: "2024-04-10", completed: true },
    { id: 4, name: "Research competitors", status: "In Progress", priority: "Low", dueDate: "2024-05-01", completed: false },
  ]);

  // Filter + sort
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery) {
      result = result.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.priority !== "all") {
      result = result.filter((task) => task.priority === filters.priority);
    }

    result.sort((a, b) => {
      let aValue = a[sortBy.field];
      let bValue = b[sortBy.field];
      if (sortBy.field === "dueDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      return sortBy.direction === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    return result;
  }, [tasks, searchQuery, filters, sortBy]);

  return (
    <TasksPageUI
      // Data to be rendered
      filteredAndSortedTasks={filteredAndSortedTasks} // (data) The final, processed array of tasks to display.

      // UI state for modals and selections
      selectedTasks={selectedTasks}       // (state) An array of IDs for the currently selected tasks.
      showFilter={showFilter}             // (state) A boolean to control the visibility of the FilterModal.
      showSort={showSort}                 // (state) A boolean to control the visibility of the SortModal.

      // State setters to allow child components to modify state
      setSelectedTasks={setSelectedTasks} // (setter) The function to update the list of selected tasks.
      setShowFilter={setShowFilter}       // (setter) The function to open or close the FilterModal.
      setShowSort={setShowSort}           // (setter) The function to open or close the SortModal.

      // Filter and sort state objects and their setters
      filters={filters}                   // (state) The current filter criteria object.
      setFilters={setFilters}             // (setter) The function to update the filter criteria.
      sortBy={sortBy}                     // (state) The current sort criteria object.
      setSortBy={setSortBy}               // (setter) The function to update the sort criteria.
    />
  );
}

export default TasksPage;
