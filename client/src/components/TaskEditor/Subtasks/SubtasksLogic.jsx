import { useState } from 'react';
import SubtasksUI from './SubtasksUI';

function Subtasks({ subtasks, onChange }) {
  const [newSubtask, setNewSubtask] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      const newId = Math.max(0, ...subtasks.map(st => st.id)) + 1;
      onChange([...subtasks, { id: newId, text: newSubtask.trim(), completed: false }]);
      setNewSubtask('');
    }
  };

  const handleToggleSubtask = (id) => {
    onChange(subtasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleDeleteSubtask = (id) => {
    onChange(subtasks.filter(st => st.id !== id));
  };

  const handleEditSubtask = (id, newText) => {
    if (newText.trim()) {
      onChange(subtasks.map(st => 
        st.id === id ? { ...st, text: newText.trim() } : st
      ));
    }
    setEditingId(null);
  };

  const handleKeyPress = (e, action, ...args) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action(...args);
    } else if (e.key === 'Escape' && editingId) {
      setEditingId(null);
    }
  };

  const getCompletionStats = () => {
    const completed = subtasks.filter(st => st.completed).length;
    const total = subtasks.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  return (
    <SubtasksUI
      subtasks={subtasks}
      newSubtask={newSubtask}
      editingId={editingId}
      completionStats={getCompletionStats()}
      onNewSubtaskChange={setNewSubtask}
      onAddSubtask={handleAddSubtask}
      onToggleSubtask={handleToggleSubtask}
      onDeleteSubtask={handleDeleteSubtask}
      onEditSubtask={handleEditSubtask}
      onStartEditing={setEditingId}
      onKeyPress={handleKeyPress}
    />
  );
}

export default Subtasks;