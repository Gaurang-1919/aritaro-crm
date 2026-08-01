import {
  FaDollarSign,
  FaMoneyBillWave,
  FaClock,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import "./RevenueCards.css";
import { revenueStats } from "./revenueData";

const icons = [
  <FaDollarSign />,
  <FaMoneyBillWave />,
  <FaClock />,
  <FaFileInvoiceDollar />,
];

const RevenueCards = () => {
  return (
    <div className="revenue-cards">
      {revenueStats.map((item, index) => (
        <div className="revenue-card" key={item.id}>
          <div
            className="revenue-icon"
            style={{ background: item.color }}
          >
            {icons[index]}
          </div>

          <div className="revenue-info">
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <span>{item.change} this month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueCards;