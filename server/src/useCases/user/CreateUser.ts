import User from "../../domain/entities/User";
import BcryptRepositoryInterface from "../../domain/repositories/BcryptRepositoryInterface";
import JwtTokenRepositoryInterface from "../../domain/repositories/JwtTokenRepositoryInterface";
import UserRepository from "../../domain/repositories/UserRepository";

interface UserWithToken {
  name: string;
  email: string;
  token: string;
}

class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private bcryptRepositoryInterface: BcryptRepositoryInterface,
    private jwtRepositoryInterface: JwtTokenRepositoryInterface
  ) {}

  async execute(userData: Omit<User, "_id">): Promise<UserWithToken> {
    const hashedPassword = await this.bcryptRepositoryInterface.hash(
      userData.password
    );
    const user = new User(userData.name, userData.email, hashedPassword);
    const createdUser = await this.userRepository.create(user);
    if (!createdUser) throw new Error("User creation failed");

    const token = this.jwtRepositoryInterface.generate({ email: user.email });

    return { name: createdUser.name, email: createdUser.email, token };
  }
}

export default CreateUser;
