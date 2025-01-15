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

dotenv.config();
const leadRepository = new MongoLeadRepository(LeadModel);
const userRepository = new MongoUserRepository(UserModel);
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

export default {
  signup,
  login,
  fetchUsers,
};
