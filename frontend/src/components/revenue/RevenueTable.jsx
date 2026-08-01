import "./RevenueTable.css";
import { revenueTable } from "./revenueData";

const RevenueTable = () => {
  return (
    <div className="revenue-table-container">

      <h3>Recent Revenue</h3>

      <table className="revenue-table">

        <thead>

          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>

        </thead>

        <tbody>

          {revenueTable.map((item)=>(

            <tr key={item.id}>

              <td>{item.client}</td>

              <td>{item.amount}</td>

              <td>
                <span
                  className={
                    item.status==="Paid"
                    ? "paid"
                    : "pending"
                  }
                >
                  {item.status}
                </span>
              </td>

              <td>{item.date}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RevenueTable;