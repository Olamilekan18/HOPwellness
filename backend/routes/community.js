import express from 'express';
import { createCommunity, joinCommunity, getAllCommunities, getCommunityById, leaveCommunity} from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createCommunity);
router.post('/join/:id', protect, joinCommunity);
router.get('/', getAllCommunities);
router.get('/:id', getCommunityById);
router.post('/leave/:id', protect, leaveCommunity);

export default router;
