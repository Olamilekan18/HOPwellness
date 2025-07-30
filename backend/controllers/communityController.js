import Community from '../models/Community.js';
import User from '../models/User.js';

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
  try {
    const community = await Community.findById(req.params.id)
      .populate('members', 'name');

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Optional: Only allow members to see more details
    const isMember = community.members.some(
      member => member._id.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this community' });
    }

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching community' });
  }
};

