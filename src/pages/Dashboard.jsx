import DashboardChart from "../components/DashboardChart";
import DashboardEntries from "../components/DashboardEntries";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import Loader from "../components/Loader";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return user === undefined ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <MaxWidthWrapper className={"py-8"}>
        <DashboardHeader />
        <DashboardStats />
        <DashboardChart />
        <DashboardEntries />
      </MaxWidthWrapper>
    </div>
  );
}

export default Dashboard;
