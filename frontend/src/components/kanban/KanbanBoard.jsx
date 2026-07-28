import kanbanData from "./kanbanData";
import KanbanColumn from "./KanbanColumn";

import "./KanbanBoard.css";

const KanbanBoard = () => {
  return (
    <div className="kanban-page">

      <div className="kanban-header">

        <div>
          <h1>Lead Pipeline</h1>
          <p>Track all leads through the sales pipeline</p>
        </div>

        <button className="new-lead-btn">
          + New Lead
        </button>

      </div>

      <div className="kanban-board">

        {kanbanData.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
          />
        ))}

      </div>

    </div>
  );
};

export default KanbanBoard;