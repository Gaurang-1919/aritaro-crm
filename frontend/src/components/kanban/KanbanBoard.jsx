import { useEffect, useState } from "react";
import { getLeads } from "../../api/leadApi";
import KanbanColumn from "./KanbanColumn";

import "./KanbanBoard.css";

const columns = [
  {
    id: "new",
    title: "New",
  },
  {
    id: "proposal",
    title: "Proposal",
  },
  {
    id: "meeting_follow_up",
    title: "Meeting Follow Up",
  },
  {
    id: "follow_up_ongoing",
    title: "Follow Up",
  },
  {
    id: "deposit",
    title: "Deposit",
  },
  {
    id: "won",
    title: "Won",
  },
  {
    id: "lost",
    title: "Lost",
  },
];

const KanbanBoard = () => {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {

    try {
      const res = await getLeads();
      const leads = res.data.data.leads || [];

      const grouped = columns.map((column) => ({
        ...column,
        leads: leads.filter(
          (lead) => lead.status === column.id
        ),
      }));
      setBoard(grouped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="kanban-page">
      <div className="kanban-header">

        <div>
          <h1>Lead Pipeline</h1>
          <p>
            Track all leads through the sales pipeline
          </p>
        </div>

        <button className="new-lead-btn">
          + New Lead
        </button>
      </div>

      <div className="kanban-board">
        {board.map((column) => (
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