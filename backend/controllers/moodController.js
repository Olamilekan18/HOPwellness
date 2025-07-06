// controllers/moodController.js
import Mood from '../models/Mood.js';
import User from '../models/User.js';

export const checkInMood = async (req, res) => {
  const userId = req.user._id;
  const { emoji, note } = req.body;

  try {
    // 1. Check if user already checked in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const alreadyCheckedIn = await Mood.findOne({
      user: userId,
      date: { $gte: startOfDay }
    });

    if (alreadyCheckedIn) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    // 2. Save mood
    const mood = await Mood.create({ user: userId, emoji, note });
    
    // 3. Update XP & Streak
    const user = await User.findById(userId);
    
    // Check if yesterday was last check-in
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const yesterdayCheckIn = await Mood.findOne({
      user: userId,
      date: {
        $gte: yesterday,
        $lt: new Date(yesterday.getTime() + 86400000)
      }
    });

    // If yesterday was checked in, increase streak
    user.streak = yesterdayCheckIn ? user.streak + 1 : 1;
    user.xp += 5; // reward amount
    user.moodLogs.push(mood._id);

    await user.save();

    res.status(201).json({
      message: 'Check-in successful',
      xp: user.xp,
      streak: user.streak,
      mood
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Mood check-in failed' });
  }
};
