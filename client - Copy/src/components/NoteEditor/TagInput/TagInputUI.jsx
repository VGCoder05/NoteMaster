function TagInputUI({
  tags,
  inputValue,
  suggestions,
  showSuggestions,
  getTagColorClasses,
  onInputChange,
  onKeyDown,
  onRemoveTag,
  onSuggestionClick,
}) {
  return (
    <div className="relative">
      <label className="text-sm font-medium text-subtle-light dark:text-subtle-dark">
        Tags
      </label>
      <div className="flex flex-wrap gap-2 mt-2 p-2 border border-border-light dark:border-border-dark rounded-lg bg-transparent focus-within:border-primary">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getTagColorClasses(
              tag
            )}`}
          >
            {tag}
            <button
              className="opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => onRemoveTag(tag)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </span>
        ))}
        <input
          className="min-w-[60px] flex-1 bg-transparent border-0 focus:ring-0 text-sm outline-none"
          placeholder="Add a tag..."
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagInputUI;
