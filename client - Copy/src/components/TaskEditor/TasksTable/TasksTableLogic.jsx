import { useState, useEffect } from 'react';
import TasksTableUI from './TasksTableUI';

function TasksTable({ tasks, selectedTasks, onSelectionChange }) {
  const [allSelected, setAllSelected] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    setAllSelected(tasks.length > 0 && selectedTasks.length === tasks.length);
  }, [tasks.length, selectedTasks.length]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setAllSelected(checked);
    if (checked) {
      onSelectionChange(tasks.map(task => task.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectTask = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      onSelectionChange(selectedTasks.filter(id => id !== taskId));
    } else {
      onSelectionChange([...selectedTasks, taskId]);
    }
  };

  const handleTaskAction = (action, taskId) => {
    switch (action) {
      case 'complete':
        console.log('Complete task:', taskId);
        break;
      case 'edit':
        window.location.href = `/tasks/edit/${taskId}`;
        break;
      case 'delete':
        console.log('Delete task:', taskId);
        break;
      default:
        break;
    }
  };

  const statusColors = {
    amber: 'bg-amber-500/20 text-amber-500',
    blue: 'bg-blue-500/20 text-blue-500',
    green: 'bg-green-500/20 text-green-500',
    red: 'bg-red-500/20 text-red-500',
  };

  return (
    <TasksTableUI
      tasks={tasks}
      selectedTasks={selectedTasks}
      allSelected={allSelected}
      hoveredRow={hoveredRow}
      statusColors={statusColors}
      onSelectAll={handleSelectAll}
      onSelectTask={handleSelectTask}
      onTaskAction={handleTaskAction}
      onRowHover={setHoveredRow}
    />
  );
}

export default TasksTable;