import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface LeadProtectedRouteProps {
  children: ReactNode;
}

const LeadProtectedRoute: React.FC<LeadProtectedRouteProps> = ({
  children,
}) => {
  const token = localStorage.getItem("leadAuthToken");
  if (!token) {
    return <Navigate to="/auth/lead" replace />;
  }
  return <>{children}</>;
};

export default LeadProtectedRoute;
