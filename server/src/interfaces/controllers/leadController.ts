import { Request, Response } from "express";
import BcryptRepository from "../../infrastructure/security/BcryptRepository";
import { createResponse } from "../../utils/createResponse";
import JwtTokenRepository from "../../infrastructure/security/JwtTokenRepository";
import dotenv from "dotenv";
import MongoLeadRepository from "../../infrastructure/database/repositories/MongoLeadRepository";
import LeadModel from "../../infrastructure/database/models/LeadModel";
import CreateLead from "../../useCases/lead/CreateLead";
import AuthenticateLead from "../../useCases/lead/AuthenticateLead";
import FetchUsers from "../../useCases/lead/FetchUsers";
import MongoUserRepository from "../../infrastructure/database/repositories/MongoUserRepository";
import UserModel from "../../infrastructure/database/models/UserModel";
import CreateTask from "../../useCases/lead/CreateTask";
import MongoTaskRepository from "../../infrastructure/database/repositories/MongoTaskRepository";
import TaskModel from "../../infrastructure/database/models/TaskModel";
import { getUserSocket } from "../../utils/socketStore";
import FetchTasks from "../../useCases/lead/FetchTasks";
import DeleteTask from "../../useCases/lead/DeleteTask";

dotenv.config();
const leadRepository = new MongoLeadRepository(LeadModel);
const userRepository = new MongoUserRepository(UserModel);
const taskRepository = new MongoTaskRepository(TaskModel);
const bcryptRepository = new BcryptRepository();
if (!process.env.JWT_SECRET_KEY) throw new Error("Jwt credential missing");

const jwtTokenRepository = new JwtTokenRepository(process.env.JWT_SECRET_KEY);

const signup = async (req: Request, res: Response) => {
  try {
    const leadData = req.body.signupForm;

    const createLead = new CreateLead(
      leadRepository,
      bcryptRepository,
      jwtTokenRepository
    );
    const result = await createLead.execute(leadData);
    res.status(201).json(createResponse(true, "Lead created", result));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "Lead creation failed", {}, error));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.loginForm;

    const authenticateLead = new AuthenticateLead(
      leadRepository,
      bcryptRepository,
      jwtTokenRepository
    );
    const result = await authenticateLead.execute(email, password);
    res.status(200).json(createResponse(true, "Log in success", result));
  } catch (error) {
    console.log(error);
    res.status(401).json(createResponse(false, "Log in failed", {}, error));
  }
};

const fetchUsers = async (req: Request, res: Response) => {
  try {
    const fetchUsersUseCase = new FetchUsers(userRepository);
    const result = await fetchUsersUseCase.execute();
    res
      .status(200)
      .json(createResponse(true, "User data fetching success", result));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "User data fetching failed", {}, error));
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { taskFormData } = req.body;
    const user = req?.user;
    if (!user) {
      throw new Error("Server error");
    }
    const createTaskUseCase = new CreateTask(taskRepository);
    const result = await createTaskUseCase.execute(
      taskFormData,
      user.email,
      user.name
    );
    const io = req.app.get("io");
    const assignedEmail = result.assignTo;
    const leadEmail = result.leadId;
    const assignedSocketId = getUserSocket(assignedEmail);
    const leadSocketId = getUserSocket(leadEmail);

    if (io && assignedSocketId) {
      io.to(assignedSocketId).emit("newTask", {
        task: result,
      });
    }
    if (io && leadSocketId) {
      io.to(leadSocketId).emit("newTask", {
        task: result,
      });
    }

    res
      .status(200)
      .json(createResponse(true, "User data fetching success", result));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "User data fetching failed", {}, error));
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

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const user = req.user;
    if (!user) {
      throw new Error("Server error");
    }

    const deleteTaskUseCase = new DeleteTask(taskRepository);
    const result = await deleteTaskUseCase.execute(taskId, user.email);

    const io = req.app.get("io");
    const assignedEmail = result.assignTo;
    const leadEmail = result.leadId;
    const assignedSocketId = getUserSocket(assignedEmail);
    const leadSocketId = getUserSocket(leadEmail);

    if (io && assignedSocketId) {
      io.to(assignedSocketId).emit("deleteTask", {
        task: result,
      });
    }
    if (io && leadSocketId) {
      io.to(leadSocketId).emit("deleteTask", {
        task: result,
      });
    }
    res.status(200).json(createResponse(true, "Task deleted successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "task deletion failed", {}, error));
  }
};

export default {
  signup,
  login,
  fetchUsers,
  createTask,
  fetchTasks,
  deleteTask,
};
