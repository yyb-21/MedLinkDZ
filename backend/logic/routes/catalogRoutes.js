import express from 'express';
import { getCategories, getMedicaments, getWilayas } from '../controllers/catalogController.js';

const router = express.Router();

// All catalog routes are public (reference data)
router.get('/categories', getCategories);
router.get('/medicaments', getMedicaments);
router.get('/wilayas', getWilayas);

export default router;
