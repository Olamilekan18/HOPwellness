import { MessageCircle, Share, ThumbsUp } from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function PostItem({ post, comments: initialComments, likeCount: initialLikeCount, currentUser }) {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const [liked, setLiked] = useState(post.likes?.includes(currentUser?._id));
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments || []);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      await axios.post(
        `/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error liking post", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res = await axios.post(
        `/api/posts/${post._id}/comment`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [...prev, res.data.comment]);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment", err);
    } finally {
      setCommentLoading(false);
    }
  };

const handleShare = (post) => {
  if (navigator.share) {
    navigator
      .share({
        title: post?.title || "Check this out",
        text: post?.content ? post.content.slice(0, 100) + "..." : "",
        url: `${window.location.origin}/posts/${post._id}`,
      })
      .catch((err) => {
        console.error("Error sharing:", err);
      });
  } else {
    toast.error("Sharing not supported on this browser.");
  }
};


  return (
    <div className="bg-white rounded-2xl border border-emerald-200 dark:bg-gray-800 shadow-lg p-4">
      <article className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-shrink-0 sm:w-14 sm:h-14 w-12 h-12 mx-auto sm:mx-0">
          <img
            className="w-full h-full rounded-full object-cover"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            alt="User Avatar"
          />
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex justify-between items-center mb-2 flex-col sm:flex-row">
            <div className="flex items-baseline space-x-1 text-sm min-w-0">
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate hover:text-emerald-600 hover:underline cursor-pointer">
                {post.author?.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm hover:text-emerald-500 hover:underline cursor-pointer">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-gray-800 dark:text-gray-100 text-sm sm:text-base leading-relaxed mb-4">
            {post.content}
          </p>

          {post.image && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={`${post.author?.name} | ${new Date(post.createdAt).toLocaleString()}`}
                className="w-full object-cover aspect-video rounded-xl"
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm space-x-4 sm:space-x-0 flex-row">
            <button
              aria-label="like"
              className={`flex items-center space-x-1 group p-2 rounded-full transition-colors duration-200 mb-2 sm:mb-0 ${
                liked
                  ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900"
                  : "hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
              }`}
              onClick={handleLike}
              disabled={likeLoading}
            >
              <ThumbsUp />
              <span>{likeCount}</span>
            </button>
            <button
              aria-label="comment"
              className="flex items-center space-x-1 group hover:text-green-500 dark:hover:text-green-400 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200 mb-2 sm:mb-0"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle />
              <span>{comments.length}</span>
            </button>
            <button
            aria-label="share"
            onClick={() => handleShare(post)} 
            className="flex items-center space-x-1 group hover:text-green-500 dark:hover:text-green-400 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200 mb-2 sm:mb-0"
>
  <Share />
  <span>Share</span>
</button>

          </div>

          {showComments && (
            <div className="mt-4">
              <div className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Comments
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments.length === 0 && (
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    No comments yet.
                  </div>
                )}
                {comments.map((c) => (
                  <div key={c._id} className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold">
                      {c.author?.name?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {c.author?.name || "Anonymous"}
                        <span className="ml-2 text-gray-400 dark:text-gray-500 text-xs">
                          {new Date(c.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-700 dark:text-gray-200">
                        {c.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className="flex items-center mt-3 space-x-2"
                onSubmit={handleComment}
              >
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded border border-emerald-200 dark:border-emerald-700 bg-gray-50 dark:bg-gray-900 text-sm dark:text-white"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={commentLoading}
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-sm"
                  disabled={commentLoading}
                >
                  {commentLoading ? "..." : "Send"}
                </button>
              </form>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    image: PropTypes.string,
    likes: PropTypes.array
  }).isRequired,
  comments: PropTypes.array,
  likeCount: PropTypes.number,
  currentUser: PropTypes.object.isRequired
};
