import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/tasks.css";

function Tasks() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/projects");
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Fetch tasks + members
  useEffect(() => {
    if (!selectedProject) return;

    const fetchData = async () => {
      try {
        const [tasksRes, projectRes] = await Promise.all([
          API.get(`/tasks?projectId=${selectedProject}`),
          API.get(`/projects/${selectedProject}`),
        ]);

        setTasks(tasksRes.data);
        setMembers(projectRes.data.members || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedProject]);

  // 🔹 Create Task
  const createTask = async (e) => {
    e.preventDefault();

    if (!selectedProject) {
      alert("Please select a project");
      return;
    }

    if (!form.title) {
      alert("Task title is required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/tasks", {
        title: form.title,
        description: form.description,
        assignedTo: form.assignedTo || null,
        dueDate: form.dueDate || null,
        projectId: selectedProject,
      });

      // reset form
      setForm({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
      });

      // refresh tasks
      const { data } = await API.get(
        `/tasks?projectId=${selectedProject}`
      );
      setTasks(data);

      alert("Task created successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });

      const { data } = await API.get(
        `/tasks?projectId=${selectedProject}`
      );
      setTasks(data);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Tasks</h1>

        {/* Project Select */}
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Create Form */}
        <form className="task-form" onSubmit={createTask}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
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

          {/* Member Dropdown */}
          <select
            value={form.assignedTo}
            onChange={(e) =>
              setForm({ ...form, assignedTo: e.target.value })
            }
          >
            <option value="">Assign Member (optional)</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>

        {/* Task List */}
        <div className="task-grid">
          {tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            tasks.map((t) => (
              <div key={t._id} className="card">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <p>Status: {t.status}</p>

                <select
                  value={t.status}
                  onChange={(e) =>
                    updateStatus(t._id, e.target.value)
                  }
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Tasks;