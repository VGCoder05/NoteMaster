import RichTextEditor from "../../components/NoteEditor/RichTextEditor/RichTextEditorLogic";
import TagInput from "../../components/NoteEditor/TagInput/TagInputLogic";
import NoteMetadata from "../../components/NoteEditor/NoteMetadata/NoteMetadataLogic";
import Button from "../../components/common/Button";

function NoteEditorUI({
  // UI mode and state flags
  isEditing,          // (state) Used to adjust UI text or elements (e.g., "Edit Note" vs "New Note").
  isSaving,           // (state) Used to show loading indicators and disable buttons during save.
  hasUnsavedChanges,  // (state) Used to display a visual indicator that the form is dirty.

  // Data for form fields
  noteData,           // (data) The object containing all note details to populate the inputs.

  // Event handlers for user interactions
  onSave,             // (handler) Attached to the onClick of the main "Save" button.
  onCancel,           // (handler) Attached to the onClick of the "Cancel" button.
  onTitleChange,      // (handler) Attached to the onChange of the title input field.
  onContentChange,    // (handler) Passed down to the RichTextEditor component's onChange prop.
  onTagsChange,       // (handler) Passed down to the TagInput component's onChange prop.
  onReminderChange,   // (handler) Attached to the onChange of the reminder input field.
  onBackToNotes,      // (handler) Attached to the onClick of the "Back to Notes" link.
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">

      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header Actions */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors"
                onClick={onBackToNotes}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back to Notes</span>
              </button>
              {hasUnsavedChanges && (
                <span className="text-xs text-amber-500 dark:text-amber-400">
                  • Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon="save"
                onClick={onSave}
                loading={isSaving}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Editor Section */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {/* Title Input */}
                <div>
                  <label
                    className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-1"
                    htmlFor="note-title"
                  >
                    Note Title
                  </label>
                  <input
                    className="w-full text-2xl font-bold bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-2"
                    id="note-title"
                    placeholder="e.g., Q3 Marketing Strategy"
                    type="text"
                    value={noteData.title}
                    onChange={onTitleChange}
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2 focused">
                    Content
                  </label>
                  <RichTextEditor
                    content={noteData.content} // (data) The HTML content for the editor to display.
                    onChange={onContentChange} // (handler) The callback to run when the editor's content changes.
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
                <h3 className="text-lg font-semibold mb-4">Note Details</h3>
                <div className="space-y-4">
                  {/* Tags */}
                  <TagInput
                  tags={noteData.tags}   // (data) The array of tags for the component to display.
                  onChange={onTagsChange} // (handler) The callback to run when tags are added or removed.
                  />

                  {/* Reminder */}
                  <div>
                    <label
                      className="text-sm font-medium text-subtle-light dark:text-subtle-dark"
                      htmlFor="reminder"
                    >
                      Reminder / Due Date
                    </label>
                    <div className="relative mt-2">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark text-lg">
                        calendar_today
                      </span>
                      <input
                        className="h-10 w-full rounded-lg border border-border-light dark:border-border-dark bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        id="reminder"
                        type="datetime-local"
                        value={noteData.reminder}
                        onChange={onReminderChange}
                      />
                    </div>
                  </div>

                  {/* Metadata */}
                  <NoteMetadata
                  created={noteData.created}         // (data) The creation date string.
                  lastModified={noteData.lastModified} // (data) The last modified timestamp string.
                  />

                  {/* Version History */}
                  <button className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-base">
                      history
                    </span>
                    Version History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NoteEditorUI;
