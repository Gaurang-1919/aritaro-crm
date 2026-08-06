import { useEffect, useState } from "react";
import { getLeads } from "../../api/leadApi";

import "./RecentLeads.css";

const RecentLeads = () => {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(
        (res.data.data.leads || []).slice(0, 5)
      );

    } catch (err) {
      console.error(err);
    }

  };

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
          {leads.length === 0 ? (
            <tr>
              <td colSpan="3">
                No Leads Found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (

              <tr key={lead._id}>
                <td>{lead.leadName}</td>
                <td>{lead.company || "-"}</td>
                <td>{lead.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentLeads;