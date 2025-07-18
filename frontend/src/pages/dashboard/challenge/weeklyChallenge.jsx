import { FiActivity } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
export default function WeeklyChallenge() {
  return (
    <div className="mt-10 ">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Weekly Challenges
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 7-Day Workout Streak */}
        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center text-red-500 text-xl bg-red-100 dark:bg-red-800 rounded-full">
              <FiActivity />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                7-Day Workout Streak
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complete 7 days straight of workouts
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "42%" }}
              />
            </div>
            <p className="text-xs text-right text-gray-400 mt-1">3/7 days</p>
          </div>
        </div>

        {/* Earn XP */}
        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center text-yellow-500 text-xl bg-yellow-100 dark:bg-yellow-800 rounded-full">
              <AiOutlineStar />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Earn 5,000 XP
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Collect XP by completing tasks
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-xs text-right text-gray-400 mt-1">
              3,000 / 5,000 XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
