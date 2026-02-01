import { useState, useEffect } from "react";
import { AuthContext } from "../Context";

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // IMPORTANT

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    // const storedUserInfo = localStorage.getItem("userInfo");
    // const storedUserId = localStorage.getItem("userId");
    if (token && storedUsername) {
      setUsername(JSON.parse(storedUsername));
      setLoading(false);
    }

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", { credentials: "include" })
      .then((resp) => {
        if (!resp.ok) throw new Error("Failed to fetch user");
        return resp.json();
      })
      .then((data) => {
        console.log("datasz: ", data);
        setUsername(data.user.username);
        setUserInfo(data.userInfo);
        localStorage.setItem("username", JSON.stringify(data.user.username));
        // localStorage.setItem("userInfo", JSON.stringify(data.data.user_info));
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUsername(null);
        setUserInfo(null);
        setIsAuthenticated(false);
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  // Login
  const login = async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();

    console.log("Login Profile Data: ", data);

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("userId", data.data.userid);
    localStorage.setItem("username", JSON.stringify(data.data.username));

    setUsername(data.data.username);
    setIsAuthenticated(true);
    setLoading(false);
  };

  // Logout
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername(null);
    setUserInfo(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        userInfo,
        isAuthenticated,
        loading, // expose loading
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
