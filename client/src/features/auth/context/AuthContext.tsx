import React, { createContext, type ReactNode } from "react";

// 1. Define type (optional but good for TS)
interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

// 3. Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// 2. Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// create provider
export function AuthProvider({ children }: AuthProviderProps) {
  // global state
  const [user, setUser] = React.useState<User | null>(null);

  // derived state
  const isAuthenticated = !!user;

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
