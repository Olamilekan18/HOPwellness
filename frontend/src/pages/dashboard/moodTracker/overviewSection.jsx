import { FaSmile, FaSmileBeam, FaMeh, FaFrown, FaAngry } from "react-icons/fa";
import { useState } from "react";
import PieChartSection from "./chartSection";
import NewMoodSection from "./newMoodSection";

const pieData = [
  { name: "Great", value: 5, color: "#4CAF50" },
  { name: "Good", value: 3, color: "#8BC34A" },
  { name: "Neutral", value: 2, color: "#FFC107" },
  { name: "Sad", value: 1, color: "#F44336" },
  { name: "Angry", value: 1, color: "#E91E63" },
];
const getUserMood = [
  { icon: FaSmileBeam, userMood: "Great", iconColor: "#4CAF50" },
  { icon: FaSmile, userMood: "Good", iconColor: "#8BC34A" },
  { icon: FaMeh, userMood: "Neutral", iconColor: "#FFC107" },
  { icon: FaFrown, userMood: "Sad", iconColor: "#F44336" },
  { icon: FaAngry, userMood: "Angry", iconColor: "#E91E63" },
];
export default function MoodTrackerOverview() {
  const [mood, setMood] = useState();
  const [showAddTagSection, setShowAddTagSection] = useState(false);
  const [newTag, setNewTag] = useState("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 px-4 md:px-8">
      <div className="space-y-8">
        <p className="text-lg font-semibold mb-6 dark:text-white">
          How are you feeling today?
        </p>
        <div className="flex items-center justify-between mb-8 space-x-4 sm:space-x-6 overflow-x-auto">
          {getUserMood.map(({ icon: Icon, userMood, iconColor }, idx) => {
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
                  style={{ color: iconColor }}
                  onClick={() => {
                    setMood(userMood);
                  }}
                />
              </div>
            );
          })}
        </div>

        <NewMoodSection
          newTag={newTag}
          setNewTag={setNewTag}
          showAddTagSection={showAddTagSection}
          setShowAddTagSection={setShowAddTagSection}
          mood={mood}
        />
      </div>

      <PieChartSection pieData={pieData} />
    </div>
  );
}
