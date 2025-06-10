import { format, parseISO } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getMoodById } from "../api/moods";

function DetailedCollectionItem({ item }) {
  const [mood, setMood] = useState(null);

  useEffect(() => {
    async function getMood() {
      const data = await getMoodById(item.mood_id);
      setMood(data);
    }

    getMood();
  }, []);

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
                <span>{mood?.mood_weight && mood.mood_weight}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">
            {item.content.Content} {"..."}
          </p>
        </div>
      </div>
    )
  );
}

export default DetailedCollectionItem;
