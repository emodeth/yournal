import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useEditor } from "../contexts/EditorContext";
import CollectionSelector from "./CollectionSelector";
import MoodSelector from "./MoodSelector";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import EntryMoodSelector from "./EntryMoodSelector";

function EditorHeader() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const {
    title,
    sidebarOpened,
    setSidebarOpened,
    handleCreateEntry,
    handleUpdateEntry,
    editor,
    selectedMood,
    selectedCollection,
    selectedMoodScore,
    cover,
  } = useEditor();

  const { id } = useParams();

  function toggleSidebar() {
    setSidebarOpened((prev) => !prev);
  }

  return (
    <div className="h-16 flex items-center justify-between pl-3 pr-5 py-2 sticky top-0 border-b  bg-white z-[9999] border-b-[#e5e5e5] font-[Inter] ">
      <div className="flex items-center justify-center">
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-400 hover:text-gray-600 mr-1"
        >
          {sidebarOpened ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
        <h2 className="font-semibold text-gray-900 px-2">
          {title || "Untitled"}
        </h2>
        <CollectionSelector />
        <MoodSelector />
        <EntryMoodSelector />
      </div>
      <button
        disabled={!selectedMood | !selectedCollection}
        onClick={() =>
          id
            ? handleUpdateEntry(
                id,
                user.id,
                title,
                editor.document,
                cover,
                selectedMood.id,
                selectedMoodScore?.at(0),
                selectedCollection.id
              )
            : handleCreateEntry(
                user.id,
                title,
                editor.document,
                cover,
                selectedMood.id,
                selectedMoodScore?.at(0),
                selectedCollection.id,
                navigate
              )
        }
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={16} />
        <span>{id ? "Update" : "Save"}</span>
      </button>
    </div>
  );
}

export default EditorHeader;
