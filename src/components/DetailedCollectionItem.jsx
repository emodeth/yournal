import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getMoodByMoodId, getMoodText } from "../lib/utils";
import { useMood } from "../contexts/MoodContext";
import { Link } from "react-router";

function DetailedCollectionItem({
  item,
  setDeleteItemId,
  setIsDeleteModalOpened,
}) {
  const [mood, setMood] = useState(null);
  const { allMoods } = useMood();
  useEffect(() => {
    if (allMoods) {
      setMood(getMoodByMoodId(allMoods, item?.mood_id));
    }
  }, [allMoods]);

  return (
    mood && (
      <Link to={`/write/${item.id}`}>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:bg-gray-300 cursor-pointer transition-all">
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
                  <span>{mood?.type ? getMoodText(mood.type) : null}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpened(true);
                  setDeleteItemId(item.id);
                }}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}

export default DetailedCollectionItem;
