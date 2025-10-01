function AttachmentsUI({
  attachments,
  isDragOver,
  uploadProgress,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onInputChange,
  onDeleteAttachment,
  onOpenFileBrowser,
  formatFileSize
}) {
  const getFileIcon = (type) => {
    const icons = {
      image: 'image',
      video: 'videocam',
      pdf: 'picture_as_pdf',
      document: 'description',
      spreadsheet: 'table_chart',
    };
    return icons[type] || 'description';
  };

  return (
    <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-border-dark">
      <h3 className="text-lg font-semibold mb-4">Attachments</h3>
      
      {attachments.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-border-light dark:border-border-dark'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <span className="material-symbols-outlined text-4xl text-subtle-light dark:text-subtle-dark mx-auto block mb-2">
            cloud_upload
          </span>
          <p className="text-sm text-subtle-light dark:text-subtle-dark mb-2">
            Drag & drop files here or
          </p>
          <button
            onClick={onOpenFileBrowser}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Browse files
          </button>
          <p className="text-xs text-subtle-light dark:text-subtle-dark mt-2">
            Supports images, documents, and videos up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={onInputChange}
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
          />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    {getFileIcon(attachment.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                    {attachment.size && (
                      <p className="text-xs text-subtle-light dark:text-subtle-dark">
                        {formatFileSize(attachment.size)}
                      </p>
                    )}
                    {uploadProgress[attachment.id] && (
                      <div className="mt-1">
                        <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-1">
                          <div
                            className="bg-primary h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[attachment.id]}%` }}
                          />
                        </div>
                        <p className="text-xs text-subtle-light dark:text-subtle-dark mt-1">
                          Uploading... {Math.round(uploadProgress[attachment.id])}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    className="p-1 text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors"
                    aria-label="Download attachment"
                    title="Download"
                  >
                    <span className="material-symbols-outlined text-lg">download</span>
                  </button>
                  <button
                    onClick={() => onDeleteAttachment(attachment.id)}
                    className="p-1 text-subtle-light dark:text-subtle-dark hover:text-red-500 transition-colors"
                    aria-label="Delete attachment"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
            <button
              onClick={onOpenFileBrowser}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined text-base">attach_file</span>
              Add More Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={onInputChange}
              accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default AttachmentsUI;