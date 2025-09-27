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
      selectedTasks={selectedTasks}
      setSelectedTasks={setSelectedTasks}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      showSort={showSort}
      setShowSort={setShowSort}
      filters={filters}
      setFilters={setFilters}
      sortBy={sortBy}
      setSortBy={setSortBy}
      filteredAndSortedTasks={filteredAndSortedTasks}
    />
  );
}

export default TasksPage;
