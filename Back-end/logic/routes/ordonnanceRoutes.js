import express from 'express';
import { uploadOrdonnance, getOrdonnance } from '../controllers/ordonnanceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Protected routes (require JWT)
router.post('/upload', authMiddleware, upload.single('ordonnance'), uploadOrdonnance);
router.get('/:id', authMiddleware, getOrdonnance);

export default router;
