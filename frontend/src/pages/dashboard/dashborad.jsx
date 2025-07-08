import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import UserOverViewCard from "../../componet/dashboard/userOverViewCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <UserOverViewCard />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Achievements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  Total Calories Burned
                </span>
                <span className="font-semibold text-xl text-green-500">
                  1,500 kcal
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  Steps Today
                </span>
                <span className="font-semibold text-xl text-blue-500">
                  10,000 Steps
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  Water Intake
                </span>
                <span className="font-semibold text-xl text-teal-500">3L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  Workouts Completed
                </span>
                <span className="font-semibold text-xl text-purple-500">
                  3/3
                </span>
              </div>
            </div>
          </div>

          {/* Remaining Tasks Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Remaining Tasks for the Day
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="task1" className="text-blue-500" />
                <label
                  htmlFor="task1"
                  className="text-lg text-gray-700 dark:text-gray-300"
                >
                  Morning Yoga Session
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="task2" className="text-blue-500" />
                <label
                  htmlFor="task2"
                  className="text-lg text-gray-700 dark:text-gray-300"
                >
                  30-Minute Cardio
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="task3" className="text-blue-500" />
                <label
                  htmlFor="task3"
                  className="text-lg text-gray-700 dark:text-gray-300"
                >
                  Prepare Healthy Meals
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="task4" className="text-blue-500" />
                <label
                  htmlFor="task4"
                  className="text-lg text-gray-700 dark:text-gray-300"
                >
                  Evening Stretching Routine
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
