import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

class FetchTasks {
  constructor(private taskRepository: TaskRepository) {}

  async execute(leadId: string): Promise<Task[]> {
    return await this.taskRepository.fetchTasksForLead(leadId);
  }
}

export default FetchTasks;
