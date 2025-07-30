import Post from '../models/Post.js';
import Community from '../models/Community.js';

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
