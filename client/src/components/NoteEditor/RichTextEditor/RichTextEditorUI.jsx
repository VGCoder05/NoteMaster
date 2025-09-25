import EditorToolbar from "../EditorToolbar/EditorToolbarUI";
import LinkDialog from "../LinkDialog/LinkDialogUI";
import ImageDialog from "../ImageDialog/ImageDialogUI";

function RichTextEditorUI({
  editorContent,
  tools,
  showLinkDialog,
  showImageDialog,
  selectedText,
  editorRef,
  onContentChange,
  onCommand,
  onLinkCommand,
  onImageCommand,
  onInsertLink,
  onInsertImage,
  onCloseLinkDialog,
  onCloseImageDialog,
}) {
  return (
    <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <EditorToolbar
        tools={tools}
        onCommand={onCommand}
        onLinkCommand={onLinkCommand}
        onImageCommand={onImageCommand}
      />

      {/* <div
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: editorContent }}
        suppressContentEditableWarning={true}
        /> */}
      <div className="h-full">
        <textarea
          ref={editorRef}
          className="p-4 w-full min-h-96 h-max focus:outline-none prose prose-sm max-w-none dark:prose-invert"
          onChange={onContentChange}
          name=""
          id=""
        />
      </div>

      {showLinkDialog && (
        <LinkDialog
          selectedText={selectedText}
          onInsert={onInsertLink}
          onClose={onCloseLinkDialog}
        />
      )}

      {showImageDialog && (
        <ImageDialog onInsert={onInsertImage} onClose={onCloseImageDialog} />
      )}
    </div>
  );
}

export default RichTextEditorUI;
