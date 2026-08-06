import { useNavigate } from "react-router-dom";
import "./KanbanCard.css";

const KanbanCard = ({ lead }) => {
  const navigate = useNavigate();

  return (
    <div className="kanban-card">
      <div className="card-header">
        <h3>{lead.leadName}</h3>
        <span className="deal-value">
          ${lead.totalDealValue || 0}
        </span>
      </div>

      <p className="company">
        {lead.company || "-"}
      </p>

      <div className="card-footer">
        <button
          className="view-btn"
          onClick={() =>
            navigate(`/lead/${lead._id}`)
          }
        >
          View
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;