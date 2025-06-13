import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import { getUserEntries } from "../api/entries";

function DashboardEntries() {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState("date");
  const [userEntries, setUserEntries] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  async function handleGetUserEntries() {
    if (user) {
      setLoading(true);
      const data = await getUserEntries(user?.id);
      setUserEntries(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetUserEntries();
  }, [user]);

  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Entries</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="mood">Sort by Mood</option>
        </select>
      </div>

      {userEntries ? (
        <div className="space-y-4">
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            userEntries.slice(0, 10).map((entry) => (
              <div
                role="button"
                onClick={() => navigate(`/write/${entry.id}`)}
                key={entry.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div className="text-2xl">{"😎"}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{entry.title}</h3>
                  <p className="text-sm text-gray-500">
                    {`Mood Score: ${entry.entry_mood_score}`} •{" "}
                    {format(new Date(entry.created_at).toISOString(), "MMM dd")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No entries yet. Start by creating your first mood entry!
        </p>
      )}
    </div>
  );
}

export default DashboardEntries;
