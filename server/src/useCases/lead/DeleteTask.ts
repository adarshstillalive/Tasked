import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, leadId: string): Promise<Task> {
    const task = await this.taskRepository.findTaskById(taskId);
    await this.taskRepository.deleteTask(taskId, leadId);
    return task;
  }
}

export default DeleteTask;
