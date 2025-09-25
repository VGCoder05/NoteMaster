import { useState } from "react";
import LinkDialogUI from "./LinkDialogUI";

function LinkDialog({ selectedText, onInsert, onClose }) {
  const [url, setUrl] = useState("");
  const [linkText, setLinkText] = useState(selectedText || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onInsert(url.trim());
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTextChange = (e) => {
    setLinkText(e.target.value);
  };

  return (
    <LinkDialogUI
      url={url}
      linkText={linkText}
      onSubmit={handleSubmit}
      onUrlChange={handleUrlChange}
      onTextChange={handleTextChange}
      onClose={onClose}
    />
  );
}

export default LinkDialog;
