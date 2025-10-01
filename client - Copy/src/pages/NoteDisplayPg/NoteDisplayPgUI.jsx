import SearchBar from "../../components/common/SearchBar/DesktopSearchLogic";
import FilterSort from "../../components/common/FilterSort/FilterSortLogic";
import NoteCard from "../../components/NoteDisplay/NoteCard/NoteCardLogic";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

function NotesPageUI({
  // Data
  notes,          // (data) The array of note objects to be mapped over and rendered as NoteCards.

  // State values for controlled components
  searchQuery,    // (state) The value to be displayed in the SearchBar component.
  sortBy,         // (state) The currently selected option in the FilterSort component.
  filterTag,      // (state) The currently selected tag in the FilterSort component.

  // State setters (handlers) for controlled components
  setSearchQuery, // (setter) Handler passed to the SearchBar's `onChange` event.
  setSortBy,      // (setter) Handler passed to the FilterSort's `onSortChange` event.
  setFilterTag,   // (setter) Handler passed to the FilterSort's `onFilterChange` event.

  // Action handlers
  onEdit,         // (handler) Callback function to be passed to each NoteCard for its edit action.
  onDelete,       // (handler) Callback function to be passed to each NoteCard for its delete action.
  onNewNote,      // (handler) Callback function for the "New Note" button's `onClick` event.
}) {
  return (
    // <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
    <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl ">
        <div className="mb-8 flex items-center justify-between gap-4 md:flex-row md:items-center">
          <h2 className=" text-subtle-light dark:text-subtle-dark text-3xl font-bold">
            All Notes <span className="ml-2 text-lg text-subtle-light dark:text-subtle-dark">({notes.length})</span>
          </h2>

          <Link to="/noteEditor">
            <Button variant="primary" icon="add" onClick={onNewNote}>
              New Note
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar
            value={searchQuery}       // (state) Controls the input field's displayed text.
            onChange={setSearchQuery} // (setter) Connects the input's change event to the parent's state logic.
            placeholder="Search notes..."
          />
          <FilterSort
            sortBy={sortBy}                 // (state) Sets the current value of the sort dropdown.
            onSortChange={setSortBy}        // (setter) Connects the sort dropdown's change event to the logic.
            filterTag={filterTag}           // (state) Sets the current value of the filter dropdown.
            onFilterChange={setFilterTag}   // (setter) Connects the filter dropdown's change event to the logic.
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}                       // (data) The individual note object for this card to display.
              onEdit={() => onEdit(note.id)}    // (handler) The edit function, now bound to this specific note's ID.
              onDelete={() => onDelete(note.id)} // (handler) The delete function, now bound to this specific note's ID.
            />
          ))}
        </div>
      </div>
    </main>
    // </div>
  );
}

export default NotesPageUI;
