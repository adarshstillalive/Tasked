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
      createdTask.assignTo,
      createdTask.endAt,
      createdTask.leadId,
      createdTask.status
    );
  }
}

export default MongoTaskRepository;
