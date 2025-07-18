import { FiActivity } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
const weeklyChallenge = [
  {
    icon: FiActivity,
    id: "check-in",
    title: "Daily Check-In",
    description: "Check in every day to build your streak",
    completed: false,
    xpReward: 10,
    challengeRange: 3,
    completedRange: 2,
  },
  {
    icon: FiActivity,
    id: "hydrate",
    title: "Hydration Goal",
    description: "Drink at least 2 liters of water",
    completed: false,
    xpReward: 15,
    challengeRange: 4,
    completedRange: 2,
  },
  {
    icon: FiActivity,
    id: "steps-10k",
    title: "10,000 Steps",
    description: "Walk 10,000 steps today",
    completed: true,
    xpReward: 20,
    challengeRange: 3,
    completedRange: 2,
  },
  {
    icon: FiActivity,
    id: "stretch",
    title: "Morning Stretch",
    description: "Do a 5-minute stretching routine",
    completed: true,
    xpReward: 10,
    challengeRange: 3,
    completedRange: 2,
  },
  {
    icon: AiOutlineStar,
    id: "sleep-8hr",
    title: "Sleep Goal",
    description: "Get at least 8 hours of sleep",
    completed: false,
    xpReward: 20,
    challengeRange: 3,
    completedRange: 2,
  },
];
export default function WeeklyChallenge() {
  return (
    <div className="mt-10 ">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Weekly Challenges
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeklyChallenge.map(
          ({
            icon: Icon,
            id,
            title,
            description,
            xpReward,
            challengeRange,
            completedRange,
          }) => {
            return (
              <div
                key={id}
                className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center dark:text-white text-green-500 text-xl bg-gray-200 dark:bg-green-600 rounded-full">
                    <Icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(completedRange / challengeRange) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-right text-green-500 font-semibold mt-1">
                    {completedRange}/{0 + challengeRange} days | {xpReward} Xps
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
