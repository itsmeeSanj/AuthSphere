import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

import { AuthContext, type AuthContextType, type User } from "./AuthContext";
import { message } from "antd";

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      // guard against literal "undefined" string
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("user"); // clear corrupted data
      return null;
    }
  });

  const isAuthenticated = !!user;
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  // const [token, setToken] = React.useState<string | null>(() => {
  //   const stored = localStorage.getItem("token");
  //   if (!stored || stored === "undefined") return null;
  //   return stored;
  // });

  const login = (userData: User) => {
    // don't store if data is bad
    if (!userData) {
      console.error("Login called with invalid user data");
      return;
    }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      message.success("Logged out successfully");
      navigate("/login");
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    backendUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
