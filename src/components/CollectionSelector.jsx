import { Folder } from "lucide-react";
import { useCollections } from "../contexts/CollectionsContext";
import { useEditor } from "../contexts/EditorContext";

function CollectionSelector() {
  const { collections } = useCollections();
  const {
    showCollectionSelector,
    setShowCollectionSelector,
    setSelectedCollection,
    selectedCollection,
  } = useEditor();

  return (
    <div className="relative ml-4 ">
      <button
        type="button"
        onClick={() => setShowCollectionSelector((prev) => !prev)}
        className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Folder size={16} />
        <span>
          {selectedCollection ? selectedCollection.name : "Select Collection"}
        </span>
      </button>

      {showCollectionSelector && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 z-[9999999]">
            <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
              Move to collection
            </div>
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => {
                  setSelectedCollection(collection);
                  setShowCollectionSelector(false);
                }}
                className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors ${
                  selectedCollection?.name === collection.name
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Folder size={14} />
                  <span>{collection.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionSelector;
