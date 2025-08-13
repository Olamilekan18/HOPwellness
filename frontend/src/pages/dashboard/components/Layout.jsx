import { useMemo, useEffect, useState } from "react";
import { Home, Users, LeafIcon, WeightIcon, Settings2Icon, Moon, Sun } from "lucide-react";

export default function Layout({ children, right, current = "communities" }) {
  const [darkMode, setDarkMode] = useState(false);

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
      { name: "Communities", icon: Users, path: "/community" },
      { name: "Nutrition", icon: LeafIcon, path: "/dashboard/nutrition" },
      { name: "Challenge", icon: WeightIcon, path: "/dashboard/challenge" },
      { name: "Settings", icon: Settings2Icon, path: "/dashboard/settings" },
    ],
    []
  );

  return (
   < div className="dark:bg-gray-900 transition-colors duration-300">
    <div className="min-h-screen  ml-3 mr-3 bg-[#F1F8F6] dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 border-b border-emerald-100 dark:border-gray-700 shadow-sm p-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">
            Dashboard
          </h1>

          <nav className="flex items-center gap-6">
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

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-emerald-100 dark:bg-gray-700 hover:bg-emerald-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun size={16} className="text-yellow-400" />
              ) : (
                <Moon size={16} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </nav>
        </div>
      </header>

      <div className="mt-5">
        <main className="col-span-9 xl:col-span-7 space-y-6 text-emerald-900 dark:text-gray-100 transition-colors duration-300">
          {children}
        </main>

      
        <aside className="hidden xl:block col-span-3 space-y-6">{right}</aside>
      </div>
    </div>
    </div>
  );
}
