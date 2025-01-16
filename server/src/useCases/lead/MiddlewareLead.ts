import Lead from "../../domain/entities/Lead";
import LeadRepository from "../../domain/repositories/LeadRepository";

class MiddlewareLead {
  constructor(private leadRepository: LeadRepository) {}

  async execute(leadId: string): Promise<Lead | null> {
    return this.leadRepository.findByEmail(leadId);
  }
}
export default MiddlewareLead;
