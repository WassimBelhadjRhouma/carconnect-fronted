import React, { createContext, useState } from "react";
import { authService } from "../services/authService";
import { LoginResponse, LoginUserData } from "../interfaces/AuthInterfaces";

export interface AuthContextProps {
  token: string | null;
  user: any | null; // Replace with your user model
  login: (data: LoginUserData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null); // Token stored in memory
  const [user, setUser] = useState<any | null>(null); // Replace with your user model

  const login = async (data: LoginUserData) => {
    try {
      const { token, user } = await authService.logInUser(data);
      setToken(token);
      setUser(user); 
    } catch (error) {
      throw error; // the component handle the error
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
