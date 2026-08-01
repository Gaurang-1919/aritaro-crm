import {
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./FollowUpTable.css";

const FollowUpTable = ({
  followUps,
  search,
  setSearch,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="followup-container">

      <div className="followup-header">

        <h2>Follow Ups</h2>

        <button
          className="add-followup-btn"
          onClick={onAdd}
        >
          + Add Follow Up
        </button>

      </div>

      <div className="followup-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <table className="followup-table">

        <thead>

          <tr>
            <th>Client</th>
            <th>Person</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {followUps.length === 0 ? (

            <tr>
              <td colSpan="6">
                No Follow Ups Found
              </td>
            </tr>

          ) : (

            followUps.map((item) => (

              <tr key={item.id}>

                <td>{item.client}</td>

                <td>{item.person}</td>

                <td>{item.dueDate}</td>

                <td>

                  <span
                    className={`priority ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>

                </td>

                <td>

                  <span
                    className={`status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => onEdit(item)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default FollowUpTable;