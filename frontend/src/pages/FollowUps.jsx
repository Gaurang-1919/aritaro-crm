import "./FollowUps.css";

const FollowUps = () => {
  return (
    <div className="followups-page">

      <div className="page-header">
        <h1>Follow Ups</h1>
        <button className="add-btn">+ Schedule Follow Up</button>
      </div>

      <div className="followup-card">
        <h3>Rahul Sharma</h3>
        <p>Meeting scheduled for tomorrow at 11:00 AM</p>
        <span className="status">Pending</span>
      </div>

      <div className="followup-card">
        <h3>John Doe</h3>
        <p>Call after proposal submission</p>
        <span className="status completed">Completed</span>
      </div>

    </div>
  );
};

export default FollowUps;