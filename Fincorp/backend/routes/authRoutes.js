import express from 'express';
import {
  register,
  login,
  otpUserAuth,
  getMe,
  logout,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/otp-user', otpUserAuth);
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout);

router.post('/forgot-password/send-otp', sendForgotPasswordOtp);
router.post('/forgot-password/verify-otp', verifyForgotPasswordOtp);
router.post('/forgot-password/reset-password', resetPassword);

export default router;
