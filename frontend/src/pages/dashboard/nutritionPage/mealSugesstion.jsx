import { useState, useEffect } from "react";

const suggestions = [
  {
    id: 1,
    foodName: "Yam and Egg Sauce",
    foodProcedure: "Boiled yam served with scrambled eggs, tomatoes, onions, and peppers",
    caloriesContained: 450,
    timeTaken: 25,
    takenAs: "Breakfast",
  },
  {
    id: 2,
    foodName: "Jollof Rice with Chicken",
    foodProcedure: "Spicy tomato-based rice cooked with peppers, onions, and served with grilled chicken",
    caloriesContained: 600,
    timeTaken: 50,
    takenAs: "Lunch",
  },
  {
    id: 3,
    foodName: "Egusi Soup with Pounded Yam",
    foodProcedure: "Melon seed soup with vegetables, meat, and fish, served with pounded yam",
    caloriesContained: 700,
    timeTaken: 60,
    takenAs: "Dinner",
  },
  {
    id: 4,
    foodName: "Akara and Pap (Ogi)",
    foodProcedure: "Fried bean cakes served with fermented corn pudding (pap)",
    caloriesContained: 380,
    timeTaken: 30,
    takenAs: "Breakfast",
  },
  {
    id: 5,
    foodName: "Beef Suya with Fried Plantains",
    foodProcedure: "Grilled spicy beef skewers served with ripe fried plantains (dodo)",
    caloriesContained: 550,
    timeTaken: 35,
    takenAs: "Lunch",
  },
  {
    id: 6,
    foodName: "Ofada Rice with Ayamase Stew",
    foodProcedure: "Local brown rice served with spicy green pepper sauce and assorted meats",
    caloriesContained: 650,
    timeTaken: 45,
    takenAs: "Dinner",
  },
  {
    id: 7,
    foodName: "Moi Moi with Custard",
    foodProcedure: "Steamed bean pudding served with sweetened custard",
    caloriesContained: 400,
    timeTaken: 40,
    takenAs: "Breakfast",
  },
  {
    id: 8,
    foodName: "Pepper Soup with Semo",
    foodProcedure: "Spicy meat or fish broth served with semolina (semo) swallow",
    caloriesContained: 500,
    timeTaken: 35,
    takenAs: "Lunch",
  },
  {
    id: 9,
    foodName: "Efo Riro with Amala",
    foodProcedure: "Vegetable stew with assorted meats, served with yam flour swallow (amala)",
    caloriesContained: 580,
    timeTaken: 50,
    takenAs: "Dinner",
  },
  {
    id: 10,
    foodName: "Bread and Akamu (Corn Pap)",
    foodProcedure: "Soft bread dipped in fermented corn pudding (akamu)",
    caloriesContained: 350,
    timeTaken: 10,
    takenAs: "Breakfast",
  },
  {
    id: 11,
    foodName: "Fried Rice with Turkey",
    foodProcedure: "Nigerian-style fried rice with vegetables and grilled turkey",
    caloriesContained: 620,
    timeTaken: 45,
    takenAs: "Lunch",
  },
  {
    id: 12,
    foodName: "Okra Soup with Eba",
    foodProcedure: "Slimy okra soup with fish/meat, served with garri (eba)",
    caloriesContained: 550,
    timeTaken: 40,
    takenAs: "Dinner",
  },
  {
    id: 13,
    foodName: "Plantain and Beans (Gbegiri)",
    foodProcedure: "Ripe plantains served with bean stew (gbegiri)",
    caloriesContained: 480,
    timeTaken: 30,
    takenAs: "Breakfast",
  },
  {
    id: 14,
    foodName: "Nkwobi (Spicy Cow Foot)",
    foodProcedure: "Spicy cow foot delicacy served with palm wine or beer",
    caloriesContained: 650,
    timeTaken: 60,
    takenAs: "Lunch",
  },
  {
    id: 15,
    foodName: "Oha Soup with Fufu",
    foodProcedure: "Traditional Igbo soup with oha leaves, served with fufu",
    caloriesContained: 600,
    timeTaken: 55,
    takenAs: "Dinner",
  },
  {
    id: 16,
    foodName: "Puff Puff & Akara Combo",
    foodProcedure: "Deep-fried dough balls (puff puff) with bean cakes (akara)",
    caloriesContained: 420,
    timeTaken: 25,
    takenAs: "Breakfast",
  },
  {
    id: 17,
    foodName: "Banga Soup with Starch",
    foodProcedure: "Palm nut soup served with starch (usin)",
    caloriesContained: 680,
    timeTaken: 70,
    takenAs: "Lunch",
  },
  {
    id: 18,
    foodName: "Abacha (African Salad)",
    foodProcedure: "Shredded cassava with ugba, palm oil, and fish",
    caloriesContained: 500,
    timeTaken: 30,
    takenAs: "Dinner",
  },
  {
    id: 19,
    foodName: "Corn and Coconut (Eko)",
    foodProcedure: "Steamed cornmeal (eko) served with coconut",
    caloriesContained: 320,
    timeTaken: 20,
    takenAs: "Breakfast",
  },
  {
    id: 20,
    foodName: "Isi Ewu (Goat Head)",
    foodProcedure: "Spicy goat head delicacy served with palm wine",
    caloriesContained: 700,
    timeTaken: 90,
    takenAs: "Lunch",
  },
  {
    id: 21,
    foodName: "Edikang Ikong Soup",
    foodProcedure: "Vegetable soup with pumpkin leaves, waterleaf, and assorted meats",
    caloriesContained: 580,
    timeTaken: 60,
    takenAs: "Dinner",
  },
  {
    id: 22,
    foodName: "Agege Bread & Tea",
    foodProcedure: "Soft Agege bread with Nigerian-style tea (milky & sweet)",
    caloriesContained: 380,
    timeTaken: 10,
    takenAs: "Breakfast",
  },
  {
    id: 23,
    foodName: "Amala with Gbegiri & Ewedu",
    foodProcedure: "Yam flour swallow with bean and jute leaf soups",
    caloriesContained: 650,
    timeTaken: 50,
    takenAs: "Lunch",
  },
  {
    id: 24,
    foodName: "Fisherman Soup with Semo",
    foodProcedure: "Seafood-based spicy soup served with semolina",
    caloriesContained: 550,
    timeTaken: 45,
    takenAs: "Dinner",
  },
  {
    id: 25,
    foodName: "Yam Porridge (Asaro)",
    foodProcedure: "Yam cooked in a peppery sauce with fish or meat",
    caloriesContained: 500,
    timeTaken: 40,
    takenAs: "Breakfast",
  },
  {
    id: 26,
    foodName: "White Soup (Ofe Nsala)",
    foodProcedure: "Light pepper soup with catfish and utazi leaves",
    caloriesContained: 480,
    timeTaken: 50,
    takenAs: "Lunch",
  },
  {
    id: 27,
    foodName: "Boli (Roasted Plantain) with Fish",
    foodProcedure: "Grilled plantain served with pepper sauce and grilled fish",
    caloriesContained: 450,
    timeTaken: 30,
    takenAs: "Dinner",
  },
  {
    id: 28,
    foodName: "Coconut Rice with Chicken",
    foodProcedure: "Rice cooked in coconut milk, served with chicken",
    caloriesContained: 600,
    timeTaken: 50,
    takenAs: "Lunch",
  },
  {
    id: 29,
    foodName: "Ukwa (Breadfruit Porridge)",
    foodProcedure: "Breadfruit cooked with palm oil and spices",
    caloriesContained: 520,
    timeTaken: 60,
    takenAs: "Dinner",
  },
  {
    id: 30,
    foodName: "Tomato Stew with Boiled Rice",
    foodProcedure: "Nigerian-style tomato stew served with plain boiled rice",
    caloriesContained: 550,
    timeTaken: 40,
    takenAs: "Lunch",
  }
];
const DAILY_CALORIE_GOAL = 2000; 

export default function NutritionMealsSuggestion() {
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [filter, setFilter] = useState('All Meals');

  // Initialize with random meals
  useEffect(() => {
    generateRandomMeals();
  }, []);

  const generateRandomMeals = () => {
    const breakfasts = suggestions.filter(meal => meal.takenAs === "Breakfast");
    const lunches = suggestions.filter(meal => meal.takenAs === "Lunch");
    const dinners = suggestions.filter(meal => meal.takenAs === "Dinner");

    const randomBreakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)];
    const randomLunch = lunches[Math.floor(Math.random() * lunches.length)];
    const randomDinner = dinners[Math.floor(Math.random() * dinners.length)];

    const newMeals = [randomBreakfast, randomLunch, randomDinner];
    setDisplayedMeals(newMeals);
    
    const newTotal = newMeals.reduce((sum, meal) => sum + meal.caloriesContained, 0);
    setTotalCalories(newTotal);
  };

  const handleFilter = (mealType) => {
    setFilter(mealType);
  };

  const filteredMeals = filter === 'All Meals' 
    ? displayedMeals 
    : displayedMeals.filter(meal => meal.takenAs === filter);

  const caloriePercentage = Math.round((totalCalories / DAILY_CALORIE_GOAL) * 100);

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Personalized Meal Suggestions
        </h2>

        {/* Calorie Summary */}
        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">Daily Nutrition</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {totalCalories} / {DAILY_CALORIE_GOAL} kcal ({caloriePercentage}% of daily goal)
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

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => handleFilter('All Meals')}
            className={`px-4 py-2 ${filter === 'All Meals' ? 'bg-green-300 text-black' : 'bg-gray-100 text-gray-800'} rounded-lg hover:bg-gray-200 transition-colors`}
          >
            All Meals
          </button>
          <button 
            onClick={() => handleFilter('Breakfast')}
            className={`px-4 py-2 ${filter === 'Breakfast' ? 'bg-green-300 text-black' : 'bg-gray-100 text-gray-800'} rounded-lg hover:bg-gray-200 transition-colors`}
          >
            Breakfast
          </button>
          <button 
            onClick={() => handleFilter('Lunch')}
            className={`px-4 py-2 ${filter === 'Lunch' ? 'bg-green-300 text-black' : 'bg-gray-100 text-gray-800'} rounded-lg hover:bg-gray-200 transition-colors`}
          >
            Lunch
          </button>
          <button 
            onClick={() => handleFilter('Dinner')}
            className={`px-4 py-2 ${filter === 'Dinner' ? 'bg-green-300 text-black' : 'bg-gray-100 text-gray-800'} rounded-lg hover:bg-gray-200 transition-colors`}
          >
            Dinner
          </button>
        </div>

        {/* Meal Cards */}
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

        {/* Action Buttons */}
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