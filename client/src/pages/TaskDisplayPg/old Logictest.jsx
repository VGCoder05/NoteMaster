import { useState, useMemo } from 'react';
import TasksPageUI from './TaskDisplayUI';

function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  // Filter and sort states
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: 'all'
  });
  
  const [sortBy, setSortBy] = useState({
    field: 'dueDate',
    direction: 'asc'
  });
  
  // Sample tasks data
  const [tasks] = useState([
    {
      id: 1,
      name: 'Finalize Q1 Report',
      status: 'In Progress',
      statusColor: 'amber',
      priority: 'High',
      priorityColor: 'red',
      dueDate: '2024-04-15',
      completed: false,
    },
    {
      id: 2,
      name: 'Design new landing page',
      status: 'Not Started',
      statusColor: 'blue',
      priority: 'High',
      priorityColor: 'red',
      dueDate: '2024-04-20',
      completed: false,
    },
    {
      id: 3,
      name: 'Onboard new marketing intern',
      status: 'Completed',
      statusColor: 'green',
      priority: 'Medium',
      priorityColor: 'amber',
      dueDate: '2024-04-10',
      completed: true,
    },
    {
      id: 4,
      name: 'Research competitors',
      status: 'In Progress',
      statusColor: 'amber',
      priority: 'Low',
      priorityColor: 'green',
      dueDate: '2024-05-01',
      completed: false,
    },
  ]);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(task => 
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(task => task.status === filters.status);
    }
    
    // Apply priority filter
    if (filters.priority !== 'all') {
      result = result.filter(task => task.priority === filters.priority);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortBy.field];
      let bValue = b[sortBy.field];
      
      if (sortBy.field === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortBy.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return result;
  }, [tasks, searchQuery, filters, sortBy]);

  const handleNewTask = () => {
    window.location.href = '/tasks/new';
  };

  const handleMarkComplete = () => {
    console.log('Mark selected tasks as complete:', selectedTasks);
    setSelectedTasks([]);
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected tasks:', selectedTasks);
    setSelectedTasks([]);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(v => v !== 'all').length;
  };

  return (
    <TasksPageUI
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedTasks={selectedTasks}
      setSelectedTasks={setSelectedTasks}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      showSort={showSort}
      setShowSort={setShowSort}
      showMobileSearch={showMobileSearch}
      setShowMobileSearch={setShowMobileSearch}
      filters={filters}
      setFilters={setFilters}
      sortBy={sortBy}
      setSortBy={setSortBy}
      filteredAndSortedTasks={filteredAndSortedTasks}
      onNewTask={handleNewTask}
      onMarkComplete={handleMarkComplete}
      onDeleteSelected={handleDeleteSelected}
      activeFilterCount={getActiveFilterCount()}
    />
  );
}

export default TasksPage;