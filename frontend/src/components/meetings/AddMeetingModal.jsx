import { useState, useEffect } from "react";
import "./AddMeetingModal.css";

const AddMeetingModal = ({
  onClose,
  onAdd,
  onUpdate,
  editingMeeting,
}) => {
  const [meeting, setMeeting] = useState({
    client: "",
    person: "",
    date: "",
    time: "",
    mode: "Online",
    status: "Upcoming",
    notes: "",
  });

  useEffect(() => {
    if (editingMeeting) {
      setMeeting(editingMeeting);
    }
  }, [editingMeeting]);

  const handleChange = (e) => {
    setMeeting({
      ...meeting,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !meeting.client ||
      !meeting.person ||
      !meeting.date ||
      !meeting.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingMeeting) {
      onUpdate(meeting);
    } else {
      onAdd({
        id: Date.now(),
        ...meeting,
      });
    }

    onClose();
  };

  return (
    <div className="meeting-modal-overlay">
      <div className="meeting-modal">

        <h2>
          {editingMeeting
            ? "Edit Meeting"
            : "Add Meeting"}
        </h2>

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={meeting.client}
          onChange={handleChange}
        />

        <input
          type="text"
          name="person"
          placeholder="Contact Person"
          value={meeting.person}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={meeting.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={meeting.time}
          onChange={handleChange}
        />

        <select
          name="mode"
          value={meeting.mode}
          onChange={handleChange}
        >
          <option>Online</option>
          <option>Offline</option>
          <option>Google Meet</option>
          <option>Zoom</option>
        </select>

        <select
          name="status"
          value={meeting.status}
          onChange={handleChange}
        >
          <option>Upcoming</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <textarea
          name="notes"
          placeholder="Meeting Notes"
          rows="4"
          value={meeting.notes}
          onChange={handleChange}
        />

        <div className="meeting-modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {editingMeeting
              ? "Update"
              : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddMeetingModal;

