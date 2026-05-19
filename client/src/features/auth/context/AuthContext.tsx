import { createContext } from "react";

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  backendUrl: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);
