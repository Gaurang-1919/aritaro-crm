import StatsGrid from "../components/dashboard/StatsGrid";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentLeads from "../components/dashboard/RecentLeads";
import MeetingList from "../components/dashboard/MeetingList";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <h1 className="dashboard-title">
        Dashboard
      </h1>

      <StatsGrid />

      <div className="dashboard-row">

        <RevenueChart />

        <MeetingList />

      </div>

      <RecentLeads />

    </div>
  );
};

export default Dashboard;