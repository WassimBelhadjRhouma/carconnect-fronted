import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import {
  LoginResponse,
  LoginUserData,
  USER_TYPES,
} from "../interfaces/AuthInterfaces";
import UserService from "../services/UserService";
import { setApiClientToken } from "../services/apiClient";
import { USER_STATUS } from "../interfaces/UserInterfaces";

export interface AuthContextProps {
  user?: any | null; // Replace with your user model
  login: (data: LoginUserData) => Promise<void>;
  logout: () => void;
  updateStatus: () => void;
  desactivateWelcomeMSG: () => void;
  isAuthenticated: boolean;
  role: USER_TYPES;
  status: string;
  showWolcome: boolean;
  userName: string;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<USER_TYPES | null>(null);
  const [status, setStatus] = useState<any | null>(null);
  const [showWolcome, setShowWolcome] = useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);

  const login = async (data: LoginUserData) => {
    console.log("i am here ");

    try {
      const { token, role, firstName, lastName } = await authService.logInUser(
        data
      );
      setApiClientToken(token);
      setIsAuthenticated(true);
      setUserName(firstName + " " + lastName);
      setRole(role);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setApiClientToken(null);
    setShowWolcome(true);
    setUserName(null);
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

  const updateStatus = () => {
    setStatus(USER_STATUS.PENDING);
  };

  const desactivateWelcomeMSG = () => {
    setShowWolcome(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStatus();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        updateStatus,
        desactivateWelcomeMSG,
        isAuthenticated,
        status,
        role,
        showWolcome,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
