import Lead from "../../domain/entities/Lead";
import User from "../../domain/entities/User";
import BcryptRepositoryInterface from "../../domain/repositories/BcryptRepositoryInterface";
import JwtTokenRepositoryInterface from "../../domain/repositories/JwtTokenRepositoryInterface";
import LeadRepository from "../../domain/repositories/LeadRepository";
import UserRepository from "../../domain/repositories/UserRepository";

interface LeadWithToken {
  name: string;
  email: string;
  token: string;
}

class CreateLead {
  constructor(
    private leadRepository: LeadRepository,
    private bcryptRepositoryInterface: BcryptRepositoryInterface,
    private jwtRepositoryInterface: JwtTokenRepositoryInterface
  ) {}

  async execute(leadData: Omit<Lead, "_id">): Promise<LeadWithToken> {
    const hashedPassword = await this.bcryptRepositoryInterface.hash(
      leadData.password
    );
    const lead = new Lead(leadData.name, leadData.email, hashedPassword);
    const createdLead = await this.leadRepository.create(lead);
    if (!createdLead) throw new Error("Lead creation failed");

    const token = this.jwtRepositoryInterface.generate({ email: lead.email });

    return { name: createdLead.name, email: createdLead.email, token };
  }
}

export default CreateLead;
