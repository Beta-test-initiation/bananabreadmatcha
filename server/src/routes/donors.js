// src/routes/donors.js
import express from 'express';
import { createDonor, getDonors, updateDonor } from '../controllers/donorController.js';

const router = express.Router();

router.post('/', createDonor);
router.get('/', getDonors);
router.post('/update', updateDonor);

export default router;
