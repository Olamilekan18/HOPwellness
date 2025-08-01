import { useState } from "react";
import { toast } from "react-toastify";

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
      toast.error("Please upload an image first", {
        position: "top-center",
        autoClose: 5000,
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
      toast.error("Error: " + err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#dc2626", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          🍽️ Food Nutrition Scanner
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          Upload a food image to get dish recognition and nutrition info
        </p>
      </div>

      <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          onChange={(e) => getUploadedImage(e.target.files)}
        />
        <div className="text-center space-y-2">
          <img
            className="mx-auto h-14 w-14 opacity-80"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload Icon"
          />
          <p className="text-gray-700 dark:text-gray-200 font-medium text-base">
            <span className="text-green-600 dark:text-green-400 font-semibold underline cursor-pointer">
              Browse
            </span>{" "}
            or drag & drop food image
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            PNG, JPG, GIF (Max 10MB)
          </p>
        </div>

        {uploadedImage && (
          <img
            src={uploadedImage}
            className="mt-4 mx-auto rounded-xl shadow-lg max-h-40 object-contain border border-gray-200 dark:border-gray-700"
            alt="Preview"
          />
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={analyzeImage}
          disabled={loading || !imageFile}
          className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            loading || !imageFile
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
          } text-white`}
        >
          {loading ? "🔍 Analyzing..." : "🍽️ Analyze Food"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            🍛 Detected Dish
          </h3>
          <p className="text-gray-900 dark:text-gray-200 text-xl mt-2 font-semibold">
            {result.dishName}
          </p>
          {result.confidence && result.confidence !== "N/A" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          )}
        </div>
      )}

      {nutrition && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            🧪 Nutrition Info{" "}
            <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
              (per 100g)
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex flex-col items-center shadow">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {nutrition.calories?.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                {nutrition.calories?.unit} Calories
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex flex-col items-center shadow">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {nutrition.protein?.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                {nutrition.protein?.unit} Protein
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex flex-col items-center shadow">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {nutrition.fat?.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                {nutrition.fat?.unit} Fat
              </div>
            </div>
            {nutrition.carbs && (
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex flex-col items-center shadow">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {nutrition.carbs.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  {nutrition.carbs.unit} Carbs
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 text-xs text-gray-400 dark:text-gray-500 text-center">
            {nutrition.source === "estimated"
              ? "⚠️ Estimated values (API unavailable)"
              : "✅ Data from Spoonacular API"}
          </div>
        </div>
      )}
    </div>
  );
}
