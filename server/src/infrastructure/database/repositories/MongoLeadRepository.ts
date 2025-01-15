import { Model } from "mongoose";
import LeadRepository from "../../../domain/repositories/LeadRepository";
import Lead from "../../../domain/entities/Lead";

class MongoLeadRepository implements LeadRepository {
  constructor(private LeadModel: Model<Lead>) {}

  async create(lead: Lead): Promise<Lead> {
    const createdLead = new this.LeadModel(lead);
    await createdLead.save();
    return new Lead(
      createdLead.name,
      createdLead.email,
      createdLead.password,
      createdLead._id.toString()
    );
  }

  async findByEmail(email: string): Promise<Lead | null> {
    const user = await this.LeadModel.findOne({ email }).lean();
    if (!user) return null;
    return new Lead(user.name, user.email, user.password, user._id.toString());
  }
}

export default MongoLeadRepository;
