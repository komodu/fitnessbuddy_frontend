import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/Context";
import { useContext, useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading, stopAuthLoading } =
    useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      stopAuthLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (authLoading) return <p>Loading..</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
