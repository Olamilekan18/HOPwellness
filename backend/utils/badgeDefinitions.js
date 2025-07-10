export const badgeDefinitions = [
    {
        id: "xp-5",
        name: "First Login",
        description: "Complete your first challenge",
        condition: (user) => user.xp >=5,
    },
  {
    id: "xp-50",
    name: "XP Novice",
    description: "Earn 50 XP",
    condition: (user) => user.xp >= 50,
  },
  {
    id: "xp-100",
    name: "XP Warrior",
    description: "Earn 100 XP",
    condition: (user) => user.xp >= 100,
  },
  {
    id: "3-day-streak",
    name: "3-Day Streak",
    description: "Maintain a 3-day streak",
    condition: (user) => user.streak?.count >= 3,
  },
  {
    id: "7-day-streak",
    name: "7-Day Streak",
    description: "Maintain a 7-day streak",
    condition: (user) => user.streak?.count >= 7,
  },
  {
    id: "challenge-10",
    name: "Challenge Explorer",
    description: "Complete 10 challenges",
    condition: (user) => user.completedChallenges.length >= 10,
  },
  {
    id: "mental-master",
    name: "Mental Master",
    description: "Complete 10 mental challenges",
    condition: (user) => {
      const mentalCount = user.completedChallenges.filter(
        (c) => c.category === "mental"
      ).length;
      return mentalCount >= 10;
    },
  }
];
