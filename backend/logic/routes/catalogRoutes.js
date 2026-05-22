import express from 'express';
import { getCategories, getMedicaments, getWilayas, getSummary } from '../controllers/catalogController.js';

const router = express.Router();

// All catalog routes are public (reference data)
router.get('/categories', getCategories);
router.get('/medicaments', getMedicaments);
router.get('/wilayas', getWilayas);
router.get('/summary', getSummary);

export default router;
