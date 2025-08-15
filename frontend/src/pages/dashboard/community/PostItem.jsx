import { MessageCircle, Share, ThumbsUp } from "lucide-react";
import PropTypes from "prop-types";

export default function PostItem({ post }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-200 dark:bg-gray-800 shadow-lg p-4">
      <article className="flex space-x-4">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
            alt="User Avatar"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header with Author and Timestamp */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-baseline space-x-1 text-sm min-w-0">
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate hover:text-emerald-600 hover:underline cursor-pointer">
                {post.author}
              </span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm hover:text-emerald-500 hover:underline cursor-pointer">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-800 dark:text-gray-100 text-sm sm:text-base leading-relaxed mb-4">
            {post.content}
          </p>

          {/* Image Section */}
          {post.image && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={`${post.author} | ${new Date(
                  post.createdAt
                ).toLocaleString()}`}
                className="w-full object-cover aspect-video rounded-xl"
              />
            </div>
          )}

          {/* Footer - Like, Comment, Share */}
          <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm space-x-4">
            <button
              aria-label="like"
              className="flex items-center space-x-1 group hover:text-green-500 dark:hover:text-green-400 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200"
            >
              <ThumbsUp />
              <span>15</span>
            </button>
            <button
              aria-label="comment"
              className="flex items-center space-x-1 group hover:text-green-500 dark:hover:text-green-400 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200"
            >
              <MessageCircle />
              <span>88</span>
            </button>
            <button
              aria-label="share"
              className="flex items-center space-x-1 group hover:text-green-500 dark:hover:text-green-400 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200"
            >
              <Share />
              <span>312</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};
// <article className="bg-white rounded-2xl border border-emerald-100 dark:bg-gray-900 shadow-sm p-4">
//   <header className="flex items-center gap-3 mb-3">
//     <div className="h-10 w-10  bg-emerald-200 rounded-full" />
//     <div>
//       <div className="text-sm dark:text-white font-semibold text-emerald-900">
//         {post.author}
//       </div>
//       <div className="text-xs dark:text-white text-emerald-900/70">
//         {new Date(post.createdAt).toLocaleString()}
//       </div>
//     </div>
//   </header>
//   <p className="text-sm dark:text-white text-emerald-900/90">
//     {post.content}
//   </p>
//   {post.image && (
//     <img
//       src={post.image}
//       alt=""
//       className="mt-3 rounded-xl border border-emerald-100"
//     />
//   )}
//   <footer className="mt-3 flex items-center gap-4 text-xs text-emerald-900/70">
//     <button className="hover:text-emerald-800 dark:text-white">Like</button>
//     <button className="hover:text-emerald-800 dark:text-white">
//       Comment
//     </button>
//     <button className="hover:text-emerald-800 dark:text-white">
//       Share
//     </button>
//   </footer>
// </article>
