import { useEffect, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { getLeads, deleteLead } from "../../api/leadApi";
import StatusBadge from "./StatusBadge";

import "./LeadTable.css";

const LeadTable = () => {

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
      fetchLeads();
    } catch (err) {
      console.error(err);
    }

  };

  if (loading) {
    return <h3>Loading...</h3>;
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
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr key={lead._id}>

              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>

              <td>
                <StatusBadge status={lead.status} />
              </td>

              <td>

                <button>
                  <FaEye />
                </button>

                <button>
                  <FaEdit />
                </button>

                <button
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