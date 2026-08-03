import { useEffect, useState } from "react";
import { getLeads } from "../api/leadApi";
import "./Dashboard.css";

const Analytics = () => {
  const [stats, setStats] = useState({
    total: 0,
    won: 0,
    lost: 0,
    proposal: 0,
    followup: 0,
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await getLeads();
        const leads = res.data.data || [];

        setStats({
          total: leads.length,
          won: leads.filter((l) => l.status === "won").length,
          lost: leads.filter((l) => l.status === "lost").length,
          proposal: leads.filter((l) => l.status === "proposal").length,
          followup: leads.filter(
            (l) => l.status === "follow_up_ongoing"
          ).length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="dashboard">
      <h1>Analytics</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{stats.total}</h2>
          <p>Total Leads</p>
        </div>

        <div className="stat-card">
          <h2>{stats.proposal}</h2>
          <p>Proposal</p>
        </div>

        <div className="stat-card">
          <h2>{stats.followup}</h2>
          <p>Follow Ups</p>
        </div>

        <div className="stat-card">
          <h2>{stats.won}</h2>
          <p>Won Deals</p>
        </div>

        <div className="stat-card">
          <h2>{stats.lost}</h2>
          <p>Lost Deals</p>
        </div>

      </div>
    </div>
  );
};

export default Analytics;