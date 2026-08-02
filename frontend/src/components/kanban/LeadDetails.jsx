import "./LeadDetails.css";

const LeadDetails = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className="drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h2>Lead Details</h2>

          <button onClick={onClose}>✖</button>
        </div>

        <div className="drawer-body">
          <h3>{lead.name}</h3>

          <p><strong>Company:</strong> {lead.company}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
          <p><strong>Deal Value:</strong> {lead.value}</p>
          <p><strong>Priority:</strong> {lead.priority}</p>
          <p><strong>Assigned:</strong> {lead.assigned}</p>
          <p><strong>Date:</strong> {lead.date}</p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;