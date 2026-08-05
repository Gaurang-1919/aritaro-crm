import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createLead } from "../api/leadApi";
import { getUsers } from "../api/userApi";

import "./AddLead.css";

const AddLead = () => {

  const navigate = useNavigate();

  const [setters, setSetters] = useState([]);
  const [closers, setClosers] = useState([]);

  const [formData, setFormData] = useState({
    leadName: "",
    company: "",
    email: "",
    phone: "",
    source: "website",
    status: "new",
    setter: "",
    closer: "",
    meetingDate: "",
    totalDealValue: 0,
    notes: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const setterRes = await getUsers("setter");
        const closerRes = await getUsers("closer");

        setSetters(setterRes.data.data);
        setClosers(closerRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createLead(formData);

      alert("Lead created successfully");

      navigate("/leads");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Unable to create lead"
      );
    }
  };

  return (
    <div className="add-lead-page">

      <div className="page-header">
        <h1>Add New Lead</h1>
        <p>Create a new lead in CRM</p>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="form-group">
            <label>Lead Name</label>
            <input
              type="text"
              name="leadName"
              placeholder="Enter lead name"
              value={formData.leadName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Lead Source</label>

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
            >
              <option value="website">Website</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="referral">Referral</option>
              <option value="google">Google</option>
              <option value="cold_call">Cold Call</option>
              <option value="other">Other</option>
            </select>

          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="new">New</option>
              <option value="proposal">Proposal</option>
              <option value="deposit">Deposit</option>
              <option value="follow_up_ongoing">Follow Up</option>
              <option value="meeting_follow_up">Meeting Follow Up</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

          </div>

          <div className="form-group">
            <label>Setter</label>

            <select
              name="setter"
              value={formData.setter}
              onChange={handleChange}
            >
              <option value="">Select Setter</option>

              {setters.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Closer</label>

            <select
              name="closer"
              value={formData.closer}
              onChange={handleChange}
            >
              <option value="">Select Closer</option>

              {closers.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Meeting Date</label>
            <input
              type="date"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Deal Value ($)</label>
            <input
              type="number"
              name="totalDealValue"
              placeholder="5000"
              value={formData.totalDealValue}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>

          <textarea
            rows="5"
            name="notes"
            placeholder="Write Notes..."
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
        >
          Save Lead
        </button>
      </form>
    </div>
  );
};

export default AddLead;