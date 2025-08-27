import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EachCommunityLayout from "../eachCommunityLayout";
import { MessageCircle, Share, ThumbsUp } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsExclamationTriangle } from "react-icons/bs";
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
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md space-y-4">
          <div className="flex flex-col items-center justify-center space-x-2">
            <div className="w-12 h-12 border-4 border-t-4 border-emerald-600 dark:border-emerald-400 rounded-full animate-spin"></div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Loading... 
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait while we load your community content.
          </p>
        </div>
      </EachCommunityLayout>
    );
  }

  if (!postData?.post) {
    return (
      <EachCommunityLayout communityId={communityId} setLoading={setLoading}>
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md space-y-4">
          <div className="text-3xl text-emerald-600 dark:text-emerald-400">
            <BsExclamationTriangle className="w-16 h-16 mx-auto" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              No Posts Available
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              It seems there are no posts in this community yet. Be the first to
              share your thoughts!
            </p>
          </div>
          <button
            onClick={() => navigate(`/dashboard/community/${communityId}`)}
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Create a Post
          </button>
        </div>
      </EachCommunityLayout>
    );
  }

  const { post } = postData;

  return (
    <EachCommunityLayout communityId={communityId} setLoading={setLoading}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => navigate(`/dashboard/community/${communityId}`)}
            className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Back
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
            {post.content}
          </p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-xl object-cover max-h-96"
            />
          )}
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <ThumbsUp
              className={`w-4 h-4 ${liked ? "text-emerald-600" : ""}`}
              fill={liked ? "green" : "transparent"}
            />
            <span>{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments((p) => !p)}
            className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{comments.length}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {showComments && (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Comments
            </h3>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No comments yet.
                </p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
                      {c.author?.name?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {c.author?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(c.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {c.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={handleComment}
              className="flex items-center mt-4 space-x-2"
            >
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm dark:text-white"
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
                {commentLoading ? "Commenting..." : "Send"}
              </button>
            </form>
          </div>
        )}
      </div>
    </EachCommunityLayout>
  );
}
