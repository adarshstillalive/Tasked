import express from "express";
import userController from "../controllers/userController";

const userRoute = express.Router();

// Auth
userRoute.post("/api/signup", userController.signup);
userRoute.post("/api/login", userController.login);

export default userRoute;
