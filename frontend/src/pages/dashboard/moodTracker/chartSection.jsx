import { PieChart, Pie, Cell } from "recharts";
import { FaSmile } from "react-icons/fa";
import PropTypes from "prop-types";
export default function PieChartSection({ pieData }) {
  return (
    <div className="p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="font-bold text-2xl text-center text-gray-800 dark:text-white">
          Mood Overview
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1">
          Based on recent activity
        </p>
      </div>

      <div className="flex justify-center items-center relative">
        <PieChart width={250} height={250}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <FaSmile size={40} className="text-green-500 dark:text-green-400" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Happy</p>
        </div>
      </div>
    </div>
  );
}

PieChartSection.propTypes = {
  pieData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};
