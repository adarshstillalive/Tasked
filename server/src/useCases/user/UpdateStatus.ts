import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

class UpdateStatus {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    taskId: string,
    assignTo: string,
    status: Task["status"]
  ): Promise<Task> {
    return await this.taskRepository.updateStatusByUser(
      taskId,
      assignTo,
      status
    );
  }
}

export default UpdateStatus;
