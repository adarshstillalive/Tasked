import leadAxiosInstance from "../axios/leadAxiosInstance";
import { ApiResponse } from "../interfaces/ApiResponse";

export const fetchUsers = async (): Promise<ApiResponse> => {
  const response = await leadAxiosInstance.get("/api/users");
  return response.data;
};
