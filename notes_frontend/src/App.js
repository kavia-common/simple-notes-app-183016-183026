import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { getNotes, createNote, updateNote, deleteNote } from './api';

// PUBLIC_INTERFACE
function App() {
  /**
   * Notes state and loading/error handling
   */
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  /**
   * Fetch notes on mount
   */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await getNotes();
      // Normalize to array
      const arr = Array.isArray(data) ? data : (data?.notes || []);
      setNotes(arr);
    } catch (err) {
      setLoadError(err?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /**
   * Handlers forwarded to components
   */
  const handleCreate = async (payload) => {
    const created = await createNote(payload);
    // Prefer pushing returned item; if API returns no item, refetch.
    if (created && (created.id || created.note)) {
      const item = created.note || created;
      setNotes((prev) => [item, ...prev]);
    } else {
      await fetchAll();
    }
  };

  const handleUpdate = async (id, payload) => {
    const updated = await updateNote(id, payload);
    const item = updated?.note || updated || { id, ...payload };
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...item } : n)));
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true" />
            <div className="title">Simple Notes</div>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="main">
        <NoteForm onCreate={handleCreate} />
        <NotesList
          notes={notes}
          loading={loading}
          error={loadError}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
