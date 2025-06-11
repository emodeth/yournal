import { Bookmark } from "lucide-react";

function DeleteModal({ handleSuccess, handleSkip, setIsModalOpened }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl z-[10002]">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="text-blue-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Save as template?
          </h2>
          <p className="text-gray-600 text-sm">
            Save this entry as a template to reuse the structure for future
            entries.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Skip
          </button>
          <button
            onClick={handleSuccess}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Template
          </button>
        </div>
      </div>

      <div
        role="button"
        onClick={() => setIsModalOpened(false)}
        className="fixed inset-0 z-[10000]"
      ></div>
    </div>
  );
}

export default DeleteModal;
