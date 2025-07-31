import Post from '../models/Post.js';
import Community from '../models/Community.js';
import Comment from '../models/Comment.js';

export const createPost = async (req, res) => {
  const { content } = req.body;
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Only members can post
    const isMember = community.members.some(
      (member) => member.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this community' });
    }

    const post = new Post({
      content,
      community: communityId,
      author: req.user.id
    });

    await post.save();

    res.status(201).json({ message: 'Post created in community', post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate('author', 'name')               // show author's name
      .populate('community', 'name')            // show community name
      .populate('likes', 'name');               // show who liked the post

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name')               // include comment author's name
      .sort({ createdAt: -1 });                 // newest comments first

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
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user.id;

    const index = post.likes.indexOf(userId);

    if (index === -1) {
      // User has not liked before, so like it
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: 'Post liked' });
    } else {
      // User already liked, so unlike
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({ message: 'Post unliked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to like/unlike post', error: error.message });
  }
};


export const commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = new Comment({
      post: postId,
      author: req.user.id,
      content
    });

    await newComment.save();

    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to comment', error: error.message });
  }
};

export const getCommunityPosts = async (req, res) => {
  const { communityId } = req.params;

  try {
    const posts = await Post.find({ community: communityId })
      .populate('author', 'name profilePic') // show author details
      .sort({ createdAt: -1 }); // newest first

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

