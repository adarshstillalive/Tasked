import express from "express";
import userController from "../controllers/userController";
import userAuthMiddleware from "../../middleware/userAuthMiddleware";

const userRoute = express.Router();

// Auth
userRoute.post("/api/signup", userController.signup);
userRoute.post("/api/login", userController.login);

// Task
userRoute.get("/api/tasks", userAuthMiddleware.auth, userController.fetchTasks);
userRoute.patch(
  "/api/task/:taskId",
  userAuthMiddleware.auth,
  userController.updateStatus
);
export default userRoute;
