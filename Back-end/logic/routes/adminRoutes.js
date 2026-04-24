import express from 'express';
import { getStats, getPending, moderateAnnonce, moderateOrdonnance } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// All admin routes require authentication + ADMIN role
router.use(authMiddleware);
router.use(roleMiddleware('ADMIN'));

router.get('/stats', getStats);
router.get('/pending', getPending);
router.patch('/moderate/:id', moderateAnnonce);
router.patch('/ordonnance/:id', moderateOrdonnance);

export default router;
