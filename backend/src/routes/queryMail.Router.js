import express from 'express';
import { sendQueryEmail } from '../controllers/queryController.js';

const router = express.Router();

router.post('/api/send-query', sendQueryEmail);

export default router;