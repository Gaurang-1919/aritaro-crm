import { useState, useEffect } from "react";
import "./AddFollowUpModal.css";

const AddFollowUpModal = ({
  onClose,
  onAdd,
  onUpdate,
  editingFollowUp,
}) => {
  const [followUp, setFollowUp] = useState({
    client: "",
    person: "",
    dueDate: "",
    priority: "High",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    if (editingFollowUp) {
      setFollowUp(editingFollowUp);
    }
  }, [editingFollowUp]);

  const handleChange = (e) => {
    setFollowUp({
      ...followUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !followUp.client ||
      !followUp.person ||
      !followUp.dueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingFollowUp) {
      onUpdate(followUp);
    } else {
      onAdd({
        id: Date.now(),
        ...followUp,
      });
    }

    onClose();
  };

  return (
    <div className="followup-modal-overlay">
      <div className="followup-modal">

        <h2>
          {editingFollowUp
            ? "Edit Follow Up"
            : "Add Follow Up"}
        </h2>

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={followUp.client}
          onChange={handleChange}
        />

        <input
          type="text"
          name="person"
          placeholder="Contact Person"
          value={followUp.person}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={followUp.dueDate}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={followUp.priority}
          onChange={handleChange}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          name="status"
          value={followUp.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <textarea
          name="notes"
          rows="4"
          placeholder="Notes"
          value={followUp.notes}
          onChange={handleChange}
        />

        <div className="followup-modal-buttons">

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
            {editingFollowUp
              ? "Update"
              : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddFollowUpModal;