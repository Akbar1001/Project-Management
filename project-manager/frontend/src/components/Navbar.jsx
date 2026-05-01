import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // helper to highlight active link
  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <div className="navbar">
      <h2 className="logo">Project Manager</h2>

      <div className="nav-links">
        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/projects" className={isActive("/projects")}>
          Projects
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;