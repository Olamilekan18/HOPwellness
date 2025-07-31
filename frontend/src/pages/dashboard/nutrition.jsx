import { useState } from "react";
import DashboardLayout from "../../componet/dashboard/dashboardLayout";

export default function Nutrition() {
  const [uploadedImage, setuploadedImage] = useState();
  const [activeSection, setActiveSection] = useState("scanner");

  function getUploadedImage(e) {
    if (e[0] && e) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setuploadedImage(e.target.result);
      };
      reader.readAsDataURL(e[0]);
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">
          Nutrition Dashboard
        </h1>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl">
          <button
            onClick={() => setActiveSection("scanner")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeSection === "scanner"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Food Scanner</span>
          </button>

          <button
            onClick={() => setActiveSection("log-meals")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeSection === "log-meals"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Log Today&apos;s Meals</span>
          </button>

          <button
            onClick={() => setActiveSection("meal-suggestions")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeSection === "meal-suggestions"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span>Meal Suggestions</span>
          </button>
        </div>

        {/* Food Scanner Section */}
        {activeSection === "scanner" && (
          <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div
              className="relative border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow duration-300"
              id="dropzone"
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                onChange={(e) => {
                  getUploadedImage(e.target.files);
                }}
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
                  id="preview"
                />
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
              >
                🍽️ Check Now
              </button>
            </div>
          </div>
        )}

        {/* Log Today's Meals Section */}
        {activeSection === "log-meals" && (
          <div className="w-full max-w-4xl space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                Log Your Meals for Today
              </h2>

              {/* Meal Categories */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Breakfast */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      🌅 Breakfast
                    </h3>
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">
                      0 cal
                    </span>
                  </div>
                  <button className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                    + Add Item
                  </button>
                </div>

                {/* Lunch */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      ☀️ Lunch
                    </h3>
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      0 cal
                    </span>
                  </div>
                  <button className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                    + Add Item
                  </button>
                </div>

                {/* Dinner */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      🌙 Dinner
                    </h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      0 cal
                    </span>
                  </div>
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    + Add Item
                  </button>
                </div>

                {/* Snacks */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      🍎 Snacks
                    </h3>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      0 cal
                    </span>
                  </div>
                  <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    + Add Item
                  </button>
                </div>
              </div>

              {/* Daily Summary */}
              <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Today&apos;s Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      0
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Calories
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">0g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Protein
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">0g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Carbs
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">0g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Fat
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Meal Suggestions Section */}
        {activeSection === "meal-suggestions" && (
          <div className="w-full max-w-6xl space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                Personalized Meal Suggestions
              </h2>

              {/* Filter Options */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors">
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
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                  Healthy
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                  Quick & Easy
                </button>
              </div>

              {/* Meal Suggestions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Meal Cards */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Avocado Toast
                    </h3>
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                      Breakfast
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                    Whole grain bread with mashed avocado, tomatoes, and a
                    sprinkle of seeds
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      320 calories
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      15 min
                    </span>
                  </div>
                  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Add to Meal Plan
                  </button>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                      Grilled Chicken Salad
                    </h3>
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs">
                      Lunch
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                    Mixed greens with grilled chicken breast, cherry tomatoes,
                    and vinaigrette
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      380 calories
                    </span>
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      20 min
                    </span>
                  </div>
                  <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                    Add to Meal Plan
                  </button>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      Salmon with Quinoa
                    </h3>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                      Dinner
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    Baked salmon fillet with quinoa pilaf and steamed vegetables
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      450 calories
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      30 min
                    </span>
                  </div>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Add to Meal Plan
                  </button>
                </div>
              </div>

              {/* Generate More Suggestions */}
              <div className="text-center mt-8">
                <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105">
                  Generate More Suggestions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
