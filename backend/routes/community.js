import express from 'express';
import { createCommunity, joinCommunity, getAllCommunities, getCommunityById, leaveCommunity, getCommunityStats, getUserCommunities } from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my', protect, getUserCommunities);
router.post('/create', protect, createCommunity);
router.post('/join/:id', protect, joinCommunity);
router.get('/', getAllCommunities);
router.get('/:id', protect, getCommunityById);
router.post('/leave/:id', protect, leaveCommunity);
router.get('/:id/stats', protect, getCommunityStats); 
router.get('/my', protect, getUserCommunities);

export default router;
