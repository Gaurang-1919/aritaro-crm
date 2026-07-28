import "./DashboardCard.css";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="dashboard-card">

      <div
        className="card-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className="card-content">

        <p className="card-title">
          {title}
        </p>

        <h2 className="card-value">
          {value}
        </h2>

      </div>

    </div>
  );
};

export default DashboardCard;