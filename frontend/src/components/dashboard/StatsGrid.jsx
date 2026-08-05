import { useEffect, useState } from "react";

import DashboardCard from "./DashboardCard";

import {
  FaUsers,
  FaDollarSign,
  FaHandshake,
  FaCalendarCheck,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

import {
  getOverview,
  getMoneyMetrics,
  getSetterMetrics,
  getCloserMetrics,
} from "../../api/dashboardApi";

import { useAuth } from "../../context/AuthContext";

import "./StatsGrid.css";

const StatsGrid = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const overview = await getOverview();

      const overviewData = overview.data.data;

      let cards = [
        {
          title: "Total Leads",
          value: overviewData.totalLeads,
          icon: <FaUsers />,
          color: "#2563EB",
        },
        {
          title: "Meetings",
          value: overviewData.totalMeetings,
          icon: <FaCalendarCheck />,
          color: "#7C3AED",
        },
        {
          title: "Won Deals",
          value: overviewData.wonLeads,
          icon: <FaHandshake />,
          color: "#F59E0B",
        },
        {
          title: "Follow Ups",
          value: overviewData.totalFollowUps,
          icon: <FaClock />,
          color: "#DC2626",
        },
      ];

      if (
        user?.role === "admin" ||
        user?.role === "manager"
      ) {

        const money = await getMoneyMetrics();

        cards.push({
          title: "Revenue",
          value: `$${money.data.data.netRevenue}`,
          icon: <FaDollarSign />,
          color: "#16A34A",
        });

      }

      if (user?.role === "setter") {

        const setter = await getSetterMetrics();

        cards.push({
          title: "Conversion",
          value: `${setter.data.data.conversationToBookedPercentage}%`,
          icon: <FaChartLine />,
          color: "#0891B2",
        });

      }

      if (user?.role === "closer") {

        const closer = await getCloserMetrics();

        cards.push({
          title: "Close Rate",
          value: `${closer.data.data.closeRate}%`,
          icon: <FaChartLine />,
          color: "#0891B2",
        });

      }

      setStats(cards);

    } catch (err) {

      console.error(err);

    }

  };

  return (
    <div className="stats-grid">

      {stats.map((item, index) => (

        <DashboardCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />

      ))}

    </div>
  );
};

export default StatsGrid;