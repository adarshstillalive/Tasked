import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

interface ITaskFormData {
  title: string;
  description: string;
  assignToName: string;
  assignTo: string;
  endDate: string;
}

class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskFormData: ITaskFormData, leadId: string, leadName: string) {
    const task = new Task(
      taskFormData.title,
      taskFormData.description,
      taskFormData.assignToName,
      taskFormData.assignTo,
      new Date(taskFormData.endDate),
      leadName,
      leadId,
      "pending"
    );
    const createdTask = await this.taskRepository.create(task);
    return createdTask;
  }
}

export default CreateTask;
