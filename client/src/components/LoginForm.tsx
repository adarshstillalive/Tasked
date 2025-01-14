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
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginForm,
  loginError,
  setLoginForm,
  handleLogin,
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg mt-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Login</h2>
        <p className="text-sm text-gray-600">
          Make changes to your account here. Click save when you're done.
        </p>
      </div>
      <div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
  );
};

export default LoginForm;
