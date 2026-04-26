import express from 'express';
import {
    getAnnonces,
    getAnnonceById,
    getMyAnnonces,
    createAnnonce,
    updateAnnonce,
    deleteAnnonce
} from '../controllers/annonceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Protected routes (require JWT) — must be before /:id to avoid matching
router.get('/user/my-annonces', authMiddleware, getMyAnnonces);
router.post('/', authMiddleware, upload.array('images', 5), createAnnonce);
router.put('/:id', authMiddleware, updateAnnonce);
router.delete('/:id', authMiddleware, deleteAnnonce);

// Public routes — /:id must be last (catches any param)
router.get('/', getAnnonces);
router.get('/:id', getAnnonceById);

export default router;
