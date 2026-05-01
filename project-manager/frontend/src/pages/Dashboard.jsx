import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard">
          <h2>Loading dashboard...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Dashboard</h1>

        <div className="cards">
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

          <div className="card overdue">
            <h3>Overdue</h3>
            <p>{stats.overdue}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;