import { PieChart, Pie, Cell } from "recharts";
import {
  FaSmile,
  FaSmileBeam,
  FaMeh,
  FaFrown,
  FaAngry,
  FaStickyNote,
} from "react-icons/fa";

const pieData = [
  { name: "Great", value: 5, color: "#4CAF50" },
  { name: "Good", value: 3, color: "#8BC34A" },
  { name: "Neutral", value: 2, color: "#FFC107" },
  { name: "Sad", value: 1, color: "#F44336" },
  { name: "Angry", value: 1, color: "#E91E63" },
];
export default function MoodTrackerOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <p className="text-lg font-semibold mb-6 dark:text-white">
          How are you feeling today?
        </p>
        <div className="flex items-center justify-between mb-8 space-x-6">
          <div className="border-4 rounded-full p-2 border-purple-500 hover:bg-purple-100 transition">
            <FaSmileBeam size={40} className="text-green-600" />
          </div>
          <FaSmile
            size={40}
            className="text-green-400 hover:text-green-600 transition"
          />
          <FaMeh
            size={40}
            className="text-yellow-500 hover:text-yellow-600 transition"
          />
          <FaFrown
            size={40}
            className="text-red-400 hover:text-red-600 transition"
          />
          <FaAngry
            size={40}
            className="text-red-600 hover:text-red-800 transition"
          />
        </div>

        <div className="relative bg-white border rounded-xl p-6 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-2 font-medium mb-3 text-gray-700 dark:text-white">
            <FaStickyNote />
            <span>Note</span>
          </div>
          <p className="text-gray-800 dark:text-gray-300 mb-5">
            Very excited to have met our new puppy!
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Excited ✕
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Family ✕
            </span>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
              Love ✕
            </span>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-white">
              Add tag
            </button>
          </div>
        </div>
      </div>

      {/* Right Side (Pie Chart) */}
      <div className="p-6 rounded-xl shadow-lg dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
            Mood Overview
          </h3>
          <div className="flex gap-2 text-sm">
            <button className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md font-medium text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              All time
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md font-medium text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              This month
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center relative">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute text-center w-full top-1/2 transform -translate-y-1/2">
            <FaSmile size={36} className="mx-auto text-green-400 mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
