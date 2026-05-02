import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/projects", form);
    setForm({ name: "", description: "" });
    fetchProjects();
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Projects</h1>

        <form className="project-form" onSubmit={handleCreate}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button className="btn btn-primary">Create</button>
        </form>

        <div className="project-grid">
          {projects.map((p) => (
            <div key={p._id} className="card">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Projects;