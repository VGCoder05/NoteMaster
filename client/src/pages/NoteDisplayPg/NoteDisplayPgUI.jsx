import SearchBar from "../../components/common/SearchBar/SearchBarLogic";
import FilterSort from "../../components/common/FilterSort/FilterSortLogic";
import NoteCard from "../../components/NoteDisplay/NoteCard/NoteCardLogic";
import Button from "../../components/common/Button";

function NotesPageUI({
  notes,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterTag,
  setFilterTag,
  onEdit,
  onDelete,
  onNewNote,
}) {
  return (
    // <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold">
              All Notes <span>({notes.length})</span>
            </h2>
            <Button variant="primary" icon="add" onClick={onNewNote}>
              New Note
            </Button>
          </div>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search notes..."
            />
            <FilterSort
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterTag={filterTag}
              onFilterChange={setFilterTag}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => onEdit(note.id)}
                onDelete={() => onDelete(note.id)}
              />
            ))}
          </div>
        </div>
      </main>
    // </div>
  );
}

export default NotesPageUI;
