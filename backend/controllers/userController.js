import User from "../models/User.js";
import { badgeDefinitions } from "../utils/badgeDefinitions.js";
import Community from "../models/Community.js";
import UserProfile from "../models/UserProfile.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name email xp streak badges");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const checkStreak = async (req, res) => {
  const user = await User.findById(req.user._id);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (!user.streak || typeof user.streak !== 'object') {
  user.streak = { count: 0, lastDate: null };
}

  const lastDate = user.streak?.lastDate
    ? new Date(user.streak.lastDate)
    : null;

  if (!lastDate || lastDate.toDateString() !== today.toDateString()) {
    if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
      user.streak.count += 1;
    } else {
      user.streak.count = 1;
    }
    user.streak.lastDate = today;
    await user.save();
  }

  res.status(200).json({
    currentStreak: user.streak.count,
    lastDate: user.streak.lastDate,
  });
};

export const getUserBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const earnedBadges = badgeDefinitions.filter(b =>
      user.badges.includes(b.id)
    );
    console.log(user.badges),

    res.status(200).json({
      
      earned: user.badges.map(badgeId => {
        const badge = earnedBadges.find(b => b.id === badgeId);
        return {
          id: badge.id,
          name: badge.name,
          description: badge.description,
          conditionMet: badge.condition(user),
        };
      }),
      badgeIds: user.badges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch badges" });
  }
};


export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const followUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = await User.findById(req.user.id);

  if (!currentUser.following.includes(userId)) {
    currentUser.following.push(userId);
    await currentUser.save();
    
    const followedUser = await User.findById(userId);
    followedUser.followers.push(req.user.id);
    await followedUser.save();
  }

  res.status(200).json({ message: 'Followed' });
};

export const unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = await User.findById(req.user.id);

  currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
  await currentUser.save();

  const unfollowedUser = await User.findById(userId);
  unfollowedUser.followers = unfollowedUser.followers.filter(id => id.toString() !== req.user.id);
  await unfollowedUser.save();

  res.status(200).json({ message: 'Unfollowed' });
};

export const getUserCommunities = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('communities');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ communities: user.communities });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user communities', error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const heightInMeters = profile.height / 100;
    const bmi = (profile.weight / (heightInMeters ** 2)).toFixed(1);

    res.json({ profile, bmi });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
}