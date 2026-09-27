import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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
    
    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch (dbErr) {
      console.warn('[DB Auth Fallback]');
    }

    if (!user) {
      // Fallback user object if DB offline or user logged in via fallback
      user = {
        _id: decoded.id,
        name: decoded.role === 'admin' ? 'Fincorp Administrator' : 'Fincorp User',
        email: decoded.role === 'admin' ? 'admin@fincorp.com' : 'user@fincorp.com',
        role: decoded.role || 'user',
      };
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
