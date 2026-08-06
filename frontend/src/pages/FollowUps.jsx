import { useEffect, useState } from "react";

import {
  getFollowUps,
  deleteFollowUp,
} from "../api/followUpApi";

import "./FollowUps.css";

const FollowUps = () => {

  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const fetchFollowUps = async () => {

    try {

      const res = await getFollowUps();

      setFollowUps(res.data.data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this follow up?"))
      return;

    try {

      await deleteFollowUp(id);

      setFollowUps((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (err) {

      console.error(err);

      alert("Unable to delete follow up");

    }

  };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (
    <div className="followups-page">

      <div className="page-header">

        <h1>Follow Ups</h1>

        <button className="add-btn">
          + Schedule Follow Up
        </button>

      </div>

      {followUps.length === 0 ? (

        <p>No Follow Ups Found</p>

      ) : (

        followUps.map((item) => (

          <div
            key={item._id}
            className="followup-card"
          >

            <h3>
              {item.leadId?.leadName || "-"}
            </h3>

            <p>
              {item.notes ||
                item.description ||
                "No Notes"}
            </p>

            <span
              className={`status ${
                item.followUpStatus === "completed"
                  ? "completed"
                  : ""
              }`}
            >
              {item.followUpStatus}
            </span>

            <div
              style={{
                marginTop: "12px",
              }}
            >

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default FollowUps;