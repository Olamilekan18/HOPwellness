import PropTypes from "prop-types";

export default function NutritionOverlay({ type, setUseAddingItem }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          aria-label="Close"
          onClick={() => setUseAddingItem(false)}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Add Food to {type}
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="What did you eat?"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
