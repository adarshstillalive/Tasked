import mongoose from "mongoose";
import Lead from "../../../domain/entities/Lead";

const leadSchema = new mongoose.Schema<Lead>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LeadModel = mongoose.model<Lead>("Lead", leadSchema);

export default LeadModel;
