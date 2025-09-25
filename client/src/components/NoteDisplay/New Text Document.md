I'll convert the Notes edit & create page into React components. Here are the component files:

## src/pages/NoteEditor.jsx
```jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import EditorToolbar from '../components/EditorToolbar';
import TagInput from '../components/TagInput';
import NoteMetadata from '../components/NoteMetadata';
import Button from '../components/Button';

function NoteEditor() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get note ID if editing
  const isEditing = !!id;

  // Form state
  const [noteData, setNoteData] = useState({
    title: isEditing ? 'Project Proposal Brainstorm' : '',
    content: isEditing ? `<p>Initial ideas for the Q3 project proposal. We need to focus on user acquisition and retention strategies.</p>
    <ul class="list-disc list-inside my-4 pl-4">
      <li>Gamification elements to increase engagement.</li>
      <li>Personalized onboarding experience.</li>
      <li>Integration with third-party productivity tools.</li>
    </ul>
    <p>Let's schedule a meeting to discuss these points further.</p>` : '',
    tags: isEditing ? ['Work', 'Project'] : [],
    reminder: isEditing ? '2024-03-25' : '',
    created: isEditing ? 'March 18, 2024' : new Date().toLocaleDateString(),
    lastModified: isEditing ? '2 hours ago' : 'Just now'
  });

  const handleSave = () => {
    console.log('Saving note:', noteData);
    // Add save logic here
    navigate('/notes');
  };

  const handleCancel = () => {
    navigate('/notes');
  };

  const handleTitleChange = (e) => {
    setNoteData({ ...noteData, title: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setNoteData({ ...noteData, content: newContent });
  };

  const handleTagsChange = (newTags) => {
    setNoteData({ ...noteData, tags: newTags });
  };

  const handleReminderChange = (e) => {
    setNoteData({ ...noteData, reminder: e.target.value });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <Header />
      
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header Actions */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                className="flex items-center gap-2 text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors"
                href="/notes"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/notes');
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back to Notes</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" icon="save" onClick={handleSave}>
                Save Note
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Editor Section */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {/* Title Input */}
                <div>
                  <label
                    className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-1"
                    htmlFor="note-title"
                  >
                    Note Title
                  </label>
                  <input
                    className="w-full text-2xl font-bold bg-transparent border-0 border-b-2 border-border-light dark:border-border-dark focus:ring-0 focus:border-primary p-2"
                    id="note-title"
                    placeholder="e.g., Q3 Marketing Strategy"
                    type="text"
                    value={noteData.title}
                    onChange={handleTitleChange}
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-subtle-light dark:text-subtle-dark mb-2">
                    Content
                  </label>
                  <RichTextEditor
                    content={noteData.content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
                <h3 className="text-lg font-semibold mb-4">Note Details</h3>
                <div className="space-y-4">
                  {/* Tags */}
                  <TagInput
                    tags={noteData.tags}
                    onChange={handleTagsChange}
                  />

                  {/* Reminder */}
                  <div>
                    <label
                      className="text-sm font-medium text-subtle-light dark:text-subtle-dark"
                      htmlFor="reminder"
                    >
                      Reminder / Due Date
                    </label>
                    <div className="relative mt-2">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark text-lg">
                        calendar_today
                      </span>
                      <input
                        className="h-10 w-full rounded-lg border border-border-light dark:border-border-dark bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        id="reminder"
                        type="datetime-local"
                        value={noteData.reminder}
                        onChange={handleReminderChange}
                      />
                    </div>
                  </div>

                  {/* Metadata */}
                  <NoteMetadata
                    created={noteData.created}
                    lastModified={noteData.lastModified}
                  />

                  {/* Version History */}
                  <button className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-base">
                      history
                    </span>
                    Version History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Rich Text Editor Component
function RichTextEditor({ content, onChange }) {
  const [editorContent, setEditorContent] = useState(content);

  const handleContentChange = (e) => {
    const newContent = e.target.innerHTML;
    setEditorContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <EditorToolbar />
      <div
        className="p-4 min-h-96 max-h-content focus:outline-none"
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: editorContent }}
        onInput={handleContentChange}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}

export default NoteEditor;
```

## src/components/EditorToolbar.jsx
```jsx
function EditorToolbar() {
  const tools = [
    { icon: 'format_bold', command: 'bold' },
    { icon: 'format_italic', command: 'italic' },
    { icon: 'format_underlined', command: 'underline' },
    { divider: true },
    { icon: 'format_list_bulleted', command: 'insertUnorderedList' },
    { icon: 'format_list_numbered', command: 'insertOrderedList' },
    { divider: true },
    { icon: 'link', command: 'createLink' },
    { icon: 'image', command: 'insertImage' },
  ];

  const handleCommand = (command) => {
    if (command === 'createLink') {
      const url = window.prompt('Enter the URL');
      if (url) document.execCommand(command, false, url);
    } else if (command === 'insertImage') {
      const url = window.prompt('Enter the image URL');
      if (url) document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, null);
    }
  };

  return (
    <div className="flex items-center gap-2 border-b border-border-light dark:border-border-dark p-2">
      {tools.map((tool, index) => {
        if (tool.divider) {
          return (
            <div
              key={`divider-${index}`}
              className="h-6 border-l border-border-light dark:border-border-dark mx-2"
            />
          );
        }
        return (
          <button
            key={tool.icon}
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-primary/10 transition-colors"
            onClick={() => handleCommand(tool.command)}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
          >
            <span className="material-symbols-outlined text-base">
              {tool.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default EditorToolbar;
```

## src/components/TagInput.jsx
```jsx
import { useState } from 'react';

function TagInput({ tags, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const tagColors = {
    Work: 'primary',
    Personal: 'purple',
    Project: 'blue',
    Finance: 'green',
    Travel: 'amber',
    Ideas: 'orange',
  };

  const getTagColorClasses = (tag) => {
    const color = tagColors[tag] || 'primary';
    const colorClasses = {
      primary: 'bg-primary/10 dark:bg-primary/20 text-primary',
      blue: 'bg-blue-500/10 dark:bg-blue-400/20 text-blue-500 dark:text-blue-400',
      purple: 'bg-purple-500/10 dark:bg-purple-400/20 text-purple-500 dark:text-purple-400',
      amber: 'bg-amber-500/10 dark:bg-amber-400/20 text-amber-500 dark:text-amber-400',
      green: 'bg-green-500/10 dark:bg-green-400/20 text-green-500 dark:text-green-400',
      orange: 'bg-orange-500/10 dark:bg-orange-400/20 text-orange-500 dark:text-orange-400',
    };
    return colorClasses[color];
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="text-sm font-medium text-subtle-light dark:text-subtle-dark">
        Tags
      </label>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getTagColorClasses(tag)}`}
          >
            {tag}
            <button
              className="opacity-70 hover:opacity-100"
              onClick={() => handleRemoveTag(tag)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </span>
        ))}
        <input
          className="min-w-[60px] flex-1 bg-transparent border-0 focus:ring-0 text-sm"
          placeholder="Add a tag..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
    </div>
  );
}

export default TagInput;
```

## src/components/NoteMetadata.jsx
```jsx
function NoteMetadata({ created, lastModified }) {
  return (
    <div className="text-xs text-subtle-light dark:text-subtle-dark pt-2 space-y-1">
      <p>Created: {created}</p>
      <p>Last Modified: {lastModified}</p>
    </div>
  );
}

export default NoteMetadata;
```

## Updated App Router
```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NotesPage from './pages/NotesPage';
import NoteEditor from './pages/NoteEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/new" element={<NoteEditor />} />
        <Route path="/notes/edit/:id" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Enhanced Rich Text Editor (Optional)
If you want a more robust editor, you can integrate a library like Quill or TinyMCE:

```jsx
// Using react-quill as an example
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillEditor({ content, onChange }) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <ReactQuill 
        theme="snow"
        value={content}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="min-h-96"
      />
    </div>
  );
}
```

## Additional CSS for the editor (add to index.css)
```css
/* Rich text editor styles */
@layer components {
  /* Style the contenteditable area */
  [contenteditable]:focus {
    outline: none;
  }
  
  /* Style lists in the editor */
  [contenteditable] ul {
    list-style-type: disc;
    list-style-position: inside;
    margin: 1rem 0;
    padding-left: 1rem;
  }
  
  [contenteditable] ol {
    list-style-type: decimal;
    list-style-position: inside;
    margin: 1rem 0;
    padding-left: 1rem;
  }
  
  [contenteditable] p {
    margin: 0.5rem 0;
  }
}
```

## Features Included:

1. **Dual Purpose**: The component works for both creating new notes and editing existing ones
2. **Rich Text Editor**: Basic contentEditable implementation with toolbar
3. **Tag Management**: Add/remove tags with color coding
4. **Date/Time Picker**: For reminders and due dates
5. **Metadata Display**: Shows creation and modification times
6. **Responsive Design**: Works on mobile and desktop
7. **Navigation**: Back button and cancel/save actions

## Future Enhancements:

1. **Auto-save**: Implement auto-save functionality with debouncing
2. **Version Control**: Add actual version history tracking
3. **Attachments**: Allow file uploads and attachments
4. **Markdown Support**: Add markdown editing mode
5. **Collaborative Editing**: Real-time collaboration features
6. **Templates**: Note templates for quick starts
7. **Export Options**: Export as PDF, Markdown, or plain text