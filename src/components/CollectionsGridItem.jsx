import { Calendar, Edit2, FolderOpen, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { format, parseISO } from "date-fns";
import { useCollections } from "../contexts/CollectionsContext";
import { useAuth } from "../contexts/AuthContext";

function CollectionsGridItem({ collection }) {
  const { user } = useAuth();
  const { setActiveCollection, handleEdit, handleDelete } = useCollections();

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
                {collection.entry_count !== 0 ? collection.entry_count : null}{" "}
                {collection.entry_count === 0 && "no entry"}
                {collection.entry_count === 1 && "entry"}
                {collection.entry_count > 1 && "entries"}
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handleEdit(collection)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit2 size={16} />
            </button>
            {collection.name !== "General" && (
              <button
                onClick={() => handleDelete(collection?.id, user?.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {collection.description}
        </p>

        {collection.latest_entry ? (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-500 mb-1">Latest entry:</p>
            <p className="text-sm font-medium text-gray-900">
              {collection.latest_entry.title}
            </p>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <Calendar size={12} className="mr-1" />
              {format(
                parseISO(collection.latest_entry.updated_at),
                "MMM dd, yyyy"
              )}
            </p>
          </div>
        ) : (
          <Link to={"/write"}>
            <div className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 mb-4 group cursor-pointer">
              <p className="text-xs text-gray-500 mb-1">No entry yet</p>
              <p className="text-sm font-medium text-gray-900">
                Start Writing!
              </p>

              <button className="text-xs text-gray-500 flex items-center mt-1 ">
                <Plus size={12} className="mr-1" />
                New entry
              </button>
            </div>
          </Link>
        )}

        <Link
          to={`/collections/${collection.id}`}
          className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => {
            setActiveCollection({
              name: collection.name,
              description: collection.description,
            });
          }}
        >
          View Collection
        </Link>
      </div>
    </div>
  );
}

export default CollectionsGridItem;
