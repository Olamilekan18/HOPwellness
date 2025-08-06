/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ConditionsList from "./diseaseCheck";
import { toast } from "react-toastify";
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
  // const [lastAdded, setLastAdded] = useState(null);

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
      console.log(data);

      if (!data || data.status === "error") {
        toast.error(`Nutrition info not found for: ${item}`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#dc2626", color: "#fff" },
        });
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
      setCurrentInput("");
    } catch (err) {
      toast.error("Error fetching nutrition data.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#dc2626", color: "#fff" },
      });
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
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-extrabold mb-2 text-center text-green-800 dark:text-green-200 drop-shadow-lg tracking-tight">
          🍃 Today&apos;s Meals
        </h2>
        <p className="text-center text-md text-green-700 dark:text-green-300 mb-8">
          Track your nutrition and eat healthy! <br />
          <span className="text-xs text-green-600 dark:text-green-400">
            (Nutrition values are approximate per 100g serving)
          </span>
        </p>

        <form
          onSubmit={handleAddItem}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <select
            value={currentMealType}
            onChange={(e) => setCurrentMealType(e.target.value)}
            className="px-5 py-3 rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
            placeholder="Add food (e.g. Avocado Toast)"
            className="flex-1 px-5 py-3 rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            + Add
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealInfo.map(({ label, type }) => (
            <div
              key={type}
              className="rounded-2xl p-5 bg-white/70 dark:bg-green-900/40 border-2 border-green-200 dark:border-green-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
                  {label}
                </h3>
                <span className="text-md font-semibold text-green-700 dark:text-green-300">
                  {meals[type].reduce((sum, i) => sum + i.calories, 0)} cal
                </span>
              </div>
              <ul className="space-y-2">
                {meals[type].length === 0 ? (
                  <li className="text-green-400 italic text-sm">
                    No items yet
                  </li>
                ) : (
                  meals[type].map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-green-900 dark:text-green-100 flex items-center gap-2"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-auto text-xs text-green-700 dark:text-green-300">
                        {item.calories} cal
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-green-200 via-green-100 to-green-50 dark:from-green-800 dark:via-green-900 dark:to-green-700 rounded-2xl p-7 shadow-xl border-2 border-green-300 dark:border-green-800">
          <h3 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
            🌱 Daily Nutrition Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-green-700 dark:text-green-300">
                {Math.round(totals.calories)}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Calories
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-green-800 dark:text-green-200">
                {Math.round(totals.protein)}g
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Protein
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                {Math.round(totals.carbs)}g
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Carbs
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-green-500 dark:text-green-300">
                {Math.round(totals.fat)}g
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Fat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
