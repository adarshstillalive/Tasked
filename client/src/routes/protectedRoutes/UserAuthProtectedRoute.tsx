import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface UserAuthProtectedRouteProps {
  children: ReactNode;
}

const UserAuthProtectedRoute: React.FC<UserAuthProtectedRouteProps> = ({
  children,
}) => {
  const token = localStorage.getItem("userAuthToken");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default UserAuthProtectedRoute;
