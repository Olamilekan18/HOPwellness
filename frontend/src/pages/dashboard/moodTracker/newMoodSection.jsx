import { FaStickyNote } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react"; 
import axios from "axios"; 

export default function NewMoodSection({
  mood, 
  setNewTag,
  setShowAddTagSection,
  showAddTagSection,
  newTag,
  tags,
  setTags,
  onMoodSaved, 
}) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false); 

  function removeTag(idToRemove) {
    setTags((prev) => prev.filter((_, index) => index !== idToRemove));
  }

  const handleSaveNote = async () => {
    if (!mood) {
      alert("Please select a mood first!");
      return;
    }
    if (!noteTitle.trim()) {
      alert("Please enter a note title!");
      return;
    }

    setIsSaving(true);
    try {
      const response = await axios.post(
        '/api/mood/checkin', 
        {
          emoji: mood, 
          title: noteTitle,
          note: noteContent, 
          tags: tags,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      console.log("Mood saved successfully:", response.data);
      alert("Mood saved successfully!");
      setNoteTitle("");
      setNoteContent("");
      setTags([]);
      setNewTag("");
      setShowAddTagSection(false);

      if (onMoodSaved) {
        onMoodSaved();
      }
    } catch (error) {
      console.error("Error saving mood:", error.response ? error.response.data : error.message);
      alert(
        `Failed to save mood: ${error.response?.data?.message || 'Please try again.'}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTagOnBlur = () => {
    if (newTag.trim() !== "") {
      setTags((prev) => [...prev, newTag.trim()]);
    }
    setShowAddTagSection(false);
    setNewTag("");
  };

  return (
    <div className="relative bg-white border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md dark:bg-gray-800 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2 text-gray-700 dark:text-white text-lg font-semibold">
          <FaStickyNote />
          <span>New Mood Note</span>
        </div>
        {mood && (
          <span className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
            Mood: {mood}
          </span>
        )}
      </div>

      <input
        type="text"
        placeholder="Enter note title..."
        className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-white"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your thoughts here..."
        className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-white"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span
            key={index} 
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {tag}{" "}
            <button
              onClick={() => removeTag(index)} 
              className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </span>
        ))}
        <button
          onClick={() => {
            setShowAddTagSection(true);
          }}
          className="px-3 py-1 bg-green-50 dark:bg-gray-700 text-green-700 dark:text-white rounded-full text-xs hover:bg-green-100 dark:hover:bg-gray-600 transition"
        >
          + Add tag
        </button>
      </div>

      {showAddTagSection ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type new tag..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-white"
            value={newTag}
            onChange={(e) => {
              setNewTag(e.target.value);
            }}
            onBlur={handleAddTagOnBlur} 
            onKeyPress={(e) => { 
              if (e.key === 'Enter') {
                handleAddTagOnBlur();
              }
            }}
            autoFocus
          />
        </div>
      ) : null}

      <button
        onClick={handleSaveNote}
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all"
        disabled={isSaving} 
      >
        {isSaving ? "Saving..." : "Save Note"}
      </button>
    </div>
  );
}

NewMoodSection.propTypes = {
  mood: PropTypes.string,
  setNewTag: PropTypes.func.isRequired,
  newTag: PropTypes.string.isRequired,
  showAddTagSection: PropTypes.bool.isRequired,
  setShowAddTagSection: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
  onMoodSaved: PropTypes.func,
};