import axios from "axios";
import { toast } from "react-toastify";

const leadAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/lead`,
  withCredentials: true,
});

leadAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("leadAuthToken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

leadAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("lead");
      localStorage.removeItem("leadAuthToken");
      toast.error("Your account has been blocked.");
    }
    return Promise.reject(error);
  }
);

export default leadAxiosInstance;
