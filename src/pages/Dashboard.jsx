import DashboardChart from "../components/DashboardChart";
import DashboardEntries from "../components/DashboardEntries";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
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
