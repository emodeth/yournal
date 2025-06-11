import { useEditor } from "../contexts/EditorContext";
import { Plus, ChevronDown, ChevronRight, Folder } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useMood } from "../contexts/MoodContext";
import { getMoodByMoodId } from "../lib/utils";
import { format } from "date-fns";

function SidebarCollectionItem({ collection }) {
  const { id: entryId } = useParams();
  const { allMoods } = useMood();
  const { expandedCollections, setExpandedCollections, setSelectedCollection } =
    useEditor();
  const navigate = useNavigate();

  const toggleCollection = (collectionId) => {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(collectionId)) {
      newExpanded.delete(collectionId);
    } else {
      newExpanded.add(collectionId);
    }
    setExpandedCollections(newExpanded);
  };

  function handleEntryClick(entry) {
    navigate(`/write/${entry.id}`);
  }

  function handleEntryCreateOnCollection() {
    setSelectedCollection(collection);
    navigate(`/write/`);
  }

  function renderCollectionHeader() {
    return (
      <div className="flex items-center justify-between group">
        <button
          onClick={() => {
            toggleCollection(collection.id);
            setSelectedCollection(collection);
          }}
          className="flex items-center space-x-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors flex-1"
        >
          {expandedCollections.has(collection.id) ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
          <Folder size={14} />
          <span className="truncate">{collection.name}</span>
          <span className="text-xs text-gray-400 ml-auto">
            {collection.entry_count}
          </span>
        </button>

        <button
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-all"
          title="New entry in this collection"
          onClick={handleEntryCreateOnCollection}
        >
          <Plus size={12} />
        </button>
      </div>
    );
  }

  function mapCollectionEntries() {
    return (
      expandedCollections.has(collection.id) && (
        <div className="ml-6 space-y-0.5">
          {collection &&
            collection.entries.map((entry) => (
              <button
                onClick={() => handleEntryClick(entry)}
                key={entry.id}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 text-sm rounded-md transition-colors text-left ${
                  entryId === entry.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="text-lg">
                  {getMoodByMoodId(allMoods, entry.mood_id)?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">
                    {entry.title || "Untitled"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {format(new Date(entry.created_at).toISOString(), "MMM dd")}
                  </div>
                </div>
              </button>
            ))}

          {collection.entry_count === 0 && (
            <div className="px-2 py-2 text-xs text-gray-400 italic">
              No entries yet
            </div>
          )}
        </div>
      )
    );
  }
  return (
    <div key={collection.id}>
      {renderCollectionHeader()}
      {mapCollectionEntries()}
    </div>
  );
}

export default SidebarCollectionItem;
