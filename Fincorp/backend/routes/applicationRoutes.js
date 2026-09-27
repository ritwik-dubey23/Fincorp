import express from 'express';
import { createApplication, trackApplication, uploadDocument } from '../controllers/applicationController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/apply', createApplication);
router.get('/track/:query', trackApplication);
router.post('/upload-doc', upload.single('file'), uploadDocument);

export default router;
