// routes/challenges.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { completeChallenge,getAllChallenges, getAssignedChallenges } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/', protect, getAllChallenges);
router.get('/assigned', protect, getAssignedChallenges);
router.post('/:challengeId/complete', protect, completeChallenge);


export default router;
