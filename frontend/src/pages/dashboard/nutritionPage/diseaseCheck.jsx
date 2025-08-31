import { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ConditionsList = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/nutrition/conditions`);
        setConditions(response.data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    fetchConditions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Select a Health Condition</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition duration-300"
          >
            <p className="text-lg font-medium text-gray-800">{condition.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionsList;
