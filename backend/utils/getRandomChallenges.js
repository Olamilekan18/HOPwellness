export const getRandomChallenges = (
  challengePool,
  count,
  excludeIds = []
) => {
  const filtered = challengePool.filter(c => !excludeIds.includes(c.id));

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
