import leadAxiosInstance from "../axios/leadAxiosInstance";
import { LoginProps } from "../components/LoginForm";
import { SignupProps } from "../components/SignupForm";
import { ApiResponse } from "../interfaces/ApiResponse";

export const leadSignup = async (
  signupForm: SignupProps
): Promise<ApiResponse> => {
  const response = await leadAxiosInstance.post("/api/signup", { signupForm });
  return response.data;
};

export const leadLogin = async (
  loginForm: LoginProps
): Promise<ApiResponse> => {
  const response = await leadAxiosInstance.post("/api/login", { loginForm });
  return response.data;
};
