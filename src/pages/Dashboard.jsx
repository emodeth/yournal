import { useEffect } from "react";
import DashboardChart from "../components/DashboardChart";
import DashboardEntries from "../components/DashboardEntries";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import Loader from "../components/Loader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../contexts/DashboardContext";

function Dashboard() {
  const { user } = useAuth();
  const { dashboardData, handleDashboardData } = useDashboard();

  useEffect(() => {
    if (user) {
      handleDashboardData(user.id);
    }
  }, [user]);

  if (!dashboardData) {
    return <Loader />;
  }

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <MaxWidthWrapper className={"py-8"}>
        <DashboardHeader />
        <DashboardStats dashboardData={dashboardData} />
        <DashboardChart />
        <DashboardEntries />
      </MaxWidthWrapper>
    </div>
  );
}

export default Dashboard;
