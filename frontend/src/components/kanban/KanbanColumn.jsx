import KanbanCard from "./KanbanCard";
import "./KanbanColumn.css";

const KanbanColumn = ({ column }) => {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2>{column.title}</h2>
        <span>{column.leads.length}</span>
      </div>
      <div className="column-body">

        {column.leads.map((lead) => (
          <KanbanCard
            key={lead._id}
            lead={lead}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;