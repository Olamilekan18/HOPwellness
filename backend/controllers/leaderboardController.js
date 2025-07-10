import User from "../models/User.js";

export const getXpLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({}, 'name xp email streak badges') 
      .sort({ xp: -1 })       
      .limit(10);             

    res.status(200).json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

export const getStreakLeaderboard = async (req, res) => {
  try {
    const topStreakers = await User.find({}, 'name xp streak badges')
      .sort({ 'streak.count': -1 }) 
      .limit(10);

    res.status(200).json(topStreakers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch streak leaderboard" });
  }
};


