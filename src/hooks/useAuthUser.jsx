import { useEffect } from "react";

export const useAuthUser = ({
  setisAuthenticated,
  setAuthLoading,
  setUsername,
  setUserInfo,
}) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setisAuthenticated(true);
      setAuthLoading(false);
    }
    if (!token) {
      //   setAuthLoading(false);
      return;
    }

    fetch("/api/auth/me", { credentials: "include" })
      .then((resp) => {
        if (!resp.ok) throw new Error("Failed to fetch User");
        return resp.json();
      })
      .then((data) => {
        console.log("AuthMe: ", data);
        setUserInfo(data.userInfo);
        setUsername(data.user.username);
        localStorage.setItem("username", JSON.stringify(data.user.username));
        setisAuthenticated(true);
      })
      .catch(() => {
        setUsername(null);
        setUserInfo(null);
        setisAuthenticated(false);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const login = async (username, password) => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("json: ", JSON.stringify({ username, password }));
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Login Failed");
    const data = await response.json();

    console.log("Login Profile Data: ", data);

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("userId", data.data.userid);
    localStorage.setItem("username", JSON.stringify(data.data.username));

    setUsername(data.data.username);
    setisAuthenticated(true);
    setUserInfo(data.data.userInfo);
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
    setisAuthenticated(false);
  };

  return { login, logout };
};
