import "./LeadDetails.css";

const LeadDetails = () => {
  return (
    <div className="lead-details">

      <div className="lead-profile">

        <div className="profile-left">

          <div className="avatar">
            JD
          </div>

          <div>

            <h2>John Doe</h2>

            <p>Google Pvt. Ltd.</p>

          </div>

        </div>

        <button className="edit-btn">
          Edit Lead
        </button>

      </div>

      <div className="details-grid">

        <div className="info-card">

          <h3>Contact Information</h3>

          <p><strong>Email:</strong> john@gmail.com</p>

          <p><strong>Phone:</strong> +1 987654321</p>

          <p><strong>Source:</strong> LinkedIn</p>

          <p><strong>Status:</strong> Proposal</p>

        </div>

        <div className="info-card">

          <h3>Meeting Details</h3>

          <p><strong>Date:</strong> 28 July 2026</p>

          <p><strong>Time:</strong> 10:30 AM</p>

          <p><strong>Setter:</strong> Rahul</p>

          <p><strong>Closer:</strong> Amit</p>

        </div>

        <div className="info-card">

          <h3>Financial Details</h3>

          <p><strong>Deal Value:</strong> $8,500</p>

          <p><strong>Deposit:</strong> $1,000</p>

          <p><strong>Commission:</strong> 10%</p>

          <p><strong>Expected Revenue:</strong> $8,500</p>

        </div>

      </div>

      <div className="notes-card">

        <h3>Internal Notes</h3>

        <p>
          Client is interested in CRM Development.
          Follow up after tomorrow's meeting.
        </p>

      </div>

    </div>
  );
};

export default LeadDetails;