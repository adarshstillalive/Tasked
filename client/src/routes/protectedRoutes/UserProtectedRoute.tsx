import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface UserProtectedRouteProps {
  children: ReactNode;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({
  children,
}) => {
  const token = localStorage.getItem("userAuthToken");
  if (!token) {
    return <Navigate to="/auth/user" replace />;
  }
  return <>{children}</>;
};

export default UserProtectedRoute;
