import { useAuth } from "../contexts/AuthContext";
import { useCollections } from "../contexts/CollectionsContext";

function CollectionModal() {
  const {
    setIsModalOpened,
    collectionName,
    setCollectionName,
    collectionDescription,
    setCollectionDescription,
    editingCollection,
    handleSubmit,
  } = useCollections();

  const { user } = useAuth();

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-[110]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative z-[120]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {editingCollection ? "Edit Collection" : "New Collection"}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection Name
            </label>
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter collection name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
              placeholder="Enter collection description"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpened(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={(e) =>
                handleSubmit(
                  e,
                  editingCollection?.id,
                  user.id,
                  collectionName,
                  collectionDescription
                )
              }
            >
              {editingCollection ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
      <div
        role="button"
        onClick={() => setIsModalOpened(false)}
        className="fixed inset-0 z-[111]"
      ></div>
    </div>
  );
}

export default CollectionModal;
