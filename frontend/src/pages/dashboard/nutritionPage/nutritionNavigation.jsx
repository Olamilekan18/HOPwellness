import PropTypes from "prop-types";
export default function NutritionNavigation({
  activeSection,
  setActiveSection,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl">
      <button
        onClick={() => setActiveSection("scanner")}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
          activeSection === "scanner"
            ? "bg-green-600 text-white shadow-lg"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Food Scanner</span>
      </button>

      <button
        onClick={() => setActiveSection("log-meals")}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
          activeSection === "log-meals"
            ? "bg-green-600 text-white shadow-lg"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Log Today&apos;s Meals</span>
      </button>

      <button
        onClick={() => setActiveSection("meal-suggestions")}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
          activeSection === "meal-suggestions"
            ? "bg-green-600 text-white shadow-lg"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <span>Meal Suggestions</span>
      </button>
    </div>
  );
}

NutritionNavigation.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};
