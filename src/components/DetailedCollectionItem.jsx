import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getMoodByMoodId, getMoodText } from "../lib/utils";
import { useMood } from "../contexts/MoodContext";
import { deleteEntry } from "../api/entries";
import { useParams } from "react-router";

function DetailedCollectionItem({ item, getContent }) {
  const { id } = useParams();

  const [mood, setMood] = useState(null);
  const { allMoods } = useMood();
  useEffect(() => {
    if (allMoods) {
      setMood(getMoodByMoodId(allMoods, item?.mood_id));
    }
  }, [allMoods]);

  async function handleDelete() {
    await deleteEntry(item?.id);
    await getContent(id);
  }

  return (
    mood && (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{mood.emoji}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>
                  {format(
                    new Date(item.created_at).toISOString(),
                    "MMMM dd, yyyy"
                  )}
                </span>
                <span>•</span>
                <span>
                  {mood?.mood_weight && getMoodText(mood.mood_weight)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DetailedCollectionItem;
