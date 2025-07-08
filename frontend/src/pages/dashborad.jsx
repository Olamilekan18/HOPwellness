import { useState } from "react";
import {
  Home,
  Dumbbell,
  Salad,
  BarChart,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Sun,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, active: true },
    { name: "Workouts", icon: <Dumbbell size={18} /> },
    { name: "Nutrition", icon: <Salad size={18} /> },
    { name: "Progress", icon: <BarChart size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 relative ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-white dark:bg-gray-800 w-64 border-r p-6 fixed md:relative top-0 left-0 h-full shadow-sm transition-transform duration-300 ease-in-out z-70`}
      >
        {/* Header with X icon */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-extrabold text-green-800 dark:text-green-200">
            HOP
          </h2>
          <button
            className="md:hidden text-gray-600 dark:text-white hover:text-black"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-indigo-100 text-green-600 font-semibold dark:bg-indigo-600 dark:text-green-200"
                  : "text-gray-600 hover:bg-green-300 dark:text-gray-400 dark:hover:bg-green-600"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-0">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm px-6 py-4 sticky top-0 z-60">
          <div className="flex items-center gap-4 w-full">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black dark:text-white z-60"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} className="text-black dark:text-white" />
            </button>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Right Side (Notifications + Profile + Dark Mode Button) */}
          <div className="flex items-center gap-4">
            {/* Notifications Button */}
            <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <Bell size={18} />
            </button>

            {/* Dark/Light Mode Toggle Button */}
            <button
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setDarkMode(!darkMode)}
            >
              <Sun size={18} />
            </button>

            {/* Profile Image */}
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-green-950 object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome to your Health Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Track your workouts, nutrition, and progress all in one place!
          </p>
        </main>
      </div>
    </div>
  );
}
