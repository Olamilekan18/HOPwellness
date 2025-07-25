import User from "../models/User.js";
import { badgeDefinitions } from "../utils/badgeDefinitions.js";

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

  const lastDate = user.streak?.lastDate
    ? new Date(user.streak.lastDate)
    : null;

  if (!lastDate || lastDate.toDateString() !== today.toDateString()) {
    if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
      // Visited yesterday — continue streak
      user.streak.count += 1;
    } else {
      // Missed a day — reset streak
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
      badgeIds: user.badges, // Optional raw list
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