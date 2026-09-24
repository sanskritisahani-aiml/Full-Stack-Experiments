import { Navigate } from "react-router-dom";
import { getToken, getUserFromToken } from "../utils/auth";

function ProtectedRoute({ children, requiredRole }) {
  const token = getToken();
  const user = getUserFromToken();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;