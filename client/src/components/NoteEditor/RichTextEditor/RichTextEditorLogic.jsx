import { useState, useEffect, useRef } from "react";
import RichTextEditorUI from "./RichTextEditorUI";

function RichTextEditor({ content, onChange }) {
  const [editorContent, setEditorContent] = useState(content);
  const [selectedText, setSelectedText] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleContentChange = (e) => {
    const newContent = e.target.innerHTML;
    setEditorContent(newContent);
    onChange(newContent);
  };

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleLinkCommand = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      setSelectedText(selection.toString());
      setShowLinkDialog(true);
    } else {
      const url = window.prompt("Enter the URL");
      if (url) handleCommand("createLink", url);
    }
  };

  const handleImageCommand = () => {
    setShowImageDialog(true);
  };

  const handleInsertLink = (url) => {
    if (url) {
      handleCommand("createLink", url);
    }
    setShowLinkDialog(false);
    setSelectedText("");
  };

  const handleInsertImage = (url, alt = "") => {
    if (url) {
      // Create img element with alt text
      const img = `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;" />`;
      handleCommand("insertHTML", img);
    }
    setShowImageDialog(false);
  };

  const tools = [
    { icon: "format_bold", command: "bold", title: "Bold" },
    { icon: "format_italic", command: "italic", title: "Italic" },
    { icon: "format_underlined", command: "underline", title: "Underline" },
    { divider: true },
    {
      icon: "format_list_bulleted",
      command: "insertUnorderedList",
      title: "Bullet List",
    },
    {
      icon: "format_list_numbered",
      command: "insertOrderedList",
      title: "Numbered List",
    },
    { divider: true },
    { icon: "link", command: "link", title: "Insert Link" },
    { icon: "image", command: "image", title: "Insert Image" },
  ];

  return (
    <RichTextEditorUI
      editorContent={editorContent}
      tools={tools}
      showLinkDialog={showLinkDialog}
      showImageDialog={showImageDialog}
      selectedText={selectedText}
      editorRef={editorRef}
      onContentChange={handleContentChange}
      onCommand={handleCommand}
      onLinkCommand={handleLinkCommand}
      onImageCommand={handleImageCommand}
      onInsertLink={handleInsertLink}
      onInsertImage={handleInsertImage}
      onCloseLinkDialog={() => setShowLinkDialog(false)}
      onCloseImageDialog={() => setShowImageDialog(false)}
    />
  );
}

export default RichTextEditor;
