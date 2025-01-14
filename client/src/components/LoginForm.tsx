import React from "react";

export interface LoginProps {
  email: string;
  password: string;
}
interface LoginErrorProps {
  email: string;
  password: string;
}

interface LoginFormProps {
  loginForm: LoginProps;
  loginError: LoginErrorProps;
  setLoginForm: (loginForm: LoginProps) => void;
  handleLogin: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginForm,
  loginError,
  setLoginForm,
  handleLogin,
  isLoading,
}) => {
  return (
    <div className="relative p-4 border border-gray-200 rounded-lg mt-4">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Login</h2>
          <p className="text-sm text-gray-600">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
        <div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                loginError.email
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-blue-300 border-gray-300"
              }`}
            />
            <p className="text-red-500 text-xs">{loginError.email}</p>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                loginError.password
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-blue-300 border-gray-300"
              }`}
            />
            <p className="text-red-500 text-xs">{loginError.password}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
