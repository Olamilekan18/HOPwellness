import { ArrowLeft, Settings } from "lucide-react";
import Prototypes from "prop-types";
export default function EachCommunityPageHeader({ navigate, selected }) {
  return (
    <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-400 h-56 sm:h-65 rounded-b-3xl shadow-lg overflow-hidden">
      <button
        onClick={() => navigate("/dashboard/community")}
        className="absolute top-4 left-4 flex items-center gap-2 text-white font-semibold hover:text-emerald-200 transition-all cursor-pointer"
      >
        <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
      </button>

      <div className="absolute bottom-5 left-2 sm:left-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white dark:border-gray-800">
          {selected.icon || "🌿"}
        </div>
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <div className="text-white text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold mb-1">
              {selected.name}
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              {selected.description}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button className="bg-white text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 px-4 py-2 rounded-full font-medium shadow-lg transition-all">
          <Settings />
        </button>
      </div>
    </div>
  );
}

EachCommunityPageHeader.propTypes = {
  navigate: Prototypes.func.isRequired,
  selected: Prototypes.shape({
    icon: Prototypes.string,
    name: Prototypes.string,
    description: Prototypes.string,
  }).isRequired,
};
