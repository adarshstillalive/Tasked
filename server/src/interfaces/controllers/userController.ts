import { Request, Response } from "express";
import MongoUserRepository from "../../infrastructure/database/repositories/MongoUserRepository";
import UserModel from "../../infrastructure/database/models/UserModel";
import BcryptRepository from "../../infrastructure/security/BcryptRepository";
import { createResponse } from "../../utils/createResponse";
import CreateUser from "../../useCases/user/CreateUser";
import JwtTokenRepository from "../../infrastructure/security/JwtTokenRepository";
import dotenv from "dotenv";
import AuthenticateUser from "../../useCases/user/AuthenticateUser";
import FetchTasks from "../../useCases/user/FetchTasks";
import MongoTaskRepository from "../../infrastructure/database/repositories/MongoTaskRepository";
import TaskModel from "../../infrastructure/database/models/TaskModel";

dotenv.config();
const userRepository = new MongoUserRepository(UserModel);
const taskRepository = new MongoTaskRepository(TaskModel);
const bcryptRepository = new BcryptRepository();
if (!process.env.JWT_SECRET_KEY) throw new Error("Jwt credential missing");

const jwtTokenRepository = new JwtTokenRepository(process.env.JWT_SECRET_KEY);

const signup = async (req: Request, res: Response) => {
  try {
    const userData = req.body.signupForm;

    const createUser = new CreateUser(
      userRepository,
      bcryptRepository,
      jwtTokenRepository
    );
    const result = await createUser.execute(userData);
    res.status(201).json(createResponse(true, "User created", result));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "User creation failed", {}, error));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.loginForm;

    const authenticateUser = new AuthenticateUser(
      userRepository,
      bcryptRepository,
      jwtTokenRepository
    );
    const result = await authenticateUser.execute(email, password);
    res.status(201).json(createResponse(true, "Log in success", result));
  } catch (error) {
    console.log(error);
    res.status(401).json(createResponse(false, "Log in failed", {}, error));
  }
};

const fetchTasks = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Server error");
    }

    const fetchTasksUseCase = new FetchTasks(taskRepository);
    const result = await fetchTasksUseCase.execute(user.email);
    res.status(200).json(createResponse(true, "Fetching task success", result));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "Fetching tasks failed", {}, error));
  }
};

export default {
  signup,
  login,
  fetchTasks,
};
