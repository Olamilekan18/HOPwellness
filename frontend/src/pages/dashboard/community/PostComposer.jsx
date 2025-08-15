import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const PostComposer = ({ communityId, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewPost = async () => {
    if (!content.trim())
      return toast.error("Post cannot be empty!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#10b981", color: "#fff" },
      });
    const token = localStorage.getItem("token"); // ✅ ensure token exists
    if (!token)
      return toast.error("You must be logged in!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#dc2626", color: "#fff" },
      });

    setLoading(true);
    try {
      await axios.post(
        `/api/posts/community/${communityId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post created!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#10b981", color: "#fff" },
      });
      setContent("");
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to post", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#dc2626", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl  dark:bg-gray-900">
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        rows="7"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={handleNewPost}
        disabled={loading}
        className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 active:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 cursor-pointer"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default PostComposer;

PostComposer.propTypes = {
  communityId: PropTypes.string.isRequired,
  onPostCreated: PropTypes.func,
};
