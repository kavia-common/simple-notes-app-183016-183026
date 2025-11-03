# Simple Notes Frontend

A lightweight React UI to create, view, edit (inline), and delete notes.

## Running

- Install dependencies: `npm install`
- Start dev server: `npm start`

## Backend connection

You can connect to the Flask API in one of two ways:

1) Using environment variable (recommended)
- Create `.env` in this folder with:
  ```
  REACT_APP_API_BASE_URL=http://localhost:5001/api
  ```
- Restart the dev server after changing env vars.

2) Using development proxy (alternative)
- Add this to `package.json` (top-level):
  ```
  "proxy": "http://localhost:5001"
  ```
- Then calls to `/api/*` will be proxied to http://localhost:5001. In this mode you may leave `REACT_APP_API_BASE_URL` unset and the default `/api` will work.

Notes:
- The running backend URL in this environment is typically http://localhost:5001 (Flask), adjust if different.
- Ensure the backend enables CORS for your frontend origin if you are NOT using the proxy approach.

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

Set `REACT_APP_API_BASE_URL` (or use the proxy) so `${BASE}` points at your backend.
