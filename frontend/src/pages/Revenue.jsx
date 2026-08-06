import { useEffect, useState } from "react";

import { getMoneyMetrics } from "../api/dashboardApi";

const Revenue = () => {

  const [data, setData] = useState({
    totalDeposits: 0,
    totalSales: 0,
    revenueGenerated: 0,
    cashCollected: 0,
    refunds: 0,
    netRevenue: 0,
    totalCommission: 0,
    depositToPaidConversion: 0,
    averageDaysToCollect: 0,
    commissionPerRep: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {

    try {

      const res = await getMoneyMetrics();

      setData(res.data.data);

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

      <h1>Revenue Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>${data.totalDeposits}</h2>
          <p>Total Deposits</p>
        </div>

        <div className="stat-card">
          <h2>${data.totalSales}</h2>
          <p>Total Sales</p>
        </div>

        <div className="stat-card">
          <h2>${data.revenueGenerated}</h2>
          <p>Revenue Generated</p>
        </div>

        <div className="stat-card">
          <h2>${data.cashCollected}</h2>
          <p>Cash Collected</p>
        </div>

        <div className="stat-card">
          <h2>${data.refunds}</h2>
          <p>Refunds</p>
        </div>

        <div className="stat-card">
          <h2>${data.netRevenue}</h2>
          <p>Net Revenue</p>
        </div>

        <div className="stat-card">
          <h2>${data.totalCommission}</h2>
          <p>Total Commission</p>
        </div>

        <div className="stat-card">
          <h2>{data.depositToPaidConversion}%</h2>
          <p>Deposit → Paid</p>
        </div>

        <div className="stat-card">
          <h2>{Number(data.averageDaysToCollect).toFixed(1)}</h2>
          <p>Avg Days To Collect</p>
        </div>

      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >

        <h2>Commission Per Closer</h2>
        {data.commissionPerRep.length === 0 ? (
          <p>No commission data found.</p>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>
              <tr>
                <th>Closer</th>
                <th>Commission</th>
              </tr>
            </thead>

            <tbody>
              {data.commissionPerRep.map((rep) => (
                <tr key={rep._id}>
                  <td>{rep._id || "Unknown"}</td>
                  <td>${rep.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

  );
};

export default Revenue;