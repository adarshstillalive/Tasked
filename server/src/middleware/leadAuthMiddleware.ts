import { Request, Response, NextFunction } from "express";
import JwtTokenRepository from "../infrastructure/security/JwtTokenRepository";
import dotenv from "dotenv";
import User from "../domain/entities/User";
import { createResponse } from "../utils/createResponse";
dotenv.config();
declare module "express" {
  interface Request {
    user?: string;
  }
}
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) throw new Error("Invalid jwt secret");

const jwtTokenRepository = new JwtTokenRepository(JWT_SECRET);

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwtTokenRepository.verify(token) as { email: string };
  if (!decoded) {
    res.status(403).json(createResponse(false, "Invalid token"));
  }

  req.user = decoded.email;
  next();
};

export default { authMiddleware };
