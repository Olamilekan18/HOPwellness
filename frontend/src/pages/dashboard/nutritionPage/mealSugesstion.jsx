import { useState } from "react";

const suggestion = [
  {
    id: 1,
    foodName: "Avocado Toast",
    foodProcedure:
      "Whole grain bread with mashed avocado, tomatoes, and a sprinkle of seeds",
    caloriesContained: 320,
    timeTaken: 15,
    takenAs: "Breakfast",
  },
  {
    id: 2,
    foodName: "Grilled Chicken Salad",
    foodProcedure:
      "Mixed greens with grilled chicken breast, cherry tomatoes, and vinaigrette",
    caloriesContained: 380,
    timeTaken: 20,
    takenAs: "Lunch",
  },
  {
    id: 3,
    foodName: "Salmon with Quinoa",
    foodProcedure:
      "Baked salmon fillet with quinoa pilaf and steamed vegetables",
    caloriesContained: 450,
    timeTaken: 30,
    takenAs: "Lunch",
  },
  {
    id: 1,
    foodName: "Avocado Toast",
    foodProcedure:
      "Whole grain bread with mashed avocado, tomatoes, and a sprinkle of seeds",
    caloriesContained: 320,
    timeTaken: 15,
    takenAs: "Breakfast",
  },
  {
    id: 2,
    foodName: "Grilled Chicken Salad",
    foodProcedure:
      "Mixed greens with grilled chicken breast, cherry tomatoes, and vinaigrette",
    caloriesContained: 380,
    timeTaken: 20,
    takenAs: "Lunch",
  },
  {
    id: 3,
    foodName: "Salmon with Quinoa",
    foodProcedure:
      "Baked salmon fillet with quinoa pilaf and steamed vegetables",
    caloriesContained: 450,
    timeTaken: 30,
    takenAs: "Lunch",
  },
];
export default function NutritionMealsSuggestion() {
  var [numberofSugesstion, setNumberOfSugesstion] = useState(3);
  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Personalized Meal Suggestions
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-4 py-2 bg-green-300 text-black rounded-lg hover:bg-green-500 transition-colors">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestion
            .map(
              (
                {
                  foodName,
                  foodProcedure,
                  caloriesContained,
                  timeTaken,
                  takenAs,
                },
                idx
              ) => {
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        {foodName}
                      </h3>
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                        {takenAs}
                      </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                      {foodProcedure}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        {caloriesContained} calories
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {timeTaken} min
                      </span>
                    </div>
                  </div>
                );
              }
            )
            .slice(0, numberofSugesstion)}
        </div>

        <div className="text-center mt-8">
          {suggestion.length > numberofSugesstion ? (
            <button
              onClick={() => {
                setNumberOfSugesstion((numberofSugesstion += 3));
              }}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              See More Suggestions
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
