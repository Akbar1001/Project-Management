import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.post("/", protect, checkRole("admin"), createTask);

// All users
router.get("/", protect, getTasks);

// Update (member can update own task)
router.put("/:id", protect, updateTask);

// Admin only delete
router.delete("/:id", protect, checkRole("admin"), deleteTask);

export default router;