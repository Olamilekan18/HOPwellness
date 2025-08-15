import { Users, Check } from "lucide-react";
import PropTypes from "prop-types";
export default function CommunityCard({ community, isJoined, onJoin, onOpen }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={onOpen}
    >
      <div className="relative h-24 bg-gradient-to-r from-emerald-600 to-emerald-400">
        <div className="absolute left-5 bottom-0 translate-y-1/2 w-14 h-14 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 text-3xl">
          {community.icon || "🌿"}
        </div>
      </div>

      <div className="p-5 pt-10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {community.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
          {community.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            <Users size={16} /> {community.members?.length ?? 0} members
          </div>

          {isJoined ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700 px-3 py-1 rounded-full">
              <Check size={14} /> Joined
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onJoin?.();
              }}
              className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-full shadow-sm"
            >
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CommunityCard.propTypes = {
  community: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node,
    members: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isJoined: PropTypes.bool.isRequired,
  onJoin: PropTypes.func,
  onOpen: PropTypes.func,
};
