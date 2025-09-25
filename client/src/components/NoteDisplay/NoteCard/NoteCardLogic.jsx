import { useState } from "react";
import NoteCardUI from "./NoteCardUI";

function NoteCard({ note, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  const tagColorClasses = {
    blue: "bg-blue-500/10 dark:bg-blue-400/20 text-blue-500 dark:text-blue-400",
    purple:
      "bg-purple-500/10 dark:bg-purple-400/20 text-purple-500 dark:text-purple-400",
    amber:
      "bg-amber-500/10 dark:bg-amber-400/20 text-amber-500 dark:text-amber-400",
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <NoteCardUI
      note={note}
      tagColorClasses={tagColorClasses}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default NoteCard;
