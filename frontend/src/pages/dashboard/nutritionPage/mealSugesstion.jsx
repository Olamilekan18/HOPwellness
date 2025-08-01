import { useState, useEffect } from "react";
import suggestions from "./mealsuggestionList";

const DAILY_CALORIE_GOAL = 2000;

export default function NutritionMealsSuggestion() {
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [filter, setFilter] = useState("All Meals");

  useEffect(() => {
    generateRandomMeals();
  }, []);

  const generateRandomMeals = () => {
    const breakfasts = suggestions.filter(
      (meal) => meal.takenAs === "Breakfast"
    );
    const lunches = suggestions.filter((meal) => meal.takenAs === "Lunch");
    const dinners = suggestions.filter((meal) => meal.takenAs === "Dinner");

    const randomBreakfast =
      breakfasts[Math.floor(Math.random() * breakfasts.length)];
    const randomLunch = lunches[Math.floor(Math.random() * lunches.length)];
    const randomDinner = dinners[Math.floor(Math.random() * dinners.length)];

    const newMeals = [randomBreakfast, randomLunch, randomDinner];
    setDisplayedMeals(newMeals);

    const newTotal = newMeals.reduce(
      (sum, meal) => sum + meal.caloriesContained,
      0
    );
    setTotalCalories(newTotal);
  };

  const handleFilter = (mealType) => {
    setFilter(mealType);
  };

  const filteredMeals =
    filter === "All Meals"
      ? displayedMeals
      : displayedMeals.filter((meal) => meal.takenAs === filter);

  const caloriePercentage = Math.round(
    (totalCalories / DAILY_CALORIE_GOAL) * 100
  );

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Personalized Meal Suggestions
        </h2>

        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Daily Nutrition
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {totalCalories} / {DAILY_CALORIE_GOAL} kcal ({caloriePercentage}
                % of daily goal)
              </p>
            </div>
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => handleFilter("All Meals")}
            className={`px-4 py-2 ${
              filter === "All Meals"
                ? "bg-green-300 text-black"
                : "bg-gray-100 text-gray-800"
            } rounded-lg hover:bg-gray-200 transition-colors`}
          >
            All Meals
          </button>
          <button
            onClick={() => handleFilter("Breakfast")}
            className={`px-4 py-2 ${
              filter === "Breakfast"
                ? "bg-green-300 text-black"
                : "bg-gray-100 text-gray-800"
            } rounded-lg hover:bg-gray-200 transition-colors`}
          >
            Breakfast
          </button>
          <button
            onClick={() => handleFilter("Lunch")}
            className={`px-4 py-2 ${
              filter === "Lunch"
                ? "bg-green-300 text-black"
                : "bg-gray-100 text-gray-800"
            } rounded-lg hover:bg-gray-200 transition-colors`}
          >
            Lunch
          </button>
          <button
            onClick={() => handleFilter("Dinner")}
            className={`px-4 py-2 ${
              filter === "Dinner"
                ? "bg-green-300 text-black"
                : "bg-gray-100 text-gray-800"
            } rounded-lg hover:bg-gray-200 transition-colors`}
          >
            Dinner
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  {meal.foodName}
                </h3>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                  {meal.takenAs}
                </span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                {meal.foodProcedure}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  {meal.caloriesContained} calories
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  {meal.timeTaken} min
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={generateRandomMeals}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Generate New Meals
          </button>
        </div>
      </div>
    </div>
  );
}
