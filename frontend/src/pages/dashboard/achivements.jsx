import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import { Flame, ShieldCheck, HeartHandshake } from "lucide-react";
import firstPosition from "../../../public/badges/first.png";
export default function Achievements() {
  return (
    <DashboardLayout>
      <div className="w-full px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Achievements
          </h2>
          <div className="flex gap-2 text-sm font-medium">
            <button className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              All
            </button>
            <button className="px-4 py-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition">
              Earned
            </button>
          </div>
        </div>

        {/* Static Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition hover:shadow-lg">
            {/* Icon Section */}
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <img
                src={firstPosition}
                alt="Workout Streak Icon"
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                Workout Streak
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Achieved{" "}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  12 times
                </span>
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Flame size={24} className="text-red-500 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Calories Burned
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                8 times achieved
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <ShieldCheck
                size={24}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Daily Check-In
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                20 times achieved
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <HeartHandshake
                size={24}
                className="text-pink-600 dark:text-pink-400"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Community Support
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                5 times achieved
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
