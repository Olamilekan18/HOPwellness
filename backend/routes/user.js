import express from 'express';

import {getUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkStreak } from '../controllers/userController.js';
import { getUserBadges } from '../controllers/userController.js';

const router = express.Router();
router.get('/me', protect, getUserProfile);
router.get('/streak-check', protect, checkStreak)
router.get('/badges', protect, getUserBadges);

export default router;
