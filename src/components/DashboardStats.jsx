import { BookOpen, Calendar, TrendingUp, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardStats({ dashboardData }) {
  function formatStreakString(streakDays) {
    if (streakDays === 0) {
      return "0";
    } else if (streakDays === 1) {
      return "1 Day";
    } else {
      return `${streakDays} Days`;
    }
  }

  function handleMood(averageMood) {
    if (averageMood === null) {
      return 0;
    } else {
      return averageMood;
    }
  }

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
            {count !== null ? (
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            ) : (
              <Skeleton className="h-[20px] w-[50px] mt-2" />
            )}
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
        dashboardData?.total_entries
      )}

      {renderStatItem(
        "Average Mood",
        TrendingUp,
        "bg-green-100",
        "text-green-600",
        handleMood(dashboardData?.average_mood)
      )}
      {renderStatItem(
        "Collections",
        Calendar,
        "bg-purple-100",
        "text-purple-600",
        dashboardData?.total_collections
      )}
      {renderStatItem(
        "Streak",
        User,
        "bg-orange-100",
        "text-orange-600",
        formatStreakString(dashboardData?.streak_days)
      )}
    </div>
  );
}

export default DashboardStats;
