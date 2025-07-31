export default function NutritionMealsSuggestion() {
  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Personalized Meal Suggestions
        </h2>

        {/* Filter Options */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors">
            All Meals
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Breakfast
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Lunch
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Dinner
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Healthy
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Quick & Easy
          </button>
        </div>

        {/* Meal Suggestions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Meal Cards */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Avocado Toast
              </h3>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                Breakfast
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mb-4">
              Whole grain bread with mashed avocado, tomatoes, and a sprinkle of
              seeds
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                320 calories
              </span>
              <span className="text-sm text-green-600 dark:text-green-400">
                15 min
              </span>
            </div>
            <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Add to Meal Plan
            </button>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                Grilled Chicken Salad
              </h3>
              <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs">
                Lunch
              </span>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
              Mixed greens with grilled chicken breast, cherry tomatoes, and
              vinaigrette
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                380 calories
              </span>
              <span className="text-sm text-orange-600 dark:text-orange-400">
                20 min
              </span>
            </div>
            <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              Add to Meal Plan
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                Salmon with Quinoa
              </h3>
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                Dinner
              </span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              Baked salmon fillet with quinoa pilaf and steamed vegetables
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                450 calories
              </span>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                30 min
              </span>
            </div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Add to Meal Plan
            </button>
          </div>
        </div>

        {/* Generate More Suggestions */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105">
            Generate More Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}
