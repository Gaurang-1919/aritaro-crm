import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  getLeads,
  deleteLead,
} from "../../api/leadApi";

import StatusBadge from "./StatusBadge";

import "./LeadTable.css";

const LeadTable = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();

      setLeads(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await deleteLead(id);

      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error(err);
      alert("Unable to delete lead.");
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!leads.length) {
    return <h3>No Leads Found</h3>;
  }

  return (
    <div className="lead-table-container">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th width="170">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.leadName}</td>

              <td>{lead.company || "-"}</td>

              <td>{lead.email || "-"}</td>

              <td>{lead.phone}</td>

              <td>
                <StatusBadge status={lead.status} />
              </td>

              <td>
                <button
                  title="View"
                  onClick={() =>
                    navigate(`/lead/${lead._id}`)
                  }
                >
                  <FaEye />
                </button>

                <button
                  title="Edit"
                  onClick={() =>
                    navigate(`/lead/${lead._id}`)
                  }
                >
                  <FaEdit />
                </button>

                <button
                  title="Delete"
                  onClick={() => handleDelete(lead._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;