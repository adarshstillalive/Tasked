import leadAxiosInstance from "../axios/leadAxiosInstance";
import { ApiResponse } from "../interfaces/ApiResponse";

interface ITaskFormData {
  title: string;
  description: string;
  assignTo: string;
  endDate: string;
}

export const fetchUsers = async (): Promise<ApiResponse> => {
  const response = await leadAxiosInstance.get("/api/users");
  return response.data;
};

export const createTask = async (
  taskFormData: ITaskFormData
): Promise<ApiResponse> => {
  const response = await leadAxiosInstance.post("/api/task", { taskFormData });
  return response.data;
};

export const fetchTasks = async (): Promise<ApiResponse> => {
  const response = await leadAxiosInstance.get("/api/tasks");
  return response.data;
};
