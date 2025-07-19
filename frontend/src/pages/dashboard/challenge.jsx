import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import DailyChallenge from "./challenge/dailyChallenge";
import WeeklyChallenge from "./challenge/weeklyChallenge";

//   {
//     icon: BsPatchCheckFill,
//     id: "check-in",
//     title: "Daily Check-In",
//     description: "Check in every day to build your streak",
//     completed: true,
//     xpReward: 10,
//   },
//   {
//     icon: FaBottleWater,
//     id: "hydrate",
//     title: "Hydration Goal",
//     description: "Drink at least 2 liters of water",
//     completed: false,
//     xpReward: 15,
//   },
//   {
//     icon: BsPersonWalking,
//     id: "steps-10k",
//     title: "10,000 Steps",
//     description: "Walk 10,000 steps today",
//     completed: true,
//     xpReward: 20,
//   },
//   {
//     icon: Sun,
//     id: "stretch",
//     title: "Morning Stretch",
//     description: "Do a 5-minute stretching routine",
//     completed: true,
//     xpReward: 10,
//   },
//   {
//     icon: GiNightSleep,
//     id: "sleep-8hr",
//     title: "Sleep Goal",
//     description: "Get at least 8 hours of sleep",
//     completed: false,
//     xpReward: 20,
//   },
// ];

export default function Challenge() {
  return (
    <DashboardLayout>
      <section className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Challenge
          </h2>
          <DailyChallenge />
          <WeeklyChallenge />
        </div>
      </section>
    </DashboardLayout>
  );
}
