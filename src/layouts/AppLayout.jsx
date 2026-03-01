import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navigation from "@/components/Navigation";
import { AuthContext } from "@/context/Context";
import { ActiveLinkProvider } from "@/context/provider/ActiveLinkProvider";

const AppLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <ActiveLinkProvider>
      <Navigation />
      <>
        <Outlet />
      </>
    </ActiveLinkProvider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AppLayout;
