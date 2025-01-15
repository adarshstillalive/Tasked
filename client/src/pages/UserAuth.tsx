import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { checkEmail, checkName, checkPassword } from "../utils/validator";
import { userLogin, userSignup } from "../services/userAuthenticationService";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export function UserAuth() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const emailError = checkEmail(loginForm.email);
    const passwordError = checkPassword(loginForm.password);
    setLoginError({
      email: emailError,
      password: passwordError,
    });
    if (emailError || passwordError) return;
    try {
      const response = await userLogin(loginForm);
      localStorage.setItem("userAuthToken", response.data.token);
      setUser({ email: response.data.email, name: response.data.name });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("Log in failed, Try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    const nameError = checkName(signupForm.name);
    const emailError = checkEmail(signupForm.email);
    const passwordError = checkPassword(signupForm.password);
    setSignupError({
      name: nameError,
      email: emailError,
      password: passwordError,
    });
    if (emailError || nameError || passwordError) return;
    try {
      const response = await userSignup(signupForm);
      localStorage.setItem("userAuthToken", response.data.token);
      setUser({ email: response.data.email, name: response.data.name });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("Sign up failed, Try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[400px]">
      <h1 className="text-3xl font-bold text-center">User</h1>
      <div className="grid w-full grid-cols-2 border-b border-gray-200">
        <button
          className={`py-2 px-4 text-center ${
            activeTab === "login" ? "font-bold border-b-2 border-blue-500" : ""
          }`}
          onClick={() => {
            setSignupForm({ name: "", email: "", password: "" });
            setActiveTab("login");
          }}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 text-center ${
            activeTab === "signup" ? "font-bold border-b-2 border-blue-500" : ""
          }`}
          onClick={() => {
            setLoginForm({ email: "", password: "" });
            setActiveTab("signup");
          }}
        >
          Signup
        </button>
      </div>

      {activeTab === "login" && (
        <LoginForm
          loginForm={loginForm}
          loginError={loginError}
          setLoginForm={setLoginForm}
          handleLogin={handleLogin}
          isLoading={isLoading}
        />
      )}

      {activeTab === "signup" && (
        <SignupForm
          signupForm={signupForm}
          signupError={signupError}
          setSignupForm={setSignupForm}
          handleSignup={handleSignup}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
