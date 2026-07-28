import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">

      <div className="navbar-left">

        <h2>Dashboard</h2>

      </div>

      <div className="navbar-right">

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search leads, meetings..."
          />
        </div>

        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div className="profile-info">
            <h4>Admin</h4>
            <p>Manager</p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;