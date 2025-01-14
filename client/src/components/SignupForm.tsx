import React from "react";

export interface SignupProps {
  name: string;
  email: string;
  password: string;
}
interface SignupErrorProps {
  name: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  signupForm: SignupProps;
  signupError: SignupErrorProps;
  setSignupForm: (signupForm: SignupProps) => void;
  handleSignup: () => void;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  signupForm,
  signupError,
  setSignupForm,
  handleSignup,
  isLoading,
}) => {
  return (
    <div className="relative p-4 border border-gray-200 rounded-lg mt-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Signup</h2>
          <p className="text-sm text-gray-600">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
        <div>
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={signupForm.name}
              onChange={(e) =>
                setSignupForm({ ...signupForm, name: e.target.value })
              }
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                signupError.name
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-blue-300 border-gray-300"
              }`}
            />
            <p className="text-red-500 text-xs">{signupError.name}</p>
          </div>
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
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                signupError.email
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-blue-300 border-gray-300"
              }`}
            />
            <p className="text-red-500 text-xs">{signupError.email}</p>
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
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                signupError.password
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-blue-300 border-gray-300"
              }`}
            />
            <p className="text-red-500 text-xs">{signupError.password}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={handleSignup}
            disabled={isLoading} // Disable the button while loading
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
