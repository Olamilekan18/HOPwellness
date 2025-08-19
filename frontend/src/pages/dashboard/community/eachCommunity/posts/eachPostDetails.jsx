import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EachCommunityLayout from "../eachCommunityLayout";
import { MessageCircle, Share, ThumbsUp } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EachPostDetails() {
  const { communityId, postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/posts/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPostData(res.data);
        setLikeCount(res.data.likeCount);
        setComments(res.data.comments);
        setLiked(
          res.data.post.likes?.some((u) => u._id === currentUserId) || false
        );
      } catch (err) {
        console.error("Error fetching post:", err);
        toast.error("Failed to fetch post details");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPost();
  }, [postId, token, currentUserId]);

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    try {
      const res = await axios.post(
        `/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data) {
        setLiked(res.data.likedByUser);
        setLikeCount(res.data.likesCount);
      }
    } catch (err) {
      console.error("Error liking:", err);
      toast.error("Error liking post");
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
        `/api/posts/${postId}/comment`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.comment) {
        setComments((prev) => [res.data.comment, ...prev]);
        setCommentText("");
      }
    } catch (err) {
      console.error("Error commenting:", err);
      toast.error("Error posting comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this post",
          text: postData?.post?.content?.slice(0, 100) + "...",
          url: `${window.location.origin}${location.pathname}`,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      toast.info("Sharing not supported in this browser.");
    }
  };

  if (loading) {
    return (
      <EachCommunityLayout communityId={communityId} setLoading={setLoading}>
        <div className="p-5 text-center text-gray-700 dark:text-gray-300">
          Loading...
        </div>
      </EachCommunityLayout>
    );
  }

  if (!postData?.post) {
    return (
      <EachCommunityLayout communityId={communityId} setLoading={setLoading}>
        <div className="p-5 text-center text-gray-700 dark:text-gray-300">
          No post found.
        </div>
      </EachCommunityLayout>
    );
  }

  const { post } = postData;

  return (
    <EachCommunityLayout communityId={communityId} setLoading={setLoading}>
      <div className="p-5 space-y-6">
        {/* Post Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {post.author.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              onClick={() => navigate(`/dashboard/community/${communityId}`)}
            >
              Back
            </button>
          </div>

          <p className="text-gray-800 dark:text-gray-200 text-sm mb-4">
            {post.content}
          </p>

          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-xl mb-4"
            />
          )}

          {/* Actions */}
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-300">
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className="flex items-center space-x-1 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <ThumbsUp
                className={`w-4 h-4 ${liked ? "text-emerald-600" : ""}`}
                fill={liked ? "green" : "transparent"}
              />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setShowComments((p) => !p)}
              className="flex items-center space-x-1 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {showComments && (
            <div className="mt-5">
              <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Comments
              </h3>

              <div className="space-y-3 max-h-52 overflow-y-auto">
                {comments.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No comments yet.
                  </p>
                )}
                {comments.map((c) => (
                  <div key={c._id} className="border-b pb-2 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      {c.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      — {c.author?.name} on{" "}
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleComment}
                className="flex items-center mt-3 space-x-2"
              >
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm dark:text-white"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={commentLoading}
                />
                <button
                  type="submit"
                  disabled={commentLoading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
                >
                  {commentLoading ? "..." : "Send"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </EachCommunityLayout>
  );
}
