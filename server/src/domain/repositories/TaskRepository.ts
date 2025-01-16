import Task from "../entities/Task";

interface TaskRepository {
  create(task: Task): Promise<Task>;
  findTaskById(taskId: string): Promise<Task>;
  fetchTasksForUser(assignTo: string): Promise<Task[]>;
  fetchTasksForLead(leadId: string): Promise<Task[]>;
  updateStatusByUser(
    taskId: string,
    assignTo: string,
    status: Task["status"]
  ): Promise<Task>;
  deleteTask(taskId: string, leadId: string): Promise<void>;
}

export default TaskRepository;
