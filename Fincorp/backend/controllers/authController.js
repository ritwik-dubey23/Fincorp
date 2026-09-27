import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { sendWelcomeEmail, sendLoginNotificationEmail } from '../services/emailService.js';

// Fallback in-memory users for offline DB
const memoryUsers = [];

const generateToken = (res, userId, role) => {
  const token = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'fincorp_super_secret_jwt_key_2026_finance',
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export const register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'All mandatory fields are required' });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian mobile number' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = role === 'admin' ? 'admin' : 'user';

    let user = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
        if (userExists) {
          return res.status(400).json({ success: false, message: 'User with this email or mobile already exists' });
        }
        user = await User.create({
          name,
          email,
          mobile,
          password: hashedPassword,
          role: userRole,
        });
      } catch (dbErr) {
        console.warn('[DB Fallback Register]');
      }
    }

    if (!user) {
      const existingMem = memoryUsers.find((u) => u.email === email || u.mobile === mobile);
      if (existingMem) {
        return res.status(400).json({ success: false, message: 'User with this email or mobile already exists' });
      }
      user = {
        _id: Date.now().toString(),
        name,
        email,
        mobile,
        password: hashedPassword,
        role: userRole,
      };
      memoryUsers.push(user);
    }

    const token = generateToken(res, user._id, user.role);

    // Send Welcome Email
    sendWelcomeEmail(user).catch((err) => console.error(err));

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    let user = null;

    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email });
      } catch (dbErr) {
        console.warn('[DB Fallback Login]');
      }
    }

    if (!user) {
      user = memoryUsers.find((u) => u.email === email);
    }

    // Default admin fallback if logging into admin account
    if (!user && email === 'admin@fincorp.com' && password === 'admin123') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      user = {
        _id: 'admin-default-id',
        name: 'Fincorp Administrator',
        email: 'admin@fincorp.com',
        mobile: '9876543210',
        password: hashedPassword,
        role: 'admin',
      };
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
    }

    const token = generateToken(res, user._id, user.role);

    // Send Login Notification Email
    sendLoginNotificationEmail(user).catch((err) => console.error(err));

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
