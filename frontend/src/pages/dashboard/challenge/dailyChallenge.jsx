import { BsPatchCheckFill, BsPersonWalking } from "react-icons/bs";
import { Sun } from "lucide-react";
import { FaBottleWater } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";
const dailyChallenge = [
  {
    icon: BsPatchCheckFill,
    id: "check-in",
    title: "Daily Check-In",
    description: "Check in every day to build your streak",
    completed: true,
    xpReward: 10,
  },
  {
    icon: FaBottleWater,
    id: "hydrate",
    title: "Hydration Goal",
    description: "Drink at least 2 liters of water everyday",
    completed: false,
    xpReward: 15,
  },
  {
    icon: BsPersonWalking,
    id: "steps-10k",
    title: "10,000 Steps",
    description: "Walk 10,000 steps today",
    completed: true,
    xpReward: 20,
  },
  {
    icon: Sun,
    id: "stretch",
    title: "Morning Stretch",
    description: "Do a 5-minute stretching routine",
    completed: true,
    xpReward: 10,
  },
  {
    icon: GiNightSleep,
    id: "sleep-8hr",
    title: "Sleep Goal",
    description: "Get at least 8 hours of sleep",
    completed: false,
    xpReward: 20,
  },
];
export default function DailyChallenge() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-black dark:text-gray-200 mb-4">
        Daily Challenges
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyChallenge.map(
          ({ icon: Icon, id, title, description, xpReward, completed }) => {
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
                      style={completed ? { width: "100%" } : { width: "0%" }}
                    />
                  </div>
                  <p className="text-xs text-right text-green-500 mt-1 font-semibold">
                    {xpReward} Xps
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
