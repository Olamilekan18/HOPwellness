import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Activity } from "lucide-react";

import Layout from "./components/Layout";
import CommunityCard from "./components/CommunityCard";
import RightRail from "./components/RightRail";
import StatCard from "./components/StatCard";
import PostItem from "./components/PostItem";
import PostComposer from "./components/PostComposer";

export default function CommunitiesPage() {
  const [joined, setJoined] = useState([]);
  const [all, setAll] = useState([]);
  const [selected, setSelected] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
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
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoined(data);
    } catch (e) {
      console.error("getMy failed", e);
    }
  };

  const openCommunity = async (id) => {
    setLoading(true);
    try {
      const detail = await axios.get(`/api/community/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelected(detail.data);
      const stat = await axios.get(`/api/community/${id}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(stat.data);
    } catch (e) {
      console.error("openCommunity failed", e);
    } finally {
      setLoading(false);
    }
  };

 const handleJoin = async (id) => {
    try {
      await axios.post(`/api/community/join/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Joined community!");
      fetchAllCommunities();
      fetchJoinedCommunities();
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
    <Layout
      current="communities"
      right={<RightRail />}
    >
      {!selected ? (
        <>
          {/* headline */}
          <div className="bg-white dark:bg-gray-900 border border-emerald-100 rounded-2xl shadow-sm p-5">
            <h2 className="text-2xl font-bold text-green-100">Communities</h2>
            <p className="text-sm  text-white">
              Join groups that match your vibe. Click a joined community to open its feed.
            </p>
          </div>

          {/* My Communities */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold dark:text-green-300 text-emerald-900">My Communities</h3>
            </div>
            {joined.length === 0 ? (
              <div className="text-sm text-emerald-900/70">You haven’t joined any communities yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {joined.map((c) => (
                  <CommunityCard
                    key={c._id}
                    community={c}
                    isJoined
                    onOpen={() => openCommunity(c._id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Discover */}
          <section className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-emerald-900">Discover</h3>
            </div>
            {unjoined.length === 0 ? (
              <div className="text-sm text-emerald-900/70">You’re in all communities 🎉</div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {unjoined.map((c) => (
                  <CommunityCard
                    key={c._id}
                    community={c}
                    onJoin={() => handleJoin(c._id)}
                    onOpen={() => openCommunity(c._id)}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          {/* Back */}
          <button
            onClick={() => { setSelected(null); setStats(null); }}
            className="inline-flex items-center gap-2 text-emerald-800 hover:underline"
          >
            <ArrowLeft size={18} /> Back to Communities
          </button>

          {/* Banner */}
          <section className="mt-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl p-6 text-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{selected.icon || "🌿"}</div>
              <div>
                <h2 className="text-3xl font-extrabold">{selected.name}</h2>
                <p className="opacity-90">{selected.description}</p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid md:grid-cols-3 gap-4">
            <StatCard title="Members" value={stats?.totalMembers ?? "—"}  />
            <StatCard title="Total Posts" value={stats?.totalPosts ?? "—"} />
            <StatCard title="Most Active" value={stats?.mostActiveUser?.name ?? "—"} />
          </section>

          {/* Feed + Members */}
          <section className="grid lg:grid-cols-3 gap-6">
            {/* Feed */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-emerald-900">
                <Activity size={18} />
                <h3 className="font-semibold dark:text-white  ">Community feed</h3>
              </div>

              <PostComposer disabled />

              {loading ? (
                <div className="text-sm text-emerald-900/70">Loading…</div>
              ) : stats?.recentActivity?.length ? (
                stats.recentActivity.map((p) => (
                  <PostItem key={p.id} post={p} />
                ))
              ) : (
                <div className="text-sm text-emerald-900/70">No posts yet.</div>
              )}
            </div>

            {/* Members */}
            <aside className="space-y-3">
              <div className="bg-white rounded-2xl border dark:bg-gray-900 border-emerald-100 shadow-sm p-4">
                <h4 className="font-semibold text-emerald-900 mb-3 dark:text-white">Members</h4>
                <ul className="space-y-2 dark:text-white max-h-[480px] overflow-auto pr-1">
                  {selected.members.map((m) => (
                    <li key={m._id} className="flex items-center gap-3 dark:text-white">
                      <span className="h-8 w-8 rounded-full bg-emerald-200" />
                      <span className="text-sm text-emerald-900">{m.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>
        </>
      )}
    </Layout>
  );
}
