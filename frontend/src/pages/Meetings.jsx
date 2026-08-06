import { useEffect, useState } from "react";

import {
  getMeetings,
  deleteMeeting,
} from "../api/meetingApi";

const Meetings = () => {

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {

    try {
      const res = await getMeetings();
      setMeetings(res.data.data || []);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete meeting?"))
      return;

    try {
      await deleteMeeting(id);
      setMeetings((prev) =>
        prev.filter(
          (meeting) => meeting._id !== id
        )
      );

    } catch (err) {
      console.error(err);
      alert("Unable to delete meeting");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page-container">
      <h1>Meetings</h1>
      {meetings.length === 0 ? (
        <p>No Meetings Found</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>
            <tr>
              <th>Lead</th>
              <th>Date</th>
              <th>Status</th>
              <th>Setter</th>
              <th>Closer</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {meetings.map((meeting) => (

              <tr key={meeting._id}>
                <td>
                  {meeting.leadId?.leadName || "-"}
                </td>

                <td>
                  {meeting.meetingDate
                    ? new Date(
                        meeting.meetingDate
                      ).toLocaleString()
                    : "-"}
                </td>

                <td>{meeting.status}</td>

                <td>
                  {meeting.setter?.name || "-"}
                </td>

                <td>
                  {meeting.closer?.name || "-"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(meeting._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
};

export default Meetings;