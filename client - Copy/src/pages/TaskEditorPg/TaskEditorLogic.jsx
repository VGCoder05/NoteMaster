import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskEditorUI from "./TaskEditorUI";

function TaskEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    subtasks: [],
    attachments: [],
    dueDate: "",
    priority: "Medium",
    assignee: "Unassigned",
    status: "Not Started",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Load existing task data
      setTaskData({
        name: "Finalize Presentation",
        description:
          "Complete the quarterly presentation with all necessary data and charts.",
        subtasks: [
          { id: 1, text: "Create slides for section 1", completed: true },
          { id: 2, text: "Practice presentation", completed: false },
        ],
        attachments: [
          { id: 1, name: "Sales_Data_Q1.xlsx", type: "document" },
          { id: 2, name: "Chart_Projections.png", type: "image" },
        ],
        dueDate: "2024-03-15",
        priority: "High",
        assignee: "Amelia",
        status: "In Progress",
      });
    }
  }, [isEditing]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving task:", taskData);
      // Add actual save logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setHasUnsavedChanges(false);
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    navigate("/tasks");
  };

  const updateTaskData = (field, value) => {
    setTaskData({ ...taskData, [field]: value });
    setHasUnsavedChanges(true);
  };

  // Calculate progress
  const completedSubtasks = taskData.subtasks.filter(
    (st) => st.completed
  ).length;
  const totalSubtasks = taskData.subtasks.length;
  const progress =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <TaskEditorUI
      // UI state and mode flags
      isEditing={isEditing}                 // (state) A boolean to conditionally render UI (e.g., page title).
      isSaving={isSaving}                   // (state) A boolean to show a loading state on the save button.
      hasUnsavedChanges={hasUnsavedChanges} // (state) A boolean to display an "unsaved changes" indicator.

      // Data for display
      taskData={taskData}                   // (data) The complete task object to populate all form fields.
      progress={progress}                   // (data) The calculated progress percentage for the progress bar.
      completedSubtasks={completedSubtasks} // (data) The count of completed subtasks for display text.
      totalSubtasks={totalSubtasks}         // (data) The total count of subtasks for display text.

      // Event handlers for UI interactions
      onSave={handleSave}                   // (handler) The function to call when the "Save Task" button is clicked.
      onCancel={handleCancel}               // (handler) The function for the "Cancel" and "Back" buttons.
      onUpdateTaskData={updateTaskData}     // (handler) A generic function for child components to update any part of the task data.
    />
  );
}

export default TaskEditor;
