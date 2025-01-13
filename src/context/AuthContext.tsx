import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import {
  LoginResponse,
  LoginUserData,
  USER_TYPES,
} from "../interfaces/AuthInterfaces";
import UserService from "../services/UserService";

export interface AuthContextProps {
  token: string | null;
  user?: any | null; // Replace with your user model
  login: (data: LoginUserData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  role: USER_TYPES;
  status: string;
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
  const [role, setRole] = useState<USER_TYPES | null>(null);
  const [status, setStatus] = useState<any | null>(null);

  const login = async (data: LoginUserData) => {
    try {
      const { token, userId, role } = await authService.logInUser(data);
      setToken(token);
      setUserId(userId);
      setRole(role);
      sessionStorage.setItem("authToken", token);
      console.log(userId);
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

  const fetchStatus = async () => {
    if (!token) return;
    try {
      const userRole = await UserService.getStatus();
      console.log(userRole);
      setRole(userRole.role);
      setStatus(userRole.status);
    } catch (error) {
      console.error("Error fetching role:", error);
      setRole(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStatus();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, status, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};
