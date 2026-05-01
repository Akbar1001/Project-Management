import Task from "../models/Task.js";
import Project from "../models/Project.js";

// 🔹 Create Task (Admin only)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    // check project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Tasks (filter by project or user)
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    let filter = {};

    if (projectId) {
      filter.project = projectId;
    }

    // Members only see their tasks
    if (req.user.role === "member") {
      filter.assignedTo = req.user._id;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Task Status
export const updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Members can update only their tasks
    if (
      req.user.role === "member" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Delete Task (Admin only)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};