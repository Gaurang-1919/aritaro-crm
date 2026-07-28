import { FaSearch, FaFilter } from "react-icons/fa";
import "./LeadFilters.css";

const LeadFilters = () => {
  return (
    <div className="lead-filters">

      <div className="search-box">

        <FaSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Search leads..."
        />

      </div>

      <select>

        <option>All Status</option>
        <option>New</option>
        <option>Proposal</option>
        <option>Deposit</option>
        <option>Follow Up</option>
        <option>Meeting Follow Up</option>
        <option>Won</option>
        <option>Lost</option>

      </select>

      <select>

        <option>All Sources</option>
        <option>Website</option>
        <option>LinkedIn</option>
        <option>Instagram</option>
        <option>Referral</option>

      </select>

      <button>

        <FaFilter />

        Filter

      </button>

    </div>
  );
};

export default LeadFilters;