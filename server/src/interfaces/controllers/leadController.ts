import { Request, Response } from "express";
import BcryptRepository from "../../infrastructure/security/BcryptRepository";
import { createResponse } from "../../utils/createResponse";
import JwtTokenRepository from "../../infrastructure/security/JwtTokenRepository";
import dotenv from "dotenv";
import MongoLeadRepository from "../../infrastructure/database/repositories/MongoLeadRepository";
import LeadModel from "../../infrastructure/database/models/LeadModel";
import CreateLead from "../../useCases/lead/CreateLead";
import AuthenticateLead from "../../useCases/lead/AuthenticateLead";

dotenv.config();
const leadRepository = new MongoLeadRepository(LeadModel);
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
    res.status(201).json(createResponse(true, "Log in success", result));
  } catch (error) {
    console.log(error);
    res.status(401).json(createResponse(false, "Log in failed", {}, error));
  }
};

export default {
  signup,
  login,
};
