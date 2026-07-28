import "./RecentLeads.css";

const leads = [
  {
    name: "Rahul Sharma",
    company: "Infosys",
    status: "Proposal",
  },
  {
    name: "Priya Verma",
    company: "TCS",
    status: "Meeting",
  },
  {
    name: "John Doe",
    company: "Google",
    status: "Won",
  },
  {
    name: "Amit Kumar",
    company: "Amazon",
    status: "Follow Up",
  },
];

const RecentLeads = () => {
  return (
    <div className="recent-leads">

      <h2>Recent Leads</h2>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Company</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead, index) => (

            <tr key={index}>

              <td>{lead.name}</td>

              <td>{lead.company}</td>

              <td>{lead.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentLeads;