import { useEffect, useState } from "react";

import { getRevenueProjection } from "../api/dashboardApi";

const Projection = () => {

  const [projection, setProjection] = useState({
    meetingsScheduled: 0,
    averageDealSize: 0,
    pipelineValue: 0,
    bestCaseRevenue: 0,
    expectedCaseRevenue: 0,
    worstCaseRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjection();
  }, []);

  const fetchProjection = async () => {

    try {

      const res = await getRevenueProjection();

      setProjection(res.data.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="dashboard">

      <h1>Revenue Projection</h1>

      <div className="stats-grid">

        <div className="stat-card">

          <h2>
            {projection.meetingsScheduled}
          </h2>

          <p>Meetings Scheduled</p>

        </div>

        <div className="stat-card">

          <h2>
            ${projection.averageDealSize.toFixed(2)}
          </h2>

          <p>Average Deal Size</p>

        </div>

        <div className="stat-card">

          <h2>
            ${projection.pipelineValue.toFixed(2)}
          </h2>

          <p>Pipeline Value</p>

        </div>

        <div className="stat-card">

          <h2>
            ${projection.bestCaseRevenue.toFixed(2)}
          </h2>

          <p>Best Case Revenue</p>

        </div>

        <div className="stat-card">

          <h2>
            ${projection.expectedCaseRevenue.toFixed(2)}
          </h2>

          <p>Expected Revenue</p>

        </div>

        <div className="stat-card">

          <h2>
            ${projection.worstCaseRevenue.toFixed(2)}
          </h2>

          <p>Worst Case Revenue</p>

        </div>

      </div>

    </div>

  );
};

export default Projection;