import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteForm
 * A controlled form for creating notes. Emits onCreate(notePayload) when submitted successfully.
 */
function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = title.trim().length > 0 || content.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || pending) return;
    setPending(true);
    setError('');
    try {
      await onCreate({
        title: title.trim(),
        content: content.trim(),
      });
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err?.message || 'Failed to create note');
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="note-form card" onSubmit={handleSubmit} aria-label="Create Note Form">
      <div className="field">
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={pending}
        />
      </div>
      <div className="field">
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={pending}
          rows={4}
        />
      </div>
      {error && <div className="alert error" role="alert">{error}</div>}
      <div className="actions">
        <button className="btn primary" type="submit" disabled={!canSubmit || pending}>
          {pending ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
