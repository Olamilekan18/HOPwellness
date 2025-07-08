import { CheckCircle } from "lucide-react";
export default function UserOverViewCard() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className=" p-6 rounded-3xl  w-full max-w-5xl mx-auto transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-green-500"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 mb-4">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white transition-colors">
                Thony Stone
              </h2>
              <CheckCircle className="text-green-400" size={24} />
            </div>

            <span className=" bg-green-500 text-white px-5 py-2 rounded-full text-sm font-bold ">
              🔥 21 Streak
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-dashed border-black  dark:border-white mb-6" />

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Achivements
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              75
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Challenges
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              64
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Badges
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                5
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Ranking
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
