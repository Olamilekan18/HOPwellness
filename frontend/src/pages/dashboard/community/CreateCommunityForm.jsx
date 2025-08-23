/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

export default function CreateCommunityForm({ onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/community/create",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setDescription("");
      if (onCreated) onCreated(res.data); 
      window.location.reload(); 
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create community"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md mx-auto mb-8"
    >
      <h2 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-300">
        Create a Community
      </h2>
      {error && (
        <div className="mb-2 text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}
      <input
        className="w-full mb-3 px-4 py-2 rounded border border-emerald-200 dark:border-emerald-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        type="text"
        placeholder="Community Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="w-full mb-3 px-4 py-2 rounded border border-emerald-200 dark:border-emerald-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
      >
        {loading ? "Creating..." : "Create Community"}
      </button>
    </form>
  );
}