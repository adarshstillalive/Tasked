import { Model } from "mongoose";
import UserRepository from "../../../domain/repositories/UserRepository";
import User from "../../../domain/entities/User";

class MongoUserRepository implements UserRepository {
  constructor(private UserModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
    await createdUser.save();
    return new User(
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser._id.toString()
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ email }).lean();
    if (!user) return null;
    return new User(user.name, user.email, user.password, user._id.toString());
  }
}

export default MongoUserRepository;
