import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { AuthContext } from "@/context/Context";
import { ActiveLinkProvider } from "@/context/provider/ActiveLinkProvider";

import LoaderSVG from "@/assets/img/loader.svg";

const AppLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <ActiveLinkProvider>
      <Navigation />
      <div className="pages">
        <Outlet />
      </div>
    </ActiveLinkProvider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AppLayout;
