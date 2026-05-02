import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/dashboard");
        setStats(data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Dashboard</h1>

        {/* 🔄 Loading */}
        {loading && <p>Loading dashboard...</p>}

        {/* ❌ Error */}
        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {/* ✅ Data */}
        {!loading && !error && stats && (
          <div className="grid">
            <div className="card">
              <h3>Total Tasks</h3>
              <p>{stats.total}</p>
            </div>

            <div className="card">
              <h3>Todo</h3>
              <p>{stats.todo}</p>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <p>{stats.inProgress}</p>
            </div>

            <div className="card">
              <h3>Done</h3>
              <p>{stats.done}</p>
            </div>

            <div className="card">
              <h3>Overdue</h3>
              <p>{stats.overdue}</p>
            </div>
          </div>
        )}

        {/* 🟡 Empty case */}
        {!loading && !error && !stats && (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;