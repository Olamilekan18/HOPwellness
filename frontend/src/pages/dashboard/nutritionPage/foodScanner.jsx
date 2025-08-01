import { useState } from "react";

export default function NutritionFoodScanner() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [inputMode, setInputMode] = useState('image'); 
  const [textInput, setTextInput] = useState('');

  const LOGMEAL_API_TOKEN = "fdcd45850fb7eeff7e0460a650413e209f99ad64";
  const SPOONACULAR_API_KEY = "4bb2d9ff7d4043d5bec0228027c7f346";

  const mockNutritionData = {
    "pizza": { calories: 266, fat: 10, protein: 11, carbs: 33 },
    "burger": { calories: 295, fat: 14, protein: 15, carbs: 26 },
    "salad": { calories: 152, fat: 8, protein: 9, carbs: 12 },
    "pasta": { calories: 220, fat: 1, protein: 8, carbs: 44 },
    "chicken": { calories: 239, fat: 14, protein: 27, carbs: 0 },
    "fish": { calories: 206, fat: 12, protein: 22, carbs: 0 },
    "rice": { calories: 130, fat: 0.3, protein: 2.7, carbs: 28 },
    "bread": { calories: 265, fat: 3.2, protein: 9, carbs: 49 },
    "sandwich": { calories: 250, fat: 8, protein: 12, carbs: 32 },
    "soup": { calories: 85, fat: 2, protein: 4, carbs: 12 },
    "default": { calories: 200, fat: 8, protein: 10, carbs: 25 }
  };

  function getUploadedImage(files) {
    const file = files[0];
    if (!file) return;

    setImageFile(file);
    const imageURL = URL.createObjectURL(file);
    setUploadedImage(imageURL);
  }

  function getMockNutrition(dishName) {
    const lowerDish = dishName.toLowerCase();
    
    for (const [food, data] of Object.entries(mockNutritionData)) {
      if (food !== "default" && lowerDish.includes(food)) {
        return {
          calories: { value: data.calories, unit: "kcal" },
          fat: { value: data.fat, unit: "g" },
          protein: { value: data.protein, unit: "g" },
          carbs: { value: data.carbs, unit: "g" },
          source: "estimated"
        };
      }
    }
    
    const defaultData = mockNutritionData.default;
    return {
      calories: { value: defaultData.calories, unit: "kcal" },
      fat: { value: defaultData.fat, unit: "g" },
      protein: { value: defaultData.protein, unit: "g" },
      carbs: { value: defaultData.carbs, unit: "g" },
      source: "estimated"
    };
  }

  async function trySpoonacularAPI(dishName) {
    try {
      const spoonacularRes = await fetch(
        `https://api.spoonacular.com/recipes/guessNutrition?title=${encodeURIComponent(
          dishName
        )}&apiKey=${SPOONACULAR_API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!spoonacularRes.ok) {
        throw new Error(`Spoonacular API error: ${spoonacularRes.status}`);
      }

      const spoonacularData = await spoonacularRes.json();
      console.log("Spoonacular response:", spoonacularData);

      if (spoonacularData.calories && spoonacularData.fat && spoonacularData.protein) {
        return {
          calories: {
            value: spoonacularData.calories.value,
            unit: spoonacularData.calories.unit || "kcal",
          },
          fat: {
            value: spoonacularData.fat.value,
            unit: spoonacularData.fat.unit || "g",
          },
          protein: {
            value: spoonacularData.protein.value,
            unit: spoonacularData.protein.unit || "g",
          },
          carbs: spoonacularData.carbs ? {
            value: spoonacularData.carbs.value,
            unit: spoonacularData.carbs.unit || "g",
          } : null,
          source: "spoonacular"
        };
      }
      
      throw new Error("Incomplete nutrition data from Spoonacular");
    } catch (error) {
      console.warn("Spoonacular API failed:", error.message);
      throw error;
    }
  }

async function analyzeFood() {
  setLoading(true);
  setResult(null);
  setNutrition(null);

  if (inputMode === 'image') {
    if (!imageFile) {
      alert("No image selected");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const recognitionRes = await fetch(
        "https://api.logmeal.es/v2/image/recognition/dish",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOGMEAL_API_TOKEN}`,
          },
          body: formData,
        }
      );

      const recognitionData = await recognitionRes.json();

      if (!recognitionRes.ok || !recognitionData.recognition_results?.length) {
        throw new Error("Dish recognition failed. Please try with a clearer food image.");
      }

      const dishName = recognitionData.recognition_results[0].name;
      setResult({ 
        dishName,
        confidence: recognitionData.recognition_results[0].prob || "N/A",
        source: "image"
      });

      let nutritionData = null;
      try {
        nutritionData = await trySpoonacularAPI(dishName);
      } catch {
        nutritionData = getMockNutrition(dishName);
      }

      setNutrition(nutritionData);

    } catch (err) {
      console.error("Image analysis error:", err);
      alert("Image error: " + err.message);
    } finally {
      setLoading(false);
    }

  } else {
    const dishName = textInput.trim();
    if (!dishName) {
      alert("Please enter a food name.");
      setLoading(false);
      return;
    }

    try {
      setResult({ dishName, source: "text" });

      let nutritionData = null;
      try {
        nutritionData = await trySpoonacularAPI(dishName);
      } catch {
        nutritionData = getMockNutrition(dishName);
      }

      setNutrition(nutritionData);

    } catch (err) {
      console.error("Text analysis error:", err);
      alert("Text input error: " + err.message);
    } finally {
      setLoading(false);
    }
  }
}


  return (
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          🍽️ Food Nutrition Scanner
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Upload a food image or type the food name to get nutrition info
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex">
          <button
            onClick={() => {
              setInputMode('image');
              setResult(null);
              setNutrition(null);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              inputMode === 'image'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            📷 Upload Image
          </button>
          <button
            onClick={() => {
              setInputMode('text');
              setResult(null);
              setNutrition(null);
              setUploadedImage(null);
              setImageFile(null);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              inputMode === 'text'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            ✏️ Type Food Name
          </button>
        </div>
      </div>

      {inputMode === 'image' ? (
        <div className="relative border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow duration-300">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
            onChange={(e) => getUploadedImage(e.target.files)}
          />
          <div className="text-center space-y-3">
            <img
              className="mx-auto h-16 w-16 opacity-80"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
              alt="Upload Icon"
            />
            <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
              Drag & drop food image, or{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold underline cursor-pointer">
                browse
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Accepted formats: PNG, JPG, GIF (Max 10MB)
            </p>
          </div>

          {uploadedImage && (
            <img
              src={uploadedImage}
              className="mt-6 mx-auto rounded-lg shadow-md max-h-48 object-contain"
              alt="Preview"
            />
          )}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍎</span>
            </div>
            <div>
              <label htmlFor="food-input" className="block text-gray-700 dark:text-gray-200 font-medium text-lg mb-2">
                Enter Food Name
              </label>
              <input
                id="food-input"
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeFood()}
                placeholder="e.g., pizza, burger, salad..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Press Enter or click Analyze to get nutrition information
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={analyzeFood}
          disabled={loading || (inputMode === 'image' ? !imageFile : !textInput.trim())}
          className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-300 ${
            loading || (inputMode === 'image' ? !imageFile : !textInput.trim())
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 transform hover:scale-105"
          } text-white`}
        >
          {loading ? "🔍 Analyzing..." : inputMode === 'image' ? "🍽️ Analyze Image" : "🔍 Get Nutrition Info"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {result.source === 'image' ? '🍛 Detected Dish:' : '🍽️ Food Item:'}
          </h3>
          <p className="text-gray-800 dark:text-gray-200 text-lg mt-2">
            {result.dishName}
          </p>
          {result.confidence && result.confidence !== "N/A" && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          )}
          {result.source === 'text' && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Source: Manual entry
            </p>
          )}
        </div>
      )}

      {nutrition && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            🧪 Nutrition Info (per 100g):
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {nutrition.calories?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {nutrition.calories?.unit} Calories
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {nutrition.protein?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {nutrition.protein?.unit} Protein
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {nutrition.fat?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {nutrition.fat?.unit} Fat
              </div>
            </div>
            
            {nutrition.carbs && (
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {nutrition.carbs.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {nutrition.carbs.unit} Carbs
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {nutrition.source === "estimated" 
              ? "⚠️ Estimated values (API unavailable)" 
              : "✅ Data from Spoonacular API"
            }
          </div>
        </div>
      )}
    </div>
  );
}