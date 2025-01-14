import User from "../../domain/entities/User";
import BcryptRepositoryInterface from "../../domain/repositories/BcryptRepositoryInterface";
import JwtTokenRepositoryInterface from "../../domain/repositories/JwtTokenRepositoryInterface";
import UserRepository from "../../domain/repositories/UserRepository";

interface UserWithToken {
  name: string;
  email: string;
  token: string;
}

class AuthenticateUser {
  constructor(
    private userRepository: UserRepository,
    private bcryptRepositoryInterface: BcryptRepositoryInterface,
    private jwtRepositoryInterface: JwtTokenRepositoryInterface
  ) {}

  async execute(email: string, password: string): Promise<UserWithToken> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const isValidPassword = await this.bcryptRepositoryInterface.compare(
      password,
      user.password
    );
    if (!isValidPassword) throw new Error("Wrong password");

    const token = this.jwtRepositoryInterface.generate({ email: user.email });

    return { name: user.name, email: user.email, token };
  }
}

export default AuthenticateUser;
