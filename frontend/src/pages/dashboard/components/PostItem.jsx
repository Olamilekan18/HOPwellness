export default function PostItem({ post }) {
  return (
    <article className="bg-white rounded-2xl border border-emerald-100 dark:bg-gray-900 shadow-sm p-4">
      <header className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10  bg-emerald-200 rounded-full" />
        <div>
          <div className="text-sm dark:text-white font-semibold text-emerald-900">{post.author}</div>
          <div className="text-xs dark:text-white text-emerald-900/70">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </header>
      <p className="text-sm dark:text-white text-emerald-900/90">{post.content}</p>
      {post.image && (
        <img src={post.image} alt="" className="mt-3 rounded-xl border border-emerald-100" />
      )}
      <footer className="mt-3 flex items-center gap-4 text-xs text-emerald-900/70">
        <button className="hover:text-emerald-800 dark:text-white">Like</button>
        <button className="hover:text-emerald-800 dark:text-white">Comment</button>
        <button className="hover:text-emerald-800 dark:text-white">Share</button>
      </footer>
    </article>
  );
}
