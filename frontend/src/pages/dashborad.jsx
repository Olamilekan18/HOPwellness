import DashboardLayout from "../componet/dashboard/dashboardLayout";
// import { useEffect } from "react";
// import axios from "axios";
export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Welcome to your Health Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-4">
        Track your workouts, nutrition, and progress all in one place!
      </p>
    </DashboardLayout>
  );
}
