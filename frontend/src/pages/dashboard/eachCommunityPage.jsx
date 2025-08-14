/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./community/Layout";
import RightRail from "./community/RightRail";
import StatCard from "./community/StatCard";
import PostItem from "./community/PostItem";
import PostComposer from "./community/PostComposer";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
export default function EachCommunityPage() {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    openCommunity(communityId);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout current="communities" right={<RightRail />}>
      {selected && (
        <>
          <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-400 h-56 sm:h-65 rounded-b-3xl shadow-lg overflow-hidden">
            <button
              onClick={() => navigate(`/dashboard/community`)}
              className="absolute top-4 left-4 flex items-center gap-2 text-white font-semibold hover:text-emerald-200 transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />{" "}
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="absolute bottom-5 left-2 sm:left-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white dark:border-gray-800">
                {selected.icon || "🌿"}
              </div>

              <div className="text-white text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">
                  {selected.name}
                </h1>
                <p className="text-white/90 text-sm sm:text-base">
                  {selected.description}
                </p>
              </div>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <button className="bg-white text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 px-6 py-2 rounded-full font-medium shadow-lg transition-all">
                Join
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="mt-16 grid lg:grid-cols-3 px-5 py-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PostComposer
                communityId={selected?._id}
                onPost={() => openCommunity(selected._id)}
                className="bg-white p-6 rounded-2xl shadow"
              />

              {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : stats?.recentActivity?.length ? (
                stats.recentActivity.map((p) => (
                  <PostItem key={p.id} post={p} />
                ))
              ) : (
                <div className="text-sm text-gray-500">No posts yet.</div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700">
                <h4 className="font-semibold mb-4 text-emerald-900 dark:text-white">
                  Community Stats
                </h4>
                <div className="space-y-4">
                  <StatCard
                    title="Members"
                    value={stats?.totalMembers ?? "—"}
                    className="transition-all hover:bg-emerald-100 dark:hover:bg-emerald-700 rounded-lg p-4"
                  />
                  <StatCard
                    title="Total Posts"
                    value={stats?.totalPosts ?? "—"}
                    className="transition-all hover:bg-emerald-100 dark:hover:bg-emerald-700 rounded-lg p-4"
                  />
                  <StatCard
                    title="Most Active"
                    value={stats?.mostActiveUser?.name ?? "—"}
                    className="transition-all hover:bg-emerald-100 dark:hover:bg-emerald-700 rounded-lg p-4"
                  />
                </div>
              </div>
              <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-white">
                    Members
                  </h4>
                  {selected.members.length > 4 && (
                    <button
                      onClick={() => console.log("Show all members")}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-all"
                    >
                      See More
                    </button>
                  )}
                </div>
                <div className="max-h-[320px] overflow-auto space-y-3">
                  {selected.members.slice(0, 4).map((m) => (
                    <div
                      key={m._id}
                      className="flex items-center gap-4 hover:bg-emerald-50 dark:hover:bg-emerald-700 rounded-lg p-3 transition-all"
                    >
                      <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-lg font-semibold text-emerald-900 dark:bg-emerald-500 dark:text-white">
                        {m.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-sm text-emerald-900 dark:text-white">
                        {m.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
