import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaComments,
  FaCalendarAlt,
  FaHistory,
  FaChartBar,
  FaDollarSign,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
    },
    {
      title: "Lead Log",
      icon: <FaUsers />,
      path: "/leads",
    },
    {
      title: "Kanban",
      icon: <FaClipboardList />,
      path: "/kanban",
    },
    {
      title: "Conversations",
      icon: <FaComments />,
      path: "/conversations",
    },
    {
      title: "Meetings",
      icon: <FaCalendarAlt />,
      path: "/meetings",
    },
    {
      title: "Follow Ups",
      icon: <FaHistory />,
      path: "/followups",
    },
    {
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
    },
    {
      title: "Revenue",
      icon: <FaDollarSign />,
      path: "/revenue",
    },
    {
      title: "Projection",
      icon: <FaChartLine />,
      path: "/projection",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>Aritaro CRM</h2>
      </div>

      <nav className="menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}

      </nav>

      <div className="logout">

        <button>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;