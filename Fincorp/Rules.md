# Rules.md — AI Boundaries & Development Guidelines

## 1. Code Guidelines & Architectural Boundaries
- **Strict Separation of Concerns**: Frontend code remains in `frontend/`, backend code remains in `backend/`. Never mix React components in backend or Express routes in frontend.
- **No Hardcoded Secrets**: Sensitive credentials (MongoDB URIs, JWT secrets, API keys) must always be read from environment variables (`.env`).
- **Data Integrity**: Never create fake/mock buttons that do nothing. All forms, calculators, search inputs, status updates, and document upload buttons must connect end-to-end to real backend APIs and MongoDB Atlas.
- **Validation**: Implement double validation (client-side validation for instant UX feedback and server-side validation for security).
- **Error Handling**: Always return structured JSON error responses with proper HTTP status codes (400, 401, 403, 404, 429, 500).

## 2. Branding Guidelines
- **Project Branding**: Use exact name **Fincorp**.
- **No Legacy Names**: Completely omit and remove all references to "Pandit Ji" or unrelated previous projects.

## 3. Libraries & Dependencies
- **Allowed**: React 19, React Router v7, Axios, Lucide React, Tailwind CSS v4, Express, Mongoose, JWT, BcryptJS, Cookie Parser, Multer.
- **Avoided**: Unnecessary heavy libraries, jQuery, or bloated UI frameworks that slow down Vite compilation.
