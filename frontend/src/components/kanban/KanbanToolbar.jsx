import "./KanbanToolbar.css";

const KanbanToolbar = ({
  search,
  setSearch,
  priority,
  setPriority,
}) => {
  return (
    <div className="kanban-toolbar">

      <input
        type="text"
        placeholder="🔍 Search Leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="All">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

    </div>
  );
};

export default KanbanToolbar;