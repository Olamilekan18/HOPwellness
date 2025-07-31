export default function NutritionTodaysMeals() {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Log Your Meals for Today
        </h2>

        {/* Meal Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Breakfast */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                🌅 Breakfast
              </h3>
              <span className="text-sm text-yellow-600 dark:text-yellow-400">
                0 cal
              </span>
            </div>
            <button className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
              + Add Item
            </button>
          </div>

          {/* Lunch */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                ☀️ Lunch
              </h3>
              <span className="text-sm text-orange-600 dark:text-orange-400">
                0 cal
              </span>
            </div>
            <button className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              + Add Item
            </button>
          </div>

          {/* Dinner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                🌙 Dinner
              </h3>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                0 cal
              </span>
            </div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              + Add Item
            </button>
          </div>

          {/* Snacks */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                🍎 Snacks
              </h3>
              <span className="text-sm text-green-600 dark:text-green-400">
                0 cal
              </span>
            </div>
            <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              + Add Item
            </button>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Today&apos;s Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                0
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Calories
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">0g</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Protein
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">0g</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Carbs
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0g</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
