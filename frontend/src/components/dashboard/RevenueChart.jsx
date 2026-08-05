import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getRevenueProjection } from "../../api/dashboardApi";

import "./RevenueChart.css";

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const res = await getRevenueProjection();

      const projection = res.data.data;
      setData([
        {
          month: "Pipeline",
          revenue: projection.pipelineValue,
        },
        {
          month: "Worst",
          revenue: projection.worstCaseRevenue,
        },
        {
          month: "Expected",
          revenue: projection.expectedCaseRevenue,
        },
        {
          month: "Best",
          revenue: projection.bestCaseRevenue,
        },
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="revenue-chart">

      <div className="chart-header">
        <h2>Revenue Projection</h2>
        <p>Projected Revenue</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;