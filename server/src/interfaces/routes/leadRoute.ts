import express from "express";
import leadController from "../controllers/leadController";

const leadRoute = express.Router();

// User
leadRoute.post("/api/signup", leadController.signup);
leadRoute.post("/api/login", leadController.login);

export default leadRoute;
