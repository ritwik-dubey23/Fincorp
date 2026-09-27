# PRD.md — Project Requirements Document

## 1. Executive Summary
**Project Name**: Fincorp  
**Category**: Fintech / Banking / Lead Management & Application Platform  
**Reference Website**: CredBuddha (https://www.credbuddha.com/)  
**Target Audience**: Retail loan applicants, business owners seeking commercial capital, credit score seekers, and financial administrators.

---

## 2. Product Objectives
The primary objective of **Fincorp** is to provide a seamless, end-to-end digital borrowing experience inspired by CredBuddha's UI/UX. The platform enables users to compare loans, check free credit scores, calculate EMIs, submit lead applications via mobile OTP, and track application status while allowing administrators to review applications, request documents, and manage approval workflows.

---

## 3. Core Modules & Feature Breakdown

### A. Public Website & UI Experience
- **CredBuddha UI Clone Layout**: Clean, responsive layout with Urbanist typography, deep navy `#0c2f54` and vibrant blue `#1d4ed8` accents.
- **Header & Navigation**: Desktop pill-container menu with dropdowns (Loans, Tools), Sign In, Apply Now, and Play Store buttons. Mobile drawer menu.
- **Hero Banner**: Tagline `EMPOWERING SMARTER BORROWING`, headline `Your Smart Borrowing Partner — Fincorp`, 20+ verified lender card, and mobile app mockup.
- **Stats Banner**: Highlights 100% digital journey, 95% approval performance, 100% online processing, and 98% client satisfaction score.
- **Product Offerings**: Personal Loan, Business Loan, Free Credit Score Check, and Credit Cards.
- **Financial Tools / Loan Planner**: Interactive EMI Calculator with dynamic sliders for Loan Amount, Rate of Interest, and Tenure with visual principal/interest breakdown.
- **Footer**: Newsletter subscription box, free credit score banner, legal links (Privacy, Terms, Disclaimer, Sitemap), and floating sticky mobile CTA bar (`Get Instant Loan Online`).

### B. Lead Capture & Mobile OTP Verification
- **2-Step Lead Form**:
  - **Step 1**: Full Name (as per PAN), Mobile Number (+91), Mobile OTP verification system (rate limiting, 5-minute expiry, resend option).
  - **Step 2**: Email Address, DOB, PAN Number (10-character pattern validation), Aadhaar (12-digit numeric validation), Employment Type, Monthly Income, Requested Loan Amount, Address, City, State, and Pincode.
- **Unique Reference ID**: Generates application IDs (e.g. `FIN-2026-89412`).
- **Notification Triggers**: Triggers mock SMS and Email logs upon submission and status changes.

### C. Application Status Tracking & Customer Portal
- Track application status by Mobile Number or Application Reference ID.
- Displays live status badge (`Submitted`, `Under Review`, `Documents Required`, `Processing`, `Approved`, `Rejected`, `Completed`).
- Status history timeline with timestamps and admin remarks.
- Document upload portal supporting PDF, JPG, and PNG uploads.

### D. Admin Panel (`/admin`)
- Admin authentication with JWT (`admin@fincorp.com` / `admin123`).
- Analytics summary cards (Total Leads, New Submissions, Under Review, Documents Required, Approved, Rejected).
- Search, filter, and pagination in application table.
- Application detail view: status dropdown update, document request generator, document downloader, internal remarks history.

---

## 4. User Roles & Permissions

| Role | Access Level | Responsibilities |
|---|---|---|
| **Public Visitor** | Public Pages & Tools | Browse products, use EMI calculator, check free credit score, apply for loans. |
| **Applicant / Customer** | Status Portal (`/track-status`) | Track application status, view admin requests, upload requested PDF/image documents. |
| **Admin** | Admin Panel (`/admin`) | Review leads, update statuses, request documents from users, add internal remarks, view stats. |
