import { Request, Response } from "express";
import MongoUserRepository from "../../infrastructure/database/repositories/MongoUserRepository";
import UserModel from "../../infrastructure/database/models/UserModel";
import BcryptRepository from "../../infrastructure/security/BcryptRepository";
import { createResponse } from "../../utils/createResponse";
import CreateUser from "../../useCases/user/CreateUser";

const userRepository = new MongoUserRepository(UserModel);
const bcryptRepository = new BcryptRepository();

const signup = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const createUser = new CreateUser(userRepository, bcryptRepository);
    const user = await createUser.execute(userData);
    res.status(201).json(createResponse(true, "User created", user));
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(createResponse(false, "User creation failed", {}, error));
  }
};

export default {
  signup,
};
