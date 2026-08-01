import { useState, useEffect } from "react";
import "./AddLeadModal.css";

const emptyLead = {
  name: "",
  company: "",
  email: "",
  phone: "",
  value: "",
  priority: "High",
  assigned: "",
  date: "",
};

const AddLeadModal = ({ onClose, onAdd, onUpdate, editingLead }) => {
  const [lead, setLead] = useState(emptyLead);

  useEffect(() => {
    if (editingLead) {
      setLead(editingLead);
    } else {
      setLead(emptyLead);
    }
  }, [editingLead]);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!lead.name || !lead.company) {
      alert("Please fill Name and Company");
      return;
    }

    if (editingLead) {
      onUpdate(lead);
    } else {
      onAdd({
        id: Date.now(),
        ...lead,
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {editingLead ? "Edit Lead" : "Add New Lead"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Lead Name"
          value={lead.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={lead.company}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={lead.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={lead.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="value"
          placeholder="Deal Value"
          value={lead.value}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={lead.priority}
          onChange={handleChange}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="text"
          name="assigned"
          placeholder="Assigned To"
          value={lead.assigned}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={lead.date}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>
            Cancel
          </button>

          <button onClick={handleSubmit}>
            {editingLead ? "Update Lead" : "Save Lead"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddLeadModal;

