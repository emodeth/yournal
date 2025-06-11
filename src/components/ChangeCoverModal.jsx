import { useState } from "react";
import { updateEntryCover } from "../api/entries";
import { useParams } from "react-router";
import { useEditor } from "../contexts/EditorContext";

function ChangeCoverModal() {
  const [coverUrl, setCoverUrl] = useState("");
  const { setCover, setShowChangeCover } = useEditor();
  const { id } = useParams();

  function handleChangeCover() {
    if (id) {
      updateEntryCover(id, coverUrl);
    }
    setCover(coverUrl);
    setShowChangeCover(false);
  }

  return (
    <div className="absolute right-2 top-2 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-2 z-[9999999]">
        <div>
          <label
            htmlFor="cover"
            className="text-xs font-medium text-gray-500 px-2 py-1 mb-1"
          >
            Change cover
          </label>
          <input
            id="cover"
            name="cover"
            type="text"
            required
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="bg-white mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter cover url"
          />
        </div>
        <button
          onClick={handleChangeCover}
          className="flex justify-center items-center space-x-2 px-2 py-1 w-full mt-2 text-center bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm">Change Cover</span>
        </button>
      </div>
    </div>
  );
}

export default ChangeCoverModal;
