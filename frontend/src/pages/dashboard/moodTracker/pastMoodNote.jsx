import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { FaSmile, FaSmileBeam, FaMeh, FaFrown, FaAngry } from "react-icons/fa";
const pastNotes = [
  {
    heading: "Great Day",
    mood: "Great",
    thought:
      "I had an amazing day, everything went smoothly, and I feel full of energy!",
    date: "July 20, 2025",
    tags: ["productivity", "grateful"],
  },
  {
    heading: "Good Day",
    mood: "Good",
    thought: "The day was decent, I managed to accomplish most of my goals.",
    date: "July 20, 2025",
    tags: ["accomplished", "motivated"],
  },
  {
    heading: "Neutral Day",
    mood: "Neutral",
    thought:
      "It was an average day, nothing extraordinary happened, but nothing bad either.",
    date: "July 20, 2025",
    tags: ["average", "balanced"],
  },
  {
    heading: "Sad Day",
    mood: "Sad",
    thought:
      "I'm feeling a bit down today, missing the good moments from the past.",
    date: "July 20, 2025",
    tags: ["emotional", "reflection"],
  },
  {
    heading: "Angry Day",
    mood: "Angry",
    thought:
      "Today has been frustrating, things didn't go as planned, and I'm upset about it.",
    date: "July 20, 2025",
    tags: ["frustration", "stress"],
  },
];
export default function PastMoodNote() {
  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Past Mood Notes
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A look back at your moods and experiences
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastNotes.map(({ heading, thought, mood, date, tags }, idx) => {
          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {heading}
                </h4>
                {mood == "Great" ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <FaSmileBeam style={{ color: "#4CAF50" }} />
                    <span className="text-sm font-medium">{mood}</span>
                  </div>
                ) : mood == "Good" ? (
                  <div className="flex items-center gap-1 text-[#8BC34A]">
                    <FaSmile style={{ color: "#8BC34A" }} />
                    <span className="text-sm font-medium">{mood}</span>
                  </div>
                ) : mood == "Neutral" ? (
                  <div className="flex items-center gap-1 text-[#FFC107]">
                    <FaMeh style={{ color: "#FFC107" }} />
                    <span className="text-sm font-medium">{mood}</span>
                  </div>
                ) : mood == "Sad" ? (
                  <div className="flex items-center gap-1 text-[#F44336]">
                    <FaFrown style={{ color: "#F44336" }} />
                    <span className="text-sm font-medium">{mood}</span>
                  </div>
                ) : mood == "Angry" ? (
                  <div className="flex items-center gap-1 text-[#E91E63]">
                    <FaAngry style={{ color: "#E91E63" }} />
                    <span className="text-sm font-medium">{mood}</span>
                  </div>
                ) : null}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {thought}
              </p>

              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                <FaCalendarAlt className="mr-1" />
                <span>Posted on: {date}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, idx) => {
                  return (
                    <span
                      key={idx}
                      className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded-full text-xs"
                    >
                      <FaTag className="text-green-400" /> {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
