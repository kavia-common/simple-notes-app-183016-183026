/**
 * API base URL resolution:
 * - If REACT_APP_API_BASE_URL is set (e.g., http://localhost:5001/api), use it.
 * - Else default to '/api' so CRA dev proxy can forward to the backend if configured.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

/**
 * Helper to handle JSON responses and errors.
 */
async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  let data = null;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    // Fallback text for non-JSON backends
    const text = await res.text();
    data = text ? { message: text } : null;
  }
  if (!res.ok) {
    const message = (data && (data.error || data.message)) || `Request failed with status ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// PUBLIC_INTERFACE
export async function getNotes() {
  /** Fetch all notes. Returns an array of notes: [{id, title, content, created_at, updated_at}] */
  const res = await fetch(`${API_BASE_URL}/notes`, { method: 'GET' });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note. Payload: {title, content} */
  const res = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update note by id. Payload can include {title, content} */
  const res = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete note by id. */
  const res = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
