import express from 'express';
import { createPost, likePost, commentOnPost, getPostById, getCommunityPosts, deletePost, getPostsByCommunity  } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/community/:communityId',
  protect,
  upload.single('image'), // for image upload
  createPost
);
router.post('/:postId/like', protect, likePost);
router.post('/:postId/comment', protect, commentOnPost);
router.get('/:postId', protect, getPostById);
router.get('/community/:communityId/posts', protect, getCommunityPosts);
router.get('/community/:communityId', protect, getPostsByCommunity);
router.delete('/:postId', protect, deletePost);
export default router;
