/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ConditionsList from "./diseaseCheck";

const SPOONACULAR_API_KEY = "4bb2d9ff7d4043d5bec0228027c7f346";

export default function NutritionTodaysMeals() {
  const initialState = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  };

  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem("meals");
    return saved ? JSON.parse(saved) : initialState;
  });

  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });
  const [currentMealType, setCurrentMealType] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    updateTotals(meals);
  }, [meals]);

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  async function handleAddItem(e) {
    e.preventDefault();
    if (!currentInput || !currentMealType) return;

    const item = currentInput;
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/guessNutrition?title=${encodeURIComponent(
          item
        )}&apiKey=${SPOONACULAR_API_KEY}`
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
        note: "",
        safe: null,
      };

      // Optional: check if good for diabetes (Type 1)
      try {
        const healthRes = await fetch("/api/nutrition/check-food", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ foodName: item, conditionID: 30 }),
        });

        if (healthRes.ok) {
          const healthData = await healthRes.json();
          newItem.safe = healthData.good;
          newItem.note = healthData.notes;
        }
      } catch {
        // Silent fail
      }

      const updatedMeals = {
        ...meals,
        [currentMealType]: [newItem],
      };

      setMeals(updatedMeals);
      setLastAdded(newItem);
      setCurrentInput("");
    } catch (err) {
      alert("Error fetching nutrition data.");
    }
  }

  function updateTotals(updatedMeals) {
    let totals = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    Object.values(updatedMeals).forEach((items) => {
      items.forEach((i) => {
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
      btn: "bg-yellow-600 hover:bg-yellow-700",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-800 dark:text-orange-200",
      btn: "bg-orange-600 hover:bg-orange-700",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      btn: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-200",
      btn: "bg-green-600 hover:bg-green-700",
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header and Description */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Log Your Meals for Today
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Nutrition values are approximate and based on 100g servings.
        </p>

        {/* Meal Logging Form */}
        <form
          onSubmit={handleAddItem}
          className="flex gap-6 flex-wrap justify-center mb-8"
        >
          <select
            value={currentMealType}
            onChange={(e) => setCurrentMealType(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200 ease-in-out"
            required
          >
            <option value="">Select Meal</option>
            {mealInfo.map((m) => (
              <option key={m.type} value={m.type}>
                {m.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Enter food name..."
            className="flex-1 px-6 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200 ease-in-out"
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition duration-200 ease-in-out"
          >
            Add
          </button>
        </form>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealInfo.map(({ label, type, color }) => (
            <div
              key={type}
              className={`${colorClasses[color].bg} rounded-2xl p-6 ${colorClasses[color].border} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`font-semibold text-md ${colorClasses[color].text}`}
                >
                  {label}
                </h3>
                <span className={`text-sm ${colorClasses[color].text}`}>
                  {meals[type].reduce((sum, i) => sum + i.calories, 0)} cal
                </span>
              </div>

              <ul className="space-y-2">
                {meals[type].map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 dark:text-gray-200"
                  >
                    <span>
                      • {item.name} ({item.calories} cal)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Today's Summary */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Today&apos;s Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white">
                {Math.round(totals.calories)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Calories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">
                {Math.round(totals.protein)}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Protein
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">
                {Math.round(totals.carbs)}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Carbs
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(totals.fat)}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fat
              </div>
            </div>
          </div>
        </div>

        {/* Last Added */}
        {lastAdded && (
          <div className="mt-8 p-6 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 shadow-lg">
            <strong>Last Added:</strong> {lastAdded.name} — {lastAdded.calories}{" "}
            cal
            {lastAdded.note && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="italic">Diabetes Note:</span>{" "}
                <em>{lastAdded.note}</em>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
