import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import MoodTrackerOverview from "./moodTracker/overviewSection";
import PastMoodNote from "./moodTracker/pastMoodNote";

export default function MoodTracker() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-12 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white">
          Mood Tracker
        </h1>
        <MoodTrackerOverview />
        <PastMoodNote />
      </div>
    </DashboardLayout>
  );
}
