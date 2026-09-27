# Architecture.md — Application Architecture & Stack

## 1. System Architecture

```text
               ┌────────────────────────────────────────┐
               │           REACT FRONTEND (Vite)        │
               │   - CredBuddha UI Layout               │
               │   - React Router v7                    │
               │   - Context API / Axios                │
               └───────────────────┬────────────────────┘
                                   │ HTTP / REST APIs
                                   ▼
               ┌────────────────────────────────────────┐
               │         NODE / EXPRESS BACKEND         │
               │   - Auth Middleware (JWT)              │
               │   - Multer Storage Middleware          │
               │   - Express API Controllers & Routes   │
               └───────────────────┬────────────────────┘
                                   │ Mongoose ODM
                                   ▼
               ┌────────────────────────────────────────┐
               │            MONGODB ATLAS DB            │
               │   - Users & Admins Collection          │
               │   - Applications / Leads Collection    │
               │   - OTP Records Collection             │
               └────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Frontend
- **Framework**: React 19, Vite 6
- **Routing**: React Router v7 (`BrowserRouter`, `Routes`, `Route`)
- **HTTP Client**: Axios (configured with `withCredentials: true`)
- **Styling**: Tailwind CSS v4, Urbanist Google Font
- **Icons**: Lucide React (`lucide-react`)

### Backend
- **Runtime**: Node.js ES Modules (`"type": "module"`)
- **Framework**: Express.js 4
- **Database**: MongoDB Atlas via Mongoose 8
- **Authentication**: JWT (`jsonwebtoken`) & `bcryptjs` password hashing
- **Cookie Management**: `cookie-parser`
- **File Uploads**: `multer`
- **Development Reloader**: `node --watch` / `nodemon`

---

## 3. Directory Breakdown

```text
Fincorp/
├── backend/
│   ├── config/db.js                 # Database connection setup
│   ├── controllers/                 # Business logic for auth, OTP, leads, admin
│   ├── middleware/                  # JWT auth & Multer file upload
│   ├── models/                      # User, Application, and OTP Mongoose schemas
│   ├── routes/                      # Express route endpoints
│   ├── utils/                       # Notification handlers (Email/SMS)
│   ├── .env                         # Server port, MongoDB URI, JWT Secret
│   ├── seedAdmin.js                 # Admin seeder script
│   ├── server.js                    # Main server entrypoint
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/              # Navbar, Footer, ApplyModal, EMICalculator
    │   ├── context/                 # AuthContext provider
    │   ├── pages/                   # Home, PersonalLoan, BusinessLoan, CreditScore, Admin, etc.
    │   ├── services/                # Axios API instance
    │   ├── App.jsx                  # Main router setup
    │   └── main.jsx                 # React root
    ├── index.html
    └── package.json
```
