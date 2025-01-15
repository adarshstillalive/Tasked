import User from "../entities/User";

interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  fetchUsers(): Promise<User[]>;
}

export default UserRepository;
