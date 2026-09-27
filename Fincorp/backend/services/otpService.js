import Otp from '../models/Otp.js';
import mongoose from 'mongoose';
import { sendEmail } from './emailService.js';

// In-memory OTP store for offline/unreachable DB environments
const memoryOtps = new Map();

export const sendOtpService = async ({ mobile, email }) => {
  if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
    throw new Error('Please enter a valid 10-digit Indian mobile number');
  }

  // Rate Limiting Cooldown: 60s
  const now = Date.now();
  const existingMemOtp = memoryOtps.get(mobile);
  if (existingMemOtp && now - existingMemOtp.createdAt < 60 * 1000) {
    throw new Error('Please wait 60 seconds before requesting a new OTP');
  }

  // Generate 6-digit random OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(now + 5 * 60 * 1000); // 5 minutes expiry

  const otpData = {
    mobile,
    otp: generatedOtp,
    expiresAt,
    attempts: 0,
    isVerified: false,
    createdAt: now,
  };

  memoryOtps.set(mobile, otpData);

  // Attempt DB Save if DB connected
  if (mongoose.connection.readyState === 1) {
    try {
      await Otp.deleteMany({ mobile });
      await Otp.create({ mobile, otp: generatedOtp, expiresAt });
    } catch (dbErr) {
      console.warn('[OTP DB Warning]: Saved OTP in fallback memory store');
    }
  }

  // Dispatch OTP notification based on active provider
  const provider = process.env.OTP_PROVIDER || 'mock';
  console.log(`[OTP SENT (${provider.toUpperCase()})]: Mobile: ${mobile} | OTP: ${generatedOtp}`);

  if (email) {
    await sendEmail({
      to: email,
      subject: 'Fincorp Verification OTP',
      html: `<h3>Your Fincorp OTP is: <strong>${generatedOtp}</strong></h3><p>Valid for 5 minutes.</p>`,
    });
  }

  return { success: true, message: 'OTP sent successfully', otpPreview: generatedOtp };
};

export const verifyOtpService = async ({ mobile, otp }) => {
  if (!mobile || !otp) {
    throw new Error('Mobile number and OTP are required');
  }

  let otpRecord = null;

  // Check DB if connected
  if (mongoose.connection.readyState === 1) {
    try {
      otpRecord = await Otp.findOne({ mobile });
    } catch (dbErr) {
      console.warn('[OTP DB Fallback Lookup]');
    }
  }

  // Check memory store if DB lookup empty or failed
  if (!otpRecord) {
    otpRecord = memoryOtps.get(mobile);
  }

  if (!otpRecord) {
    throw new Error('OTP expired or not requested. Please request a new OTP.');
  }

  if (otpRecord.attempts >= 5) {
    memoryOtps.delete(mobile);
    throw new Error('Too many failed attempts. Please request a new OTP.');
  }

  if (new Date() > new Date(otpRecord.expiresAt)) {
    memoryOtps.delete(mobile);
    throw new Error('OTP has expired. Please request a new OTP.');
  }

  if (otpRecord.otp !== otp) {
    otpRecord.attempts = (otpRecord.attempts || 0) + 1;
    throw new Error('Invalid OTP. Please check and try again.');
  }

  otpRecord.isVerified = true;
  memoryOtps.set(mobile, otpRecord);

  return { success: true, isVerified: true };
};
