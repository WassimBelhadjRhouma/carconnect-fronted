import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import {
  LoginResponse,
  LoginUserData,
  USER_TYPES,
} from "../interfaces/AuthInterfaces";
import UserService from "../services/UserService";
import { setApiClientToken } from "../services/apiClient";

export interface AuthContextProps {
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<USER_TYPES | null>(null);
  const [status, setStatus] = useState<any | null>(null);

  const login = async (data: LoginUserData) => {
    console.log("i am here ");

    try {
      const { token, role } = await authService.logInUser(data);
      setApiClientToken(token);
      setIsAuthenticated(true);
      setRole(role);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setApiClientToken(null);
  };

  const fetchStatus = async () => {
    if (!isAuthenticated) return;
    try {
      const userRole = await UserService.getStatus();
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
      value={{ login, logout, isAuthenticated, status, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};
