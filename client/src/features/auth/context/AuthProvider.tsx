import React, { type ReactNode } from "react";

import { AuthContext } from "./AuthContext";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  backendUrl: string;
}

// create provider
export function AuthProvider({ children }: { children: ReactNode }) {
  // global state
  const [user, setUser] = React.useState<User | null>(null);
  const isAuthenticated = !!user;

  //   backendURL
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  // action
  const login = (userData: User) => {
    setUser(userData);
  };

  function logout() {
    setUser(null);
  }

  // value shared globally
  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    backendUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
