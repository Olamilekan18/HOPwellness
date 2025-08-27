import { useState } from "react";

export default function App() {
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [imageFile, setImageFile] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [result, setResult] = useState(null); 
  const [nutrition, setNutrition] = useState(null); 
  const [inputMode, setInputMode] = useState('image'); 
  const [textInput, setTextInput] = useState(''); 
  const [message, setMessage] = useState({ text: '', type: '' }); 
  const [selectedIllness, setSelectedIllness] = useState('none'); 

  // --- MOCK DATA FOR NUTRITION & DIETARY GUIDANCE ---
  // This is a critical disclaimer. The data is hardcoded for demonstration purposes only.
  // DO NOT USE THIS FOR REAL MEDICAL DECISIONS.
const illnessDietData = {
  'none': { avoid: [], suggest: [] },

  'diabetes': {
    avoid: ['pizza', 'burger', 'pasta', 'buns', 'puffpuff', 'coke', 'fanta', 'meat pie', 'white rice', 'rice', 'sandwich', 'cakes', 'soda'],
    suggest: ['salad with grilled chicken',  'vegetable soup',  'brown rice with grilled fish',
      'beans and moi moi',
      'unripe plantain porridge',
      'vegetable soup with wheat swallow',
      'garden egg salad with boiled egg',
      'okro soup with grilled chicken',  'oatmeal with berries']
  },

  'high-blood-pressure': {
    avoid: ['pizza', 'burger', 'sandwich', 'soup with high salt', 'suya', 'corned beef', 'pepper soup', 'processed meats', 'pickles'],
    suggest: ['steamed fish with vegetables', 'grilled chicken salad', 'roasted vegetables', 'beans porridge without palm oil',
      'ofada rice with vegetable sauce',
      'fruit salad with watermelon and pawpaw',
      'okra soup with goat meat (little oil)' , 'fresh fruit salad']
  },

  'high-cholesterol': {
    avoid: ['fried chicken', 'butter pastries', 'cheese pizza', 'processed meats', 'ice cream'],
    suggest: ['grilled salmon', 'avocado toast on whole grain', 'lentil soup', 'steamed broccoli', 'nuts and seeds']
  },

  'heart-disease': {
    avoid: ['deep-fried foods', 'processed meats', 'creamy pasta', 'cheese-loaded pizza', 'fast food burgers'],
    suggest: ['steamed fish with lemon', 'whole grain salad with vegetables', 'oatmeal with flaxseed', 'grilled chicken and vegetables']
  },

  'kidney-disease': {
    avoid: ['red meat', 'salty snacks', 'cheese', 'processed meats', 'dark sodas'],
    suggest: ['steamed fish', 'egg white omelet', 'cabbage stir-fry', 'apple slices with peanut butter']
  },

  'liver-disease': {
    avoid: ['alcohol', 'fried foods', 'processed snacks', 'excess sugar desserts'],
    suggest: ['grilled chicken breast', 'steamed spinach', 'lentil stew', 'whole grain porridge']
  },

  'obesity': {
    avoid: ['pizza', 'burger', 'fries', 'milkshakes', 'soda'],
    suggest: ['vegetable soup', 'salad with grilled chicken', 'steamed vegetables with brown rice', 'fruit smoothies (no sugar)']
  },

  'anemia': {
    avoid: ['tea', 'coffee', 'processed snacks', 'white bread'],
    suggest: ['spinach salad with eggs', 'lentil soup', 'lean red meat', 'fortified cereals', 'chicken liver stir-fry']
  },

  'osteoporosis': {
    avoid: ['soda', 'excess caffeine', 'salty processed foods'],
    suggest: ['low-fat yogurt with fruit', 'grilled salmon', 'kale salad', 'almonds', 'tofu stir-fry']
  },

  'arthritis': {
    avoid: ['fried chicken', 'processed meats', 'sugary soda', 'white bread', 'french fries'],
    suggest: ['salmon with vegetables', 'spinach salad', 'nuts', 'berries', 'turmeric lentil stew']
  },

  'gout': {
    avoid: ['red meat', 'organ meats', 'beer', 'sardines', 'fries'],
    suggest: ['steamed vegetables', 'brown rice with beans', 'grilled chicken salad', 'low-fat dairy products']
  },

  'acid-reflux': {
    avoid: ['spicy foods', 'fried chicken', 'coffee', 'tomato sauce pasta', 'citrus juices'],
    suggest: ['oatmeal', 'steamed fish with rice', 'banana smoothie', 'boiled potatoes with vegetables']
  },

  'celiac-disease': {
    avoid: ['pasta (wheat)', 'bread', 'pizza', 'cakes with flour'],
    suggest: ['quinoa salad', 'grilled chicken with rice', 'gluten-free bread sandwich', 'vegetable stir-fry']
  },

  'lactose-intolerance': {
    avoid: ['milk', 'cheese pizza', 'ice cream', 'creamy pasta'],
    suggest: ['soy milk smoothie', 'almond yogurt with fruit', 'grilled chicken with rice', 'tofu stir-fry']
  },

  'ibs': {
    avoid: ['beans', 'cabbage', 'fried foods', 'soda', 'cheese'],
    suggest: ['steamed fish with rice', 'grilled chicken salad', 'banana oatmeal', 'rice porridge']
  },

  'ulcer': {
    avoid: ['spicy foods', 'coffee', 'alcohol', 'fried foods', 'tomato sauces'],
    suggest: ['oatmeal', 'boiled potatoes',  'pap (ogi) with moi moi',
      'boiled yam with garden egg sauce (not too peppery)',
      'plain rice with fish stew (mild pepper)',
      'sweet potato porridge with vegetables', 'banana smoothie', 'grilled chicken with vegetables']
  },

  'constipation': {
    avoid: ['white bread', 'cheese', 'processed snacks', 'fried chicken'],
    suggest: ['oatmeal with berries', 'vegetable soup', 'brown rice with beans', 'fruit salad']
  },

  'diarrhea': {
    avoid: ['fried chicken', 'milk', 'soda', 'coffee', 'spicy curry'],
    suggest: ['boiled potatoes', 'rice porridge', 'banana smoothie', 'toast with peanut butter']
  },

  'asthma': {
    avoid: ['fried foods', 'processed meats', 'ice cream', 'cheese pizza'],
    suggest: ['salmon with broccoli', 'vegetable soup', 'apple slices', 'oatmeal with berries']
  },

  'depression': {
    avoid: ['alcohol', 'sugary desserts', 'fried fast food'],
    suggest: ['salmon with spinach', 'walnuts', 'oatmeal with bananas', 'dark chocolate in moderation']
  },

  'anxiety': {
    avoid: ['caffeine drinks', 'soda', 'fried chicken', 'sugary snacks'],
    suggest: ['chamomile tea', 'steamed vegetables with rice', 'grilled salmon', 'avocado toast']
  },

  'malnutrition': {
    avoid: ['junk food', 'soda', 'sugary snacks', 'fried foods'],
    suggest: ['lentil soup', 'grilled chicken with vegetables', 'milk or fortified alternatives', 'fruit and nut mix']
  },

  'covid-recovery': {
    avoid: ['fried fast foods', 'alcohol', 'sugary drinks'],
    suggest: ['chicken soup', 'vegetable stir-fry', 'oatmeal with fruit', 'grilled salmon with spinach']
  },

  'flu': {
    avoid: ['fried foods', 'ice cream', 'soda'],
    suggest: ['chicken broth soup', 'steamed vegetables', 'herbal tea', 'oatmeal with honey']
  },

  'tuberculosis': {
    avoid: ['fried foods', 'alcohol', 'processed snacks'],
    suggest: ['egg omelet with vegetables', 'chicken soup', 'lentil stew', 'fruit smoothies']
  }
};


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
    const SPOONACULAR_API_KEY = "4bb2d9ff7d4043d5bec0228027c7f346";
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
    setMessage({ text: '', type: '' });

    let dishName = '';

    if (inputMode === 'image') {
      if (!imageFile) {
        setMessage({ text: "No image selected.", type: "error" });
        setLoading(false);
        return;
      }
      try {
        const LOGMEAL_API_TOKEN = "fdcd45850fb7eeff7e0460a650413e209f99ad64";
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
        dishName = recognitionData.recognition_results[0].name;
        setResult({ 
          dishName,
          confidence: recognitionData.recognition_results[0].prob || "N/A",
          source: "image"
        });
      } catch (err) {
        console.error("Image analysis error:", err);
        setMessage({ text: `Image error: ${err.message}`, type: "error" });
        setLoading(false);
        return;
      }

    } else { 
      dishName = textInput.trim();
      if (!dishName) {
        setMessage({ text: "Please enter a food name.", type: "error" });
        setLoading(false);
        return;
      }
      setResult({ dishName, source: "text" });
    }

    let nutritionData = null;
    try {
      nutritionData = await trySpoonacularAPI(dishName);
    } catch {
      nutritionData = getMockNutrition(dishName);
    }
    setNutrition(nutritionData);
    setLoading(false);
  }

  const getDietarySuitability = () => {
    if (!result || selectedIllness === 'none') {
      return null;
    }

    const dishName = result.dishName.toLowerCase();
    const avoidList = illnessDietData[selectedIllness]?.avoid || [];
    const suggestList = illnessDietData[selectedIllness]?.suggest || [];

    const isUnsuitable = avoidList.some(item => dishName.includes(item));
    const isSuitable = !isUnsuitable; 
    return {
      isSuitable,
      alternatives: isUnsuitable ? suggestList : [],
      illnessName: selectedIllness.replace(/-/g, ' ').toUpperCase()
    };
  };

  const dietaryInfo = getDietarySuitability();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-wide">
            🍽️ Food Nutrition Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Upload a food image or type the food name to get nutrition info.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex shadow-inner">
            <button
              onClick={() => {
                setInputMode('image');
                setResult(null);
                setNutrition(null);
                setMessage({ text: '', type: '' });
                setTextInput('');
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                inputMode === 'image'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📷 Image
            </button>
            <button
              onClick={() => {
                setInputMode('text');
                setResult(null);
                setNutrition(null);
                setUploadedImage(null);
                setImageFile(null);
                setMessage({ text: '', type: '' });
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                inputMode === 'text'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              ✏️ Text
            </button>
          </div>
        </div>

        {inputMode === 'image' ? (
          <div className="relative border-4 border-dashed border-green-300 dark:border-green-600 rounded-2xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
              onChange={(e) => getUploadedImage(e.target.files)}
            />
            <div className="text-center space-y-4">
              <img
                className="mx-auto h-12 w-12 opacity-80 dark:invert"
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt="Upload Icon"
              />
              <p className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
                Drag & drop an image or <span className="text-green-600 dark:text-green-400 font-bold underline">browse</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accepted formats: PNG, JPG, GIF
              </p>
            </div>
            {uploadedImage && (
              <img
                src={uploadedImage}
                className="mt-6 mx-auto rounded-xl shadow-md max-h-48 object-contain w-full"
                alt="Uploaded food preview"
              />
            )}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-inner">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍎</span>
              </div>
              <div>
                <label htmlFor="food-input" className="block text-gray-700 dark:text-gray-200 font-semibold text-lg mb-2">
                  Enter Food Name
                </label>
                <input
                  id="food-input"
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && analyzeFood()}
                  placeholder="e.g., pizza, burger, salad..."
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Press Enter or click Analyze to get nutrition information.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <label htmlFor="illness-select" className="text-gray-700 dark:text-gray-300 font-medium">
            Select your health condition:
          </label>
          <select
  id="illness-select"
  value={selectedIllness}
  onChange={(e) => setSelectedIllness(e.target.value)}
  className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
>
  <option value="none">None</option>
  <option value="diabetes">Diabetes</option>
  <option value="high-blood-pressure">High Blood Pressure</option>
  <option value="flu">Flu</option>
  <option value="ulcer">Ulcer</option>
  <option value="constipation">Constipation</option>
  <option value="tuberculosis">Tuberculosis</option>
  <option value="gout">Gout</option>
  <option value="acid-reflux">Acid Reflux</option>
  <option value="asthma">Asthma</option>
  <option value="depression">Depression</option>
  <option value="ibs">IBS</option>
  <option value="obesity">Obesity</option>
  <option value="arthritis">Arthritis</option>
  <option value="celiac-disease">Celiac Disease</option>
  <option value="kidney-disease">Kidney Disease</option>
  <option value="liver-disease">Liver Disease</option>
  <option value="heart-disease">Heart Disease</option>
  <option value="high-cholesterol">High Cholesterol</option>
  <option value="osteoporosis">Osteoporosis</option>
  <option value="anemia">Anemia</option>
  <option value="malnutrition">Malnutrition</option>
  <option value="covid-recovery">COVID Recovery</option>
</select>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={analyzeFood}
            disabled={loading || (inputMode === 'image' ? !imageFile : !textInput.trim())}
            className={`w-full sm:w-auto px-8 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
              loading || (inputMode === 'image' ? !imageFile : !textInput.trim())
                ? "bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "🔍 Analyzing..." : inputMode === 'image' ? "🍽️ Analyze Image" : "🔍 Get Nutrition Info"}
          </button>
        </div>

        {message.text && (
          <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}`}>
            <p className="text-center">{message.text}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {result.source === 'image' ? '🍛 Detected Dish:' : '🍽️ Food Item:'}
            </h3>
            <p className="text-gray-800 dark:text-gray-200 text-2xl font-semibold">
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

        {dietaryInfo && (
          <div className={`mt-4 p-6 rounded-2xl shadow-md ${dietaryInfo.isSuitable ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <h3 className="text-xl font-bold mb-2">
              {dietaryInfo.isSuitable ? '✅ Dietary Recommendation' : '⚠️ Dietary Warning'}
            </h3>
            <p className="font-semibold mb-2">
              {dietaryInfo.isSuitable
                ? `This food is generally suitable for a diet focused on managing ${dietaryInfo.illnessName}.`
                : `This food is generally **not recommended** for a diet focused on managing ${dietaryInfo.illnessName}.`
              }
            </p>
            {!dietaryInfo.isSuitable && dietaryInfo.alternatives.length > 0 && (
              <>
                <p className="mt-4 font-bold">Consider these alternatives:</p>
                <ul className="list-disc list-inside mt-2">
                  {dietaryInfo.alternatives.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-4 text-xs font-medium text-center text-gray-600 dark:text-gray-400">
              Disclaimer: This is for informational purposes only. Consult a healthcare professional for dietary advice.
            </p>
          </div>
        )}

        {/* Nutrition Info Cards */}
        {nutrition && (
          <div className="mt-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              🧪 Nutrition Info (per 100g):
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md transition-transform hover:scale-105 duration-200">
                <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                  {nutrition.calories?.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {nutrition.calories?.unit} Calories
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md transition-transform hover:scale-105 duration-200">
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {nutrition.protein?.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {nutrition.protein?.unit} Protein
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md transition-transform hover:scale-105 duration-200">
                <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                  {nutrition.fat?.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {nutrition.fat?.unit} Fat
                </div>
              </div>
              
              {nutrition.carbs && (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md transition-transform hover:scale-105 duration-200">
                  <div className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                    {nutrition.carbs.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {nutrition.carbs.unit} Carbs
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
              {nutrition.source === "estimated" 
                ? "⚠️ Estimated values (API unavailable)" 
                : "✅ Data from Spoonacular API"
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
