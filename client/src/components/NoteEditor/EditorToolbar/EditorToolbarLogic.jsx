import { useState } from "react";
import EditorToolbarUI from "./EditorToolbarUI";

function EditorToolbar({ tools, onCommand, onLinkCommand, onImageCommand }) {
  const [activeCommands, setActiveCommands] = useState(new Set());

  const handleToolClick = (tool) => {
    if (tool.command === "link") {
      onLinkCommand();
    } else if (tool.command === "image") {
      onImageCommand();
    } else {
      onCommand(tool.command);
      updateActiveCommands(tool.command);
    }
  };

  const updateActiveCommands = (command) => {
    const newActiveCommands = new Set(activeCommands);
    if (document.queryCommandState(command)) {
      newActiveCommands.add(command);
    } else {
      newActiveCommands.delete(command);
    }
    setActiveCommands(newActiveCommands);
  };

  const isCommandActive = (command) => {
    return activeCommands.has(command);
  };

  return (
    <EditorToolbarUI
      tools={tools}
      onToolClick={handleToolClick}
      isCommandActive={isCommandActive}
    />
  );
}

export default EditorToolbar;
