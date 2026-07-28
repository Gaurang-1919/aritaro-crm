import DashboardCard from "./DashboardCard";

import {
  FaUsers,
  FaDollarSign,
  FaHandshake,
  FaCalendarCheck,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

import "./StatsGrid.css";

const StatsGrid = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "156",
      icon: <FaUsers />,
      color: "#2563EB",
    },
    {
      title: "Revenue",
      value: "$45,680",
      icon: <FaDollarSign />,
      color: "#16A34A",
    },
    {
      title: "Won Deals",
      value: "58",
      icon: <FaHandshake />,
      color: "#F59E0B",
    },
    {
      title: "Meetings",
      value: "22",
      icon: <FaCalendarCheck />,
      color: "#7C3AED",
    },
    {
      title: "Pending Follow Ups",
      value: "14",
      icon: <FaClock />,
      color: "#DC2626",
    },
    {
      title: "Conversion Rate",
      value: "36%",
      icon: <FaChartLine />,
      color: "#0891B2",
    },
  ];

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