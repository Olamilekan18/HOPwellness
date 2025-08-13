import { Moon, Sun, Plus, Users, Check } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Communities() {
  const [darkMode, setDarkMode] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({ name: "", icon: "", description: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    setDarkMode(stored === null ? true : stored === "true");
    fetchAllCommunities();
    fetchJoinedCommunities();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchAllCommunities = async () => {
    try {
      const { data } = await axios.get("/api/community");
      setAllCommunities(data);
    } catch (error) {
      console.error("Failed to fetch all communities:", error);
    }
  };

  const fetchJoinedCommunities = async () => {
         try {
        const res = await axios.get('/api/community/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJoinedCommunities(res.data);
      }  catch (error) {
      console.error("Failed to fetch joined communities:", error);
    }
  };

const handleJoin = async (id) => {
  try {
    await axios.post(`/api/community/join/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Joined community!");

    // Refresh the UI without waiting for backend streak.count fix
    fetchAllCommunities();
    fetchJoinedCommunities();

    // Force full page reload
    window.location.reload();

  } catch (error) {
    console.error("Join failed:", error.response?.data || error.message);

    // If the error is about streak.count, ignore it
    if (error.response?.data?.message?.includes("streak")) {
      console.warn("Ignoring streak.count error");
      window.location.reload();
    }
  }
};

  const handleCreate = async () => {
    try {
    await axios.post("/api/community/create", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });      setShowCreateModal(false);
      setForm({ name: "", icon: "", description: "" });
      fetchAllCommunities();
      fetchJoinedCommunities();
    } catch (error) {
      console.error("Creation failed:", error);
    }
  };

  const isJoined = (id) => joinedCommunities.some((c) => c._id === id);

  // Communities that user hasn't joined yet
  const unjoinedCommunities = allCommunities.filter(
    (c) => !isJoined(c._id)
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-5 sticky top-0 z-50 border-b border-green-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
            🌿 Explore Communities
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-green-200 dark:bg-gray-700 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg font-medium hover:bg-green-300 dark:hover:bg-gray-600 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* My Communities */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
            My Communities
          </h2>
          {joinedCommunities.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">You haven't joined any communities yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.map((community) => (
                <CommunityCard
                  key={community._id}
                  community={community}
                  isJoined={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* All Other Communities */}
        <div className="mb-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
            Discover New Communities
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            <Plus size={18} /> Create Community
          </button>
        </div>

        {unjoinedCommunities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">You're part of all communities!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unjoinedCommunities.map((community) => (
              <CommunityCard
                key={community._id}
                community={community}
                onJoin={() => handleJoin(community._id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">
              Create a New Community
            </h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 px-4 py-2 rounded border border-green-300 dark:border-gray-600 bg-green-50 dark:bg-gray-800 text-black dark:text-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Icon (e.g. 🏃)"
              className="w-full mb-3 px-4 py-2 rounded border border-green-300 dark:border-gray-600 bg-green-50 dark:bg-gray-800 text-black dark:text-white"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
            <textarea
              placeholder="Short Description"
              className="w-full mb-4 px-4 py-2 rounded border border-green-300 dark:border-gray-600 bg-green-50 dark:bg-gray-800 text-black dark:text-white"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable card component
function CommunityCard({ community, isJoined, onJoin }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{community.icon || "🌐"}</div>
        <div>
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
            {community.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {community.description}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        <div className="flex items-center gap-1">
          <Users size={16} /> {community.members?.length ?? 0} members
        </div>
        {isJoined ? (
          <span className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-gray-700 px-3 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <Check size={14} /> Joined
          </span>
        ) : (
          <button
            onClick={onJoin}
            className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-green-200 dark:hover:bg-gray-600 text-xs font-semibold"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}
