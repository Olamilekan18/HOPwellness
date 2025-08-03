import PropTypes from "prop-types";

export default function NutritionOverlay({ type, setUseAddingItem }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-blue-200 dark:border-gray-700">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 dark:hover:text-green-400 text-2xl transition-colors"
          aria-label="Close"
          onClick={() => setUseAddingItem(false)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-green-400 to-green-400 rounded-full p-3 mb-2 shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2C7 2 2 7 2 12c0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white text-center">
            Add Food to{" "}
            <span className="text-green-600 dark:text-green-400">{type}</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 text-center">
            Track your nutrition and stay healthy!
          </p>
        </div>
        <form className="space-y-5">
          <input
            type="text"
            className="w-full border-2 border-green-200 dark:border-green-400 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-400 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition"
            placeholder="What did you eat?"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 text-white font-bold rounded-xl shadow-md transition-all transform hover:scale-105"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

NutritionOverlay.propTypes = {
  type: PropTypes.string.isRequired,
  setUseAddingItem: PropTypes.func.isRequired,
};
