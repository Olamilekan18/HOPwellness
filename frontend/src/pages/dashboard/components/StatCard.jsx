export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border dark:bg-gray-900  border-emerald-100 p-5 shadow-sm text-center">
      <div className="text-xs font-semibold dark:text-white text-emerald-700/80 tracking-wide">{title}</div>
      <div className="mt-1 text-2xl font-bold dark:text-white text-emerald-900">{value}</div>
    </div>
  );
}
