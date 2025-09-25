function EditorToolbarUI({ tools, onToolClick, isCommandActive }) {
  console.log("isCommandActive", isCommandActive);
  return (
    <div className="flex items-center gap-2 border-b border-border-light dark:border-border-dark p-2">
      {tools.map((tool, index) => {
        if (tool.divider) {
          return (
            <div
              key={`divider-${index}`}
              className="h-6 border-l border-border-light dark:border-border-dark mx-2"
            />
          );
        }

        // const isActive = isCommandActive(tool.command);
        const isActive = true;

        return (
          <button
            key={tool.icon}
            className={`flex h-8 w-8 items-center justify-center rounded hover:bg-primary/10 transition-colors ${
              isActive ? "bg-primary/20 text-primary" : ""
            }`}
            onClick={() => onToolClick(tool)}
            onMouseDown={(e) => e.preventDefault()}
            title={tool.title}
          >
            <span className="material-symbols-outlined text-base">
              {tool.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default EditorToolbarUI;
