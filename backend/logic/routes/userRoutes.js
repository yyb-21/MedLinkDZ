import express from 'express';
import { registerUser, loginUser, getMe, updateProfile, forgotPassword, resetPassword, verifyEmail, resendVerification } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

// Protected routes (require JWT)
router.get('/me', authMiddleware, getMe);
router.patch('/update-profile', authMiddleware, upload.single('avatar'), updateProfile);

export default router;
