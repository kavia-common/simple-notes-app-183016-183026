# Simple Notes Frontend

A lightweight React UI to create, view, edit (inline), and delete notes.

## Running

- Install dependencies: `npm install`
- Start dev server: `npm start`

By default, the app calls the API at `/api`. Configure a custom API base via env:

- Create `.env` in this folder with:
  ```
  REACT_APP_API_BASE_URL=http://localhost:5000/api
  ```

Restart the dev server after changing env vars.

## Features

- Light modern UI with theme colors:
  - Primary: `#3b82f6`
  - Success: `#06b6d4`
  - Secondary: `#64748b`
- Header with title and theme toggle
- Note form (top) with validation and error handling
- Notes list (below) with loading/empty/error states
- Inline edit and delete per note

## API Contract

The API client expects:
- GET    `${BASE}/notes` -> `[ { id, title, content, ... } ]` or `{ notes: [...] }`
- POST   `${BASE}/notes` body `{ title, content }` -> created note or `{ note }`
- PUT    `${BASE}/notes/:id` body `{ title?, content? }` -> updated note or `{ note }`
- DELETE `${BASE}/notes/:id` -> `{ success: true }` (content not strictly required)

Configure `REACT_APP_API_BASE_URL` to point to your backend.
