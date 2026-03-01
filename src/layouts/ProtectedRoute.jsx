import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/accessor/ContextAccessors";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) return;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
