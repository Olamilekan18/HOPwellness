import { useState } from "react";
import {
  Home,
  Salad,
  BarChart,
  Settings,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  ChartAreaIcon,
  Award,
  User2,
  CircleQuestionMark,
  Heart,
} from "lucide-react";
import PropTypes from "prop-types";
import defaultImage from "/blank-profile-picture-973460_960_720.webp";
import { useEffect } from "react";
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [profilePicture, setProfilePicture] = useState("");
  const menuItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Home size={18} />,
      active: window.location.pathname === "/dashboard" ? "active" : "",
    },
    {
      name: "Nutrition",
      link: "/dashboard/nutrition",
      icon: <Salad size={18} />,
      active:
        window.location.pathname === "/dashboard/nutrition" ? "active" : "",
    },
    {
      name: "Challenge",
      link: "/dashboard/challenge",
      icon: <BarChart size={18} />,
      active:
        window.location.pathname === "/dashboard/challenge" ? "active" : "",
    },
    {
      name: "leaderboards",
      link: "/dashboard/leaderboard",
      icon: <ChartAreaIcon size={18} />,
      active:
        window.location.pathname === "/dashboard/leaderboard" ? "active" : "",
    },
    {
      name: "Achievements",
      link: "/dashboard/achivements",
      icon: <Award size={18} />,
      active:
        window.location.pathname === "/dashboard/achivements" ? "active" : "",
    },
    {
      name: "Quizzes",
      link: "/dashboard/quizzes",
      icon: <CircleQuestionMark size={18} />,
      active: window.location.pathname === "/dashboard/quizzes" ? "active" : "",
    },
    {
      name: "Mood Tracker",
      link: "/dashboard/moodtracker",
      icon: <Heart size={18} />,
      active:
        window.location.pathname === "/dashboard/moodtracker" ? "active" : "",
    },
    {
      name: "Community",
      link: "/dashboard/community",
      icon: <User2 size={18} />,
      active:
        window.location.pathname === "/dashboard/community" ? "active" : "",
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icon: <Settings size={18} />,
      active:
        window.location.pathname === "/dashboard/settings" ? "active" : "",
    },
  ];

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture === null) {
      setProfilePicture(defaultImage);
    } else {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 relative ${
        darkMode ? "dark" : ""
      }`}
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-white dark:bg-gray-800 w-64 border-r p-6 fixed md:relative top-0 left-0 h-full shadow-sm transition-transform duration-300 ease-in-out z-70 overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-extrabold text-green-800 dark:text-green-500">
            HOP
          </h2>
          <button
            className="md:hidden text-gray-600 dark:text-white hover:text-black"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              href={item.link}
              key={item.name}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-indigo-100 text-green-600 font-semibold dark:bg-green-600 dark:text-white"
                  : "text-black hover:bg-green-300 dark:text-white dark:hover:bg-green-600"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col ml-0">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm px-6 py-4 sticky top-0 z-60">
          <div className="flex items-center gap-4 w-full">
            <button
              className="md:hidden text-black dark:text-white z-60"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} className="text-black dark:text-white" />
            </button>
          </div>

          <div className="flex items-center gap-4 pr-3">
            <button className="p-2 bg-gray-100 dark:bg-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <Bell size={18} />
            </button>

            <button
              className="p-2 bg-gray-100 dark:bg-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <img
              src={profilePicture}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-green-800 dark:border-white object-cover"
            />
          </div>
        </header>

        <main className="p-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
