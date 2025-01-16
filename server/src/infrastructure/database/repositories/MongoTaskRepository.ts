import { Model } from "mongoose";
import Task from "../../../domain/entities/Task";
import TaskRepository from "../../../domain/repositories/TaskRepository";

class MongoTaskRepository implements TaskRepository {
  constructor(private TaskModel: Model<Task>) {}

  async create(task: Task): Promise<Task> {
    const createdTask = new this.TaskModel(task);
    await createdTask.save();

    return new Task(
      createdTask.title,
      createdTask.description,
      createdTask.assignToName,
      createdTask.assignTo,
      createdTask.endAt,
      createdTask.leadName,
      createdTask.leadId,
      createdTask.status
    );
  }

  async fetchTasksForUser(assignTo: string): Promise<Task[]> {
    const tasks = await this.TaskModel.find({ assignTo }).lean();
    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.assignToName,
          task.assignTo,
          task.endAt,
          task.leadName,
          task.leadId,
          task.status,
          task._id.toString()
        )
    );
  }

  async fetchTasksForLead(leadId: string): Promise<Task[]> {
    const tasks = await this.TaskModel.find({ leadId }).lean();
    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.assignToName,
          task.assignTo,
          task.endAt,
          task.leadName,
          task.leadId,
          task.status,
          task._id.toString()
        )
    );
  }

  async updateStatusByUser(
    taskId: string,
    assignTo: string,
    status: Task["status"]
  ): Promise<Task> {
    const updatedTask = await this.TaskModel.findOneAndUpdate(
      { _id: taskId, assignTo },
      { $set: { status } },
      { new: true }
    ).lean();
    if (!updatedTask) {
      throw new Error("Updation failed");
    }
    return new Task(
      updatedTask.title,
      updatedTask.description,
      updatedTask.assignToName,
      updatedTask.assignTo,
      updatedTask.endAt,
      updatedTask.leadName,
      updatedTask.leadId,
      updatedTask.status,
      updatedTask._id.toString()
    );
  }
}

export default MongoTaskRepository;
