import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { checkEmail, checkName, checkPassword } from "../utils/validator";

export function Auth() {
  const [activeTab, setActiveTab] = useState("login");
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
  };

  const handleSignup = async () => {
    const nameError = checkName(signupForm.name);
    const emailError = checkEmail(signupForm.email);
    const passwordError = checkPassword(signupForm.password);
    setSignupError({
      name: nameError,
      email: emailError,
      password: passwordError,
    });
    if (emailError || nameError || passwordError) return;
  };
  return (
    <div className="w-[400px]">
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
        />
      )}

      {activeTab === "signup" && (
        <SignupForm
          signupForm={signupForm}
          signupError={signupError}
          setSignupForm={setSignupForm}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
}
