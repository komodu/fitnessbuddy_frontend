import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { AuthContext } from "@/context/Context";
import { ActiveLinkProvider } from "@/context/provider/ActiveLinkProvider";

import { UserProvider } from "@/context/provider/UserProvider";
import LoaderSVG from "@/assets/img/loader.svg";

const AppLayout = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true); // start as true
  // Hide loader after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show loader while auth is loading or during 3-second delay
  if (loading || showLoader) {
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

  return isAuthenticated ? (
    <UserProvider>
      <ActiveLinkProvider>
        <Navigation />
        <div className="pages">
          <Outlet />
        </div>
      </ActiveLinkProvider>
    </UserProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default AppLayout;
