import userAxiosInstance from "../axios/userAxiosInstance";
import { LoginProps } from "../components/LoginForm";
import { SignupProps } from "../components/SignupForm";
import { ApiResponse } from "../interfaces/ApiResponse";

export const userSignup = async (
  signupForm: SignupProps
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post("/api/signup", { signupForm });
  return response.data;
};

export const userLogin = async (
  loginForm: LoginProps
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post("/api/login", { loginForm });
  return response.data;
};
