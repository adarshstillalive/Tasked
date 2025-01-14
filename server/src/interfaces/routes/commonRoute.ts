import express from "express";
import userController from "../controllers/userController";

const commonRoute = express.Router();

// User
commonRoute.post("/api/signup", userController.signup);

export default commonRoute;
