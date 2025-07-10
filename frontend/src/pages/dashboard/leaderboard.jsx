import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import firstPosition from "/badges/first.png";
import secondPosition from "/badges/second.png";
import thirdPosition from "/badges/third.png";
import firstRanking from "/badges/rankingFirst.png";
import secondRanking from "/badges/rankingSecond.png";
import thirdRanking from "/badges/rankingThird.png";

export default function Leaderboard() {
  return (
    <DashboardLayout>
      <div className="w-full px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Health Leaderboard
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Top performers based on activity this week
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 py-6">
            {/* 1st Place */}
            <div className="flex flex-col items-center bg-green-100 dark:bg-green-900 rounded-xl p-4 shadow-lg relative">
              <div className="absolute top-0 right-0 p-2 text-black text-sm rounded-full font-bold">
                <img
                  src={firstPosition}
                  alt="1st Trophy"
                  className="w-6 h-6 mb-2"
                />
              </div>
              <img
                src={firstRanking}
                alt="1st Trophy"
                className="w-8 h-8 mb-2"
              />
              <img
                src="https://i.pravatar.cc/150?img=21"
                alt="Emily Carter"
                className="w-20 h-20 rounded-full border-4 border-green-400 object-cover"
              />
              <h3 className="mt-3 text-lg font-semibold text-green-800 dark:text-green-200">
                Emily Carter
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Champion 🏆
              </p>
              <div className="text-sm mt-1 text-gray-700 dark:text-gray-200">
                XPs: <span className="font-semibold">20,500</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200">
                Streaks: <span className="font-semibold">750</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full mt-4">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
            </div>

            {/* 2nd Place */}
            <div className="flex flex-col items-center bg-blue-100 dark:bg-blue-900 rounded-xl p-4 shadow-lg relative">
              <div className="absolute top-0 right-0 p-2 text-black text-sm rounded-full font-bold">
                <img
                  src={secondPosition} // Silver trophy
                  alt="2nd Trophy"
                  className="w-6 h-6 mb-2"
                />
              </div>
              <img
                src={secondRanking} // Silver trophy
                alt="2nd Trophy"
                className="w-8 h-8 mb-2"
              />
              <img
                src="https://i.pravatar.cc/150?img=22"
                alt="Mark Johnson"
                className="w-20 h-20 rounded-full border-4 border-blue-400 object-cover"
              />
              <h3 className="mt-3 text-lg font-semibold text-blue-800 dark:text-blue-200">
                Mark Johnson
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Contender 🥈
              </p>
              <div className="text-sm mt-1 text-gray-700 dark:text-gray-200">
                Xps: <span className="font-semibold">18,700</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200">
                Streak: <span className="font-semibold">680</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full mt-4">
                <div className="bg-blue-600 h-2 rounded-full w-full"></div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center bg-yellow-100 dark:bg-yellow-900 rounded-xl p-4 shadow-lg relative">
              <div className="absolute top-0 right-0 p-2 text-black text-sm rounded-full font-bold">
                <img
                  src={thirdPosition} // Bronze trophy
                  alt="3rd Trophy"
                  className="w-6 h-6 mb-2"
                />
              </div>
              <img
                src={thirdRanking} // Bronze trophy
                alt="3rd Trophy"
                className="w-8 h-8 mb-2"
              />
              <img
                src="https://i.pravatar.cc/150?img=23"
                alt="Sophia Lee"
                className="w-20 h-20 rounded-full border-4 border-yellow-400 object-cover"
              />
              <h3 className="mt-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Sophia Lee
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Rising Star 🌟
              </p>
              <div className="text-sm mt-1 text-gray-700 dark:text-gray-200">
                XPs: <span className="font-semibold">17,400</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200">
                Streaks: <span className="font-semibold">620</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full mt-4">
                <div className="bg-yellow-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-b-xl overflow-x-auto">
            <div className="grid grid-cols-12 px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">User</div>
              <div className="col-span-3 text-right">Xps</div>
              <div className="col-span-3 text-right">Streak</div>
            </div>

            {[
              {
                rank: 4,
                name: "Ryan Smith",
                steps: 16050,
                calories: 590,
                avatar: "https://i.pravatar.cc/150?img=24",
              },
              {
                rank: 5,
                name: "Olivia Green",
                steps: 15020,
                calories: 560,
                avatar: "https://i.pravatar.cc/150?img=25",
              },
              {
                rank: 6,
                name: "Jacob Miller",
                steps: 14300,
                calories: 530,
                avatar: "https://i.pravatar.cc/150?img=26",
              },
              {
                rank: 7,
                name: "Lily Thompson",
                steps: 13200,
                calories: 500,
                avatar: "https://i.pravatar.cc/150?img=27",
              },
              {
                rank: 8,
                name: "James White",
                steps: 12500,
                calories: 470,
                avatar: "https://i.pravatar.cc/150?img=28",
              },
            ].map((user, idx) => (
              <div
                key={user.rank}
                className={`grid grid-cols-12 px-6 py-4 items-center text-sm ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                }`}
              >
                <div className="col-span-1 font-semibold text-green-700 dark:text-green-300">
                  {user.rank}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-green-400 dark:border-green-600"
                  />
                  <span className="text-gray-800 dark:text-white">
                    {user.name}
                  </span>
                </div>
                <div className="col-span-3 text-right text-gray-700 dark:text-gray-300 font-semibold">
                  {user.steps.toLocaleString()}
                </div>
                <div className="col-span-3 text-right text-orange-600 dark:text-orange-400 font-semibold">
                  {user.calories.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
