import Task from "../entities/Task";

interface TaskRepository {
  create(task: Task): Promise<Task>;
}

export default TaskRepository;
