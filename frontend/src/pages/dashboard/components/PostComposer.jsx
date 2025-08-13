export default function PostComposer({ disabled = true, onCreate }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-emerald-100 shadow-sm p-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 bg-emerald-200 rounded-full" />
        <div className="flex-1">
          <textarea
            disabled={disabled}
            placeholder={disabled ? "Post creation coming soon…" : "What’s on your mind?"}
            className="w-full resize-none rounded-xl text-gray-900  border border-emerald-200 bg-emerald-50 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
            rows={3}
          />
          <div className="mt-3 flex items-center justify-end">
            <button
              disabled={disabled}
              onClick={onCreate}
              className={`px-4 py-2 rounded-full text-sm font-medium 
              ${disabled ? "bg-emerald-200 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
