import express from "express";
import leadController from "../controllers/leadController";
import leadAuthMiddleware from "../../middleware/leadAuthMiddleware";

const leadRoute = express.Router();

// Auth
leadRoute.post("/api/signup", leadController.signup);
leadRoute.post("/api/login", leadController.login);

// User
leadRoute.get("/api/users", leadAuthMiddleware.auth, leadController.fetchUsers);

// Task
leadRoute.post("/api/task", leadAuthMiddleware.auth, leadController.createTask);
leadRoute.get("/api/tasks", leadAuthMiddleware.auth, leadController.fetchTasks);
leadRoute.delete(
  "/api/task/:taskId",
  leadAuthMiddleware.auth,
  leadController.deleteTask
);

export default leadRoute;
