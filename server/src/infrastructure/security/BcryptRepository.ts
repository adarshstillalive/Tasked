import BcryptRepositoryInterface from "../../domain/repositories/BcryptRepositoryInterface";
import bcrypt from "bcrypt";

class BcryptRepository implements BcryptRepositoryInterface {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default BcryptRepository;
