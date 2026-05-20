import { createContext } from "react";

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  backendUrl: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);
