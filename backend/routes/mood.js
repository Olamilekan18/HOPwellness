import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkInMood, getMoodLogs } from '../controllers/moodController.js';

const router = express.Router();

router.post('/checkin', protect, checkInMood);
router.get('/logs', protect, getMoodLogs);

export default router;
