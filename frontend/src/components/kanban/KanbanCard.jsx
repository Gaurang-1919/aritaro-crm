import "./KanbanCard.css";

const KanbanCard = ({ lead }) => {
  return (
    <div className="kanban-card">

      <div className="card-header">

        <h3>{lead.name}</h3>

        <span className="deal-value">
          {lead.value}
        </span>

      </div>

      <p className="company">
        {lead.company}
      </p>

      <div className="card-footer">

        <button className="view-btn">
          View
        </button>

      </div>

    </div>
  );
};

export default KanbanCard;