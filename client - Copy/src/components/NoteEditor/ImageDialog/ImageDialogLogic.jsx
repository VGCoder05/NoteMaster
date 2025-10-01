import { useState } from "react";
import ImageDialogUI from "./ImageDialogUI";

function ImageDialog({ onInsert, onClose }) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onInsert(url.trim(), alt.trim());
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleAltChange = (e) => {
    setAlt(e.target.value);
  };

  return (
    <ImageDialogUI
      url={url}
      alt={alt}
      onSubmit={handleSubmit}
      onUrlChange={handleUrlChange}
      onAltChange={handleAltChange}
      onClose={onClose}
    />
  );
}

export default ImageDialog;
