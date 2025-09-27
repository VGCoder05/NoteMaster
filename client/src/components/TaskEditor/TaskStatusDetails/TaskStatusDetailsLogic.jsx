import { useState } from 'react';
import TaskStatusDetailsUI from './TaskStatusDetailsUI';

function TaskStatusDetails({ 
  dueDate, 
  priority, 
  assignee, 
  onDueDateChange, 
  onPriorityChange, 
  onAssigneeChange 
}) {
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  const assignees = [
    { 
      name: 'Amelia', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8VLSYzimlLuNIzb5r3R64kpfP0cYK1YrHPXgnoOuXkAzIiKnfKMO6-q3SN7nQGUe-VKtz4zlThXyFHyPsKip4kVwU11jNMyllKg9fdsePJ3togqP7Vfo7yAjuzyXMLtPy-nWnEkECVwVzZQHQCL9YBeHncx-ZB2feGNdgVhbs0o4ZRLDsz7Bd-lhfSmfY36uNuX0Jvu2BtqPZ51YneoAz6-K3_XFL3YbM5qAx1jlYwFYirbyBYRsvzcQ8n1YtYFK20uCjbaWDLZFT',
      email: 'amelia@company.com',
      status: 'online'
    },
    { 
      name: 'John Doe', 
      avatar: null,
      email: 'john@company.com',
      status: 'offline'
    },
    { 
      name: 'Sarah Wilson', 
      avatar: null,
      email: 'sarah@company.com',
      status: 'away'
    },
    { 
      name: 'Unassigned', 
      avatar: null,
      email: null,
      status: null
    },
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low', color: 'green' },
    { value: 'Medium', label: 'Medium', color: 'amber' },
    { value: 'High', label: 'High', color: 'red' },
    { value: 'Urgent', label: 'Urgent', color: 'purple' },
  ];

  const currentAssignee = assignees.find(a => a.name === assignee);
  const currentPriority = priorityOptions.find(p => p.value === priority);

  const handleAssigneeSelect = (selectedAssignee) => {
    onAssigneeChange(selectedAssignee.name);
    setShowAssigneeDropdown(false);
  };

  const getDueDateStatus = () => {
    if (!dueDate) return null;
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'overdue', text: `${Math.abs(diffDays)} days overdue`, color: 'red' };
    if (diffDays === 0) return { status: 'today', text: 'Due today', color: 'amber' };
    if (diffDays === 1) return { status: 'tomorrow', text: 'Due tomorrow', color: 'amber' };
    if (diffDays <= 7) return { status: 'soon', text: `Due in ${diffDays} days`, color: 'blue' };
    return { status: 'future', text: `Due in ${diffDays} days`, color: 'green' };
  };

  return (
    <TaskStatusDetailsUI
      dueDate={dueDate}
      priority={priority}
      assignee={assignee}
      assignees={assignees}
      priorityOptions={priorityOptions}
      currentAssignee={currentAssignee}
      currentPriority={currentPriority}
      showAssigneeDropdown={showAssigneeDropdown}
      dueDateStatus={getDueDateStatus()}
      onDueDateChange={onDueDateChange}
      onPriorityChange={onPriorityChange}
      onAssigneeSelect={handleAssigneeSelect}
      onToggleAssigneeDropdown={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
      onCloseAssigneeDropdown={() => setShowAssigneeDropdown(false)}
    />
  );
}

export default TaskStatusDetails;