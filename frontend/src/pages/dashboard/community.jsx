/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./community/Layout";
import CommunityCard from "./community/CommunityCard";
import RightRail from "./community/RightRail";
import { useNavigate } from "react-router-dom";

export default function CommunitiesPage() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState([]);
  const [all, setAll] = useState([]);
  // const [selected, setSelected] = useState(null);
  // const [stats, setStats] = useState(null);
  // const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAll();
    fetchJoined();
  }, []);

  const fetchAll = async () => {
    try {
      const { data } = await axios.get("/api/community");
      setAll(data);
    } catch (e) {
      console.error("getAll failed", e);
    }
  };

  const fetchJoined = async () => {
    try {
      const { data } = await axios.get("/api/community/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJoined(data);
    } catch (e) {
      console.error("getMy failed", e);
    }
  };

  // const openCommunity = async (id) => {
  //   setLoading(true);
  //   try {
  //     const detail = await axios.get(`/api/community/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setSelected(detail.data);
  //     const stat = await axios.get(`/api/community/${id}/stats`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setStats(stat.data);
  //   } catch (e) {
  //     console.error("openCommunity failed", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const reloadCommunity = () => {
  //   if (selected?._id) {
  //     openCommunity(selected._id);
  //   }
  // };

  const handleJoin = async (id) => {
    try {
      await axios.post(`/api/community/join/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Joined community!");
      // fetchAllCommunities();
      // fetchJoinedCommunities();
      window.location.reload();
    } catch (error) {
      console.error("Join failed:", error.response?.data || error.message);
      if (error.response?.data?.message?.includes("streak")) {
        console.warn("Ignoring streak.count error");
        window.location.reload();
      }
    }
  };
  const isJoined = (id) => joined.some((c) => c._id === id);
  const unjoined = all.filter((c) => !isJoined(c._id));

  return (
    <Layout current="communities" right={<RightRail />}>
      <div className="mt-5 p-5">
        <div className="bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-600 rounded-3xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c2.667 0 4-1.333 4-3s-1.333-3-4-3-4 1.333-4 3 1.333 3 4 3zm0 4c-4 0-6 2-6 6v2h12v-2c0-4-2-6-6-6z"
              />
            </svg>
            <h2 className="text-3xl font-semibold text-emerald-700 dark:text-emerald-300">
              Communities
            </h2>
          </div>

          <p className="text-sm dark:text-gray-300">
            Join groups that match your vibe. Click a community to open its feed
            and explore more!
          </p>
        </div>

        <section className="px-3 py-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold dark:text-green-300 text-emerald-900">
              My Communities
            </h2>
          </div>

          {joined.length === 0 ? (
            <div className="text-center py-12 px-4 bg-emerald-50 dark:bg-gray-700 border border-emerald-100 dark:border-emerald-600 rounded-xl shadow-sm">
              <p className="text-sm text-emerald-900 dark:text-gray-300">
                You haven’t joined any communities yet. Let’s find one that
                suits your vibe!
              </p>
              <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-200">
                Browse Communities
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {joined.map((c) => (
                <div
                  key={c._id}
                  className="transition-shadow duration-300 ease-in-out transform hover:scale-105"
                >
                  <CommunityCard
                    community={c}
                    isJoined
                    onOpen={() => navigate(`/dashboard/community/${c._id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-emerald-900">Discover</h3>
          </div>
          {unjoined.length === 0 ? (
            <div className="text-sm text-emerald-900/70">
              You’re in all communities 🎉
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {unjoined.map((c) => (
                <CommunityCard
                  key={c._id}
                  community={c}
                  onJoin={() => handleJoin(c._id)}
                  // onOpen={() => navigate(`/dashboard/community/${c._id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
