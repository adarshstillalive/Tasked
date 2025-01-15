import BcryptRepository from "../../infrastructure/security/BcryptRepository";

const bcryptRepository = new BcryptRepository();
class Lead {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    _id?: string
  ) {}
  isValidPassword(password: string): Promise<boolean> {
    return bcryptRepository.compare(password, this.password);
  }
}

export default Lead;
