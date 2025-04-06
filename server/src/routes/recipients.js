import express from 'express';
import { getRecipients, updateRecipient } from '../controllers/recipientController.js';

const router = express.Router();

router.get('/', getRecipients);
router.post('/update', updateRecipient);

export default router;