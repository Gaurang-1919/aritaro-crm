import {
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import "./MeetingsTable.css";

const MeetingsTable = ({
  meetings,
  onAdd,
  onEdit,
  onDelete,
  search,
  setSearch,
}) => {
  return (
    <div className="meetings-container">

      <div className="meetings-header">

        <h2>Meetings</h2>

        <button
          className="add-meeting-btn"
          onClick={onAdd}
        >
          + Add Meeting
        </button>

      </div>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Client or Person..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <table className="meetings-table">

        <thead>
          <tr>
            <th>Client</th>
            <th>Person</th>
            <th>Date</th>
            <th>Time</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {meetings.length === 0 ? (

            <tr>
              <td colSpan="7">
                No Meetings Found
              </td>
            </tr>

          ) : (

            meetings.map((meeting) => (

              <tr key={meeting.id}>

                <td>{meeting.client}</td>

                <td>{meeting.person}</td>

                <td>{meeting.date}</td>

                <td>{meeting.time}</td>

                <td>{meeting.mode}</td>

                <td>

                  <span
                    className={`status ${meeting.status.toLowerCase()}`}
                  >
                    {meeting.status}
                  </span>

                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      onEdit(meeting)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      onDelete(meeting.id)
                    }
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

export default MeetingsTable;