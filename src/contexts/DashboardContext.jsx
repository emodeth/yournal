import { createContext, useContext, useEffect, useState } from "react";
import { getUserDashboard } from "../api/dashboard";
import { useAuth } from "./AuthContext";
import { format } from "date-fns";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);

  async function handleDashboardData(userId) {
    const data = await getUserDashboard(userId);
    setDashboardData(data);
  }

  function formatChartData() {
    const _data = dashboardData?.chart_data.map((data) => {
      return {
        date: format(data.date, "MMM dd"),
        mood: data.score,
      };
    });
    setChartData(_data);
  }

  useEffect(() => {
    if (user) {
      handleDashboardData(user?.id);
    }
  }, [user]);

  useEffect(() => {
    if (dashboardData) {
      formatChartData();
    }
  }, [dashboardData]);

  return (
    <DashboardContext.Provider
      value={{ dashboardData, chartData, handleDashboardData }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (context) {
    return context;
  } else {
    throw new Error("use useDashboard within DashboardProvider context");
  }
}
