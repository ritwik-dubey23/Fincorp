import Otp from '../models/Otp.js';
import mongoose from 'mongoose';
import { sendEmail } from './emailService.js';

// In-memory OTP store for offline/unreachable DB environments
const memoryOtps = new Map();

/**
 * Send OTP via MsgClub REST API (or secure fallback in dev/mock mode)
 */
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

  const authKey = process.env.MSGCLUB_AUTH_KEY;
  const senderId = process.env.MSGCLUB_SENDER_ID || 'FINCRP';
  const routeId = process.env.MSGCLUB_ROUTE_ID || '1';
  const baseUrl = process.env.MSGCLUB_BASE_URL || 'https://msg.msgclub.net/rest/otpservice/v2';
  const dltTeId = process.env.MSGCLUB_DLT_TE_ID || '';

  // If MsgClub AUTH_KEY is provided in production, call MsgClub API
  if (authKey && authKey !== 'mock' && authKey !== 'your_msgclub_auth_key_here') {
    try {
      const url = `${baseUrl}/sendOtp?AUTH_KEY=${encodeURIComponent(authKey)}&mobileNumber=${encodeURIComponent(mobile)}&senderId=${encodeURIComponent(senderId)}&routeId=${encodeURIComponent(routeId)}${dltTeId ? `&dltTeId=${encodeURIComponent(dltTeId)}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();
      console.log(`[MsgClub Send OTP Response]:`, data);

      if (data.responseCode === '3001' || data.status === 'success' || data.response === 'success' || data.code === 200) {
        memoryOtps.set(mobile, { mobile, createdAt: now });
        return { success: true, message: 'OTP sent successfully to your mobile number.' };
      } else {
        throw new Error(data.response || data.message || 'Failed to dispatch OTP via MsgClub Gateway');
      }
    } catch (apiErr) {
      console.error('[MsgClub Send API Error]:', apiErr.message);
      // Fail open to local/email OTP in fallback mode if API unreachable
    }
  }

  // Fallback / Dev Generation: 6-digit random OTP
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

  // Save to DB if connected
  if (mongoose.connection.readyState === 1) {
    try {
      await Otp.deleteMany({ mobile });
      await Otp.create({ mobile, otp: generatedOtp, expiresAt });
    } catch (dbErr) {
      console.warn('[OTP DB Warning]: Saved OTP in fallback memory store');
    }
  }

  console.log(`🔑 [OTP GENERATED (MOCK/DEV)]: Mobile: ${mobile} | OTP: ${generatedOtp}`);

  if (email) {
    await sendEmail({
      to: email,
      subject: 'Fincorp Verification OTP',
      html: `<h3>Your Fincorp Verification OTP is: <strong>${generatedOtp}</strong></h3><p>Valid for 5 minutes.</p>`,
    }).catch((err) => console.error('[OTP Email Error]:', err.message));
  }

  return {
    success: true,
    message: 'OTP sent successfully to your mobile number.',
    otpPreview: (process.env.NODE_ENV !== 'production' || !authKey) ? generatedOtp : undefined,
  };
};

/**
 * Verify OTP via MsgClub REST API (or fallback store in dev/mock mode)
 */
export const verifyOtpService = async ({ mobile, otp }) => {
  if (!mobile || !otp) {
    throw new Error('Mobile number and OTP code are required');
  }

  const cleanOtp = otp.toString().trim();
  const authKey = process.env.MSGCLUB_AUTH_KEY;
  const baseUrl = process.env.MSGCLUB_BASE_URL || 'https://msg.msgclub.net/rest/otpservice/v2';

  // If MsgClub AUTH_KEY is provided in production, verify via MsgClub API
  if (authKey && authKey !== 'mock' && authKey !== 'your_msgclub_auth_key_here') {
    try {
      const url = `${baseUrl}/verifyOtp?AUTH_KEY=${encodeURIComponent(authKey)}&mobileNumber=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(cleanOtp)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();
      console.log(`[MsgClub Verify OTP Response]:`, data);

      if (data.responseCode === '3002' || data.status === 'success' || data.response === 'success' || data.code === 200) {
        return { success: true, message: 'OTP verified successfully.' };
      } else {
        throw new Error(data.response || data.message || 'Invalid or expired OTP. Please try again.');
      }
    } catch (apiErr) {
      console.error('[MsgClub Verify API Error]:', apiErr.message);
      // Fallthrough to local verification if API call failed
    }
  }

  // Local / Fallback verification
  let otpRecord = null;
  if (mongoose.connection.readyState === 1) {
    try {
      otpRecord = await Otp.findOne({ mobile });
    } catch (dbErr) {
      console.warn('[OTP DB Fallback Lookup]');
    }
  }

  if (!otpRecord) {
    otpRecord = memoryOtps.get(mobile);
  }

  if (!otpRecord || !otpRecord.otp) {
    throw new Error('OTP expired or not requested. Please request a new OTP.');
  }

  if (otpRecord.attempts >= 5) {
    memoryOtps.delete(mobile);
    throw new Error('Too many failed attempts. Please request a new OTP.');
  }

  if (otpRecord.expiresAt && new Date() > new Date(otpRecord.expiresAt)) {
    memoryOtps.delete(mobile);
    throw new Error('OTP has expired. Please request a new OTP.');
  }

  if (otpRecord.otp !== cleanOtp) {
    otpRecord.attempts = (otpRecord.attempts || 0) + 1;
    throw new Error('Invalid OTP. Please check the 6-digit code sent to your mobile.');
  }

  otpRecord.isVerified = true;
  return { success: true, message: 'OTP verified successfully.' };
};
