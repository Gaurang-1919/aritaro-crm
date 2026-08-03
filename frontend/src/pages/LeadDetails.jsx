import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getLead,
  updateLead,
  deleteLead,
} from "../api/leadApi";

import "./LeadDetails.css";

const LeadDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [lead, setLead] = useState({
    leadName: "",
    company: "",
    email: "",
    phone: "",
    source: "website",
    status: "new",
    meetingDate: "",
    notes: "",
    totalDealValue: 0,
  });

  const [activities, setActivities] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {

      const res = await getLead(id);

      const data = res.data.data;

      setLead({
        ...data.lead,
        meetingDate: data.lead.meetingDate
          ? data.lead.meetingDate.substring(0, 10)
          : "",
      });

      setActivities(data.activities || []);
      setMeetings(data.meetings || []);
      setFollowUps(data.followUps || []);
      setConversations(data.conversations || []);

    } catch (err) {

      console.error(err);

      alert("Unable to fetch lead");

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    try {

      await updateLead(id, lead);

      alert("Lead Updated Successfully");

      setEditing(false);

      fetchLead();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to update lead"
      );

    }
  };

  const handleDelete = async () => {

    if (!window.confirm("Delete this lead?"))
      return;

    try {

      await deleteLead(id);

      alert("Lead Deleted");

      navigate("/leads");

    } catch (err) {

      console.error(err);

      alert("Delete Failed");

    }
  };

  if (loading) {

    return <h2>Loading...</h2>;

  }
    return (
    <div className="lead-details">

      <div className="lead-profile">

        <div className="profile-left">

          <div className="avatar">
            {lead.leadName
              ? lead.leadName
                  .substring(0, 2)
                  .toUpperCase()
              : "NA"}
          </div>

          <div>

            {editing ? (
              <input
                name="leadName"
                value={lead.leadName}
                onChange={handleChange}
              />
            ) : (
              <h2>{lead.leadName}</h2>
            )}

            {editing ? (
              <input
                name="company"
                value={lead.company}
                onChange={handleChange}
              />
            ) : (
              <p>{lead.company || "-"}</p>
            )}

          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {editing ? (
            <button
              className="edit-btn"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="edit-btn"
              onClick={() =>
                setEditing(true)
              }
            >
              Edit Lead
            </button>
          )}

          <button
            className="edit-btn"
            style={{
              background: "#dc2626",
              color: "#fff",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

      </div>

      <div className="details-grid">

        <div className="info-card">

          <h3>Contact Information</h3>

          <p>
            <strong>Email:</strong>

            {editing ? (
              <input
                name="email"
                value={lead.email}
                onChange={handleChange}
              />
            ) : (
              lead.email || "-"
            )}
          </p>

          <p>
            <strong>Phone:</strong>

            {editing ? (
              <input
                name="phone"
                value={lead.phone}
                onChange={handleChange}
              />
            ) : (
              lead.phone
            )}
          </p>

          <p>
            <strong>Source:</strong>

            {editing ? (
              <select
                name="source"
                value={lead.source}
                onChange={handleChange}
              >
                <option value="website">Website</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="google">Google</option>
                <option value="referral">Referral</option>
                <option value="cold_call">Cold Call</option>
                <option value="other">Other</option>
              </select>
            ) : (
              lead.source
            )}
          </p>

          <p>
            <strong>Status:</strong>

            {editing ? (
              <select
                name="status"
                value={lead.status}
                onChange={handleChange}
              >
                <option value="new">New</option>
                <option value="proposal">Proposal</option>
                <option value="meeting_follow_up">
                  Meeting Follow Up
                </option>
                <option value="follow_up_ongoing">
                  Follow Up
                </option>
                <option value="deposit">Deposit</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            ) : (
              lead.status
            )}
          </p>

        </div>

        <div className="info-card">

          <h3>Meeting</h3>

          {editing ? (
            <input
              type="date"
              name="meetingDate"
              value={lead.meetingDate}
              onChange={handleChange}
            />
          ) : (
            <p>
              {lead.meetingDate || "-"}
            </p>
          )}

        </div>

        <div className="info-card">

          <h3>Deal</h3>

          {editing ? (
            <input
              type="number"
              name="totalDealValue"
              value={lead.totalDealValue}
              onChange={handleChange}
            />
          ) : (
            <h2>
              $
              {lead.totalDealValue || 0}
            </h2>
          )}

        </div>

      </div>

      <div className="notes-card">

        <h3>Notes</h3>

        {editing ? (
          <textarea
            rows="5"
            name="notes"
            value={lead.notes}
            onChange={handleChange}
          />
        ) : (
          <p>{lead.notes || "No Notes"}</p>
        )}

      </div>

      <div className="notes-card">

        <h3>Activities</h3>

        {activities.length === 0 ? (
          <p>No Activity</p>
        ) : (
          activities.map((activity) => (
            <p key={activity._id}>
              • {activity.action}
            </p>
          ))
        )}

      </div>

      <div className="notes-card">

        <h3>Meetings</h3>

        {meetings.length === 0 ? (
          <p>No Meetings</p>
        ) : (
          meetings.map((meeting) => (
            <p key={meeting._id}>
              • {meeting.meetingDate}
            </p>
          ))
        )}

      </div>

      <div className="notes-card">

        <h3>Follow Ups</h3>

        {followUps.length === 0 ? (
          <p>No Follow Ups</p>
        ) : (
          followUps.map((follow) => (
            <p key={follow._id}>
              • {follow.followUpStatus}
            </p>
          ))
        )}

      </div>

      <div className="notes-card">

        <h3>Conversations</h3>

        {conversations.length === 0 ? (
          <p>No Conversations</p>
        ) : (
          conversations.map((chat) => (
            <p key={chat._id}>
              • {chat.message}
            </p>
          ))
        )}

      </div>

    </div>
  );
};

export default LeadDetails;