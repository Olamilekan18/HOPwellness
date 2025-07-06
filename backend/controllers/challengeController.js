// controllers/challengeController.js
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import { dailyChallenges, weeklyChallenges } from '../data/challlenges.js'
import { getStartOfWeek } from '../utils/dates.js';
import { getRandomChallenges } from '../utils/getRandomChallenges.js';

export const completeChallenge = async (req, res) => {
  const userId = req.user._id;
  const challengeId = req.params.id;

  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    const user = await User.findById(userId);

    // Already completed?
    if (user.completedChallenges.includes(challengeId)) {
      return res.status(400).json({ message: 'Already completed this challenge' });
    }

    // Add challenge to user
    user.completedChallenges.push(challengeId);
    user.xp += challenge.xpReward;
    await user.save();

    res.status(200).json({
      message: 'Challenge completed',
      xpReward: challenge.xpReward,
      totalXP: user.xp
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Challenge completion failed' });
  }
};

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch challenges' });
  }
};



export const getUserChallenges = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('completedChallenges');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      completedChallenges: user.completedChallenges,
      totalXP: user.xp
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user challenges' });
  }
};

export const getAssignedChallenges = async (req, res) => {
  const user = await User.findById(req.user._id);
  const today = new Date().toDateString();
  const weekStart = getStartOfWeek().toDateString();

  // Get today's assigned challenges
  let todayAssigned = user.assignedChallenges?.daily?.filter(c =>
    new Date(c.date).toDateString() === today
  ) || [];

  // Prevent reassigning same daily challenges in last 5 days
  const recentDailyIds = (user.assignedChallenges?.daily || [])
    .filter(c => {
      const diff = (new Date() - new Date(c.date)) / (1000 * 60 * 60 * 24);
      return diff <= 5;
    })
    .map(c => c.challengeId);

  if (todayAssigned.length === 0) {
    const picked = getRandomChallenges(dailyChallenges, 5, recentDailyIds);
    todayAssigned = picked.map(c => ({ challengeId: c.id, date: new Date() }));
    user.assignedChallenges.daily = [
      ...(user.assignedChallenges.daily || []),
      ...todayAssigned
    ];
  }

  // Weekly
  let weekAssigned = user.assignedChallenges?.weekly?.filter(c =>
    new Date(c.weekStart).toDateString() === weekStart
  ) || [];

  const recentWeeklyIds = (user.assignedChallenges?.weekly || [])
    .filter(c => {
      const week = getStartOfWeek(new Date(c.weekStart));
      return week.toDateString() !== weekStart;
    })
    .map(c => c.challengeId);

  if (weekAssigned.length === 0) {
    const picked = getRandomChallenges(weeklyChallenges, 5, recentWeeklyIds);
    weekAssigned = picked.map(c => ({ challengeId: c.id, weekStart: new Date(weekStart) }));
    user.assignedChallenges.weekly = [
      ...(user.assignedChallenges.weekly || []),
      ...weekAssigned
    ];
  }

  await user.save();

  const daily = todayAssigned.map(a => dailyChallenges.find(c => c.id === a.challengeId));
  const weekly = weekAssigned.map(a => weeklyChallenges.find(c => c.id === a.challengeId));

  res.json({ daily, weekly });
};