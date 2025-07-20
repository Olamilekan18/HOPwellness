import { PieChart, Pie, Cell } from "recharts";
import {
  FaSmile,
  FaSmileBeam,
  FaMeh,
  FaFrown,
  FaAngry,
  FaStickyNote,
} from "react-icons/fa";
import { useState } from "react";

const pieData = [
  { name: "Great", value: 5, color: "#4CAF50" },
  { name: "Good", value: 3, color: "#8BC34A" },
  { name: "Neutral", value: 2, color: "#FFC107" },
  { name: "Sad", value: 1, color: "#F44336" },
  { name: "Angry", value: 1, color: "#E91E63" },
];
const getUserMood = [
  { icon: FaSmileBeam, userMood: "Great" },
  { icon: FaSmile, userMood: "Good" },
  { icon: FaMeh, userMood: "Neutral" },
  { icon: FaFrown, userMood: "Sad" },
  { icon: FaAngry, userMood: "Angry" },
];
export default function MoodTrackerOverview() {
  const [mood, setMood] = useState();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 px-4 md:px-8">
      {/* Left Side (Mood Selection and Notes) */}
      <div className="space-y-8">
        <p className="text-lg font-semibold mb-6 dark:text-white">
          How are you feeling today?
        </p>
        <div className="flex items-center justify-between mb-8 space-x-4 sm:space-x-6 overflow-x-auto">
          {getUserMood.map(({ icon: Icon, userMood }, idx) => {
            return (
              <div
                key={idx}
                className={
                  mood === userMood
                    ? " border-2 rounded-full p-1 border-green-500 hover:bg-purple-100 transition"
                    : null
                }
              >
                <Icon
                  size={40}
                  className="text-green-600 "
                  onClick={() => {
                    setMood(userMood);
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="relative bg-white border rounded-xl p-6 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-2 font-medium mb-3 text-gray-700 dark:text-white">
            <div className="flex items-center gap-2">
              <FaStickyNote />
              <span>Note</span>
            </div>
            <span className="text-gray-500 dark:text-gray-300">
              {mood ? `Mood: ${mood}` : null}
            </span>
          </div>

          <textarea className="text-gray-800 dark:text-gray-300 mb-5 w-full h-28 border-2 border-gray-600 dark:border-white rounded-2xl p-2 resize-none"></textarea>

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

          <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition w-full">
            Add Note
          </button>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-lg dark:bg-gray-800 max-w-full">
        <div className="mb-6">
          <h3 className="font-semibold text-xl text-center text-gray-800 dark:text-white">
            Mood Overview
          </h3>
        </div>

        <div className="flex justify-center items-center relative">
          <PieChart width={250} height={250}>
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

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaSmile size={36} className="mx-auto text-green-400 mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
