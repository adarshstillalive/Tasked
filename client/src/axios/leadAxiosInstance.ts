import axios from "axios";

const userAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/lead`,
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("leadAuthToken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default userAxiosInstance;
