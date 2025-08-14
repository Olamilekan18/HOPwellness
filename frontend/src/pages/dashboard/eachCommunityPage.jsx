/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./community/Layout";
import RightRail from "./community/RightRail";
import StatCard from "./community/StatCard";
import PostItem from "./community/PostItem";
import PostComposer from "./community/PostComposer";
import axios from "axios";
import EachCommunityPageHeader from "./community/eachCommunity/header";
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
          <EachCommunityPageHeader navigate={navigate} selected={selected} />

          <div className="mt-16 grid lg:grid-cols-3 px-5 py-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PostComposer
                communityId={selected?._id}
                onPost={() => openCommunity(selected._id)}
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
