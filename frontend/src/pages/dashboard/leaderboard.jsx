import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import firstPosition from "/badges/first.png";
import secondPosition from "/badges/second.png";
import thirdPosition from "/badges/third.png";
import firstRanking from "/badges/rankingFirst.png";
import secondRanking from "/badges/rankingSecond.png";
import thirdRanking from "/badges/rankingThird.png";
import ribbon from "/ribbon.png";

export default function Leaderboard() {
  const topThree = [
    {
      position: firstPosition,
      ranking: firstRanking,
      imageUrl: "https://i.pravatar.cc/150?img=21",
      name: "Emily Carter",
      xps: 20500,
      currentStreak: 750,
      title: "Champion 🏆",
    },
    {
      position: secondPosition,
      ranking: secondRanking,
      imageUrl: "https://i.pravatar.cc/150?img=21",
      name: "Emily Carter",
      xps: 20500,
      currentStreak: 750,
      title: "Champion 🏆",
    },
    {
      position: thirdPosition,
      ranking: thirdRanking,
      imageUrl: "https://i.pravatar.cc/150?img=21",
      name: "Emily Carter",
      xps: 20500,
      currentStreak: 750,
      title: "Champion 🏆",
    },
  ];
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
            {topThree.map(
              ({
                position,
                ranking,
                imageUrl,
                name,
                xps,
                currentStreak,
                title,
              }) => {
                return (
                  <div
                    key={position}
                    className="flex flex-col items-center bg-green-100 dark:bg-green-900 rounded-xl p-4 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2">
                      <img
                        src={position}
                        alt="1st Trophy"
                        className="w-6 h-6"
                      />
                    </div>

                    <img
                      src={ranking}
                      alt="1st Badge"
                      className="w-8 h-8 mb-2"
                    />

                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-20 h-20 rounded-full border-4 border-green-400 object-cover"
                    />

                    <h3 className="mt-3 text-lg font-semibold text-green-800 dark:text-green-200">
                      {name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {title}
                    </p>
                    <div className="text-sm mt-1 text-gray-700 dark:text-gray-200">
                      XPs:{" "}
                      <span className="font-semibold">
                        {xps.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      Current Streaks:{" "}
                      <span className="font-semibold">
                        {currentStreak.toLocaleString()}
                      </span>
                    </div>

                    <div className="">
                      <img src={ribbon} alt="Ribbon" className="w-28 h-auto" />
                    </div>
                  </div>
                );
              }
            )}
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
