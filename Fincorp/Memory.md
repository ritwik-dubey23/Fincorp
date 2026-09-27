# Memory.md — Progress & Execution Memory Log

## Active Context Summary
- **Project Name**: Fincorp
- **Database Connection**: MongoDB Atlas `mongodb+srv://supportmaharajji_db_user:6d0lMXhTiUmoeKCY@cluster0.qvzuvvx.mongodb.net/fincorp?retryWrites=true&w=majority&appName=Cluster0`
- **Backend Port**: 8000 (`node server.js` / `node --watch server.js`)
- **Frontend Port**: 5173 (`npm run dev`)
- **Default Admin Account**: `admin@fincorp.com` / `admin123`

---

## Technical State & Verified Modules

1. **Frontend Stack**:
   - React 19 + Vite 6 + React Router v7
   - Built for production (`npm run build`) -> Output in `dist/assets` (built in 16.25s cleanly).

2. **Backend Stack**:
   - Node.js ES Modules + Express 4 + Mongoose 8
   - Installed dependencies: `bcryptjs`, `cookie-parser`, `cors`, `dotenv`, `express`, `jsonwebtoken`, `mongoose`, `multer`.
   - Script in `package.json`: `"dev": "node --watch server.js"` / `nodemon server.js`.

3. **Database Models**:
   - `User.js`: Schema for customers & admin users.
   - `Application.js`: Schema for leads, financial details, PAN/Aadhaar, document requests, document uploads, and status history.
   - `Otp.js`: Mobile OTP verification records.

4. **All Key Documentation Files Maintained**:
   - `PRD.md`
   - `Architecture.md`
   - `Rules.md`
   - `Phases.md`
   - `Design.md`
   - `Memory.md`
