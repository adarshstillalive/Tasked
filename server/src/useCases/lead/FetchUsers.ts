import UserRepository from "../../domain/repositories/UserRepository";

class FetchUsers {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.fetchUsers();
  }
}

export default FetchUsers;
