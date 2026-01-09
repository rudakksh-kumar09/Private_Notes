// ===========================================
// NOTE CARD COMPONENT
// ===========================================
// Displays a single note in card format
// Used in the dashboard/notes list

import { Link } from 'react-router-dom';

export default function NoteCard({ note, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Truncate content for preview
  const truncateContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <Link to={`/note/${note.id}`} className="block">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {note.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {truncateContent(note.content)}
        </p>
        <p className="text-xs text-gray-400">
          {formatDate(note.created_at)}
        </p>
      </Link>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm('Delete this note?')) {
            onDelete(note.id);
          }
        }}
        className="mt-4 text-sm text-red-600 hover:text-red-800 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
