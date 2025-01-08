import React, { createContext, useState } from "react";
import { authService } from "../services/authService";
import { LoginResponse, LoginUserData } from "../interfaces/AuthInterfaces";

export interface AuthContextProps {
  token: string | null;
  user?: any | null; // Replace with your user model
  login: (data: LoginUserData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("authToken")
  );
  const [userId, setUserId] = useState<any | null>(() =>
    sessionStorage.getItem("userId")
  ); // Replace with your user model

  const login = async (data: LoginUserData) => {
    try {
      const { token, user } = await authService.logInUser(data);
      setToken(token);
      setUserId(user.userId);
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userId", user.userId.toString());
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setToken(null);
    setUserId(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
