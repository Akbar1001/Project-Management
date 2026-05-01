import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Project name required");
      return;
    }

    try {
      await API.post("/projects", form);
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating project");
    }
  };

  return (
    <>
      <Navbar />

      <div className="projects">
        <h1>Projects</h1>

        {/* Create Project */}
        <form className="project-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button type="submit">Create</button>
        </form>

        {/* Project List */}
        <div className="project-list">
          {projects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            projects.map((proj) => (
              <div key={proj._id} className="project-card">
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;