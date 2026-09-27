import express from 'express';
import {
  getDashboardStats,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  requestDocument,
  addAdminRemark,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/applications', getApplications);
router.get('/applications/:id', getApplicationById);
router.put('/applications/:id/status', updateApplicationStatus);
router.post('/applications/:id/request-doc', requestDocument);
router.post('/applications/:id/remark', addAdminRemark);

export default router;
