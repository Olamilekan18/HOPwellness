import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkInMood } from '../controllers/moodController.js';

const router = express.Router();

router.post('/checkin', protect, checkInMood);

export default router;
