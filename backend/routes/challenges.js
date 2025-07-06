// routes/challenges.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { completeChallenge,getAllChallenges, getAssignedChallenges } from '../controllers/challengeController.js';

const router = express.Router();

router.post('/:id/complete', protect, completeChallenge);
router.get('/', protect, getAllChallenges);
router.get('/assigned', protect, getAssignedChallenges);

export default router;
