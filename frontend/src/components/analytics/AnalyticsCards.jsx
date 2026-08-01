import {
  FaUsers,
  FaDollarSign,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";

import "./AnalyticsCards.css";

import { stats } from "./analyticsData";

const icons = [
  <FaUsers />,
  <FaDollarSign />,
  <FaCalendarCheck />,
  <FaChartLine />,
];

const AnalyticsCards = () => {
  return (
    <div className="analytics-cards">

      {stats.map((card, index) => (

        <div
          className="analytics-card"
          key={card.id}
        >

          <div
            className="analytics-icon"
            style={{
              background: card.color,
            }}
          >
            {icons[index]}
          </div>

          <div className="analytics-content">

            <p>{card.title}</p>

            <h2>{card.value}</h2>

            <span>{card.change} this month</span>

          </div>

        </div>

      ))}

    </div>
  );
};

export default AnalyticsCards;