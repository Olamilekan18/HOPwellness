import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import defaultImage from "/blank-profile-picture-973460_960_720.webp";
import { data } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


export default function UserOverViewCard() {
  const [profilePicture, setProfilePicture] = useState("");
  const [userName, setUserName] = useState("");
  const [streak, setStreak] = useState(1);
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState(0);
  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!userData || !token) {
      window.location.href = "/login";
      return;
    }

    const fetchStreak = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setStreak(data.streak || 1);
        setXp(data.xp || 0);
        setBadges(data.badges.length || 0);
      } catch (error) {
        console.error("Error fetching user streak:", error);
        setStreak(1);
        setXp(0);
        setBadges(data.badges.length || 0);
      }
    };
    if (userData && userData.name) {
      setUserName(userData.name);
    } else {
      setUserName("Anonymous User");
    }
    if (savedProfilePicture === null) {
      setProfilePicture(defaultImage);
    } else {
      setProfilePicture(savedProfilePicture);
    }
    fetchStreak();
  }, []);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="p-6 rounded-3xl w-full max-w-5xl mx-auto transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md ring-2 ring-green-500"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white transition-colors">
                {userName}
              </h2>
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <span className="bg-green-500 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold">
              🔥 {streak.count + 1} Day
            </span>
          </div>
        </div>

        <hr className="border-dashed border-black dark:border-white mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1">
              Achievements
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              75
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1">
              XPs
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {xp}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1">
              Badges
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                {badges}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1">
              Ranking
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
