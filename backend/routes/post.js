import express from 'express';
import { createPost, likePost, commentOnPost, getPostById, getCommunityPosts  } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/community/:communityId', protect, createPost);
router.post('/:postId/like', protect, likePost);
router.post('/:postId/comment', protect, commentOnPost);
router.get('/:postId', protect, getPostById);
router.get('/community/:communityId/posts', protect, getCommunityPosts);
export default router;
