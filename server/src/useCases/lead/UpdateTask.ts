import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

interface ITaskFormData {
  title: string;
  description: string;
  assignToName: string;
  assignTo: string;
  endAt: string;
  status: "pending" | "in-progress" | "completed";
}

class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, taskFormData: ITaskFormData, leadId: string) {
    const fetchTask = await this.taskRepository.findTaskById(taskId);
    const task = new Task(
      taskFormData.title,
      taskFormData.description,
      taskFormData.assignToName,
      taskFormData.assignTo,
      new Date(taskFormData.endAt),
      fetchTask.leadName,
      leadId,
      taskFormData.status
    );
    return await this.taskRepository.updateTask(taskId, task);
  }
}

export default UpdateTask;
