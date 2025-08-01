import { useState } from "react";

export default function NutritionFoodScanner() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [nutrition, setNutrition] = useState(null);

  const LOGMEAL_API_TOKEN = "fdcd45850fb7eeff7e0460a650413e209f99ad64";
  const SPOONACULAR_API_KEY = "4bb2d9ff7d4043d5bec0228027c7f346";

  const mockNutritionData = {
    pizza: { calories: 266, fat: 10, protein: 11, carbs: 33 },
    burger: { calories: 295, fat: 14, protein: 15, carbs: 26 },
    salad: { calories: 152, fat: 8, protein: 9, carbs: 12 },
    pasta: { calories: 220, fat: 1, protein: 8, carbs: 44 },
    chicken: { calories: 239, fat: 14, protein: 27, carbs: 0 },
    fish: { calories: 206, fat: 12, protein: 22, carbs: 0 },
    rice: { calories: 130, fat: 0.3, protein: 2.7, carbs: 28 },
    bread: { calories: 265, fat: 3.2, protein: 9, carbs: 49 },
    sandwich: { calories: 250, fat: 8, protein: 12, carbs: 32 },
    soup: { calories: 85, fat: 2, protein: 4, carbs: 12 },
    default: { calories: 200, fat: 8, protein: 10, carbs: 25 },
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
          source: "estimated",
        };
      }
    }

    const defaultData = mockNutritionData.default;
    return {
      calories: { value: defaultData.calories, unit: "kcal" },
      fat: { value: defaultData.fat, unit: "g" },
      protein: { value: defaultData.protein, unit: "g" },
      carbs: { value: defaultData.carbs, unit: "g" },
      source: "estimated",
    };
  }

  async function trySpoonacularAPI(dishName) {
    try {
      const spoonacularRes = await fetch(
        `https://api.spoonacular.com/recipes/guessNutrition?title=${encodeURIComponent(
          dishName
        )}&apiKey=${SPOONACULAR_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!spoonacularRes.ok) {
        throw new Error(`Spoonacular API error: ${spoonacularRes.status}`);
      }

      const spoonacularData = await spoonacularRes.json();
      console.log("Spoonacular response:", spoonacularData);

      if (
        spoonacularData.calories &&
        spoonacularData.fat &&
        spoonacularData.protein
      ) {
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
          carbs: spoonacularData.carbs
            ? {
                value: spoonacularData.carbs.value,
                unit: spoonacularData.carbs.unit || "g",
              }
            : null,
          source: "spoonacular",
        };
      }

      throw new Error("Incomplete nutrition data from Spoonacular");
    } catch (error) {
      console.warn("Spoonacular API failed:", error.message);
      throw error;
    }
  }

  async function analyzeImage() {
    if (!imageFile) {
      alert("No image selected");
      return;
    }

    setLoading(true);
    setResult(null);
    setNutrition(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      // Step 1: Recognize the dish using LogMeal
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
        throw new Error(
          "Dish recognition failed. Please try with a clearer food image."
        );
      }

      const dishName = recognitionData.recognition_results[0].name;
      setResult({
        dishName,
        confidence: recognitionData.recognition_results[0].prob || "N/A",
      });

      let nutritionData = null;

      try {
        nutritionData = await trySpoonacularAPI(dishName);
      } catch (spoonacularError) {
        console.warn(
          "Spoonacular failed, using mock data:",
          spoonacularError.message
        );
        nutritionData = getMockNutrition(dishName);
      }

      setNutrition(nutritionData);
    } catch (err) {
      console.error("Analysis error:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-10 border border-green-200 dark:border-green-700 transition-all duration-300">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-2 drop-shadow">
          🍽️ Food Nutrition Scanner
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
          Upload a food image to get dish recognition and nutrition info
        </p>
      </div>

      <div className="relative border-4 border-dashed border-green-300 dark:border-green-600 rounded-2xl p-8 bg-gradient-to-r from-green-50 via-white to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 hover:shadow-lg transition-shadow duration-300">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          onChange={(e) => getUploadedImage(e.target.files)}
        />
        <div className="text-center space-y-3">
          <img
            className="mx-auto h-20 w-20 opacity-90 animate-bounce"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload Icon"
          />
          <p className="text-green-700 dark:text-green-300 font-semibold text-lg">
            Drag & drop food image, or{" "}
            <span className="text-green-600 dark:text-green-400 font-bold underline cursor-pointer">
              browse
            </span>
          </p>
          <p className="text-sm text-green-500 dark:text-green-300">
            Accepted formats: PNG, JPG, GIF (Max 10MB)
          </p>
        </div>

        {uploadedImage && (
          <img
            src={uploadedImage}
            className="mt-6 mx-auto rounded-xl shadow-lg max-h-56 object-contain border-2 border-green-400 dark:border-green-600"
            alt="Preview"
          />
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={analyzeImage}
          disabled={loading || !imageFile}
          className={`w-full sm:w-auto px-8 py-4 font-bold rounded-2xl shadow-lg transition-all duration-300 text-lg ${
            loading || !imageFile
              ? "bg-green-300 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transform hover:scale-105 text-white"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Analyzing...
            </span>
          ) : (
            "🍽️ Analyze Food"
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-100 via-white to-green-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-2xl shadow-md border border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            🍛 Detected Dish:
          </h3>
          <p className="text-green-900 dark:text-green-200 text-2xl mt-2 font-extrabold tracking-wide">
            {result.dishName}
          </p>
          {result.confidence && result.confidence !== "N/A" && (
            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
              Confidence:{" "}
              <span className="font-bold">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </p>
          )}
        </div>
      )}

      {nutrition && (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-100 via-white to-green-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-2xl shadow-md border border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
            🧪 Nutrition Info{" "}
            <span className="text-xs text-green-500 dark:text-green-300">
              (per 100g)
            </span>
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col items-center shadow">
              <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 drop-shadow">
                {nutrition.calories?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {nutrition.calories?.unit} Calories
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col items-center shadow">
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow">
                {nutrition.protein?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {nutrition.protein?.unit} Protein
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col items-center shadow">
              <div className="text-3xl font-extrabold text-red-600 dark:text-red-400 drop-shadow">
                {nutrition.fat?.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {nutrition.fat?.unit} Fat
              </div>
            </div>

            {nutrition.carbs && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col items-center shadow">
                <div className="text-3xl font-extrabold text-green-600 dark:text-green-400 drop-shadow">
                  {nutrition.carbs.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {nutrition.carbs.unit} Carbs
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-green-500 dark:text-green-300 text-center">
            {nutrition.source === "estimated"
              ? "⚠️ Estimated values (API unavailable)"
              : "✅ Data from Spoonacular API"}
          </div>
        </div>
      )}
    </div>
  );
}
