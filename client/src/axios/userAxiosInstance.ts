import axios from "axios";

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

export default userAxiosInstance;
