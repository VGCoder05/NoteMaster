import { useState } from "react";
import NoteDisplayPgUI from "./NoteDisplayPgUI";

function NoteDisplayPgLogic() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-modified");
  const [filterTag, setFilterTag] = useState("all");

  // Sample notes data
  const [notes] = useState([
    {
      id: 1,
      title: "Project Proposal",
      content:
        "A detailed proposal for the new web application project, outlining scope, timeline, and budget...",
      lastEdited: "2 days ago",
      tag: { name: "Work", color: "blue" },
    },
    {
      id: 2,
      title: "Meeting Notes",
      content:
        "Key takeaways from the weekly sync meeting. Action items assigned to team members.",
      lastEdited: "3 days ago",
      tag: { name: "Work", color: "blue" },
    },
    {
      id: 3,
      title: "Grocery List",
      content:
        "Milk, bread, eggs, cheese, apples, bananas, chicken breast, spinach, tomatoes, onions.",
      lastEdited: "5 days ago",
      tag: { name: "Personal", color: "purple" },
    },
    {
      id: 4,
      title: "Vacation Ideas",
      content:
        "Explore destinations for the upcoming summer vacation. Research flights and accommodation for Italy, Greece, and Spain.",
      lastEdited: "1 week ago",
      tag: { name: "Travel", color: "amber" },
    },
  ]);

  const handleEdit = (noteId) => {
    console.log("Edit note:", noteId);
  };

  const handleDelete = (noteId) => {
    console.log("Delete note:", noteId);
  };

  const handleNewNote = () => {
    console.log("Create new note");
  };

  return (
    <NoteDisplayPgUI
      // Data to be rendered
      notes={notes}                 // (data) The array of note objects to display.

      // State and setters for search and filtering controls
      searchQuery={searchQuery}     // (state) The current text in the search bar.
      setSearchQuery={setSearchQuery} // (setter) The function to update the search query state.
      sortBy={sortBy}                 // (state) The current sort criterion (e.g., 'date-modified').
      setSortBy={setSortBy}           // (setter) The function to update the sort state.
      filterTag={filterTag}           // (state) The current tag used for filtering.
      setFilterTag={setFilterTag}     // (setter) The function to update the filter tag state.

      // Action handlers for individual notes and page-level actions
      onEdit={handleEdit}             // (handler) Function to trigger when a note's edit button is clicked.
      onDelete={handleDelete}         // (handler) Function to trigger when a note's delete button is clicked.
      onNewNote={handleNewNote}       // (handler) Function to trigger when the "New Note" button is clicked.
    />
  );
}

export default NoteDisplayPgLogic;
