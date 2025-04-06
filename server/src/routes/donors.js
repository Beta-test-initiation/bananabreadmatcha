// src/routes/donors.js
import express from 'express';
import { createDonor, getDonors } from '../controllers/donorController.js';

const router = express.Router();

router.post('/', createDonor);
router.get('/', getDonors);

export default router;
