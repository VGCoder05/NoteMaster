function NoteMetadataUI({
  formattedCreated,
  formattedModified,
  showFullDates,
  onToggleDateFormat,
  getFullDateTime,
  created,
  lastModified,
}) {
  return (
    <div className="text-xs text-subtle-light dark:text-subtle-dark pt-2 space-y-1">
      <div className="flex items-center justify-between">
        <span>Created:</span>
        <span className="font-medium">
          {showFullDates ? getFullDateTime(created) : formattedCreated}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span>Last Modified:</span>
        <span className="font-medium">
          {showFullDates ? getFullDateTime(lastModified) : formattedModified}
        </span>
      </div>
      <button
        onClick={onToggleDateFormat}
        className="text-primary hover:text-primary/80 transition-colors mt-2"
      >
        {showFullDates ? "Show relative time" : "Show full dates"}
      </button>
    </div>
  );
}

export default NoteMetadataUI;
