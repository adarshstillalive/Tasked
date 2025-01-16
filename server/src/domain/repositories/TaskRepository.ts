import Task from "../entities/Task";

interface TaskRepository {
  create(task: Task): Promise<Task>;
  fetchTasksForUser(assignTo: string): Promise<Task[]>;
}

export default TaskRepository;
