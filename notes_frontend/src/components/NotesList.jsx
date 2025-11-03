import React from 'react';
import NoteItem from './NoteItem';

/**
 * PUBLIC_INTERFACE
 * NotesList
 * Renders the list of notes with callbacks for update and delete.
 */
function NotesList({ notes, loading, error, onUpdate, onDelete }) {
  if (loading) {
    return <div className="card muted">Loading notes...</div>;
  }
  if (error) {
    return <div className="alert error" role="alert">{error}</div>;
  }
  if (!notes || notes.length === 0) {
    return <div className="card muted">No notes yet. Add your first note above.</div>;
  }
  return (
    <div className="notes-list">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NotesList;
