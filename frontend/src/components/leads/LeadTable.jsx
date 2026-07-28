import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import StatusBadge from "./StatusBadge";

import "./LeadTable.css";

const leads = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "Infosys",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    status: "Proposal",
  },
  {
    id: 2,
    name: "Priya Verma",
    company: "TCS",
    email: "priya@gmail.com",
    phone: "+91 9123456789",
    status: "Won",
  },
  {
    id: 3,
    name: "John Doe",
    company: "Google",
    email: "john@gmail.com",
    phone: "+1 987654321",
    status: "Follow Up",
  },
  {
    id: 4,
    name: "Amit Kumar",
    company: "Amazon",
    email: "amit@gmail.com",
    phone: "+91 9988776655",
    status: "Deposit",
  },
];

const LeadTable = () => {
  return (
    <div className="lead-table-container">

      <table className="lead-table">

        <thead>

          <tr>

            <th>ID</th>

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

            <tr key={lead.id}>

              <td>{lead.id}</td>

              <td>{lead.name}</td>

              <td>{lead.company}</td>

              <td>{lead.email}</td>

              <td>{lead.phone}</td>

              <td>

                <StatusBadge status={lead.status} />

              </td>

              <td>

                <div className="actions">

                  <button className="view">

                    <FaEye />

                  </button>

                  <button className="edit">

                    <FaEdit />

                  </button>

                  <button className="delete">

                    <FaTrash />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LeadTable;