import express from 'express';
import {
  sendApplicationOtp,
  verifyApplicationOtp,
  createApplication,
  trackApplication,
  uploadDocument,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/send-otp', protect, sendApplicationOtp);
router.post('/verify-otp', protect, verifyApplicationOtp);
router.post('/apply', protect, createApplication);

router.get('/track/:query', trackApplication);
router.post('/upload-doc', protect, upload.single('file'), uploadDocument);

export default router;
