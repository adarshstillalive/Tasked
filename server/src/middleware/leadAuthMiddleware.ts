import { Request, Response, NextFunction } from "express";
import JwtTokenRepository from "../infrastructure/security/JwtTokenRepository";
import dotenv from "dotenv";
import User from "../domain/entities/User";
import { createResponse } from "../utils/createResponse";
import Lead from "../domain/entities/Lead";
import MiddlewareLead from "../useCases/lead/MiddlewareLead";
import MongoLeadRepository from "../infrastructure/database/repositories/MongoLeadRepository";
import LeadModel from "../infrastructure/database/models/LeadModel";
dotenv.config();
declare module "express" {
  interface Request {
    user?: Lead;
  }
}
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) throw new Error("Invalid jwt secret");

const jwtTokenRepository = new JwtTokenRepository(JWT_SECRET);
const leadRepository = new MongoLeadRepository(LeadModel);

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwtTokenRepository.verify(token) as { email: string };
  if (!decoded) {
    res.status(403).json(createResponse(false, "Invalid token"));
  }

  const middlewareLead = new MiddlewareLead(leadRepository);
  const user = await middlewareLead.execute(decoded.email);
  if (!user) {
    throw new Error("Error in user access");
  }

  req.user = user;
  next();
};

export default { auth };
