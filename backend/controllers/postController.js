import Post from '../models/Post.js';
import Community from '../models/Community.js';
import Comment from '../models/Comment.js';
import { sendNotification } from '../utils/sendNotification.js';
import Notification from '../models/Notification.js';

export const createPost = async (req, res) => {
  const { content } = req.body;
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId).populate('members');
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const isMember = community.members.some(
  (member) => member._id.toString() === req.user.id
);
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this community' });
    }

    const post = new Post({
      content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      community: communityId,
      author: req.user.id
    });

    await post.save();

    // 🔔 Notify other members
    const memberIds = community.members
      .filter(m => m._id.toString() !== req.user.id)
      .map(m => m._id);

    for (const memberId of memberIds) {
      await sendNotification({
        userId: memberId,
        type: 'community_post',
        message: `${req.user.name} posted in ${community.name}`,
        fromUser: req.user.id,
        post: post._id,
        community: communityId
      });
    }

    res.status(201).json({ message: 'Post created in community', post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};


export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate('author', 'name')               
      .populate('community', 'name')            
      .populate('likes', 'name');              

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name')               
      .sort({ createdAt: -1 });                 

    res.status(200).json({
      post,
      likeCount: post.likes.length,
      comments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post', error: error.message });
  }
};

export const likePost = async (req, res) => {

  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    } else {
      // Like
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
      likedByUser: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(postId).populate('author');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = new Comment({
      post: postId,
      author: req.user.id,
      content
    });

    await newComment.save();

    const populatedComment = await newComment.populate('author', 'name');

    if (post.author._id.toString() !== req.user.id.toString()) {
      const notification = new Notification({
        user: post.author._id,
        type: 'comment',
        message: `${req.user.name} commented on your post`,
        post: postId
      });

      await notification.save();
    }

    res.status(201).json({ message: 'Comment added', comment: populatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to comment', error: error.message });
  }
};

export const getCommunityPosts = async (req, res) => {
  const { communityId } = req.params;

  try {
    const posts = await Post.find({ community: communityId })
      .populate('author', 'name profilePic') 
      .sort({ createdAt: -1 }); 

    const postsWithDetails = await Promise.all(
      posts.map(async post => {
        const comments = await Comment.find({ post: post._id })
          .populate('author', 'username profilePic')
          .sort({ createdAt: -1 });

        return {
          ...post.toObject(),
          comments,
          likesCount: post.likes.length,
          likedBy: post.likes
        };
      })
    );

    res.status(200).json(postsWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });  
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }
    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
}

export const getPostsByCommunity = async (req, res) => {
  const { communityId } = req.params;

  try {
    const posts = await Post.find({ community: communityId })
      .populate('author', 'name') 
      .populate('community', 'name') 
      .sort({ createdAt: -1 }); 

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};
