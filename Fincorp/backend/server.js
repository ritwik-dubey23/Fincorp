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
connectDB();

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
    if (mongoose.connection.readyState === 1) {
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

// Fallback Route Aliases (Handles requests without /api prefix)
app.use('/auth', authRoutes);
app.use('/otp', otpRoutes);
app.use('/applications', applicationRoutes);
app.use('/admin', adminRoutes);

// Base Health Check
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({ success: true, message: 'Fincorp Backend API is running smoothly', time: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 [Fincorp Backend Server] listening on http://localhost:${PORT}`);
});
