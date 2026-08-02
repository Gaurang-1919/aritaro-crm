import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { projectionChartData } from "./projectionData";
import "./ProjectionChart.css";

const ProjectionChart = () => {
  return (
    <div className="projection-chart">

      <h3>Revenue Forecast</h3>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={projectionChartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="target"
            stroke="#2563eb"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16a34a"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ProjectionChart;