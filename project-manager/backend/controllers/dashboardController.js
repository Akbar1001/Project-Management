import Task from "../models/Task.js";

// 🔹 Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    let filter = {};

    // If member → only their tasks
    if (req.user.role === "member") {
      filter.assignedTo = req.user._id;
    }

    const tasks = await Task.find(filter);

    let stats = {
      total: tasks.length,
      todo: 0,
      inProgress: 0,
      done: 0,
      overdue: 0,
    };

    const now = new Date();

    tasks.forEach((task) => {
      if (task.status === "todo") stats.todo++;
      if (task.status === "in-progress") stats.inProgress++;
      if (task.status === "done") stats.done++;

      if (task.dueDate && task.dueDate < now && task.status !== "done") {
        stats.overdue++;
      }
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};