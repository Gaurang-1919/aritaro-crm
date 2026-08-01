import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  revenueData,
  leadStatus,
  COLORS,
} from "./analyticsData";

import "./AnalyticsCharts.css";

const AnalyticsCharts = () => {
  return (
    <div className="analytics-charts">

      <div className="chart-card">

        <h3>Revenue Trend</h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h3>Monthly Sales</h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#16a34a"
              radius={[8,8,0,0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card full-width">

        <h3>Lead Status</h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>

            <Pie
              data={leadStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {leadStatus.map((entry,index)=>(
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AnalyticsCharts;