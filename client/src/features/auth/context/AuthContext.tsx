import { createContext } from "react";

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
  backendUrl: string;
}

// 2. Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
