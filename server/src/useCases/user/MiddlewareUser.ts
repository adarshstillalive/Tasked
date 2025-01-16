import User from "../../domain/entities/User";
import UserRepository from "../../domain/repositories/UserRepository";

class MiddlewareUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    return this.userRepository.findByEmail(userId);
  }
}
export default MiddlewareUser;
