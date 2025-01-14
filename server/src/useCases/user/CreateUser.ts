import User from "../../domain/entities/User";
import BcryptRepositoryInterface from "../../domain/repositories/BcryptRepositoryInterface";
import UserRepository from "../../domain/repositories/UserRepository";

class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private bcryptRepositoryInterface: BcryptRepositoryInterface
  ) {}

  async execute(userData: Omit<User, "_id">): Promise<User> {
    const hashedPassword = await this.bcryptRepositoryInterface.hash(
      userData.password
    );
    const user = new User(userData.name, userData.email, hashedPassword);
    return this.userRepository.create(user);
  }
}

export default CreateUser;
