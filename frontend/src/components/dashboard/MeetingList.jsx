import "./MeetingList.css";

const meetings = [
  {
    name: "John Doe",
    company: "Google",
    time: "10:00 AM",
  },
  {
    name: "Sarah Smith",
    company: "Microsoft",
    time: "12:30 PM",
  },
  {
    name: "Rahul Sharma",
    company: "Amazon",
    time: "03:00 PM",
  },
  {
    name: "Amit Kumar",
    company: "Netflix",
    time: "05:15 PM",
  },
];

const MeetingList = () => {
  return (
    <div className="meeting-card">

      <h2>Today's Meetings</h2>

      <div className="meeting-list">

        {meetings.map((meeting, index) => (

          <div className="meeting-item" key={index}>

            <div className="avatar">
              {meeting.name.charAt(0)}
            </div>

            <div className="meeting-info">

              <h4>{meeting.name}</h4>

              <p>{meeting.company}</p>

            </div>

            <span>{meeting.time}</span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MeetingList;