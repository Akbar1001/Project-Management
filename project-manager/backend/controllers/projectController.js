import Project from "../models/Project.js";

// 🔹 Create Project (Admin only)
export const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Projects (user-specific)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user._id },
        { members: req.user._id },
      ],
    }).populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Single Project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};