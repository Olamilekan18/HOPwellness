import express from 'express';

import {getUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkStreak, followUser, unfollowUser, getUserCommunities } from '../controllers/userController.js';
import { getUserBadges } from '../controllers/userController.js';

const router = express.Router();
router.get('/me', protect, getUserProfile);
router.get('/streak-check', protect, checkStreak)
router.get('/badges', protect, getUserBadges);
router.post('/follow/:userId', protect, followUser);
router.post('/unfollow/:userId', protect, unfollowUser);
router.get('/communities', protect, getUserCommunities);

export default router;
