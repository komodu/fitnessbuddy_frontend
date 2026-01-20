import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ActiveLinkProvider } from "@/context/NavbarContext";
import Navigation from "@/components/Navigation";
import { AuthContext } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
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

  if (!isAuthenticated) return <Navigate to="/login" replace />;

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
