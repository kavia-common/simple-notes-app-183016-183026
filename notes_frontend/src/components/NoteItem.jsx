import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteItem
 * Displays a single note with inline editing and delete actions.
 */
function NoteItem({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(note.title || '');
  const [draftContent, setDraftContent] = useState(note.content || '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const hasChanges =
    (draftTitle !== (note.title || '')) || (draftContent !== (note.content || ''));

  const handleSave = async () => {
    if (!hasChanges || pending) {
      setIsEditing(false);
      return;
    }
    setPending(true);
    setError('');
    try {
      await onUpdate(note.id, { title: draftTitle, content: draftContent });
      setIsEditing(false);
    } catch (err) {
      setError(err?.message || 'Failed to update note');
    } finally {
      setPending(false);
    }
  };

  const handleCancel = () => {
    setDraftTitle(note.title || '');
    setDraftContent(note.content || '');
    setIsEditing(false);
    setError('');
  };

  const handleDelete = async () => {
    if (pending) return;
    const confirmDelete = window.confirm('Delete this note?');
    if (!confirmDelete) return;
    setPending(true);
    setError('');
    try {
      await onDelete(note.id);
    } catch (err) {
      setError(err?.message || 'Failed to delete note');
      setPending(false);
    }
  };

  return (
    <div className="note-item card">
      {isEditing ? (
        <>
          <input
            className="note-title-input"
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            disabled={pending}
            aria-label="Edit title"
          />
          <textarea
            className="note-content-input"
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            disabled={pending}
            rows={3}
            aria-label="Edit content"
          />
          {error && <div className="alert error" role="alert">{error}</div>}
          <div className="item-actions">
            <button className="btn success" onClick={handleSave} disabled={pending}>
              {pending ? 'Saving...' : 'Save'}
            </button>
            <button className="btn secondary" onClick={handleCancel} disabled={pending}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="note-header">
            <h3 className="note-title">{note.title || 'Untitled'}</h3>
            <div className="item-actions">
              <button className="btn secondary" onClick={() => setIsEditing(true)} disabled={pending}>
                Edit
              </button>
              <button className="btn danger" onClick={handleDelete} disabled={pending}>
                Delete
              </button>
            </div>
          </div>
          <p className="note-content">{note.content || ''}</p>
          {error && <div className="alert error" role="alert">{error}</div>}
        </>
      )}
    </div>
  );
}

export default NoteItem;
