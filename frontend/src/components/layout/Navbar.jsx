import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();

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
            placeholder="Search leads..."
          />
        </div>

        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div className="profile-info">

            <h4>
              {user?.name || "Guest"}
            </h4>

            <p>
              {user?.role || "User"}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;