import userAxiosInstance from "../axios/userAxiosInstance";
import { ApiResponse } from "../interfaces/ApiResponse";

export const fetchTasks = async (): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get("/api/tasks");
  return response.data;
};

export const updateStatus = async (
  taskId: string,
  status: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.patch(`/api/task/${taskId}`, {
    status,
  });
  return response.data;
};
