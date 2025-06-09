import { Plus } from "lucide-react";

function CollectionsHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Collections</h1>
        <p className="text-gray-600">
          Organize your mood entries into meaningful collections.
        </p>
      </div>
      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <Plus size={20} />
        <span>New Collection</span>
      </button>
    </div>
  );
}

export default CollectionsHeader;
