import React, { type ReactNode } from "react";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    // rehydrate on refresh
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = React.useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const isAuthenticated = !!user && !!token;
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    backendUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
