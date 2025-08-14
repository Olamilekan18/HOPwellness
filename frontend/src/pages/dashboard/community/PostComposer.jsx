import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const PostComposer = ({ communityId, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewPost = async () => {
    if (!content.trim()) return alert("Post cannot be empty!");

    const token = localStorage.getItem("token"); // ✅ ensure token exists
    if (!token) return alert("You must be logged in");

    setLoading(true);
    try {
      await axios.post(
        `/api/posts/community/${communityId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post created!");
      setContent("");
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow dark:bg-gray-900">
      <textarea
        className="w-full p-2 border rounded resize-none dark:text-white"
        rows="4"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleNewPost}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
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
