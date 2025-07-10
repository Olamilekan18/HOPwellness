// controllers/moodController.js
import Mood from '../models/Mood.js';
import User from '../models/User.js';

export const checkInMood = async (req, res) => {
  const userId = req.user._id;
  const { emoji, note } = req.body;

  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const alreadyCheckedIn = await Mood.findOne({
      user: userId,
      date: { $gte: startOfDay }
    });

    // Optional: prevent double check-in
    // if (alreadyCheckedIn) {
    //   return res.status(400).json({ message: 'Already checked in today' });
    // }

    const mood = await Mood.create({ user: userId, emoji, note });

    const user = await User.findById(userId);

    if (!user.streak || typeof user.streak.count !== 'number') {
      user.streak = { count: 0, lastDate: null };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const yesterdayCheckIn = await Mood.findOne({
      user: userId,
      date: {
        $gte: yesterday,
        $lt: new Date(yesterday.getTime() + 86400000),
      },
    });

    if (yesterdayCheckIn && user.streak.lastDate?.toDateString() === yesterday.toDateString()) {
      user.streak.count += 1;
    } else {
      user.streak.count = 1;
    }

    user.streak.lastDate = startOfDay;

    // XP
    user.xp += 5;
    user.moodLogs.push(mood._id);

    await user.save();

    res.status(201).json({
      message: 'Check-in successful',
      xp: user.xp,
      streak: user.streak,
      mood,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Mood check-in failed' });
  }
};
export const getMoodLogs = async (req, res) => {
  const userId = req.user._id;

  try {
    const moodLogs = await Mood.find({ user: userId })
      .sort({ date: -1 })
      .populate('user', 'name');

    res.status(200).json(moodLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch mood logs' });
  }
};