import { useState, useEffect } from "react";
import axios from "axios";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { FaBottleWater } from "react-icons/fa6";
import { BsPersonWalking } from "react-icons/bs";
import { Sun } from "lucide-react";
import { GiNightSleep } from "react-icons/gi";

const weeklyChallengeIcons = {
  "check-in": FiActivity,
  "hydrate": FaBottleWater,
  "steps-10k": BsPersonWalking,
  "stretch": Sun,
  "sleep-8hr": GiNightSleep,
};

const DefaultWeeklyIcon = AiOutlineStar;

export default function WeeklyChallenge() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weeklyChallenges, setWeeklyChallenges] = useState([]);

  useEffect(() => {
    const fetchAssignedChallenges = async () => {
      try {
        setLoading(true);
        let token = null;
        if (typeof window !== 'undefined') {
          token = localStorage.getItem('token');
        }
        const response = await axios.get("/api/challenges/assigned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWeeklyChallenges(response.data.weekly);
        setError(null);
      } catch (err) {
        console.error("Error fetching weekly challenges:", err);
        setError(err.message || "Failed to fetch weekly challenges.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedChallenges();
  }, []);

  const handleCompleteChallenge = async (challengeToComplete) => {
    setError(null); 

    const currentChallengeState = weeklyChallenges.find(
      c => c.challengeId === challengeToComplete.challengeId
    );
    const wasAlreadyFullyCompleted = currentChallengeState ? currentChallengeState.completed : false;

    setWeeklyChallenges(prevChallenges =>
      prevChallenges.map(c => {
        if (c.challengeId === challengeToComplete.challengeId) {
          if (c.completed) {
              return c; 
          }
          const newCompletedCount = (c.completedCount || 0) + 1;
          const newIsFullyCompleted = newCompletedCount >= (c.targetCount || 1);
          return {
            ...c,
            completedCount: newCompletedCount,
            completed: newIsFullyCompleted
          };
        }
        return c;
      })
    );

    try {
      let token = null;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token'); 
      }

      const apiUrl = `/api/challenges/${challengeToComplete.challengeId}/complete`;

      await axios.post(
        apiUrl,
        {
          type: "weekly",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Weekly Challenge "${challengeToComplete.title}" progress updated.`);

    } catch (err) {
      console.error("Error completing weekly challenge:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to mark weekly challenge as complete.";
      setError(errorMessage);

      if (!wasAlreadyFullyCompleted && errorMessage !== 'You have already completed this challenge today.') {
          setWeeklyChallenges(prevChallenges =>
            prevChallenges.map(c => {
              if (c.challengeId === challengeToComplete.challengeId) {
                const revertedCompletedCount = Math.max(0, (c.completedCount || 0) - 1);
                const revertedIsFullyCompleted = revertedCompletedCount >= (c.targetCount || 1);
                return {
                  ...c,
                  completedCount: revertedCompletedCount,
                  completed: revertedIsFullyCompleted
                };
              }
              return c;
            })
          );
      }
      setTimeout(() => setError(null), 5000);
    }
  };


  if (loading) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-300">
        Loading weekly challenges...
      </div>
    );
  }

  return (
    <div className="mt-10 ">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Weekly Challenges
      </h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && weeklyChallenges.length === 0 && (
           <p className="text-gray-500 dark:text-gray-400">No weekly challenges assigned for this week.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeklyChallenges.map((challenge) => {
            const Icon = weeklyChallengeIcons[challenge.id] || DefaultWeeklyIcon;
            const isFullyCompleted = challenge.completed || false;
            const completedCount = challenge.completedCount || 0;
            const targetCount = challenge.targetCount || 1;

            const progressPercentage = (completedCount / targetCount) * 100;

            return (
              <div
                key={challenge.challengeId}
                className={`p-5 bg-white dark:bg-gray-900 rounded-xl shadow border ${isFullyCompleted ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'}`}
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
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-right text-green-500 font-semibold mt-1">
                    {completedCount}/{targetCount} days | {challenge.xpReward} Xps
                  </p>

                  <div className="mt-4 text-right">
                    {isFullyCompleted ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold flex items-center justify-end">
                        <BsPatchCheckFill className="mr-1 text-lg" /> Completed! 🎉
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCompleteChallenge(challenge)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                         Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}