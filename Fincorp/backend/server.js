import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB().catch((err) => console.error('[Startup DB Warning]:', err.message));

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        process.env.CLIENT_URL,
        'http://localhost:5173',
        'http://localhost:3000',
        'https://fincorp-bnwj.onrender.com',
      ].filter(Boolean);
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Uploads Folder
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Seed Default Admin User if DB connected
const initAdmin = async () => {
  try {
    await connectDB();
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Fincorp Administrator',
        email: 'admin@fincorp.com',
        mobile: '9876543210',
        password: hashedPassword,
        role: 'admin',
        isMobileVerified: true,
      });
      console.log('[System]: Created default Admin account: admin@fincorp.com / admin123');
    }
  } catch (err) {
    console.warn('[Admin Init Warning]:', err.message);
  }
};
initAdmin();

// Primary API Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Fallback Route Aliases (Handles API requests without /api prefix)
app.use('/auth', authRoutes);
app.use('/otp', otpRoutes);
app.use('/applications', applicationRoutes);

// Base Health Check
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({ success: true, message: 'Fincorp Backend API is running smoothly', time: new Date() });
});

// Serve Frontend Static Production Build (SPA Fallback for refresh issues)
const frontendDistPath = path.join(process.cwd(), '../frontend/dist');
const altFrontendDistPath = path.join(process.cwd(), 'frontend/dist');
const resolvedDist = fs.existsSync(frontendDistPath)
  ? frontendDistPath
  : fs.existsSync(altFrontendDistPath)
  ? altFrontendDistPath
  : null;

if (resolvedDist) {
  app.use(express.static(resolvedDist));
}

// Wildcard SPA Fallback - NEVER return raw text "Not Found" to browser
app.get('*', (req, res, next) => {
  // If it's an API route or file upload, return 404 JSON error
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/auth') ||
    req.path.startsWith('/otp') ||
    req.path.startsWith('/applications') ||
    req.path.startsWith('/uploads')
  ) {
    return res.status(404).json({ success: false, message: `API Endpoint ${req.path} Not Found` });
  }

  // If frontend dist is available, send index.html so React Router renders the page
  if (resolvedDist && fs.existsSync(path.join(resolvedDist, 'index.html'))) {
    return res.sendFile(path.join(resolvedDist, 'index.html'));
  }

  // Fallback: Redirect browser to Home ("/") using clean HTML redirect script
  return res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fincorp - Redirecting...</title>
        <script>
          window.location.href = "/";
        </script>
      </head>
      <body style="margin: 0; font-family: 'Segoe UI', Tahoma, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #0f172a; color: #ffffff;">
        <div style="text-align: center; padding: 20px;">
          <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">FINCORP</h2>
          <p style="color: #94a3b8; font-size: 14px; margin-bottom: 16px;">Redirecting you to Home Page...</p>
          <a href="/" style="color: #3b82f6; text-decoration: none; font-weight: 700; font-size: 14px;">Click here to return to Home</a>
        </div>
      </body>
    </html>
  `);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 [Fincorp Backend Server] listening on http://localhost:${PORT}`);
});
