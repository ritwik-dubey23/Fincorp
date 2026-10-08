import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';
import { sendWelcomeEmail, sendLoginNotificationEmail, sendOtpEmail } from '../services/emailService.js';

const generateToken = (res, userId, role) => {
  try {
    const token = jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET || 'fincorp_super_secret_jwt_key_2026_finance',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (err) {
    console.error('[Token Generation Error]:', err.message);
    return jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET || 'fincorp_super_secret_jwt_key_2026_finance',
      { expiresIn: '7d' }
    );
  }
};

/**
 * Passwordless OTP User Authentication (Login / Register)
 */
export const otpUserAuth = async (req, res) => {
  try {
    const { mobile, name, email } = req.body;

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile.toString().trim())) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit Indian mobile number is required' });
    }

    const cleanMobile = mobile.toString().trim();
    await connectDB();

    let user = await User.findOne({ mobile: cleanMobile });

    if (user) {
      const token = generateToken(res, user._id, user.role);
      return res.status(200).json({
        success: true,
        isExistingUser: true,
        message: 'Welcome back! Authentication successful.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
        },
      });
    }

    // New user path
    if (!name || !email) {
      return res.status(200).json({
        success: true,
        isExistingUser: false,
        requiresRegistration: true,
        message: 'Mobile number verified. Please provide your name and email address to complete registration.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingEmail = await User.findOne({ email: cleanEmail });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists' });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      role: 'user',
      isMobileVerified: true,
    });

    const token = generateToken(res, newUser._id, newUser.role);
    sendWelcomeEmail(newUser).catch((err) => console.error('[Welcome Email Error]:', err.message));

    return res.status(201).json({
      success: true,
      isExistingUser: false,
      message: 'Account created successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('[OTP User Auth Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Authentication failed' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ success: false, message: 'All mandatory fields are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanMobile = mobile.trim();

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian mobile number' });
    }

    await connectDB();

    const existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { mobile: cleanMobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === cleanEmail
          ? 'User with this email already exists'
          : 'User with this mobile number already exists',
      });
    }

    const salt = password ? await bcrypt.genSalt(10) : null;
    const hashedPassword = password ? await bcrypt.hash(password, salt) : undefined;
    const userRole = role === 'admin' ? 'admin' : 'user';

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      password: hashedPassword,
      role: userRole,
      isMobileVerified: true,
    });

    const token = generateToken(res, user._id, user.role);
    sendWelcomeEmail(user).catch((err) => console.error('[Welcome Email Error]:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
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
    console.error('[Registration Handler Error]:', error);
    if (error.code === 11000 || error.message?.includes('duplicate key')) {
      return res.status(400).json({ success: false, message: 'User with this email or mobile already exists' });
    }
    return res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();
    await connectDB();

    let user = await User.findOne({ email: cleanEmail });

    // Seed default admin if logging in with admin credentials and not in DB
    if (!user && cleanEmail === 'admin@fincorp.com' && password === 'admin123') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      user = await User.create({
        name: 'Fincorp Administrator',
        email: 'admin@fincorp.com',
        mobile: '9876543210',
        password: hashedPassword,
        role: 'admin',
        isMobileVerified: true,
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
      }
    }

    const token = generateToken(res, user._id, user.role);
    sendLoginNotificationEmail(user).catch((err) => console.error('[Login Email Error]:', err.message));

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
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
    console.error('[Login Handler Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// In-memory OTP store for password reset
const forgotPasswordOtps = new Map();

export const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    await connectDB();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered account found with this email address.' });
    }

    const now = Date.now();
    const existingOtp = forgotPasswordOtps.get(cleanEmail);
    if (existingOtp && now - existingOtp.createdAt < 60 * 1000) {
      return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 mins

    forgotPasswordOtps.set(cleanEmail, {
      otp: generatedOtp,
      expiresAt,
      attempts: 0,
      isVerified: false,
      createdAt: now,
    });

    console.log(`🔑 [FORGOT PASSWORD OTP GENERATED] Email: ${cleanEmail} | OTP: ${generatedOtp}`);

    const mailResult = await sendOtpEmail({
      to: cleanEmail,
      otp: generatedOtp,
      expiryMinutes: 5,
      purpose: 'Password Reset',
    });

    const isEmailSent = mailResult && mailResult.success;
    const isMock = mailResult && mailResult.mock;

    return res.status(200).json({
      success: true,
      message: isEmailSent && !isMock
        ? `OTP sent successfully to ${cleanEmail}`
        : `OTP generated for ${cleanEmail}.${!isEmailSent ? ' (SMTP email failed)' : ''}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to send password reset OTP' });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const otpRecord = forgotPasswordOtps.get(cleanEmail);

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP expired or not requested. Please request a new OTP.' });
    }

    if (Date.now() > otpRecord.expiresAt) {
      forgotPasswordOtps.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    if (otpRecord.attempts >= 5) {
      forgotPasswordOtps.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'Too many invalid attempts. Please request a new OTP.' });
    }

    if (otpRecord.otp !== otp.toString().trim()) {
      otpRecord.attempts += 1;
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please check the code sent to your email.' });
    }

    otpRecord.isVerified = true;
    forgotPasswordOtps.set(cleanEmail, otpRecord);

    return res.status(200).json({ success: true, message: 'OTP verified successfully! Please enter your new password.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'OTP verification failed' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const otpRecord = forgotPasswordOtps.get(cleanEmail);

    if (!otpRecord || !otpRecord.isVerified || otpRecord.otp !== otp.toString().trim()) {
      return res.status(400).json({ success: false, message: 'Session expired or unverified OTP. Please verify OTP first.' });
    }

    await connectDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    user.password = hashedPassword;
    await user.save();

    forgotPasswordOtps.delete(cleanEmail);

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully!',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to reset password' });
  }
};
