import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { monthlyRevenue } from "./revenueData";
import "./RevenueCharts.css";

const RevenueCharts = () => {
  return (
    <div className="revenue-charts">

      <div className="chart-box">
        <h3>Revenue Growth</h3>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={monthlyRevenue}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              fill="url(#colorRevenue)"
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">

        <h3>Monthly Revenue</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Bar
              dataKey="revenue"
              fill="#2563eb"
              radius={[8,8,0,0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueCharts;