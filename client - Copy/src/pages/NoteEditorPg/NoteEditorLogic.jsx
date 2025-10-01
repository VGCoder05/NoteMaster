import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteEditorUI from "./NoteEditorUI";

function NoteEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    tags: [],
    reminder: "",
    created: "",
    lastModified: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Load existing note data
      setNoteData({
        title: "Project Proposal Brainstorm",
        content: `<p>Initial ideas for the Q3 project proposal. We need to focus on user acquisition and retention strategies.</p>
        <ul class="list-disc list-inside my-4 pl-4">
          <li>Gamification elements to increase engagement.</li>
          <li>Personalized onboarding experience.</li>
          <li>Integration with third-party productivity tools.</li>
        </ul>
        <p>Let's schedule a meeting to discuss these points further.</p>`,
        tags: ["Work", "Project"],
        reminder: "2024-03-25",
        created: "March 18, 2024",
        lastModified: "2 hours ago",
      });
    } else {
      // Initialize new note
      setNoteData({
        title: "",
        content: "",
        tags: [],
        reminder: "",
        created: new Date().toLocaleDateString(),
        lastModified: "Just now",
      });
    }
  }, [isEditing]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving note:", noteData);
      // Add actual save logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setHasUnsavedChanges(false);
      navigate("/notes");
    } catch (error) {
      console.error("Error saving note:", error);
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
    navigate("/notes");
  };

  const handleTitleChange = (e) => {
    setNoteData({ ...noteData, title: e.target.value });
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (newContent) => {
    setNoteData({ ...noteData, content: newContent });
    setHasUnsavedChanges(true);
  };

  const handleTagsChange = (newTags) => {
    setNoteData({ ...noteData, tags: newTags });
    setHasUnsavedChanges(true);
  };

  const handleReminderChange = (e) => {
    setNoteData({ ...noteData, reminder: e.target.value });
    setHasUnsavedChanges(true);
  };

  const handleBackToNotes = () => {
    handleCancel();
  };

  return (
    <NoteEditorUI
      // UI mode and state flags
      isEditing={isEditing}                     // (state) A boolean to conditionally render UI elements (e.g., page title).
      isSaving={isSaving}                       // (state) A boolean to show a loading state on buttons.
      hasUnsavedChanges={hasUnsavedChanges}     // (state) A boolean to show an "unsaved changes" indicator.

      // Data to be displayed in the form fields
      noteData={noteData}                       // (data) The complete note object containing title, content, tags, etc.

      // Event handlers to connect UI actions to this component's logic
      onSave={handleSave}                       // (handler) Function to call when the primary "Save" button is clicked.
      onCancel={handleCancel}                   // (handler) Function to call when the "Cancel" button is clicked.
      onTitleChange={handleTitleChange}         // (handler) Function to update the title state on input change.
      onContentChange={handleContentChange}     // (handler) Function to update content from the rich text editor.
      onTagsChange={handleTagsChange}           // (handler) Function to update tags from the tag input component.
      onReminderChange={handleReminderChange}   // (handler) Function to update the reminder date/time.
      onBackToNotes={handleBackToNotes}         // (handler) Function for the "Back to Notes" link.
    />
  );
}

export default NoteEditor;
