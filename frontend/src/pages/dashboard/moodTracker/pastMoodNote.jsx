import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { FaSmile, FaSmileBeam, FaMeh, FaFrown, FaAngry } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";


const getMoodDisplay = (mood) => {
  switch (mood) {
    case "Great":
      return { icon: <FaSmileBeam />, color: "#4CAF50" };
    case "Good":
      return { icon: <FaSmile />, color: "#8BC34A" };
    case "Neutral":
      return { icon: <FaMeh />, color: "#FFC107" };
    case "Sad":
      return { icon: <FaFrown />, color: "#F44336" };
    case "Angry":
      return { icon: <FaAngry />, color: "#E91E63" };
    default:
      return { icon: <FaMeh />, color: "#9E9E9E" };
  }
};

export default function PastMoodNote({ refreshTrigger }) {
  const [moodLogs, setMoodLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoodLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/mood/logs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMoodLogs(response.data);
    } catch (err) {
      console.error(
        "Error fetching mood logs:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to load mood logs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodLogs();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 px-4 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400 border-solid mb-4"></div>
        <span className="text-lg font-medium text-green-600 dark:text-green-300">
          Loading your past mood notes...
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Please wait while we fetch your mood history.
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 px-4 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (moodLogs.length === 0) {
    return (
      <div className="container mx-auto mt-10 px-4 text-center dark:text-white">
        No mood notes found. Check in your first mood!
      </div>
    );
  }

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
        {moodLogs.map((note) => {
          const { icon, color } = getMoodDisplay(note.emoji);
          const formattedDate = new Date(note.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <div
              key={note._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {note.title}
                </h4>
                <div
                  className="flex items-center gap-1"
                  style={{ color: color }}
                >
                  {icon}
                  <span className="text-sm font-medium">{note.emoji}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {note.note}
              </p>

              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                <FaCalendarAlt className="mr-1" />
                <span>Posted on: {formattedDate}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags &&
                  note.tags.map((tag, idx) => {
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

PastMoodNote.propTypes = {
  refreshTrigger: PropTypes.number,
};
