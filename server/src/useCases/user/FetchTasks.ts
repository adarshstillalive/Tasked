import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

class FetchTasks {
  constructor(private taskRepository: TaskRepository) {}

  async execute(assignTo: string): Promise<Task[]> {
    return await this.taskRepository.fetchTasksForUser(assignTo);
  }
}

export default FetchTasks;
