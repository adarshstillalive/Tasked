import Lead from "../entities/Lead";

interface LeadRepository {
  create(lead: Lead): Promise<Lead>;
  findByEmail(email: string): Promise<Lead | null>;
}

export default LeadRepository;
