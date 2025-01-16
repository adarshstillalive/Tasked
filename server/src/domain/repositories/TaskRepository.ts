import Task from "../entities/Task";

interface TaskRepository {
  create(task: Task): Promise<Task>;
  fetchTasksForUser(assignTo: string): Promise<Task[]>;
  fetchTasksForLead(leadId: string): Promise<Task[]>;
  updateStatusByUser(
    taskId: string,
    assignTo: string,
    status: Task["status"]
  ): Promise<Task>;
}

export default TaskRepository;
