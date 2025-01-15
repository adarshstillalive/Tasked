import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

interface ITaskFormData {
  title: string;
  description: string;
  assignTo: string;
  endDate: string;
}

class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskFormData: ITaskFormData, leadId: string) {
    const task = new Task(
      taskFormData.title,
      taskFormData.description,
      taskFormData.assignTo,
      new Date(taskFormData.endDate),
      leadId,
      "pending"
    );
    const createdTask = await this.taskRepository.create(task);
    return createdTask;
  }
}

export default CreateTask;
