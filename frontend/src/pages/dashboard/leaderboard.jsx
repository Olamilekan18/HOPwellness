import { useState, useEffect } from "react";
import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import firstPosition from "/badges/first.png";
import secondPosition from "/badges/second.png";
import thirdPosition from "/badges/third.png";
import firstRanking from "/badges/rankingFirst.png";
import secondRanking from "/badges/rankingSecond.png";
import thirdRanking from "/badges/rankingThird.png";
import ribbon from "/ribbon.png";
import defaultImage from "/blank-profile-picture-973460_960_720.webp";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/leaderboard/xp"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const sortedData = [...data].sort((a, b) => b.xp - a.xp);
        setLeaderboardData(sortedData);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again later.");
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const topThreeUsers = leaderboardData.slice(0, 3).map((user, index) => {
    let positionImage, rankingImage;
    if (index === 0) {
      positionImage = firstPosition;
      rankingImage = firstRanking;
    } else if (index === 1) {
      positionImage = secondPosition;
      rankingImage = secondRanking;
    } else {
      positionImage = thirdPosition;
      rankingImage = thirdRanking;
    }

    let title = "Novice";
    if (user.xp >= 100) {
      title = "Adept";
    }
    if (user.xp >= 500) {
      title = "Expert";
    }
    if (user.xp >= 1000) {
      title = "Master";
    }
    if (user.badges.includes("xp-100")) {
      title = "Achiever ✨";
    }
    if (user.badges.includes("xp-500")) {
      title = "Veteran 🏅";
    }
    if (user.badges.includes("champion")) {
      title = "Champion 🏆";
    }

    return {
      position: positionImage,
      ranking: rankingImage,
      imageUrl: user.imageUrl || defaultImage, // Use a random avatar if none provided
      name: user.name,
      xps: user.xp,
      badgeCount: user.badges ? user.badges.length : 0,
      title: title,
    };
  });

  const remainingUsers = leaderboardData.slice(3).map((user, index) => {
    return {
      rank: index + 4,
      name: user.name,
      xps: user.xp,
      badgeCount: user.badges ? user.badges.length : 0,
      avatar: user.imageUrl || defaultImage, // Use a random avatar if none provided
    };
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto mt-10 px-4 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400 border-solid mb-4"></div>
          <span className="text-lg font-medium text-green-600 dark:text-green-300">
            Loading Leaderboards
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Please wait while we fetch the leaderboard.
          </span>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[300px] px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
            <span className="text-xl font-semibold text-red-600">Leaderboard Error</span>
          </div>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-2">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Health Leaderboard
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Top performers based on XP gained
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 py-6">
            {topThreeUsers.length > 0 ? (
              topThreeUsers.map(
                ({
                  position,
                  ranking,
                  imageUrl,
                  name,
                  xps,
                  badgeCount,
                  title,
                }) => (
                  <div
                    key={name + xps}
                    className="flex flex-col items-center bg-green-100 dark:bg-green-900 rounded-xl p-4 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2">
                      <img
                        src={position}
                        alt="Position Trophy"
                        className="w-6 h-6"
                      />
                    </div>

                    <img
                      src={ranking}
                      alt="Ranking Badge"
                      className="w-8 h-8 mb-2"
                    />

                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-20 h-20 rounded-full border-4 border-green-400 object-cover"
                    />

                    <h3 className="mt-3 text-lg font-semibold text-green-800 dark:text-white">
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
                      Badges:{" "}
                      <span className="font-semibold">
                        {badgeCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="">
                      <img src={ribbon} alt="Ribbon" className="w-28 h-auto" />
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="col-span-3 text-center text-gray-600 dark:text-gray-400">
                No top users to display yet.
              </p>
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 rounded-b-xl">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-12 px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5 text-center sm:text-left">User</div>
                <div className="col-span-3 text-right">Xps</div>
                <div className="col-span-3 text-right">Badges</div>
              </div>

              <div className="min-w-full">
                {remainingUsers.length > 0 ? (
                  remainingUsers.map(
                    ({ rank, avatar, name, badgeCount, xps }, idx) => (
                      <div
                        key={rank}
                        className={`grid grid-cols-12 px-6 py-4 items-center text-sm ${
                          idx % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-900"
                        }`}
                      >
                        <div className="col-span-1 font-semibold text-green-700 dark:text-green-300">
                          {rank}
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                          <img
                            src={avatar}
                            alt={name}
                            className="w-8 h-8 rounded-full object-cover border border-green-400 dark:border-green-600"
                          />
                          <span className="text-black dark:text-white">
                            {name}
                          </span>
                        </div>
                        <div className="col-span-3 text-right text-gray-700 dark:text-gray-300 font-semibold">
                          {xps.toLocaleString()}
                        </div>
                        <div className="col-span-3 text-right text-green-600 dark:text-green-400 font-semibold">
                          {badgeCount.toLocaleString()}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-center py-4 text-gray-600 dark:text-gray-400">
                    No other users to display.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
