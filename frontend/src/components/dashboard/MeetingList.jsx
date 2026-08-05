import { useEffect, useState } from "react";

import { getLeads } from "../../api/leadApi";

import "./MeetingList.css";

const MeetingList = () => {

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {

    try {

      const res = await getLeads();

      const leads = res.data.data.leads || [];

      const meetingLeads = leads
        .filter((lead) => lead.meetingDate)
        .slice(0, 5);

      setMeetings(meetingLeads);

    } catch (err) {

      console.error(err);

    }

  };

  return (
    <div className="meeting-card">
      <h2>Upcoming Meetings</h2>

      <div className="meeting-list">
        {meetings.length === 0 ? (
          <p>No Meetings</p>

        ) : (

          meetings.map((meeting) => (

            <div
              className="meeting-item"
              key={meeting._id}
            >

              <div className="avatar">
                {meeting.leadName.charAt(0)}
              </div>

              <div className="meeting-info">

                <h4>{meeting.leadName}</h4>

                <p>{meeting.company || "-"}</p>

              </div>
              <span>
                {new Date(
                  meeting.meetingDate
                ).toLocaleDateString()}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default MeetingList;