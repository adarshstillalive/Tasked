import BcryptRepositoryInterface from "../../domain/repositories/BcryptRepositoryInterface";
import JwtTokenRepositoryInterface from "../../domain/repositories/JwtTokenRepositoryInterface";
import LeadRepository from "../../domain/repositories/LeadRepository";

interface LeadWithToken {
  name: string;
  email: string;
  token: string;
}

class AuthenticateLead {
  constructor(
    private leadRepository: LeadRepository,
    private bcryptRepositoryInterface: BcryptRepositoryInterface,
    private jwtRepositoryInterface: JwtTokenRepositoryInterface
  ) {}

  async execute(email: string, password: string): Promise<LeadWithToken> {
    const lead = await this.leadRepository.findByEmail(email);
    if (!lead) throw new Error("Lead not found");

    const isValidPassword = await this.bcryptRepositoryInterface.compare(
      password,
      lead.password
    );
    if (!isValidPassword) throw new Error("Wrong password");

    const token = this.jwtRepositoryInterface.generate({ email: lead.email });

    return { name: lead.name, email: lead.email, token };
  }
}

export default AuthenticateLead;
