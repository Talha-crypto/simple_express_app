import express from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", verifyToken, createTask);
router.get("/:id", verifyToken, getTaskById);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
