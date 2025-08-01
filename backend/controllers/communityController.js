import Community from '../models/Community.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import Post from '../models/Post.js';


export const createCommunity = async (req, res) => {
  const { name, description } = req.body;
  const community = new Community({ name, description, members: [req.user.id] });
  await community.save();

  const user = await User.findById(req.user.id);
  user.communities.push(community._id);
  await user.save();

  res.status(201).json(community);
};

export const joinCommunity = async (req, res) => {
  const { id } = req.params;
  const community = await Community.findById(id);
  if (!community.members.includes(req.user.id)) {
    community.members.push(req.user.id);
    await community.save();
  }

  const user = await User.findById(req.user.id);
  if (!user.communities.includes(id)) {
    user.communities.push(id);
    await user.save();
  }

  res.status(200).json({ message: 'Joined community' });
};

export const leaveCommunity = async (req, res) => {
  const { id } = req.params;
  const community = await Community.findById(id);
  
  if (community.members.includes(req.user.id)) {
    community.members = community.members.filter(member => member.toString() !== req.user.id);
    await community.save();
  }

  const user = await User.findById(req.user.id);
  user.communities = user.communities.filter(communityId => communityId.toString() !== id);
  await user.save();

  res.status(200).json({ message: 'Left community' });
}

export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate('members', 'name');
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching communities' });
  }
};

export const getCommunityById = async (req, res) => {
  const communityId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(communityId)) {
    return res.status(400).json({ message: 'Invalid community ID' });
  }

  try {
    const community = await Community.findById(communityId).populate('members', 'name');

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const isMember = community.members.some(
      member => member._id.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this community' });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error fetching community', error: error.message });
  }
};


export const getCommunityStats = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id).populate('members');

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const posts = await Post.find({ community: id }).populate('author');

    const totalPosts = posts.length;

    const userPostMap = {};
    posts.forEach(post => {
      const userId = post.author._id.toString();
      userPostMap[userId] = (userPostMap[userId] || 0) + 1;
    });

    const mostActiveUserId = Object.keys(userPostMap).reduce((a, b) =>
      userPostMap[a] > userPostMap[b] ? a : b
    , null);

    const mostActiveUser = mostActiveUserId
      ? await User.findById(mostActiveUserId).select('name')
      : null;

    const recentPosts = posts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.json({
      totalMembers: community.members.length,
      totalPosts,
      mostActiveUser,
      recentActivity: recentPosts.map(post => ({
        id: post._id,
        content: post.content,
        author: post.author.name,
        createdAt: post.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching community stats', error: error.message });
  }
};