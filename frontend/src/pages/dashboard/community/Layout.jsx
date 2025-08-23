/* eslint-disable no-unused-vars */
import { useMemo, useEffect, useState } from "react";
import {
  Home,
  Users,
  LeafIcon,
  WeightIcon,
  Settings2Icon,
  Moon,
  Sun,
} from "lucide-react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";

export default function Layout({ children, right, current }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", newValue);
    document.documentElement.classList.toggle("dark", newValue);
  };

  const navItems = useMemo(
    () => [
      { name: "Home", icon: Home, path: "/dashboard" },
      { name: "Communities", icon: Users, path: "/dashboard/community" },
      { name: "Nutrition", icon: LeafIcon, path: "/dashboard/nutrition" },
      { name: "Challenge", icon: WeightIcon, path: "/dashboard/challenge" },
      { name: "Settings", icon: Settings2Icon, path: "/dashboard/settings" },
    ],
    []
  );

  return (
    <div className="dark:bg-gray-900 transition-colors duration-300">
      <ToastContainer />
      <div className="min-h-screen   bg-[#F1F8F6] dark:bg-gray-900 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 border-b border-emerald-100 dark:border-gray-700 shadow-sm px-4 py-3 transition-colors duration-300">
          <div className="container mx-auto flex items-center justify-between flex-wrap">
            <div className="flex items-center justify-between w-full md:w-auto">
              <h1 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">
                Dashboard
              </h1>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-emerald-700 dark:text-gray-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            <nav className="hidden md:flex items-center p-3 gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                    current === item.name.toLowerCase()
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-emerald-900 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400"
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </a>
              ))}

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-emerald-100 dark:bg-gray-700 hover:bg-emerald-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                title="Toggle Dark Mode"
              >
                {darkMode ? (
                  <Sun size={16} className="text-yellow-400" />
                ) : (
                  <Moon
                    size={16}
                    className="text-gray-700 dark:text-gray-300"
                  />
                )}
              </button>
            </nav>

            {mobileMenuOpen && (
              <nav className="w-full p-2 mt-4 flex flex-col gap-4 md:hidden">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      current === item.name.toLowerCase()
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-emerald-900 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </a>
                ))}

                <button
                  onClick={toggleDarkMode}
                  className="p-2 w-fit rounded-full bg-emerald-100 dark:bg-gray-700 hover:bg-emerald-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {darkMode ? (
                    <Sun size={16} className="text-yellow-400" />
                  ) : (
                    <Moon
                      size={16}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  )}
                </button>
              </nav>
            )}
          </div>
        </header>

        <>
          <main className="col-span-9 xl:col-span-7 space-y-6 text-emerald-900 dark:text-gray-100 transition-colors duration-300">
            {children}
          </main>
        </>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  right: PropTypes.node,
  current: PropTypes.string.isRequired,
};
