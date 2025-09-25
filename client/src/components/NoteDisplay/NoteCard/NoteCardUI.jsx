function NoteCardUI({
  note,
  tagColorClasses,
  isHovered,
  setIsHovered,
  onEdit,
  onDelete
}) {
  return (
    <div 
      className="group relative rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark transition-all hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="font-bold text-lg mb-2">{note.title}</h3>
      <p className="text-sm text-subtle-light dark:text-subtle-dark line-clamp-3 mb-4">
        {note.content}
      </p>
      <div className="flex items-center justify-between text-xs text-subtle-light dark:text-subtle-dark">
        <span>Edited {note.lastEdited}</span>
        <div className="flex gap-1">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tagColorClasses[note.tag.color]}`}>
            {note.tag.name}
          </span>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-base">edit</span>
        </button>
        <button
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-base text-primary">delete</span>
        </button>
      </div>
    </div>
  );
}

export default NoteCardUI;