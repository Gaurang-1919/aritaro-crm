import {
  FaBullseye,
  FaChartLine,
  FaArrowTrendUp,
  FaChartPie,
} from "react-icons/fa6";

import "./ProjectionCards.css";
import { projectionStats } from "./projectionData";

const icons = [
  <FaBullseye />,
  <FaChartLine />,
  <FaChartPie />,
  <FaArrowTrendUp />,
];

const ProjectionCards = () => {
  return (
    <div className="projection-cards">
      {projectionStats.map((item, index) => (
        <div className="projection-card" key={item.id}>
          <div
            className="projection-icon"
            style={{ background: item.color }}
          >
            {icons[index]}
          </div>

          <div className="projection-content">
            <p>{item.title}</p>

            <h2>{item.value}</h2>

            <span>{item.change} this quarter</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectionCards;