import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import { dailyChallenges, weeklyChallenges } from '../data/challlenges.js'
import { getStartOfWeek, isSameLocalDay} from '../utils/dates.js';
import { getRandomChallenges } from '../utils/getRandomChallenges.js';


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
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayStr = today.toDateString();
  const weekStart = getStartOfWeek();
  const weekStartStr = weekStart.toDateString();

  let todayAssigned = (user.assignedChallenges?.daily || []).filter(c =>
    new Date(c.date).toDateString() === todayStr
  );

  const recentDailyIds = (user.assignedChallenges?.daily || [])
    .filter(c => {
      const diff = (today - new Date(c.date)) / (1000 * 60 * 60 * 24);
      return diff <= 5;
    })
    .map(c => c.challengeId);

  if (todayAssigned.length === 0) {
    const picked = getRandomChallenges(dailyChallenges, 5, recentDailyIds);
    
    todayAssigned = picked.map(c => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return { challengeId: c.id, date: d };
    });

    user.assignedChallenges.daily = [
      ...(user.assignedChallenges.daily || []),
      ...todayAssigned
    ];
  }

  // Weekly
  let weekAssigned = (user.assignedChallenges?.weekly || []).filter(c =>
    new Date(c.weekStart).toDateString() === weekStartStr
  );

  const recentWeeklyIds = (user.assignedChallenges?.weekly || []).filter(c => {
    const stored = getStartOfWeek(new Date(c.weekStart));
    return stored.toDateString() !== weekStartStr;
  }).map(c => c.challengeId);

  if (weekAssigned.length === 0) {
    const picked = getRandomChallenges(weeklyChallenges, 5, recentWeeklyIds);
    weekAssigned = picked.map(c => ({
      challengeId: c.id,
      weekStart: weekStart
    }));

    user.assignedChallenges.weekly = [
      ...(user.assignedChallenges.weekly || []),
      ...weekAssigned
    ];
  }

  await user.save();

  const daily = todayAssigned.map(a => {
    const challenge = dailyChallenges.find(c => c.id === a.challengeId);
    return {
      ...challenge,
      assignedDate: a.date,
      challengeId: a.challengeId
    };
  });

  const weekly = weekAssigned.map(a => {
    const challenge = weeklyChallenges.find(c => c.id === a.challengeId);
    return {
      ...challenge,
      assignedDate: a.weekStart,
      challengeId: a.challengeId
    };
  });

  res.json({ daily, weekly });
};

export const completeChallenge = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { challengeId } = req.params;

  console.log("challengeId param:", req.params.challengeId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already completed today
  const alreadyCompleted = user.completedChallenges.some(c => {
    const d = new Date(c.date);
    d.setHours(0, 0, 0, 0);
    return c.challengeId === challengeId && d.getTime() === today.getTime();
  });

  if (alreadyCompleted) {
    return res.status(400).json({ message: 'Already completed this challenge today' });                                                                                         

  }

//   Check if it's assigned to user (daily or weekly)
 const isDailyAssigned = (user.assignedChallenges?.daily || []).some(c =>
  c.challengeId === challengeId && isSameLocalDay(new Date(c.date), today)
);

const isWeeklyAssigned = (user.assignedChallenges?.weekly || []).some(c =>
  c.challengeId === challengeId
);

const isAssigned = isDailyAssigned || isWeeklyAssigned;

if (!isAssigned) {
  return res.status(403).json({ message: 'Challenge not assigned to you' });
}


  const challenge = dailyChallenges.find(c => c.id === challengeId)
    || weeklyChallenges.find(c => c.id === challengeId);
    console.log(challenge)

  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }

  user.completedChallenges.push({
    challengeId,
    date: new Date()
  });

  user.xp += challenge.xpReward;

if (!user.streak || typeof user.streak.count !== 'number') {
  user.streak = { count: 0, lastDate: null };
}

if (!user.streak || typeof user.streak !== 'object') {
  user.streak = { count: 0, lastDate: null };
}

const lastDate = user.streak.lastDate ? new Date(user.streak.lastDate) : null;
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
  user.streak.count += 1;
} else {
  user.streak.count = 1;
}

user.streak.lastDate = today;
if (user.streak.count > 1 && lastDate && (today - lastDate) / (1000 * 60 * 60 * 24) > 1) {
  user.streak.count = 1;       
}

  // Badges
  const newBadges = [];

  if (user.xp >= 5 && !user.badges.includes('xp-5')) {
    user.badges.push('xp-5');
    newBadges.push('xp-5');
    await user.save(); 
  }

  if (user.xp >= 50 && !user.badges.includes('xp-50')) {
    user.badges.push('xp-50');
    newBadges.push('xp-50');
    await user.save(); 
  }

  if (user.xp >= 100 && !user.badges.includes('xp-100')) {
    user.badges.push('xp-100');
    newBadges.push('xp-100');
    await user.save(); 
  }

  if (user.streak.count === 3 && !user.badges.includes('3-day-streak')) {
    user.badges.push('3-day-streak');
    newBadges.push('3-day-streak');
    await user.save(); 
  }

  if (user.streak.count === 7 && !user.badges.includes('7-day-streak')) {
    user.badges.push('7-day-streak');
    newBadges.push('7-day-streak');  
  }
  await user.save();

  res.status(200).json({
    message: 'Challenge completed!',
    xpGained: challenge.xpReward,
    totalXP: user.xp,
    newBadges,
    currentStreak: user.streak.count
  });
};
