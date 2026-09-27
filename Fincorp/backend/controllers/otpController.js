import { sendOtpService, verifyOtpService } from '../services/otpService.js';

export const sendOtp = async (req, res) => {
  try {
    const { mobile, email } = req.body;
    const result = await sendOtpService({ mobile, email });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const result = await verifyOtpService({ mobile, otp });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Invalid OTP' });
  }
};
