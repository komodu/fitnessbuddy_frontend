import { useState } from "react";
import { AuthContext } from "../Context";
import { useAuthUser } from "../../hooks/useAuthUser";
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // IMPORTANT
  const [username, setUsername] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const stopAuthLoading = () => setAuthLoading(false);

  const { login, logout } = useAuthUser({
    setisAuthenticated,
    setAuthLoading,
    setUsername,
    setUserInfo,
  });
  return (
    <AuthContext.Provider
      value={{
        username,
        userInfo,
        isAuthenticated,
        // expose loading
        authLoading,
        stopAuthLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
