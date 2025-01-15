import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface LeadAuthProtectedRouteProps {
  children: ReactNode;
}

const LeadAuthProtectedRoute: React.FC<LeadAuthProtectedRouteProps> = ({
  children,
}) => {
  const token = localStorage.getItem("leadAuthToken");
  if (token) {
    return <Navigate to="/lead" replace />;
  }
  return <>{children}</>;
};

export default LeadAuthProtectedRoute;
