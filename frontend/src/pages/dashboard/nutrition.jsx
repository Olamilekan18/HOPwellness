import { useState } from "react";
import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import NutritionNavigation from "./nutritionPage/nutritionNavigation";
import NutritionFoodScanner from "./nutritionPage/foodScanner";
import NutritionTodaysMeals from "./nutritionPage/todaysMeals";
import NutritionMealsSuggestion from "./nutritionPage/mealSugesstion";

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

        <NutritionNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {activeSection === "scanner" && (
          <NutritionFoodScanner
            getUploadedImage={getUploadedImage}
            uploadedImage={uploadedImage}
          />
        )}

        {activeSection === "log-meals" && <NutritionTodaysMeals />}

        {activeSection === "meal-suggestions" && <NutritionMealsSuggestion />}
      </div>
    </DashboardLayout>
  );
}
