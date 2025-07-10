import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import firstPosition from "/badges/first.png";
import secondPosition from "/badges/second.png";
import thirdPosition from "/badges/third.png";
import firstRanking from "/badges/rankingFirst.png";
import secondRanking from "/badges/rankingSecond.png";
import thirdRanking from "/badges/rankingThird.png";
const achivementsBadges = [
  { name: "First Position", timeEarned: 12, imageUrl: firstPosition },
  { name: "Second Position", timeEarned: 7, imageUrl: secondPosition },
  { name: "Third Position", timeEarned: 7, imageUrl: thirdPosition },
  { name: "Ranking First", timeEarned: 7, imageUrl: firstRanking },
  { name: "Ranking Second", timeEarned: 7, imageUrl: secondRanking },
  { name: "Ranking Third", timeEarned: 7, imageUrl: thirdRanking },
];
export default function Achievements() {
  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Inner Padding Wrapper */}
        <div className="px-6 py-6">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
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

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achivementsBadges.map(({ name, timeEarned, imageUrl }) => (
              <div
                key={name}
                className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={name + " Icon"}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Achieved{" "}
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {timeEarned} times
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
