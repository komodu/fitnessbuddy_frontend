import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/Context";

import LoaderSVG from "@/assets/img/loader.svg";
const AuthLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Show loader for at least 3 seconds OR while auth is null
  if (isAuthenticated === null || showLoader) {
    return (
      <div className="workouts-loading">
        <img
          src={LoaderSVG}
          className="loader-icon"
          style={{ width: "60px", height: "60px" }}
        />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="min-vh-100 d-flex justify-content-center align-items-center overflow-hidden">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
