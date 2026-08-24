import { Router } from "express";
import { listTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/projects/:projectId/tasks", listTasks);
router.post("/projects/:projectId/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
