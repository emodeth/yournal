import { BookOpen, Calendar, TrendingUp, User } from "lucide-react";

function DashboardStats() {
  function renderStatItem(title, Icon, bgColor, iconColor, count) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div
            className={`${"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"} ${bgColor}`}
          >
            <Icon className={iconColor} size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {renderStatItem(
        "Total Entries",
        BookOpen,
        "text-blue-100",
        "text-blue-600",
        0
      )}

      {renderStatItem(
        "Average Mood",
        TrendingUp,
        "bg-green-100",
        "text-green-600",
        0
      )}
      {renderStatItem(
        "Collections",
        Calendar,
        "bg-purple-100",
        "text-purple-600",
        0
      )}
      {renderStatItem(
        "Streak",
        User,
        "bg-orange-100",
        "text-orange-600",
        "7 Days"
      )}
    </div>
  );
}

export default DashboardStats;
