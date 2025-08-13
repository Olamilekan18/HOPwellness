import { Users, Check } from "lucide-react";

export default function CommunityCard({ community, isJoined, onJoin, onOpen }) {
  return (
    <div
      className="bg-white dark:bg-gray-800  rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
      onClick={onOpen}
    >
      <div className="h-24 bg-gradient-to-r from-emerald-600 to-emerald-400" />
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="text-4xl -mt-10">{community.icon || "🌿"}</div>
          <div>
            <h3 className="text-lg dark:text-white font-semibold text-emerald-900">{community.name}</h3>
            <p className="text-sm dark:text-white text-emerald-700/80 line-clamp-2">{community.description}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between dark:bg-gray-900">
          <div className="flex items-center gap-1 text- dark:text-white text-emerald-900/80">
            <Users size={16} /> {community.members?.length ?? 0} members
          </div>

          {isJoined ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <Check size={14} /> Joined
            </span>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onJoin?.(); }}
              className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-full"
            >
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
