import { Calendar, Edit2, FolderOpen, Trash2 } from "lucide-react";
import { Link } from "react-router";

function CollectionsGrid() {
  function renderCollectionItem(collection) {
    return (
      <div>
        <div
          key={collection.id}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {collection.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {collection.entryCount}{" "}
                  {collection.entryCount === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Edit2 size={16} />
              </button>
              {collection.name !== "General" && (
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {collection.description}
          </p>

          {collection.latestEntry && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">Latest entry:</p>
              <p className="text-sm font-medium text-gray-900">
                {"latest entrynin titleı"}
              </p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Calendar size={12} className="mr-1" />
                {"9 Haziran 2025"}
              </p>
            </div>
          )}

          <Link
            to={`/collections/${collection.id}`}
            className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            View Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {renderCollectionItem({
        id: 1,
        name: "supper dupper collection",
        entryCount: 5,
        description: "dünyanın en iyi koleksiyonu",
        latestEntry: {},
      })}
    </div>
  );
}

export default CollectionsGrid;
