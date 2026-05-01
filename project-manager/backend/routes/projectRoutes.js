import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.post("/", protect, checkRole("admin"), createProject);

// All logged-in users
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);

export default router;