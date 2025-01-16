import axios from "axios";
import { toast } from "react-toastify";

const userAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("userAuthToken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

userAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("user");
      localStorage.removeItem("userAuthToken");
      toast.error("Your account has been blocked.");
    }
    return Promise.reject(error);
  }
);

export default userAxiosInstance;
