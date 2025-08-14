/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import RightRail from "./components/RightRail";
import StatCard from "./components/StatCard";
import PostItem from "./components/PostItem";
import PostComposer from "./components/PostComposer";
import { ArrowLeft, Activity } from "lucide-react";
import axios from "axios";
export default function EachCommunityPage() {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    function fetchCommunity() {
      openCommunity(communityId);
    }
    fetchCommunity();
  }, [communityId]);

  const openCommunity = async (id) => {
    setLoading(true);
    try {
      const detail = await axios.get(`/api/community/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelected(detail.data);
      const stat = await axios.get(`/api/community/${id}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(stat.data);
    } catch (e) {
      console.error("openCommunity failed", e);
    } finally {
      setLoading(false);
    }
  };

  const reloadCommunity = () => {
    if (selected?._id) {
      openCommunity(selected._id);
    }
  };

  return (
    <Layout current="communities" right={<RightRail />}>
      {selected && (
        <>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-medium transition-all ease-in-out"
          >
            <ArrowLeft size={18} />{" "}
            <span className="hidden sm:inline">Back to Communities</span>
          </button>

          {/* Community Header */}
          <section className="mt-6 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="text-6xl sm:text-7xl">
                {selected.icon || "🌿"}
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  {selected.name}
                </h2>
                <p className="mt-3 text-lg opacity-80">
                  {selected.description}
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <StatCard title="Members" value={stats?.totalMembers ?? "—"} />
            <StatCard title="Total Posts" value={stats?.totalPosts ?? "—"} />
            <StatCard
              title="Most Active"
              value={stats?.mostActiveUser?.name ?? "—"}
            />
          </section>

          {/* Community Feed */}
          <section className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4 text-emerald-900">
                <Activity size={24} />
                <h3 className="font-semibold text-2xl">Community Feed</h3>
              </div>

              <PostComposer
                communityId={selected?._id}
                onPost={reloadCommunity}
                className="bg-white p-6 rounded-2xl shadow-lg mb-6"
              />

              {loading ? (
                <div className="text-sm text-emerald-900/70">Loading...</div>
              ) : stats?.recentActivity?.length ? (
                stats.recentActivity.map((p) => (
                  <PostItem key={p.id} post={p} />
                ))
              ) : (
                <div className="text-sm text-emerald-900/70">No posts yet.</div>
              )}
            </div>

            {/* Member List */}
            <aside className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-emerald-100 shadow-sm p-6">
                <h4 className="font-semibold text-emerald-900 dark:text-white mb-4">
                  Members
                </h4>
                <ul className="space-y-4 dark:text-white max-h-[480px] overflow-auto pr-1">
                  {selected.members.map((m) => (
                    <li
                      key={m._id}
                      className="flex items-center gap-4 p-4 hover:bg-emerald-100 rounded-xl dark:hover:bg-emerald-800 transition-colors"
                    >
                      <span className="h-12 w-12 rounded-full bg-emerald-200" />
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
