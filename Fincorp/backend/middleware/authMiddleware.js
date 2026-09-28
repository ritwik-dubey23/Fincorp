import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

export const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no session token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fincorp_super_secret_jwt_key_2026_finance');
    
    await connectDB();

    let user = null;
    if (decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        console.warn('[DB Lookup Error in protect]:', dbErr.message);
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Session expired or user not found. Please log in again.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Administrator privilege required' });
  }
};
