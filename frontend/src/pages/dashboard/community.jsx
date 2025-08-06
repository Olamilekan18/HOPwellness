import { Moon, Sun, ArrowBigLeft } from "lucide-react";
import { useState, useEffect } from "react";
export default function Community() {
  const [darkMode, setDarkMode] = useState("");

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === null) {
      setDarkMode(true);
    } else {
      setDarkMode(darkMode === "true");
    }
  }, []);

  useEffect(() => {
    if (darkMode !== undefined) {
      localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-5 sticky top-0 z-50 border-b border-green-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
            <a href="/dashboard" className="flex items-center gap-2">
              <ArrowBigLeft />
            </a>
            <span role="img" aria-label="leaf">
              🌿
            </span>{" "}
            Health Community
          </h1>
          <div className="flex gap-2 flex-wrap">
            <button className="bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-300 px-4 py-2 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-gray-600 transition">
              Join
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
              Create
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-green-200 dark:bg-gray-700 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg font-medium hover:bg-green-300 dark:hover:bg-gray-600 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-6 gap-6 px-4">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-gray-700 p-6 rounded-xl overflow-y-auto max-h-[calc(100vh-120px)]">
          <h2 className="font-semibold text-lg text-green-700 dark:text-green-300 mb-4">
            Topics
          </h2>
          <ul className="space-y-3 text-green-900 dark:text-green-200 text-sm">
            <li className="hover:text-green-600 cursor-pointer">
              🧘‍♀️ Mindfulness
            </li>
            <li className="hover:text-green-600 cursor-pointer">
              🥗 Nutrition
            </li>
            <li className="hover:text-green-600 cursor-pointer">🏃 Fitness</li>
            <li className="hover:text-green-600 cursor-pointer">💤 Sleep</li>
            <li className="hover:text-green-600 cursor-pointer">
              💬 Community
            </li>
          </ul>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 space-y-8">
          {/* Create Post Area */}
          <div className="bg-white dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
              Share your healthy update 🌱
            </h2>
            <textarea
              rows="6"
              cols="10"
              placeholder="What’s one healthy thing you did today?"
              className="w-full p-4 bg-green-50 dark:bg-gray-700 text-black dark:text-white border border-green-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition mb-3 resize-none"
            ></textarea>
            <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition">
              Post
            </button>
          </div>

          {/* Example Post */}
          <div className="bg-white dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-2xl shadow p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-green-400"
                />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">
                    Wade Warren
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    58 minutes ago
                  </p>
                </div>
              </div>
              <button className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-gray-700 px-3 py-1 rounded hover:bg-green-100 dark:hover:bg-gray-600 text-sm font-medium">
                + Follow
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Started my morning with yoga and green smoothie 🍵. Feeling
              refreshed and grounded. Small habits build a strong mind and body!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90"
                alt="Jog selfie"
                className="rounded-lg object-cover h-44 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90"
                alt="Healthy food"
                className="rounded-lg object-cover h-44 w-full"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 flex justify-between">
              <span>💬 14 Replies</span>
              <span>👁 19,028 Views</span>
            </div>
            <input
              type="text"
              placeholder="Reply to this post..."
              className="mt-4 w-full bg-green-50 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded border border-green-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600"
            />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-64 bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-gray-700 p-6 rounded-xl overflow-y-auto max-h-[calc(100vh-120px)]">
          <h2 className="font-semibold text-lg text-green-700 dark:text-green-300 mb-4">
            Popular Groups 🌟
          </h2>
          <ul className="space-y-4 text-sm text-green-900 dark:text-green-200">
            <li className="flex justify-between items-center">
              <span>🥗 Nutrition Circle</span>
              <button className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-green-200 dark:hover:bg-gray-600 text-xs font-semibold">
                Join
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span>🧘 Zen Minds</span>
              <button className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-green-200 dark:hover:bg-gray-600 text-xs font-semibold">
                Join
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span>🏃 Move More</span>
              <button className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-green-200 dark:hover:bg-gray-600 text-xs font-semibold">
                Join
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
