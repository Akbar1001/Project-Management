import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      {/* Navbar */}
      <div className="home-navbar">
        <h2>Projex</h2>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="btn">Get Started</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-left">
          <h1>
            Manage Projects <br />
            <span>Smarter & Faster</span>
          </h1>

          <p>
            Organize your work, assign tasks, and track progress
            with a clean and powerful project management system.
          </p>

          <div className="hero-buttons">
            <Link to="/signup">
              <button className="primary">Start Free</button>
            </Link>
            <Link to="/login">
              <button className="secondary">Login</button>
            </Link>
          </div>
        </div>

        {/* Right UI Cards */}
        <div className="hero-right">
          <div className="card large">
            <h3>Dashboard</h3>
            <p>Track tasks and progress</p>
          </div>

          <div className="card small">
            <h4>Projects</h4>
          </div>

          <div className="card small">
            <h4>Tasks</h4>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <h3>📊 Analytics</h3>
          <p>Track productivity and progress</p>
        </div>

        <div className="feature">
          <h3>👥 Team Work</h3>
          <p>Collaborate with your team easily</p>
        </div>

        <div className="feature">
          <h3>⚡ Fast Workflow</h3>
          <p>Manage tasks with efficiency</p>
        </div>
      </div>

    </div>
  );
}

export default Home;