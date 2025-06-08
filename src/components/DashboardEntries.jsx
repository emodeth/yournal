import { useState } from "react";

function DashboardEntries() {
  const [sortBy, setSortBy] = useState("date");

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

      {true ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl">{"😎"}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {"valorant neden kötüdür"}
              </h3>
              <p className="text-sm text-gray-500">
                {"genel koleksiyonen"} • {"11 Nisan 2025"}
              </p>
              <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                {"herhangi bir şeyler yazı falan filan fişman "}...
              </p>
            </div>
          </div>
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
