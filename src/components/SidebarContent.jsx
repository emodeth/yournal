import { Plus, FolderPlus } from "lucide-react";
import { useCollections } from "../contexts/CollectionsContext";
import SidebarCollectionItem from "./SidebarCollectionItem";
import { useState } from "react";
import { createCollection, getCollectionsByUserId } from "../api/collections";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEditor } from "../contexts/EditorContext";

function SidebarContent() {
  const { user } = useAuth();
  const { collections, setCollections } = useCollections();
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const { setSelectedCollection } = useEditor();

  const navigate = useNavigate();

  async function handleNewEntry() {
    setSelectedCollection(null);
    navigate("/write");
  }

  async function handleGetCollections(userId) {
    if (userId) {
      const data = await getCollectionsByUserId(userId);
      setCollections(data);
    }
  }

  async function handleCreateNewCollection(userId, collectionName) {
    await createCollection(userId, collectionName, "New collection");
    setShowNewCollection(false);
    setNewCollectionName("");
    await handleGetCollections(user.id);
  }

  return (
    <div className="flex-1 overflow-y-auto p-2">
      <button
        onClick={handleNewEntry}
        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors mb-2"
      >
        <Plus size={16} />
        <span>New Entry</span>
      </button>

      <div className="space-y-1">
        {collections &&
          collections.map((collection) => (
            <SidebarCollectionItem
              collection={collection}
              key={collection.id}
            />
          ))}
      </div>

      <div className="mt-4 pt-2 border-t border-gray-200">
        {showNewCollection ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleCreateNewCollection(user.id, newCollectionName);
                if (e.key === "Escape") {
                  setShowNewCollection(false);
                  setNewCollectionName("");
                }
              }}
              placeholder="Collection name"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex space-x-1">
              <button
                onClick={() => {
                  handleCreateNewCollection(user.id, newCollectionName);
                }}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewCollection(false);
                  setNewCollectionName("");
                }}
                className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewCollection(true)}
            className="w-full flex items-center space-x-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
          >
            <FolderPlus size={14} />
            <span>New Collection</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SidebarContent;
