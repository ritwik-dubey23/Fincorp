# Fincorp - Fintech Lead & Application Management Platform

**Fincorp** is a complete, production-ready MERN-stack banking & financial services web application built according to the provided specification, reference screenshots, and design language inspired by [CredBuddha](https://www.credbuddha.com/).

---

## 🌟 Key Features

### 1. **Public Website (CredBuddha Design Recreation)**
- **Header & Navbar**: Pill-shaped desktop menu container with dropdowns for Loans (Personal, Business) & Tools, CTA buttons ("Sign In", "Apply Now"). Mobile navigation drawer.
- **Hero Section**: Tag pill (`EMPOWERING SMARTER BORROWING`), headline, subtitle, floating feature card (`20+ Verified Lenders`), and app mockup.
- **Funfact/Stats Bar**: Dark theme banner displaying digital journey, approval rate, and client satisfaction metrics.
- **Product Cards**: Personal Loan, Business Loan, Free Credit Score card, and Credit Cards.
- **Finance Tools / Loan Planner**: Interactive EMI Calculator with dynamic sliders for Amount, Rate, and Tenure with principal/interest breakdown.
- **3-Step Application Guide**: Visual breakdown of application steps.
- **Footer & Floating Mobile Bar**: Includes newsletter subscription, free credit score banner, legal links, and floating bottom sticky bar for mobile users.

### 2. **Lead Capture & Application System**
- **2-Step Application Modal & Form**:
  - **Step 1**: Full Name (as per PAN), Mobile Number (+91), Mobile OTP verification system with rate limiting and 5-minute expiry.
  - **Step 2**: Email, DOB, PAN (10-character pattern validation), Aadhaar (12-digit validation), Employment Type, Monthly Income, Requested Loan Amount, Address details.
- **Application Reference Number**: Generates unique IDs (e.g. `FIN-2026-89412`).
- **Automated Notifications**: Triggers SMS and Email logs upon submission and status updates.

### 3. **Application Status Tracking & Document Portal**
- Track status using Mobile Number or Application Reference ID.
- Live status badges (`Submitted`, `Under Review`, `Documents Required`, `Processing`, `Approved`, `Rejected`, `Completed`).
- Status history timeline with timestamps and admin remarks.
- Document upload portal supporting PDF, JPG, and PNG uploads.

### 4. **Administrative Management Panel (`/admin`)**
- **Admin Authentication**: JWT-based secure authentication (`admin@fincorp.com` / `admin123`).
- **Analytics Dashboard**: Summary cards for Total Leads, New Submissions, Under Review, Documents Required, Approved, Rejected.
- **Lead Registry Table**: Search by Name, Mobile, PAN, or Ref ID; filter by status and product type; pagination.
- **Application Detail View**:
  - Full customer profile & financial details.
  - Status update dropdown with custom customer remarks and notification triggers.
  - Document request tool to request specific documents (e.g. salary slip) from customers.
  - View & download customer uploaded documents.
  - Internal admin remarks history.

---

## 🏗️ Project Structure

```text
Fincorp/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── adminController.js    # Admin analytics & status updates
│   │   ├── applicationController.js # Lead submission & document uploads
│   │   ├── authController.js     # Admin & user JWT authentication
│   │   └── otpController.js      # SMS OTP generation & verification
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT & admin protection middleware
│   │   └── uploadMiddleware.js   # Multer storage configuration
│   ├── models/
│   │   ├── Application.js        # Lead application Mongoose schema
│   │   ├── Otp.js                # OTP verification Mongoose schema
│   │   └── User.js               # User & Admin Mongoose schema
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   └── otpRoutes.js
│   ├── utils/
│   │   └── notifications.js      # SMS & Email notification triggers
│   ├── .env                      # Database URI & secrets
│   ├── seedAdmin.js              # Script to seed default admin
│   ├── server.js                 # Express server bootstrap
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ApplyModal.jsx     # 2-Step Lead form with OTP
    │   │   ├── EMICalculator.jsx  # Interactive loan calculator
    │   │   ├── Footer.jsx         # CredBuddha styled footer + mobile CTA
    │   │   └── Navbar.jsx         # CredBuddha styled navbar
    │   ├── context/
    │   │   └── AuthContext.jsx    # Auth state provider
    │   ├── pages/
    │   │   ├── About.jsx
    │   │   ├── AdminApplicationDetailPage.jsx
    │   │   ├── AdminApplicationsPage.jsx
    │   │   ├── AdminDashboardPage.jsx
    │   │   ├── AdminLoginPage.jsx
    │   │   ├── BusinessLoan.jsx
    │   │   ├── Contact.jsx
    │   │   ├── CreditCard.jsx
    │   │   ├── CreditScore.jsx
    │   │   ├── Home.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── PersonalLoan.jsx
    │   │   ├── SignUpPage.jsx
    │   │   ├── ToolsPage.jsx
    │   │   └── TrackStatusPage.jsx
    │   ├── services/
    │   │   └── api.js             # Axios instance
    │   ├── App.jsx                # Router & main app layout
    │   ├── index.css              # Styling
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🗄️ Database Configuration

- **Database Connection**: MongoDB Atlas
- **URI**: Stored securely in `backend/.env`
- **Default Admin Account**:
  - **Email**: `admin@fincorp.com`
  - **Password**: `admin123`

---

## 🚀 How to Run

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
Backend will start on `http://localhost:8000`.

### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on `http://localhost:5173`.
