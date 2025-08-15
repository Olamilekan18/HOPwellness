import Layout from "../community/Layout";
import RightRail from "../community/RightRail";

export default function SkeletonLoader() {
  return (
    <Layout current="communities" right={<RightRail />}>
      <div className="animate-pulse">
        {/* Skeleton Header */}
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

        {/* Main Grid */}
        <div className="mt-16 grid lg:grid-cols-3 px-5 py-3 gap-8">
          {/* Left: Content Placeholder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Community Stats Skeleton */}
            <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700">
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>

            {/* Members List Skeleton */}
            <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700">
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>

              <div className="space-y-3">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
