import { useState, useEffect } from "react";
import axios from "axios";
import { BsPatchCheckFill, BsPersonWalking } from "react-icons/bs";
import { Sun } from "lucide-react";
import { FaBottleWater } from "react-icons/fa6";
import { FaAppleAlt } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { FiTarget } from "react-icons/fi";
import { NotebookText, Brain, Wind } from "lucide-react";
import { MdOutlineAirlineSeatLegroomNormal } from "react-icons/md";

const challengeIcons = {
  "check-in": BsPatchCheckFill,
  hydrate: FaBottleWater,
  "steps-10k": BsPersonWalking,
  stretch: Sun,
  "sleep-8hr": GiNightSleep,
  "eat-fruit-veg": FaAppleAlt,
  journal: NotebookText,
  meditate: Brain,
  "deep-breaths": Wind,
  "posture-check": MdOutlineAirlineSeatLegroomNormal,
};

const DefaultIcon = FiTarget;

export default function DailyChallenge() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dailyChallenges, setDailyChallenges] = useState([]);

  useEffect(() => {
    const fetchAssignedChallenges = async () => {
      try {
        setLoading(true);
        let token = null;
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token");
        }
        const response = await axios.get("/api/challenges/assigned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
setDailyChallenges(Array.isArray(response.data.daily) ? response.data.daily : []);

      } catch (err) {
        console.error("Error fetching daily challenges:", err);
        setError(err.message || "Failed to fetch daily challenges.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedChallenges();
  }, []);

  const handleCompleteChallenge = async (challengeToComplete) => {
    setError(null);

    const currentChallengeState = dailyChallenges.find(
      (c) => c.challengeId === challengeToComplete.challengeId
    );
    const wasAlreadyCompleted = currentChallengeState
      ? currentChallengeState.completed
      : false;

    if (!wasAlreadyCompleted) {
      setDailyChallenges((prevChallenges) =>
        prevChallenges.map((c) =>
          c.challengeId === challengeToComplete.challengeId
            ? { ...c, completed: true }
            : c
        )
      );
    }

    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }

      const apiUrl = `/api/challenges/${challengeToComplete.challengeId}/complete`;

      await axios.post(
        apiUrl,
        {
          type: "daily",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `Challenge "${challengeToComplete.title}" marked as complete.`
      );
    } catch (err) {
      console.error("Error completing challenge:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to mark challenge as complete.";
      setError(errorMessage);

      if (
        !wasAlreadyCompleted &&
        err.response?.status !== 400 &&
        err.response?.data?.message !==
          "You have already completed this challenge today."
      ) {
        setDailyChallenges((prevChallenges) =>
          prevChallenges.map((c) =>
            c.challengeId === challengeToComplete.challengeId
              ? { ...c, completed: false }
              : c
          )
        );
      }
      setTimeout(() => setError(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-10 px-4 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400 border-solid mb-4"></div>
        <span className="text-lg font-medium text-green-600 dark:text-green-300">
          Loading your Daily Challenges...
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Please wait while we fetch your daily challenges.
        </span>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-black dark:text-gray-200 mb-4">
        Daily Challenges
      </h3>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && dailyChallenges.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No daily challenges assigned for today.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyChallenges.map((challenge) => {
          const Icon = challengeIcons[challenge.id] || DefaultIcon;
          const isCompleted = challenge.completed || false;

          return (
            <div
              key={challenge.challengeId}
              className={`p-5 bg-white dark:bg-gray-900 rounded-xl shadow border ${
                isCompleted
                  ? "border-green-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              style={{ transition: "transform 0.2s" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center dark:text-white text-green-500 text-xl bg-gray-200 dark:bg-green-600 rounded-full">
                  <Icon />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {challenge.description}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={isCompleted ? { width: "100%" } : { width: "0%" }}
                  />
                </div>
                <p className="text-xs text-right text-green-500 mt-1 font-semibold">
                  {challenge.xpReward} Xps
                </p>

                <div className="mt-4 text-right">
                  {isCompleted ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold flex items-center justify-end">
                      <BsPatchCheckFill className="mr-1 text-lg" /> Completed!
                      🎉
                    </span>
                  ) : (
                    <button
                      onClick={() => handleCompleteChallenge(challenge)}
                      className="px-4 py-2 bg-green-500 text-white cursor-pointer rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
