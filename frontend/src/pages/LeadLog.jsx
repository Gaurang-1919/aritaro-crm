import LeadTable from "../components/leads/LeadTable";
import LeadFilters from "../components/leads/LeadFilters";

import "./LeadLog.css";

const LeadLog = () => {
  return (
    <div className="lead-log">

      <div className="lead-header">

        <div>
          <h1>Lead Management</h1>
          <p>Manage all your leads from one place.</p>
        </div>

        <button className="add-btn">
          + Add Lead
        </button>

      </div>

      <LeadFilters />

      <LeadTable />

    </div>
  );
};

export default LeadLog;