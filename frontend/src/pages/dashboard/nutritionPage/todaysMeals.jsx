import { useState } from "react";

const SPOONACULAR_API_KEY = "4bb2d9ff7d4043d5bec0228027c7f346";

export default function NutritionTodaysMeals() {
  const initialState = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  };

  const [meals, setMeals] = useState(initialState);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });

  async function handleAddItem(mealType) {
    const item = prompt(`Enter food item for ${mealType}`);
    if (!item) return;

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/guessNutrition?title=${encodeURIComponent(item)}&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await res.json();

      if (!data || data.status === "failure") {
        alert("Nutrition info not found for: " + item);
        return;
      }

      const newItem = {
        name: item,
        calories: data.calories?.value || 0,
        protein: data.protein?.value || 0,
        fat: data.fat?.value || 0,
        carbs: data.carbs?.value || 0,
      };

      const updatedMeals = {
        ...meals,
        [mealType]: [...meals[mealType], newItem],
      };

      setMeals(updatedMeals);
      updateTotals(updatedMeals);
    } catch (err) {
      alert("Error fetching nutrition data.");
    }
  }

  function updateTotals(updatedMeals) {
    let totals = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    Object.values(updatedMeals).forEach(items => {
      items.forEach(i => {
        totals.calories += i.calories;
        totals.protein += i.protein;
        totals.fat += i.fat;
        totals.carbs += i.carbs;
      });
    });
    setTotals(totals);
  }

  const mealInfo = [
    { label: "🌅 Breakfast", type: "Breakfast", color: "yellow" },
    { label: "☀️ Lunch", type: "Lunch", color: "orange" },
    { label: "🌙 Dinner", type: "Dinner", color: "blue" },
    { label: "🍎 Snacks", type: "Snacks", color: "green" },
  ];

  const colorClasses = {
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-800 dark:text-yellow-200",
    textLight: "text-yellow-600 dark:text-yellow-400",
    btn: "bg-yellow-600 hover:bg-yellow-700",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-800 dark:text-orange-200",
    textLight: "text-orange-600 dark:text-orange-400",
    btn: "bg-orange-600 hover:bg-orange-700",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
    textLight: "text-blue-600 dark:text-blue-400",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-800 dark:text-green-200",
    textLight: "text-green-600 dark:text-green-400",
    btn: "bg-green-600 hover:bg-green-700",
  },
};

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Log Your Meals for Today
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealInfo.map(({ label, type, color }) => (
            <div
              key={type}
 className={`${colorClasses[color].bg} rounded-xl p-6 ${colorClasses[color].border}`}            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold text-${color}-800 dark:text-${color}-200`}>
                  {label}
                </h3>
                <span className={`text-sm text-${color}-600 dark:text-${color}-400`}>
                  {meals[type].reduce((sum, i) => sum + i.calories, 0)} cal
                </span>
              </div>

              <ul className="text-sm mb-2 space-y-1 text-gray-700 dark:text-gray-200">
                {meals[type].map((item, idx) => (
                  <li key={idx}>• {item.name} ({item.calories} cal)</li>
                ))}
              </ul>

              <button
                className={`w-full py-2 px-4 bg-${color}-600 hover:bg-${color}-700 text-white rounded-lg transition-colors`}
                onClick={() => handleAddItem(type)}
              >
                + Add Item
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Today&apos;s Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(totals.calories)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {Math.round(totals.protein)}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(totals.carbs)}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(totals.fat)}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
