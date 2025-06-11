import { Smile } from "lucide-react";
import { useEditor } from "../contexts/EditorContext";
import { useMood } from "../contexts/MoodContext";

function MoodSelector() {
  const {
    showMoodSelector,
    setShowMoodSelector,
    selectedMood,
    setSelectedMood,
  } = useEditor();
  const { allMoods } = useMood();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowMoodSelector((prev) => !prev)}
        className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Smile size={16} />
        <span>{selectedMood ? selectedMood?.emoji : "Mood"}</span>
      </button>

      {showMoodSelector && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="text-xs font-medium text-gray-500 mb-3">
            How are you feeling?
          </div>
          <div className="flex items-center justify-center space-x-2">
            {allMoods.map((mood) => (
              <button
                onClick={() => {
                  setSelectedMood(mood);
                  setShowMoodSelector(false);
                }}
                key={mood.id}
                type="button"
                className={`${"text-2xl p-2"} rounded-full border-2 transition-all hover:scale-110 ${
                  selectedMood?.id === mood.id
                    ? "border-blue-500 bg-blue-50 scale-110"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                title={mood.type}
              >
                <span>{mood.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodSelector;
