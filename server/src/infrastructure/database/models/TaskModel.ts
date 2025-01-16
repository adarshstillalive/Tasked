import mongoose from "mongoose";
import Task from "../../../domain/entities/Task";

const taskSchema = new mongoose.Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignToName: {
    type: String,
    required: true,
  },
  assignTo: {
    type: String,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
  leadName: {
    type: String,
    required: true,
  },
  leadId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
});

const TaskModel = mongoose.model<Task>("Task", taskSchema);

export default TaskModel;
