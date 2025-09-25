function LinkDialogUI({
  url,
  linkText,
  onSubmit,
  onUrlChange,
  onTextChange,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-1">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={onUrlChange}
              placeholder="https://example.com"
              className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-1">
              Link Text
            </label>
            <input
              type="text"
              value={linkText}
              onChange={onTextChange}
              placeholder="Link text"
              className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-subtle-light dark:text-subtle-dark hover:bg-primary/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Insert Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkDialogUI;
